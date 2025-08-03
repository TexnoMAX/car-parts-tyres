import React, { useState, useEffect } from 'react';
import './TestimonialsCarousel.css';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

interface TestimonialsCarouselProps {
  language: 'nl' | 'en' | 'ru';
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [cardWidth, setCardWidth] = useState(295);

  const testimonials: Record<string, Testimonial[]> = {
    nl: [
      { id: 1, name: "Jan van der Berg", location: "Amsterdam", text: "Uitstekende service! Kreeg dezelfde dag nog nieuwe banden voor mijn auto. Kwaliteit is top en prijs zeer redelijk.", rating: 5, avatar: "👨" },
      { id: 2, name: "Maria Hendriks", location: "Utrecht", text: "Zeer tevreden met de professionele aanpak. De banden zijn van goede kwaliteit en de montage was perfect.", rating: 5, avatar: "👩" },
      { id: 3, name: "Pieter de Vries", location: "Rotterdam", text: "Snelle levering en eerlijke prijzen. De medewerkers zijn zeer vriendelijk en behulpzaam.", rating: 5, avatar: "👨‍🦳" },
      { id: 4, name: "Saskia Jansen", location: "Den Haag", text: "Perfect! Mijn auto rijdt weer als nieuw. Dank je wel voor de uitstekende service!", rating: 5, avatar: "👩‍🦰" },
      { id: 5, name: "Erik Bakker", location: "Eindhoven", text: "Zeer professioneel bedrijf. Goede kwaliteit banden tegen scherpe prijzen. Zeker een aanrader!", rating: 5, avatar: "👨‍💼" },
      { id: 6, name: "Linda van Dijk", location: "Tilburg", text: "Fantastische service! Ze hebben perfect advies gegeven en de banden zijn van uitstekende kwaliteit.", rating: 5, avatar: "👩‍💻" },
      { id: 7, name: "Robert Mulder", location: "Groningen", text: "Heel tevreden klant! Snelle service, goede prijzen en betrouwbare kwaliteit.", rating: 5, avatar: "👨‍🔧" },
      { id: 8, name: "Anouk Peters", location: "Breda", text: "Top service! De banden zijn perfect gemonteerd en de prijs was zeer competitief.", rating: 5, avatar: "👩‍🎨" },
      { id: 9, name: "Marco Visser", location: "Nijmegen", text: "Uitstekende ervaring! Vriendelijk personeel en vakkundige uitvoering van het werk.", rating: 5, avatar: "👨‍🏫" },
      { id: 10, name: "Sophie de Jong", location: "Apeldoorn", text: "Heel blij met de service. Snel, betrouwbaar en eerlijke prijzen. Kom zeker terug!", rating: 5, avatar: "👩‍⚕️" },
      { id: 11, name: "Tom Willems", location: "Haarlem", text: "Geweldige service! De banden zijn van top kwaliteit en perfect gemonteerd.", rating: 5, avatar: "👨‍🚀" },
      { id: 12, name: "Emma van Leeuwen", location: "Zwolle", text: "Zeer professioneel en betrouwbaar. De beste keuze voor kwaliteitsbanden!", rating: 5, avatar: "👩‍🔬" }
    ],
    en: [
      { id: 1, name: "John Smith", location: "London", text: "Excellent service! Got new tires for my car the same day. Quality is top-notch and price very reasonable.", rating: 5, avatar: "👨" },
      { id: 2, name: "Sarah Johnson", location: "Manchester", text: "Very satisfied with the professional approach. The tires are of good quality and installation was perfect.", rating: 5, avatar: "👩" },
      { id: 3, name: "Peter Wilson", location: "Birmingham", text: "Fast delivery and honest prices. The staff are very friendly and helpful.", rating: 5, avatar: "👨‍🦳" },
      { id: 4, name: "Emma Davis", location: "Liverpool", text: "Perfect! My car drives like new again. Thank you for the excellent service!", rating: 5, avatar: "👩‍🦰" },
      { id: 5, name: "Michael Brown", location: "Leeds", text: "Very professional company. Good quality tires at competitive prices. Definitely recommended!", rating: 5, avatar: "👨‍💼" },
      { id: 6, name: "Lisa Taylor", location: "Sheffield", text: "Fantastic service! They gave perfect advice and the tires are of excellent quality.", rating: 5, avatar: "👩‍💻" },
      { id: 7, name: "Robert Miller", location: "Bristol", text: "Very satisfied customer! Quick service, good prices and reliable quality.", rating: 5, avatar: "👨‍🔧" },
      { id: 8, name: "Anna Wilson", location: "Newcastle", text: "Top service! The tires are perfectly installed and the price was very competitive.", rating: 5, avatar: "👩‍🎨" },
      { id: 9, name: "Mark Anderson", location: "Nottingham", text: "Excellent experience! Friendly staff and professional execution of work.", rating: 5, avatar: "👨‍🏫" },
      { id: 10, name: "Sophie Clark", location: "Brighton", text: "Very happy with the service. Fast, reliable and honest prices. Will definitely come back!", rating: 5, avatar: "👩‍⚕️" },
      { id: 11, name: "Tom Williams", location: "Cambridge", text: "Great service! The tires are top quality and perfectly installed.", rating: 5, avatar: "👨‍🚀" },
      { id: 12, name: "Grace Thompson", location: "Oxford", text: "Very professional and reliable. The best choice for quality tires!", rating: 5, avatar: "👩‍🔬" }
    ],
    ru: [
      { id: 1, name: "Алексей Иванов", location: "Москва", text: "Отличный сервис! Получил новые шины для своего автомобиля в тот же день. Качество на высоте, а цена очень разумная.", rating: 5, avatar: "👨" },
      { id: 2, name: "Мария Петрова", location: "Санкт-Петербург", text: "Очень доволен профессиональным подходом. Шины хорошего качества, установка была идеальной.", rating: 5, avatar: "👩" },
      { id: 3, name: "Петр Сидоров", location: "Новосибирск", text: "Быстрая доставка и честные цены. Сотрудники очень дружелюбны и готовы помочь.", rating: 5, avatar: "👨‍🦳" },
      { id: 4, name: "Елена Козлова", location: "Екатеринбург", text: "Идеально! Моя машина снова ездит как новая. Спасибо за отличный сервис!", rating: 5, avatar: "👩‍🦰" },
      { id: 5, name: "Михаил Новиков", location: "Нижний Новгород", text: "Очень профессиональная компания. Качественные шины по конкурентным ценам. Определенно рекомендую!", rating: 5, avatar: "👨‍💼" },
      { id: 6, name: "Анна Волкова", location: "Казань", text: "Фантастический сервис! Дали идеальный совет, шины отличного качества.", rating: 5, avatar: "👩‍💻" },
      { id: 7, name: "Роберт Смирнов", location: "Самара", text: "Очень довольный клиент! Быстрый сервис, хорошие цены и надежное качество.", rating: 5, avatar: "👨‍🔧" },
      { id: 8, name: "Ольга Морозова", location: "Омск", text: "Отличный сервис! Шины установлены идеально, цена была очень конкурентной.", rating: 5, avatar: "👩‍🎨" },
      { id: 9, name: "Максим Лебедев", location: "Ростов-на-Дону", text: "Отличный опыт! Дружелюбный персонал и профессиональное выполнение работы.", rating: 5, avatar: "👨‍🏫" },
      { id: 10, name: "София Зайцева", location: "Уфа", text: "Очень доволен сервисом. Быстро, надежно и честные цены. Обязательно вернусь!", rating: 5, avatar: "👩‍⚕️" },
      { id: 11, name: "Томас Орлов", location: "Красноярск", text: "Отличный сервис! Шины высокого качества и идеально установлены.", rating: 5, avatar: "👨‍🚀" },
      { id: 12, name: "Грация Соколова", location: "Воронеж", text: "Очень профессионально и надежно. Лучший выбор для качественных шин!", rating: 5, avatar: "👩‍🔬" }
    ]
  };

