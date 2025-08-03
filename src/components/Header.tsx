import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>🚗 Авто-Гриша</h1>
            <p>Качественные б/у шины</p>
          </div>
          <nav className="nav">
            <a href="#home">Главная</a>
            <a href="#catalog">Каталог</a>
            <a href="#about">О нас</a>
            <a href="#contact">Контакты</a>
          </nav>
          <div className="header-contact">
            <p>📞 +7 (xxx) xxx-xx-xx</p>
            <p>🕒 Пн-Пт: 9:00-18:00</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
