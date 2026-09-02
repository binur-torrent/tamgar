'use client';

import { useState } from 'react';

const products = [
  ['РАБОЧАЯ ОДЕЖДА', 'Летние и утепленные полукомбинезоны, рабочие куртки, халаты, жилеты и фартуки.', '50%', '0%'],
  ['СПЕЦОДЕЖДА И СИЗ', 'Костюмы сварщика, защита от повышенных температур и кислот, сигнальная одежда, влагозащита.', '0%', '0%'],
  ['МЕДИЦИНСКАЯ ОДЕЖДА', 'Хирургические и процедурные костюмы, халаты, одежда для скорой помощи, шапочки, маски.', '100%', '0%'],
  ['ПОСТЕЛЬНОЕ БЕЛЬЕ', 'B2B-комплекты для отелей, больниц и общежитий.', '0%', '50%'],
  ['ПОСТЕЛЬНЫЕ ПРИНАДЛЕЖНОСТИ', 'Матрасы (в т.ч. влагонепроницаемые/медицинские), подушки, одеяла, наматрасники, покрывала.', '50%', '50%'],
  ['КОРПОРАТИВНАЯ ОДЕЖДА', 'Форма для поваров, официантов, клининга, администраторов и промо-персонала.', '100%', '50%'],
  ['ОДЕЖДА ДЛЯ ОХРАННЫХ СТРУКТУР', 'Форменные костюмы, камуфляж, разгрузочные жилеты, сорочки.', '0%', '100%'],
  ['ТРИКОТАЖНЫЕ ИЗДЕЛИЯ', 'Футболки, поло, толстовки, термобелье и подшлемники собственного пошива.', '50%', '100%'],
  ['МАХРОВЫЙ ТЕКСТИЛЬ', 'Махровые и вафельные полотенца, скатерти, салфетки, поварские кители.', '100%', '100%'],
];

const standards = [
  ['▥', '6 000', 'комп/мес', 'Мощность швейных цехов с автоматизацией процессов.'],
  ['⌁', 'RFID', 'трекинг', 'Чипирование каждого изделия для учета стирок и прослеживаемости'],
  ['♢', 'ГОСТ и ТР ТС', '019/2011', 'Сохранение защитных свойств после 5+ циклов промышленной стирки.'],
  ['⌗', 'CAD/CAM', 'Раскрой', 'Автоматизированный компьютерный раскрой без погрешностей.'],
];

const steps = [
  ['01', 'ТЗ и Конструирование', 'Разработка конструкторской документации или пошив по вашим образцам.'],
  ['02', 'Тестовый образец', 'Пошив тестового образца и согласование материалов.'],
  ['03', 'Серия и RFID', 'Автоматизированный раскрой, пошив партии и маркировка.'],
  ['04', 'ОТК и Доставка', '100% контроль качества, упаковка и отгрузка по Казахстану.'],
];

function Logo() {
  return <a className="logo" href="#home" aria-label="Tamgar"><img src="/assets/золотой лого.png" alt="Tamgar" /></a>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <Logo />
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
          <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
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
        <div className="container hero-content">
          <p className="eyebrow">TAMGAR · ПРОИЗВОДСТВО В КАЗАХСТАНЕ</p>
          <h1>ЗАЩИТНАЯ СПЕЦОДЕЖДА<br />И B2B-ТЕКСТИЛЬ ПОЛНОГО ЦИКЛА</h1>
          <p className="hero-copy">Серийное производство до 6 000 комплектов в месяц.<br className="desktop-only" /> Внедренный сквозной RFID-контроль качества и соответствие ТР ТС 019/2011.</p>
          <a className="button button-orange" href="#contacts">СКАЧАТЬ КАТАЛОГ ПРОДУКЦИИ <ArrowIcon /></a>
        </div>
        <a href="#about" className="scroll-cue" aria-label="К стандартам производства">↓</a>
      </section>

      <section className="standards section-light" id="about">
        <div className="container">
          <p className="section-kicker">ВОЗМОЖНОСТИ TAMGAR</p>
          <h2>СТАНДАРТЫ И ЦИФРЫ ПРОИЗВОДСТВА</h2>
          <div className="standards-grid">
            {standards.map(([icon, title, sub, text]) => <article className="standard-card" key={title}>
              <div className="standard-icon">{icon}</div><strong>{title}</strong><b>{sub}</b><p>{text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="products section-white" id="products">
        <div className="container">
          <p className="section-kicker">НАПРАВЛЕНИЕ ПРОИЗВОДСТВА</p>
          <h2>ПРОДУКЦИЯ ПОД ЗАДАЧИ<br className="desktop-only" /> ВАШЕГО БИЗНЕСА</h2>
          <div className="product-grid">
            {products.map(([title, description, x, y], index) => <article
              className={activeProduct === index ? 'product-card is-active' : 'product-card'}
              key={title}
              onClick={() => setActiveProduct(activeProduct === index ? null : index)}
            >
              <div className="product-image" role="img" aria-label={title} style={{ backgroundPosition: `${x} ${y}` }} />
              <div className="product-overlay" />
              <div className="product-content"><h3>{title}</h3><p>{description}</p><a href="#contacts" onClick={closeMenu}>ЗАПРОСИТЬ ОТЧЁТ <ArrowIcon /></a></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="container">
          <p className="section-kicker">ПРОЗРАЧНЫЙ ПРОЦЕСС</p>
          <h2>ЭТАПЫ РАБОТЫ С B2B-ЗАКАЗАМИ</h2>
          <p className="process-intro">От первого обращения до отгрузки готовой маркированной партии по всему Казахстану.</p>
          <div className="steps-grid">{steps.map(([number, title, text], index) => <article className="step" key={number}>
            <span className="step-number">{number}</span><h3>{title}</h3><div className="step-line" /><p>{text}</p>{index < steps.length - 1 && <span className="step-arrow">→</span>}
          </article>)}</div>
        </div>
      </section>

      <section className="contacts section-light" id="contacts">
        <div className="container contacts-grid">
          <div className="contact-info"><p className="section-kicker">КОНТАКТЫ И РЕКВИЗИТЫ</p><h2>ОБСУДИТЬ ПОСТАВКУ<br />ИЛИ РАЗРАБОТКУ</h2><h3>Отдел продаж:</h3><a className="phone" href="tel:+77755555222">+7 (775) 555-5222</a><small>Пн–Пт, с 09:00 до 18:00 (Астана)</small><a className="email" href="mailto:info@tamgar.kz">info@tamgar.kz</a><p className="muted-label">Адрес производства:</p><p>Республика Казахстан, г. Астана</p><p className="muted-label">Юридические данные:</p><p>ТОО «Tamgar» — Зарегистрированный отечественный товаропроизводитель РК.</p></div>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}><h2>ФОРМА ЗАЯВКИ</h2><label><span>Ваше имя или название компании:</span><input name="company" placeholder="Ваше имя или название компании:" /></label><label><span>Телефон для связи:</span><input name="phone" placeholder="Телефон для связи:" /></label><label><span>Что вас интересует:</span><textarea name="interest" placeholder="Что вас интересует:" rows="3" /></label><button className="button button-orange" type="submit">ОТПРАВИТЬ ЗАЯВКУ <ArrowIcon /></button></form>
        </div>
      </section>

      <footer className="footer"><div className="container footer-wrap"><p>© 2026 ТОО «Tamgar». Все права защищены.</p><Logo /><p><a href="#contacts">Политика конфиденциальности</a> <span>|</span> <a href="#contacts">Разработка лекал и ТЗ</a></p></div></footer>
    </main>
  );
}
