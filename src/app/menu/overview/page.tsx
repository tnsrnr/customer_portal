'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';

export default function OverviewPage() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>서비스 현황</h1>
          <p style={{ color: 'var(--text-secondary)' }}>물류 서비스 현황과 주요 지표를 확인하세요</p>
        </motion.div>

        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-md rounded-2xl p-6 border"
            style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl" style={{ background: 'var(--accent-blue)', opacity: 0.2 }}>
                <BarChart3 className="w-8 h-8" style={{ color: 'var(--accent-blue)' }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--accent-green)' }}>+12.5%</span>
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>1,234</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>총 물류 주문</div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-md rounded-2xl p-6 border"
            style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl" style={{ background: 'var(--accent-green)', opacity: 0.2 }}>
                <DollarSign className="w-8 h-8" style={{ color: 'var(--accent-green)' }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--accent-green)' }}>+8.3%</span>
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>₩2,456,789</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>총 서비스 비용</div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-md rounded-2xl p-6 border"
            style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl" style={{ background: 'var(--accent-purple)', opacity: 0.2 }}>
                <Users className="w-8 h-8" style={{ color: 'var(--accent-purple)' }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--accent-green)' }}>+5.7%</span>
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>89</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>활성 화주</div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-md rounded-2xl p-6 border"
            style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl" style={{ background: 'var(--accent-orange)', opacity: 0.2 }}>
                <TrendingUp className="w-8 h-8" style={{ color: 'var(--accent-orange)' }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--accent-green)' }}>+15.2%</span>
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>95.8%</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>고객 만족도</div>
          </motion.div>
        </div>

        {/* 차트 영역 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="backdrop-blur-md rounded-2xl p-6 border"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-primary)' 
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>월별 서비스 이용 현황</h2>
          <div className="h-64 rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
            <p style={{ color: 'var(--text-muted)' }}>차트 영역 (추후 구현 예정)</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
