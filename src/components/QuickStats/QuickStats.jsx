import React from 'react';
import styles from './QuickStats.module.css';

const statsData = [
  { id: 1, name: 'NIFTY 50', value: '22,419.50', change: 0.85 },
  { id: 2, name: 'SENSEX', value: '73,996.96', change: 0.72 },
  { id: 3, name: 'BANK NIFTY', value: '47,560.00', change: -0.24 },
  { id: 4, name: 'GOLD', value: '2,345.10', change: 1.12 },
  { id: 5, name: 'CRUDE OIL', value: '82.30', change: -1.05 },
];

const QuickStats = () => {
  return (
    <div className={styles.statsWrapper}>
      <div className={styles.statsTrack}>
        {[...statsData, ...statsData].map((stat, i) => (
          <div key={`${stat.id}-${i}`} className={styles.statItem}>
            <span className={styles.statName}>{stat.name}</span>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={stat.change >= 0 ? styles.statChangeUp : styles.statChangeDown}>
              {stat.change > 0 ? '+' : ''}{stat.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
