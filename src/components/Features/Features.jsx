import React from 'react';
import styles from './Features.module.css';

const FEATURES = [
  {
    num: '01',
    title: '500x Leverage',
    desc: 'Amplify your potential with maximum margin. Trade bigger positions with smart risk controls built in.',
    tag: 'POWER',
  },
  {
    num: '02',
    title: 'SEBI Regulated & Secure',
    desc: 'Bank-grade encryption, 2-factor auth, and full regulatory oversight under SEBI, NSE & BSE membership.',
    tag: 'TRUST',
  },
  {
    num: '03',
    title: 'Trade From Anywhere',
    desc: 'A lightning-fast mobile app designed for Indian investors. Real-time data, one-tap orders, zero lag.',
    tag: 'SPEED',
  },
  {
    num: '04',
    title: 'Affiliate & Referral Program',
    desc: 'Earn rewards every time someone you refer opens an account and trades. Your network = your income.',
    tag: 'EARN',
  },
  {
    num: '05',
    title: 'Zero Paperwork Onboarding',
    desc: 'Open a complete demat + trading account in under 5 minutes — 100% digital, no branch visit required.',
    tag: 'EASY',
  },
  {
    num: '06',
    title: 'Real-Time Market Data',
    desc: 'Live WebSocket price feeds across US stocks, Indian equities, forex, crypto and commodities — all in one place.',
    tag: 'LIVE',
  },
];

const Features = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>WHY 5TRADE</p>
          <h2 className={styles.title}>Built for the<br />Modern Investor</h2>
        </div>
        <p className={styles.subtitle}>
          Everything a serious investor needs —<br />
          speed, trust, depth, and simplicity.
        </p>
      </div>

      <div className={styles.grid}>
        {FEATURES.map((f, i) => (
          <div
            key={f.num}
            className={styles.card}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className={styles.cardTop}>
              <span className={styles.num}>{f.num}</span>
              <span className={styles.tag}>{f.tag}</span>
            </div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
            <div className={styles.cardLine} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
