import { NextResponse } from 'next/server';

const RECIPIENT = 'info@tamgar.kz';

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[character]);
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok:true });

    const company = clean(body.company, 120);
    const phone = clean(body.phone, 40);
    const interest = clean(body.interest, 2000);
    if (!company || !phone || !interest) return NextResponse.json({ error:'Заполните все поля формы.' }, { status:400 });

    if (!process.env.RESEND_API_KEY || !process.env.APPLICATION_FROM_EMAIL) {
      console.error('Application email is not configured. Set RESEND_API_KEY and APPLICATION_FROM_EMAIL.');
      return NextResponse.json({ error:'Отправка временно недоступна. Позвоните нам по номеру +7 (775) 555-5222.' }, { status:503 });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{ Authorization:`Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type':'application/json' },
      body:JSON.stringify({
        from:process.env.APPLICATION_FROM_EMAIL,
        to:[RECIPIENT],
        subject:`Новая заявка с сайта Tamgar — ${company}`,
        text:`Компания / имя: ${company}\nТелефон: ${phone}\n\nЧто интересует:\n${interest}`,
        html:`<h2>Новая заявка с сайта Tamgar</h2><p><strong>Компания / имя:</strong> ${escapeHtml(company)}</p><p><strong>Телефон:</strong> ${escapeHtml(phone)}</p><p><strong>Что интересует:</strong></p><p>${escapeHtml(interest).replace(/\n/g,'<br>')}</p>`,
      }),
    });

    if (!response.ok) {
      console.error('Resend rejected the application email:', response.status, await response.text());
      return NextResponse.json({ error:'Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.' }, { status:502 });
    }
    return NextResponse.json({ ok:true });
  } catch (error) {
    console.error('Application submission failed:', error);
    return NextResponse.json({ error:'Не удалось обработать заявку. Попробуйте ещё раз.' }, { status:500 });
  }
}
