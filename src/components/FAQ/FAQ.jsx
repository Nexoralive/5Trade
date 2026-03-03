import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQS = [
  {
    q: 'Is 5Trade safe and SEBI regulated?',
    a: '5Trade Securities Pvt. Ltd. is registered with SEBI (INZ000305337) and is a member of NSE & BSE. Your investments are held in your own DEMAT account with CDSL — fully secure and protected.',
  },
  {
    q: 'How do I open a 5Trade account?',
    a: 'Opening an account takes under 5 minutes. Download the app, enter your mobile number, complete video KYC, and link your bank account. No branch visit, no paperwork.',
  },
  {
    q: 'What can I invest in on 5Trade?',
    a: 'US Stocks, Indian Stocks, Mutual Funds, ETFs, IPOs, F&O, Fixed Deposits, and NPS — all from one single app.',
  },
  {
    q: 'Are there any hidden charges?',
    a: 'No hidden charges. Equity delivery trades are ₹0 brokerage. Intraday and F&O trades have a flat fee of ₹20 per executed order. Full fee schedule is on our website.',
  },
  {
    q: 'How do I withdraw my money?',
    a: 'Withdrawals go directly to your linked bank account. Equity sale proceeds are available within T+1. Mutual fund redemptions settle in 1–3 business days.',
  },
  {
    q: 'Can I track my whole family\'s portfolio?',
    a: 'Yes. 5Trade supports family account management — add investments for multiple family members and view everyone\'s net worth in one place, with full privacy controls.',
  },
];

const ChevronSVG = ({ className }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.item}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <button className={styles.question} onClick={() => setOpen(v => !v)}>
        {/* Question — black default, red when open */}
        <span className={`${styles.qText} ${open ? styles.qOpen : ''}`}>
          {item.q}
        </span>
        {/* Chevron circle — turns red when open */}
        <span className={`${styles.chevronWrap} ${open ? styles.chevronOpen : ''}`}>
          <ChevronSVG
            className={`${styles.chevronIcon} ${open ? styles.chevronRotated : ''}`}
          />
        </span>
      </button>

      {/* Answer — smooth CSS grid expand */}
      <div className={`${styles.answerWrap} ${open ? styles.answerOpen : ''}`}>
        <div className={styles.answerInner}>
          <p className={styles.answer}>{item.a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => (
  <section className={styles.section}>
    <div className="container">
      <p className={styles.eyebrow}>HELP &amp; SUPPORT</p>
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      <p className={styles.sub}>Everything you need to know before you start investing</p>
      <div className={styles.list}>
        {FAQS.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
