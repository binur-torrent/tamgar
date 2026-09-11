'use client';

import { useState } from 'react';

const products = [
  ['РАБОЧАЯ ОДЕЖДА', '50%', '0%'],
  ['СПЕЦОДЕЖДА И СИЗ', '0%', '0%'],
  ['МЕДИЦИНСКАЯ ОДЕЖДА', '100%', '0%'],
  ['ПОСТЕЛЬНОЕ БЕЛЬЕ', '0%', '50%'],
  ['ПОСТЕЛЬНЫЕ\nПРИНАДЛЕЖНОСТИ', '50%', '50%'],
  ['КОРПОРАТИВНАЯ\nОДЕЖДА', '100%', '50%'],
  ['ОДЕЖДА ДЛЯ\nОХРАННЫХ СТРУКТУР', '0%', '100%'],
  ['ТРИКОТАЖНЫЕ ИЗДЕЛИЯ', '50%', '100%'],
  ['МАХРОВЫЙ ТЕКСТИЛЬ', '100%', '100%'],
];

const standards = [
  ['/figma/icon-factory.svg', '6 000', 'компл/мес', 'Мощность швейных цехов с автоматизацией процессов.'],
  ['/figma/icon-rfid.svg', 'RFID', 'трекинг', 'Чипирование каждого изделия для учета стирок и прослеживаемости'],
  ['/figma/icon-shield.svg', 'ГОСТ и ТР ТС', '019/2011', 'Сохранение защитных свойств после 5+ циклов промышленной стирки.'],
  ['/figma/icon-cad.svg', 'CAD/CAM', 'Раскрой', 'Автоматизированный компьютерный раскрой без погрешностей.'],
];

const steps = [
  ['01', 'ТЗ и Конструирование', 'Разработка конструкторской документации или пошив по вашим образцам.'],
  ['02', 'Тестовый образец', 'Пошив тестового образца и согласование материалов.'],
  ['03', 'Серия и RFID', 'Автоматизированный раскрой, пошив партии и маркировка.'],
  ['04', 'ОТК и Доставка', '100% контроль качества, упаковка и отгрузка по Казахстану.'],
];

function HeaderLogo() {
  return <a className="header-logo" href="#home" aria-label="Tamgar — на главную"><img src="/figma/tamgar-logo-header.svg" alt="Tamgar" /></a>;
}

