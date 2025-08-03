import React, { useState } from 'react';
import { translations } from './locales/translations';
import './App.css';

type Language = 'nl' | 'en' | 'ru';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('nl');
  
  const t = translations[currentLang];

  const handleEmailClick = () => {
    window.location.href = `mailto:${t.contact.values.email}?subject=Inquiry about tires/parts`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${t.contact.values.phone}`;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Language Switcher */}
      <div className="language-switcher">
        <button 
          className={currentLang === 'nl' ? 'active' : ''} 
          onClick={() => setCurrentLang('nl')}
        >
          🇳🇱 NL
        </button>
        <button 
          className={currentLang === 'en' ? 'active' : ''} 
          onClick={() => setCurrentLang('en')}
        >
          🇬🇧 EN
        </button>
        <button 
          className={currentLang === 'ru' ? 'active' : ''} 
          onClick={() => setCurrentLang('ru')}
        >
          🇷🇺 RU
        </button>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <img src="/logo.png" alt="GS Car Parts & Tyres Logo" className="logo" />
              <div className="title-section">
                <h1>{t.title}</h1>
                <p>{t.subtitle}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="nav">
            <button onClick={() => scrollToSection('about')}>{t.nav.about}</button>
            <button onClick={() => scrollToSection('products')}>{t.nav.products}</button>
            <button onClick={() => scrollToSection('contact')}>{t.nav.contact}</button>
            <button onClick={() => scrollToSection('company')}>{t.nav.company}</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          
          {/* About Section */}
          <section id="about" className="section">
            <h2>{t.about.title}</h2>
            <p>{t.about.description}</p>
          </section>

          {/* Products Section */}
          <section id="products" className="section">
            <h2>{t.products.title}</h2>
            <ul className="products-list">
              {t.products.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* CTA Section */}
          <section className="cta">
            <p>{t.cta.text}</p>
            <button className="cta-button" onClick={handleEmailClick}>
              {t.cta.button}
            </button>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section contact-section">
            <h2>{t.contact.title}</h2>
            <div className="contact-info">
              <p><strong>{t.contact.name}:</strong> {t.contact.values.name}</p>
              <p><strong>{t.contact.address}:</strong> {t.contact.values.address}</p>
              <p>
                <strong>{t.contact.email}:</strong> 
                <a href={`mailto:${t.contact.values.email}`} className="contact-link">
                  {t.contact.values.email}
                </a>
              </p>
              <p>
                <strong>{t.contact.phone}:</strong> 
                <a href={`tel:${t.contact.values.phone}`} className="contact-link">
                  {t.contact.values.phone}
                </a>
              </p>
            </div>
            
            {/* Google Maps */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.6749799999996!2d4.869568!3d52.034444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c665a1d1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sWilleskop%20180%2C%203421%20GW%20Oudewater%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1640000000000!5m2!1sen!2snl"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GS Car Parts & Tyres Location"
              />
            </div>
          </section>

          {/* Company Details Section */}
          <section id="company" className="section company-section">
            <h2>{t.company.title}</h2>
            <div className="company-info">
              <p><strong>{t.company.bank}:</strong> {t.company.values.bank}</p>
              <p><strong>{t.company.iban}:</strong> {t.company.values.iban}</p>
              <p><strong>{t.company.swift}:</strong> {t.company.values.swift}</p>
              <p><strong>{t.company.btw}:</strong> {t.company.values.btw}</p>
              <p><strong>{t.company.kvk}:</strong> {t.company.values.kvk}</p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
