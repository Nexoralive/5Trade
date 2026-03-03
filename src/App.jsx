import React, { useState } from 'react';
import Header from './components/Header/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
import QuickStats from './components/QuickStats/QuickStats';
import AssetTabs from './components/AssetTabs/AssetTabs';
import MarketGrid from './components/MarketGrid/MarketGrid';
import MobileMarketSection from './components/MarketGrid/MobileMarketSection';
import ChampionshipBanner from './components/ChampionshipBanner/ChampionshipBanner';
import Features from './components/Features/Features';
import AppPromo from './components/AppPromo/AppPromo';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState('US Equities');

  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        <HeroBanner />
        <QuickStats />
        <ChampionshipBanner />

        {/* Desktop: tab-filtered market grid */}
        <section className={`${styles.marketSection} ${styles.desktopOnly}`}>
          <div className="container">
            <AssetTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <MarketGrid activeCategory={activeTab} />
          </div>
        </section>

        {/* Mobile: all categories in horizontal scroll rows */}
        <section className={`${styles.marketSection} ${styles.mobileOnly}`}>
          <MobileMarketSection />
        </section>

        <Features />
        <AppPromo />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