function FooterLogo() {
  return <a className="footer-logo" href="#home" aria-label="Tamgar — на главную"><img src="/figma/tamgar-logo-footer.svg" alt="Tamgar" /></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ status: 'idle', message: '' });
  const closeMenu = () => setMenuOpen(false);

  async function submitApplication(event) {
    event.preventDefault();
    setFormState({ status: 'sending', message: 'Отправляем заявку…' });
    const form = event.currentTarget;

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Не удалось отправить заявку.');
      form.reset();
      setFormState({ status: 'success', message: 'Спасибо! Заявка отправлена.' });
    } catch (error) {
      setFormState({ status: 'error', message: error.message || 'Не удалось отправить заявку. Попробуйте ещё раз.' });
    }
  }

  return (
    <main>
      <header className="site-header">
        <div className="site-container nav-wrap">
          <HeaderLogo />
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню" aria-expanded={menuOpen}><span /><span /><span /></button>
          <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Основная навигация">
            <a className="active" href="#home" onClick={closeMenu}>Главная</a>
            <a href="#about" onClick={closeMenu}>О производстве</a>
            <a href="#products" onClick={closeMenu}>Продукция</a>
            <a href="#process" onClick={closeMenu}>Технологии</a>
            <a href="#contacts" onClick={closeMenu}>Контакты</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-shade" />
        <div className="site-container hero-content">
          <h1>ЗАЩИТНАЯ СПЕЦОДЕЖДА<br />И B2B-ТЕКСТИЛЬ ПОЛНОГО ЦИКЛА</h1>
          <p>Серийное производство до 6 000 комплектов в месяц. Внедренный сквозной RFID-контроль качества и соответствие ТР ТС 019/2011.</p>
          <a className="primary-button hero-button" href="#products">СКАЧАТЬ КАТАЛОГ ПРОДУКЦИИ</a>
        </div>
      </section>

      <section className="standards" id="about">
        <div className="site-container">
          <h2>СТАНДАРТЫ И ЦИФРЫ ПРОИЗВОДСТВА</h2>
          <div className="standards-grid">
            {standards.map(([icon, title, sub, copy]) => <article className="standard-card" key={title}>
              <img className="standard-icon" src={icon} alt="" aria-hidden="true" /><strong>{title}</strong><b>{sub}</b><p>{copy}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="products" id="products">
        <div className="products-title"><h2>НАПРАВЛЕНИЕ ПРОИЗВОДСТВА</h2></div>
        <div className="product-grid">
          {products.map(([title, x, y]) => <a className="product-card" href="#contacts" key={title} aria-label={`${title.replace('\n', ' ')} — оставить заявку`}>
            <span className="product-image" style={{ backgroundPosition: `${x} ${y}` }} /><span className="product-overlay" />
            <span className="product-title">{title.split('\n').map((line) => <span key={line}>{line}</span>)}</span>
          </a>)}
        </div>
      </section>

      <section className="process" id="process">
        <div className="site-container">
          <p className="process-kicker">ПРОЗРАЧНЫЙ ПРОЦЕСС</p><h2>ЭТАПЫ РАБОТЫ С B2B-ЗАКАЗАМИ</h2>
          <p className="process-intro">От первого обращения до отгрузки готовой маркированной партии по всему Казахстану.</p>
          <div className="steps-grid">{steps.map(([number, title, copy], index) => <article className="step" key={number}>
            <span className="step-number">{number}</span><h3>{title}</h3><span className="step-line" /><p>{copy}</p>
            {index < steps.length - 1 && <img className="step-arrow" src="/figma/step-arrow.svg" alt="" aria-hidden="true" />}
          </article>)}</div>
        </div>
      </section>

      <section className="contacts" id="contacts">
        <div className="site-container contacts-grid">
          <div className="contact-info">
            <p className="contacts-kicker">КОНТАКТЫ И РЕКВИЗИТЫ</p><h2>Обсудить поставку или разработку</h2><h3>Отдел продаж:</h3>
            <a className="phone" href="tel:+77755555222">+7 (775) 555-5222</a><small>Пн–Пт, с 09:00 до 18:00 (Астана)</small>
            <a className="email" href="mailto:info@tamgar.kz">info@tamgar.kz</a><p className="muted-label">Адрес производства:</p>
            <p>Республика Казахстан, г. Астана</p><p className="muted-label legal-label">Юридические данные:</p>
            <p>ТОО «Tamgar» — Зарегистрированный отечественный товаропроизводитель РК.</p>
          </div>
          <form className="contact-form" onSubmit={submitApplication}>
            <h2>Форма заявки</h2>
            <label><span>Ваше имя или название компании</span><input name="company" placeholder="Ваше имя или название компании:" required maxLength="120" autoComplete="organization" /></label>
            <label><span>Телефон для связи</span><input name="phone" type="tel" placeholder="Телефон для связи:" required maxLength="40" autoComplete="tel" /></label>
            <label><span>Что вас интересует</span><textarea name="interest" placeholder="Что вас интересует:" required maxLength="2000" rows="2" /></label>
            <input className="form-trap" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <button className="primary-button submit-button" type="submit" disabled={formState.status === 'sending'}>ОТПРАВИТЬ ЗАЯВКУ</button>
            <p className={`form-message ${formState.status}`} role="status" aria-live="polite">{formState.message}</p>
          </form>
        </div>
      </section>

      <footer className="footer"><div className="site-container footer-wrap"><p>© 2026 ТОО «Tamgar». Все права защищены.</p><FooterLogo /><p><a href="#contacts">Политика конфиденциальности</a> <span>|</span> <a href="#contacts">Разработка лекал и ТЗ</a></p></div></footer>
    </main>
  );
}
