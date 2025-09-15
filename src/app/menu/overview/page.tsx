'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/common/contexts/ThemeContext';
import MainDashboard from './components/main-dashboard';
import ShippingTab from './components/shipping-tab';
import CostTab from './components/cost-tab';
import QualityTab from './components/quality-tab';
import AnalyticsTab from './components/analytics-tab';

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState('main');
  const { theme } = useTheme();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'main':
        return <MainDashboard onTabChange={setActiveTab} />;
      case 'shipping':
        return <ShippingTab onBackToMain={() => setActiveTab('main')} />;
      case 'cost':
        return <CostTab onBackToMain={() => setActiveTab('main')} />;
      case 'quality':
        return <QualityTab onBackToMain={() => setActiveTab('main')} />;
      case 'analytics':
        return <AnalyticsTab onBackToMain={() => setActiveTab('main')} />;
      default:
        return <MainDashboard onTabChange={setActiveTab} />;
    }
  };
  
  return (
    <div className={`min-h-screen relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100'
    }`}>
      {theme === 'dark' ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-slate-800/10 to-slate-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(30,58,138,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(15,23,42,0.2),transparent_50%)]"></div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-slate-100/20 to-slate-200/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(148,163,184,0.1),transparent_50%)]"></div>
        </>
      )}
      
      <div className="relative z-10 px-6 py-4 max-w-7xl mx-auto h-full">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}