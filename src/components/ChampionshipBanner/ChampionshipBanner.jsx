import React from 'react';
import styles from './ChampionshipBanner.module.css';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ChampionshipBanner = () => {
  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.bannerContainer}>
        <button className={styles.navButton} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        
        <div className={styles.content}>
          <div className={styles.tickerContainer}>
            <div className={styles.tickerText}>
              <span>MARKET Intraday Championship — ₹2,00,000 Prize Pool</span>
              <span className={styles.divider}>•</span>
              <span>Register Now & Start Trading</span>
              <span className={styles.divider}>•</span>
            </div>
          </div>
        </div>

        <button className={styles.navButton} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChampionshipBanner;
