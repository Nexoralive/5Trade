import React from 'react';
import styles from './Header.module.css';
import { User } from 'lucide-react';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={logo} alt="5Stocks Logo" className={styles.logoImg} />
          </div>
        </div>

        <div className={styles.right}>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => window.open('https://app.5trade.live/register', '_blank')}>Deposit</button>
          <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => window.open('https://app.5trade.live/register', '_blank')}>
            <span className={styles.btnTextDesktop}>Account</span>
            <User className={styles.btnIconMobile} size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
