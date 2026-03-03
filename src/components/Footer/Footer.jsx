import React, { useState } from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/logo.png';

const IMPORTANT_LINKS = [
  { label: 'SEBI', href: 'https://www.sebi.gov.in' },
  { label: 'NSE', href: 'https://www.nseindia.com' },
  { label: 'BSE', href: 'https://www.bseindia.com' },
];

const DISCLAIMERS = [
  `5Trade Securities Private Limited is carrying out the business in respect to stock broking activities and also carries out the activities of depository participant. SEBI Registration No. INZ000305337 | SEBI Depository Participant Registration No. IN-DP-690-2022 | Depository Participant ID: CDSL 12095500 | Trading and Clearing Member of NSE (90267, M70042), BSE (6779) | AMFI Registration No: ARN-254564 | Registered Office - 5Trade Tower, Sector 65, Gurugram, Haryana-122005 | Compliance Officer: Contact No: 07314852049. This account would be opened after all procedures relating to IPV and client due diligence are completed.`,
  `Investment in the securities market is subject to market risks, read all the related documents carefully before investing. Brokerage will not exceed the SEBI prescribed limit.`,
  `Mutual Fund investments are subject to market risks, read all scheme related documents carefully before investing. 5Trade Securities Private Limited is merely acting as a distributor of Mutual Funds and all disputes with respect to the distribution activity, would not have access to Exchange investor redressal forum or Exchange Arbitration mechanism.`,
  `Past performance is not indicative of future returns. Please consider your specific investment requirements, risk tolerance, goal, time frame, risk and reward balance and the cost associated with the investment before choosing a fund, or designing a portfolio that suits your needs. Performance and returns of any investment portfolio can neither be predicted nor guaranteed. The securities quoted are for illustration only and are not recommendatory.`,
  `Marketing and distribution of various financial products such as loans, deposits and insurance are powered by 5Trade Financial Services Private Limited. 5Trade makes no warranties or representations, express or implied, on products and services offered through the platform. It accepts no liability for any damages or losses, however, caused in connection with the use of, or on the reliance of its advisory or related services.`,
  `Investment in securities market are subject to market risks, read all the related documents carefully before investing. Brokerage will not exceed the SEBI prescribed limit.`,
];

const Footer = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>

        {/* ── Top row: logo + links ── */}
        <div className={styles.topRow}>
          <img src={logo} alt="5Trade" className={styles.logoImg} />
          <div className={styles.importantLinks}>
            <span className={styles.linksLabel}>Important Links:</span>
            {IMPORTANT_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.regLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        {/* ── About 5Trade ── */}
        <div className={styles.aboutSection}>
          <h4 className={styles.aboutTitle}>About 5Trade</h4>
          <p className={styles.aboutText}>
            5Trade is India's all-in-one investment platform where you can invest in US Stocks,
            Indian Stocks, Mutual Funds, IPOs, ETFs, F&amp;O, NPS, and Fixed Deposits. We are
            committed to making wealth creation simple, transparent, and accessible for every Indian investor.
          </p>
        </div>

        <div className={styles.divider} />

        {/* ── Legal Disclaimers ── */}
        <div className={styles.legalSection}>
          <h4 className={styles.legalTitle}>Regulatory &amp; Legal Disclosures</h4>
          <div className={`${styles.disclaimers} ${expanded ? styles.expanded : ''}`}>
            {DISCLAIMERS.map((text, i) => (
              <p key={i} className={styles.disclaimer}>{text}</p>
            ))}
          </div>
          <button
            className={styles.readMoreBtn}
            onClick={() => setExpanded(v => !v)}
          >
            {expanded ? '▲ Show Less' : '▼ Read Full Disclosure'}
          </button>
        </div>

        <div className={styles.divider} />

        {/* ── Bottom bar ── */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2025 5Trade Securities Pvt. Ltd. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Grievance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
