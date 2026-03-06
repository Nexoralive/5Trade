import React from 'react';
import styles from './MobileMarketSection.module.css';
import MarketCard from '../MarketCard/MarketCard';
import { ASSETS } from '../../data/assets';
import { useMarketData } from '../../hooks/MarketDataProvider';

const CATEGORY_ICONS = {
  'Indian Equities': '',
  'Global Indices': '',
  'Forex Majors': '',
  'Commodities': '',
  'US Equities': '',
  'Crypto': '',
};

const CATEGORIES = Object.keys(ASSETS);

const CategoryRow = ({ category, data }) => {
  const assets = ASSETS[category] || [];

  return (
    <div className={styles.categorySection}>
      <div className={styles.rowHeader}>
        <div className={styles.rowTitle}>
          <h3 className={styles.categoryName}>{category}</h3>
        </div>
        <button className={styles.viewAllBtn}>
          View All
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className={styles.scrollTrack}>
        {assets.map((asset) => (
          <div key={asset.id} className={styles.cardWrapper}>
            <MarketCard asset={asset} assetData={data[asset.symbol]} />
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileMarketSection = ({ activeCategory }) => {
  const { data } = useMarketData();

  return (
    <div className={styles.container}>
      {activeCategory && <CategoryRow category={activeCategory} data={data} />}
    </div>
  );
};

export default MobileMarketSection;
