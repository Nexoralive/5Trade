import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQS = [
  {
    q: 'What is a high-leverage trading platform?',
    a: 'A high-leverage trading platform allows traders to control large positions with a smaller capital investment. 5Trade offers leverage up to 500x, enabling greater exposure with less upfront cost.',
  },
  {
    q: 'Is customer support available 24/7?',
    a: 'Yes, 5Trade\'s customer support is available 24/7, including weekends and holidays. You can reach us anytime via live chat, email, or WhatsApp.',
  },
  {
    q: 'Can I deposit and withdraw funds at any time?',
    a: 'Yes, 5Trade supports 24/7 deposits and withdrawals, so you can access your funds or add capital whenever you need.',
  },
  {
    q: 'How fast are the withdrawals processed?',
    a: '5Trade provides some of the fastest withdrawal speeds in the industry. Most requests are processed within minutes, depending on the payment method and verification status.',
  },
  {
    q: 'Are there any annual maintenance charges (AMC)?',
    a: 'No, there are no annual maintenance charges or hidden fees on 5Trade. You can maintain your account at zero cost.',
  },
  {
    q: 'What does \'Zero Brokerage\' mean?',
    a: 'Zero brokerage means you pay no commission on trades, allowing you to trade more often and keep more of your profits.',
  },
  {
    q: 'What is the liquidation point for a trade?',
    a: 'Your position will be automatically liquidated when your capital incurs a 70% loss, helping to minimize further losses in volatile market conditions.',
  },
  {
    q: 'What is Negative Balance Protection (NBP)?',
    a: '5Trade offers Negative Balance Protection — if your account balance drops below zero due to extreme market moves, we will automatically reset it to zero. You\'ll never owe more than your deposited amount.',
  },
  {
    q: 'What payment methods are supported?',
    a: '5Trade supports UPI, bank transfers, IMPS, and crypto wallets — all available 24/7 for deposits and withdrawals.',
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