  const currentTestimonials = testimonials[language];
  const maxIndex = Math.max(0, currentTestimonials.length - visibleCount);

  const sectionTitles = {
    nl: "Wat onze klanten zeggen",
    en: "What our customers say",
    ru: "Что говорят наши клиенты"
  };

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 640) {
        setVisibleCount(1);
        setCardWidth(235);
      } else if (window.innerWidth <= 968) {
        setVisibleCount(2);
        setCardWidth(255);
      } else if (window.innerWidth <= 1280) {
        setVisibleCount(3);
        setCardWidth(275);
      } else {
        setVisibleCount(4);
        setCardWidth(295);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Reset current index when visible count changes to prevent out of bounds
  useEffect(() => {
    const newMaxIndex = Math.max(0, currentTestimonials.length - visibleCount);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(0);
    }
  }, [visibleCount, currentTestimonials.length, currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex > maxIndex ? 0 : nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [maxIndex, isAutoPlaying, visibleCount]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? maxIndex : nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">{sectionTitles[language]}</h2>
        
        <div 
          className="testimonials-carousel"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <button className="carousel-nav prev" onClick={prevSlide}>
            &#8249;
          </button>
          
          <div className="carousel-wrapper">
            <div 
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
              }}
            >
              {currentTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      {testimonial.avatar}
                    </div>
                    <div className="testimonial-info">
                      <h4 className="testimonial-name">{testimonial.name}</h4>
                      <p className="testimonial-location">{testimonial.location}</p>
                    </div>
                    <div className="testimonial-rating">
                      {'★'.repeat(testimonial.rating)}
                    </div>
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button className="carousel-nav next" onClick={nextSlide}>
            &#8250;
          </button>
        </div>
        
        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
