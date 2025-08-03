import React from 'react';
import type { Tire } from '../types';
import './TireCard.css';

interface TireCardProps {
  tire: Tire;
  onContact: (tireId: number) => void;
}

const TireCard: React.FC<TireCardProps> = ({ tire, onContact }) => {
  return (
    <div className="tire-card">
      <div className="tire-image">
        {tire.images.length > 0 ? (
          <img src={tire.images[0]} alt={`${tire.brand} ${tire.model}`} />
        ) : (
          <div className="no-image">🚗 Фото отсутствует</div>
        )}
      </div>
      
      <div className="tire-info">
        <h3>{tire.brand} {tire.model}</h3>
        <div className="tire-details">
          <p><strong>Размер:</strong> {tire.size}</p>
          <p><strong>Сезон:</strong> {tire.season}</p>
          <p><strong>Остаток протектора:</strong> {tire.treadDepth}</p>
          <p><strong>Количество:</strong> {tire.quantity} шт.</p>
        </div>
        
        <p className="tire-description">{tire.description}</p>
        
        <div className="tire-footer">
          <div className="tire-price">
            <strong>{tire.price.toLocaleString('ru-RU')} ₽</strong>
          </div>
          <button 
            className="contact-btn"
            onClick={() => onContact(tire.id)}
          >
            Связаться
          </button>
        </div>
      </div>
    </div>
  );
};

export default TireCard;
