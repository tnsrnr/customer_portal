'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/common/contexts/ThemeContext';
import MainDashboard from './components/main-dashboard';
import ShippingTab from './components/shipping-tab';
import CostTab from './components/cost-tab';

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
      default:
        return <MainDashboard onTabChange={setActiveTab} />;
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* 패턴 배경 */}
      <div className="absolute inset-0">
        {/* 기본 그라데이션 */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 50%, rgba(34, 197, 94, 0.12) 100%)
          `
        }}></div>
        
        {/* 격자 패턴 - 사각형 패턴 유지 */}
        <div className="absolute inset-0 opacity-60" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* 점 패턴 - 정적 유지 */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(147, 51, 234, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 75px 75px, rgba(34, 197, 94, 0.4) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 150px 150px',
          backgroundPosition: '0 0, 50px 50px'
        }}></div>
        
        {/* 원형 패턴 - 정적 유지 */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3)  0%, transparent 4%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.25) 0%, transparent 4%),
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.2) 0%, transparent 3%),
            radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.2) 0%, transparent 3%)
          `,
          backgroundSize: '350px 350px, 450px 450px, 250px 250px, 300px 300px',
          backgroundPosition: '0% 0%, 100% 100%, 50% 0%, 0% 100%'
        }}></div>
      </div>
      
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