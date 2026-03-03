import React from 'react';
import styles from './AssetTabs.module.css';

const TABS = [
  'Indian Equities',
  'Global Indices',
  'Forex Majors',
  'Commodities',
  'US Equities',
  'Crypto'
];

const AssetTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsScroll}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && <div className={styles.activeIndicator} />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssetTabs;
