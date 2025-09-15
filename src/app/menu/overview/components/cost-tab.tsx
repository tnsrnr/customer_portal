'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/common/components/ui/card';
import { useTheme } from '@/common/contexts/ThemeContext';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// ApexCharts를 동적으로 import (SSR 문제 방지)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CostTabProps {
  onBackToMain: () => void;
}

export default function CostTab({ onBackToMain }: CostTabProps) {
  const { theme } = useTheme();
  
  // 비용 분석 차트 옵션
  const costAnalysisOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false },
      background: 'transparent',
    },
    theme: {
      mode: theme === 'dark' ? 'dark' : 'light',
    },
    xaxis: {
      categories: ['해상수입', '해상수출', '항공수입', '항공수출'],
      labels: {
        style: {
          colors: theme === 'dark' ? '#94a3b8' : '#64748b',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === 'dark' ? '#94a3b8' : '#64748b',
        },
        formatter: (value) => `₩${(value / 1000000).toFixed(1)}M`,
      },
    },
    grid: {
      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
    },
    legend: {
      labels: {
        colors: theme === 'dark' ? '#e2e8f0' : '#334155',
      },
    },
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  };

  const costAnalysisSeries = [
    {
      name: '운송비',
      data: [1200000, 1100000, 800000, 750000]
    },
    {
      name: '보험료',
      data: [150000, 140000, 100000, 95000]
    },
    {
      name: '관세/세금',
      data: [200000, 180000, 120000, 110000]
    },
    {
      name: '기타 수수료',
      data: [300000, 250000, 400000, 350000]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToMain}
          className={`flex items-center space-x-2 transition-colors ${
            theme === 'dark' 
              ? 'text-blue-300 hover:text-white' 
              : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>메인으로 돌아가기</span>
        </button>
      </div>

      {/* 비용 분석 차트 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Card className={`p-6 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-white/10 border border-white/20' 
            : 'bg-white/80 border border-slate-200 shadow-lg'
        }`}>
          <h3 className={`font-semibold text-lg mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>운송 유형별 비용 분석</h3>
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
          }`}>해상/항공 수출입별 상세 비용 구성</p>
          <div className="h-[230px]">
            <Chart
              options={costAnalysisOptions}
              series={costAnalysisSeries}
              type="bar"
              height={200}
            />
          </div>
        </Card>
      </motion.div>

      {/* 최근 정산 현황 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <Card className={`p-6 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-white/10 border border-white/20' 
            : 'bg-white/80 border border-slate-200 shadow-lg'
        }`}>
          <h3 className={`font-semibold text-lg mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>최근 정산 현황</h3>
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <p className={`font-medium text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>2025년 1월</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
                }`}>해상수입 3건</p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>₩2,450,000</p>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  theme === 'dark' 
                    ? 'bg-green-600/30 text-green-300 border-green-400/30' 
                    : 'bg-green-100 text-green-700 border-green-200'
                }`}>정산완료</span>
              </div>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <p className={`font-medium text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>2025년 1월</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
                }`}>항공수출 2건</p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>₩1,230,000</p>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  theme === 'dark' 
                    ? 'bg-green-600/30 text-green-300 border-green-400/30' 
                    : 'bg-green-100 text-green-700 border-green-200'
                }`}>정산완료</span>
              </div>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <p className={`font-medium text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>2025년 2월</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
                }`}>해상수출 1건</p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>₩890,000</p>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  theme === 'dark' 
                    ? 'bg-orange-600/30 text-orange-300 border-orange-400/30' 
                    : 'bg-orange-100 text-orange-700 border-orange-200'
                }`}>정산대기</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
