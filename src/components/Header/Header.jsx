import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={logo} alt="5Trade Logo" className={styles.logoImg} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <a href="#home" className={styles.navLink}>Home</a>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#blog" className={styles.navLink}>Blog</a>
          <a href="#support" className={styles.navLink}>Support</a>
        </nav>

        <div className={styles.right}>
          {/* Desktop Auth Buttons */}
          <div className={styles.desktopAuth}>
            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => window.location.href = 'https://web.5trade.live/login'}>Sign In</button>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => window.location.href = 'https://app.5trade.live/register'}>Create Account</button>
          </div>

          {/* Mobile Create Account Button */}
          <button className={`${styles.btn} ${styles.btnPrimary} ${styles.mobileCreateAccountBtn}`} onClick={() => window.location.href = 'https://app.5trade.live/register'}>Create Account</button>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <a href="#home" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#blog" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
          <a href="#support" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Support</a>
          
          <div className={styles.mobileAuthContainer}>
            <button className={`${styles.btn} ${styles.btnOutline} ${styles.mobileBtn}`} onClick={() => { setIsMobileMenuOpen(false); window.location.href = 'https://web.5trade.live/login'; }}>Sign In</button>
            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.mobileBtn}`} onClick={() => { setIsMobileMenuOpen(false); window.location.href = 'https://app.5trade.live/register'; }}>Create Account</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
