import React, { useMemo } from 'react';
import styles from './MarketGrid.module.css';
import MarketCard from '../MarketCard/MarketCard';
import { ASSETS } from '../../data/assets';
import { useMarketData } from '../../hooks/MarketDataProvider';
import { WifiOff } from 'lucide-react';

const MarketGrid = ({ activeCategory }) => {
  const currentAssets = useMemo(() => ASSETS[activeCategory] || [], [activeCategory]);
  const { data, status } = useMarketData();

  return (
    <div className={styles.gridContainer}>
      <div className={styles.statusHeader}>
        <h3 className={styles.categoryTitle}>{activeCategory}</h3>
        <div className={styles.connectionStatus}>
          {status === 'connected' ? (
            <div className={styles.statusConnected}>
              <span className={styles.pulseDot}></span>
              Live Data
            </div>
          ) : status === 'connecting' ? (
            <div className={styles.statusConnecting}>
              <span className={styles.spinner}></span>
              Connecting...
            </div>
          ) : (
            <div className={styles.statusError}>
              <WifiOff size={14} />
              Offline
            </div>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        {currentAssets.map(asset => (
          <MarketCard
            key={asset.id}
            asset={asset}
            assetData={data[asset.symbol]}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketGrid;
