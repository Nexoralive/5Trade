import React, { useState, useEffect, useRef } from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/logo.png';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: 'https://app.5trade.live/about' },
  { label: 'Blogs', href: 'https://app.5trade.live/blogs' },
  { label: 'Contact', href: 'https://app.5trade.live/contact' },
];

const MARKETS = [
  { label: 'Indian F&O', href: 'https://app.5trade.live/register' },
  { label: 'Indian Commodity F&O', href: 'https://app.5trade.live/register' },
  { label: 'Forex', href: 'https://app.5trade.live/register' },
  { label: 'Comex', href: 'https://app.5trade.live/register' },
  { label: 'US Stocks', href: 'https://app.5trade.live/register' },
  { label: 'Crypto', href: 'https://app.5trade.live/register' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: 'https://app.5trade.live/privacy-policy' },
  { label: 'Terms & Conditions', href: 'https://app.5trade.live/terms' },
];

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61587737751953',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCpuXUZn1x62H2Dq-cMHb9DQ',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/5_trade/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
];

const RISK_STATEMENT = `An investment in derivatives may mean investors may lose an amount even greater than their original investment. Anyone willing to invest in any of the investment products mentioned should be advised to invest only after thoroughly understanding and examining the characteristics, trading mechanics, and risks. Stock market, commodities, options and futures may not be suitable for everyone and involves the risk of losing part or all of your money. Trading in the financial markets has large potential rewards, but also large potential risk. You must be aware of the risks and be willing to accept them in order to invest in the markets. Don't invest and trade with money which you can't afford to lose.

You are strongly advised to obtain independent financial, legal and tax advice before proceeding with any currency or spot metals trade. Nothing in this site should be read or construed as constituting advice on the part of 5Trade or any of its affiliates, directors, officers or employees.

Restricted Regions: 5Trade does not provide services for citizens/residents of the United States, Cuba, Iraq, Myanmar, North Korea, Sudan. The services of 5Trade are not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.`;

const Footer = () => {
  const [expanded, setExpanded] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowTop(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer} ref={footerRef}>
      <button
        className={`${styles.goTopBtn} ${showTop ? styles.goTopVisible : ''}`}
        onClick={scrollToTop}
        aria-label="Go to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
      <div className={`container ${styles.container}`}>

        {/* ── Top: Logo + Social + Description ── */}
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <img src={logo} alt="5Trade" className={styles.logoImg} />
            <p className={styles.brandDesc}>
              5Trade is a finance app designed to help you manage your investments and trade across global markets with ease.
            </p>
            <div className={styles.socials}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map(l => (
                <li key={l.label}><a href={l.href} className={styles.footLink}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* ── Markets ── */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Markets</h4>
            <ul className={styles.linkList}>
              {MARKETS.map(l => (
                <li key={l.label}><a href={l.href} className={styles.footLink}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* ── Legal ── */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Legal</h4>
            <ul className={styles.linkList}>
              {LEGAL.map(l => (
                <li key={l.label}><a href={l.href} className={styles.footLink}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.divider} />

        {/* ── Risk Statement ── */}
        <div className={styles.riskSection}>
          <h4 className={styles.riskTitle}>Risk Statement</h4>
          <div className={`${styles.riskText} ${expanded ? styles.expanded : ''}`}>
            {RISK_STATEMENT.split('\n\n').map((para, i) => (
              <p key={i} className={styles.riskPara}>{para}</p>
            ))}
          </div>
          <button className={styles.readMoreBtn} onClick={() => setExpanded(v => !v)}>
            {expanded ? '▲ Show Less' : '▼ Read Full Disclaimer'}
          </button>
        </div>

        <div className={styles.divider} />

        {/* ── Bottom bar ── */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2025 5TRADE. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
