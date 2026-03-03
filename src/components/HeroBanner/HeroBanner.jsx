import React, { useState, useEffect } from 'react';
import styles from './HeroBanner.module.css';

const slides = [
  {
    id: 1,
    title: 'Trade with 500x Leverage',
    subtitle: 'Maximize Your Potential',
    cta: 'Start Trading'
  },
  {
    id: 2,
    title: 'Join our Affiliate Program',
    subtitle: 'Earn while your network trades',
    cta: 'Learn More'
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.heroBanner}>
      <div 
        className={styles.slidesContainer} 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <div className={styles.slideContent}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <button className={styles.ctaButton}>{slide.cta}</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
