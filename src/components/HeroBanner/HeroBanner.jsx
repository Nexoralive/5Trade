import React, { useState, useEffect } from 'react';
import styles from './HeroBanner.module.css';
import { CheckCircle2 } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Trade in Indian & Global Markets from One Powerful App',
    subtitle: 'Indian F&O, Comex, Forex, US Stocks and Crypto.',
    cta: 'Start Trading',
    ctaLink: 'https://app.5trade.live/register'
  },
  {
    id: 2,
    points: [
      'Advanced Indian Options Chain – Stocks, Commodities & Indices',
      'Up to 500x Leverage',
      'Zero Brokerage'
    ],
    cta: 'Open Account',
    ctaLink: 'https://app.5trade.live/register'
  }
];

const extendedSlides = [...slides, { ...slides[0], id: 'clone-0' }];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // Prevent incrementing when tab is in background to avoid breaking transition sync
      if (document.hidden) return;
      
      setIsTransitioning(true);
      setCurrentSlide((prev) => {
        if (prev >= slides.length) return 0; // Failsafe boundary check
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (currentSlide >= slides.length) {
      setIsTransitioning(false);
      setCurrentSlide(0);
    }
  };

  return (
    <div className={styles.heroBanner}>
      <div 
        className={styles.slidesContainer} 
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, index) => (
          <div key={slide.id} className={styles.slide}>
            <div className={styles.slideContent}>
              {slide.title && <h2 className={styles.title}>{slide.title}</h2>}
              {slide.subtitle && <p className={styles.subtitle}>{slide.subtitle}</p>}
              
              {slide.points && (
                <div className={styles.pointsWrapper}>
                  <ul className={styles.pointsList}>
                    {slide.points.map((point, idx) => (
                      <li key={idx} className={styles.pointItem}>
                        <CheckCircle2 className={styles.checkIcon} size={20} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a href={slide.ctaLink} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
                {slide.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`${styles.dot} ${index === (currentSlide % slides.length) ? styles.activeDot : ''}`}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
