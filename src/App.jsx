import React, { useState } from 'react';
import Header from './components/Header/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';

import AssetTabs from './components/AssetTabs/AssetTabs';
import MarketGrid from './components/MarketGrid/MarketGrid';
import MobileMarketSection from './components/MarketGrid/MobileMarketSection';
import ChampionshipBanner from './components/ChampionshipBanner/ChampionshipBanner';
import AccountCTA from './components/AccountCTA/AccountCTA';

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

        <ChampionshipBanner />

        {/* Market Section (Desktop & Mobile) */}
        <section className={styles.marketSection}>
          <div className="container">
            <AssetTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className={styles.desktopOnly}>
              <MarketGrid activeCategory={activeTab} />
            </div>
          </div>
          
          <div className={styles.mobileOnly}>
            <MobileMarketSection activeCategory={activeTab} />
          </div>
        </section>

        <AccountCTA />

        <AppPromo />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
