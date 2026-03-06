import React, { useState } from 'react';
import styles from './AccountCTA.module.css';

const AccountCTA = () => {
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      window.open(`https://app.5trade.live/register?mobile=${mobile}`, '_blank');
    }
  };

  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContainer}>
          <div className={styles.textContent}>
            <h2 className={styles.heading}>
              Open Your Free Trading Account in <span className={styles.highlight}>1 Minute.</span>
            </h2>
          </div>
          
          <form className={styles.formContent} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <span className={styles.prefix}>+91</span>
              <input 
                type="tel" 
                placeholder="Enter your mobile number" 
                className={styles.input}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Open Free Account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountCTA;
