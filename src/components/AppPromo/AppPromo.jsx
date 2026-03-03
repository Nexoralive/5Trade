import React from 'react';
import styles from './AppPromo.module.css';

/* ── Clean SVG icon set — no emoji ── */
const Icons = {
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Apple: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18.5v-13A1.5 1.5 0 0 1 5.06 4.1l12.5 6.5a1.5 1.5 0 0 1 0 2.8l-12.5 6.5A1.5 1.5 0 0 1 3 18.5z"/>
    </svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
};

const INVEST_CATEGORIES = [
  {
    label: 'US Stocks',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    label: 'Indian Stocks',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Mutual Funds',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    label: 'F&O',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="20" rx="3"/><path d="M8 12h8M12 8v8"/>
      </svg>
    ),
  },
  {
    label: 'IPO',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
  },
  {
    label: 'ETFs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    label: 'NPS',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Fixed Deposit',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: 'Track All Investments',
    desc: 'One dashboard for stocks, MF, FDs — see everything at a glance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Track Your Net Worth',
    desc: 'Real-time net worth across all assets, savings and liabilities.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    title: 'Family Accounts',
    desc: 'Manage investments for your entire family under one login.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const AppPromo = () => (
  <section className={styles.section}>

    {/* ── 1. Rating Banner ── */}
    <div className={styles.ratingBanner}>
      <div className="container">
        <p className={styles.ratingEyebrow}>TOP RATED INVESTING APP</p>
        <h2 className={styles.ratingTitle}>India's Most Trusted<br />Investment Platform</h2>

        <div className={styles.ratingRow}>
          <div className={styles.ratingCard}>
            <div className={styles.stars}>{[...Array(5)].map((_, i) => <Icons.Star key={i} />)}</div>
            <div className={styles.ratingNum}>4.7</div>
            <div className={styles.ratingStore}><Icons.Apple /><span>App Store</span></div>
          </div>
          <div className={styles.ratingDivider} />
          <div className={styles.ratingCard}>
            <div className={styles.stars}>{[...Array(5)].map((_, i) => <Icons.Star key={i} />)}</div>
            <div className={styles.ratingNum}>4.6</div>
            <div className={styles.ratingStore}><Icons.Play /><span>Google Play</span></div>
          </div>
          <div className={styles.ratingDivider} />
          <div className={styles.ratingCard}>
            <div className={styles.statIcon}><Icons.Download /></div>
            <div className={styles.ratingNum}>2 Cr+</div>
            <div className={styles.ratingStore}><span>Downloads</span></div>
          </div>
          <div className={styles.ratingDivider} />
          <div className={styles.ratingCard}>
            <div className={styles.statIcon}><Icons.Users /></div>
            <div className={styles.ratingNum}>20 L+</div>
            <div className={styles.ratingStore}><span>Investors</span></div>
          </div>
        </div>
      </div>
    </div>

    {/* ── 2. Invest Categories ── */}
    <div className={styles.investSection}>
      <div className="container">
        <p className={styles.eyebrow}>ALL IN ONE PLATFORM</p>
        <h2 className={styles.sectionTitle}>Diversify and Invest Across</h2>
        <div className={styles.categoryGrid}>
          {INVEST_CATEGORIES.map(cat => (
            <div key={cat.label} className={styles.categoryCard}>
              <div className={styles.categoryIcon}>{cat.icon}</div>
              <span className={styles.categoryLabel}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── 3. Features ── */}
    <div className={styles.featuresSection}>
      <div className="container">
        <p className={styles.eyebrow}>WHY CHOOSE 5TRADE</p>
        <h2 className={styles.sectionTitle}>More Than an Investing App</h2>
        <p className={styles.sectionSub}>Your complete money operating system</p>
        <div className={styles.featureList}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={styles.featureItem}>
              <div className={styles.featureIconWrap}>{f.icon}</div>
              <div>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
              <div className={styles.featureArrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── 4. Download CTA ── */}
    <div className={styles.downloadSection}>
      <div className="container">
        <div className={styles.downloadInner}>
          <div>
            <p className={styles.downloadEyebrow}>GET STARTED FREE</p>
            <h2 className={styles.downloadTitle}>Download the 5Trade App</h2>
            <p className={styles.downloadSub}>Open your account in under 5 minutes</p>
          </div>
          <div className={styles.downloadBtns}>
            <a href="#" className={styles.storeBtn}>
              <Icons.Apple />
              <div>
                <div className={styles.storeLine1}>Download on the</div>
                <div className={styles.storeLine2}>App Store</div>
              </div>
            </a>
            <a href="#" className={styles.storeBtn}>
              <Icons.Play />
              <div>
                <div className={styles.storeLine1}>Get it on</div>
                <div className={styles.storeLine2}>Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

  </section>
);

export default AppPromo;
