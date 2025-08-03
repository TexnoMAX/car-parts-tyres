import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TireCard from './components/TireCard';
import type { Tire, Company } from './types';
import './App.css';

function App() {
  const [tires, setTires] = useState<Tire[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTire, setSelectedTire] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    fetchTires();
    fetchCompanyInfo();
  }, []);

  const fetchTires = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tires');
      if (response.ok) {
        const data = await response.json();
        setTires(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки шин:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/company');
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки информации о компании:', error);
    }
  };

  const handleContact = (tireId: number) => {
    setSelectedTire(tireId);
    setShowContactForm(true);
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          tireId: selectedTire
        })
      });

      if (response.ok) {
        alert('Сообщение отправлено успешно!');
        setContactForm({ name: '', phone: '', email: '', message: '' });
        setShowContactForm(false);
        setSelectedTire(null);
      } else {
        alert('Ошибка отправки сообщения');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка отправки сообщения');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Добро пожаловать в Авто-Гриша!</h1>
            <p>Качественные б/у шины по доступным ценам. Большой выбор, проверенное качество, гарантия на все товары.</p>
            <a href="#catalog" className="cta-button">Посмотреть каталог</a>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="catalog">
        <div className="container">
          <h2>Каталог шин</h2>
          {tires.length > 0 ? (
            <div className="tires-grid">
              {tires.map(tire => (
                <TireCard
                  key={tire.id}
                  tire={tire}
                  onContact={handleContact}
                />
              ))}
            </div>
          ) : (
            <p>Шины не найдены</p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>О нас</h2>
          {company && (
            <div className="about-content">
              <div className="about-text">
                <h3>{company.name}</h3>
                <p>{company.description}</p>
                <h4>Наши услуги:</h4>
                <ul>
                  {company.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className="about-info">
                <div className="info-card">
                  <h4>📞 Контакты</h4>
                  <p>{company.phone}</p>
                  <p>{company.email}</p>
                </div>
                <div className="info-card">
                  <h4>📍 Адрес</h4>
                  <p>{company.address}</p>
                </div>
                <div className="info-card">
                  <h4>🕒 Время работы</h4>
                  <p>{company.workingHours}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Связаться с нами</h2>
          <button 
            className="contact-button"
            onClick={() => setShowContactForm(true)}
          >
            Написать нам
          </button>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="modal-overlay" onClick={() => setShowContactForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Связаться с нами</h3>
            {selectedTire && (
              <p>Интересует шина #{selectedTire}</p>
            )}
            <form onSubmit={handleSubmitContact}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={contactForm.name}
                onChange={e => setContactForm({...contactForm, name: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={contactForm.phone}
                onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={e => setContactForm({...contactForm, email: e.target.value})}
                required
              />
              <textarea
                placeholder="Сообщение"
                value={contactForm.message}
                onChange={e => setContactForm({...contactForm, message: e.target.value})}
                required
                rows={4}
              />
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowContactForm(false)}>
                  Отмена
                </button>
                <button type="submit">Отправить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

export default App
