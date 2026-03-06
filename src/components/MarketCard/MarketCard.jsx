import React, { memo, useRef, useEffect, useState } from 'react';
import styles from './MarketCard.module.css';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const MarketCard = memo(({ asset, assetData }) => {
  const prevPriceRef = useRef(assetData?.price);
  useEffect(() => {
    if (
      assetData?.updatedAt &&
      assetData.price !== prevPriceRef.current &&
      prevPriceRef.current !== undefined
    ) {
      prevPriceRef.current = assetData.price;
    }
    prevPriceRef.current = assetData?.price;
  }, [assetData?.updatedAt, assetData?.price]);

  if (!assetData) {
    return (
      <div className={`${styles.card} ${styles.cardSkeleton}`}>
        <div className="skeleton-loader" style={{ height: 18, width: '55%' }} />
        <div className="skeleton-loader" style={{ height: 14, width: '75%', marginTop: 5 }} />
        <div className="skeleton-loader" style={{ height: 28, width: '100%', marginTop: 5 }} />
        <div className="skeleton-loader" style={{ height: 22, width: '100%', marginTop: 4, borderRadius: 6 }} />
      </div>
    );
  }

  const { price, changePercent = 0, direction = 'up', history = [] } = assetData;
  const isUp = direction === 'up';

  const formattedPrice = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: price > 100 ? 2 : 4,
  }).format(price || 0);

  const chartData = history.map((val, idx) => ({ value: val, index: idx }));
  const sparkColor = isUp ? '#15803D' : '#e11d48';

  return (
    <div className={styles.card}>
      {/* badge */}
      <div className={styles.topRow}>
        <span className={`${styles.badge} ${isUp ? styles.badgeUp : styles.badgeDown}`}>
          {isUp ? '+' : ''}{changePercent}%
        </span>
      </div>

      {/* logo + name */}
      <div className={styles.logoRow}>
        <div className={styles.circleLogo}>
          {asset.image ? (
            <img src={asset.image} alt={asset.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            asset.name.charAt(0)
          )}
        </div>
        <div className={styles.nameBlock}>
          <span className={styles.assetName}>{asset.name}</span>
          <span className={styles.ticker}>{asset.ticker}</span>
        </div>
      </div>

      {/* price */}
      <div className={`${styles.price} ${isUp ? styles.priceUp : styles.priceDown}`}>
        {formattedPrice}
      </div>

      {/* sparkline */}
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%" minWidth={50} minHeight={20}>
          <LineChart data={chartData}>
            <YAxis domain={['auto', 'auto']} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke={sparkColor}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* buy / sell */}
      <div className={styles.actionButtons}>
        <button className={`${styles.btn} ${styles.btnSell}`} onClick={() => window.open('https://app.5trade.live/register', '_blank')}>SELL</button>
        <button className={`${styles.btn} ${styles.btnBuy}`} onClick={() => window.open('https://app.5trade.live/register', '_blank')}>BUY</button>
      </div>
    </div>
  );
});

export default MarketCard;
