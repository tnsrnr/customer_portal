'use client';

import { motion } from 'framer-motion';
import { ChevronRight, DollarSign, TrendingUp, Package, Clock, CheckCircle, Calculator, CreditCard } from 'lucide-react';
import { Card } from '@/common/components/ui/card';
import { useTheme } from '@/common/contexts/ThemeContext';
import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';

// Chart.js 설정
import '@/global/lib/chart';

interface CostTabProps {
  onBackToMain: () => void;
}

export default function CostTab({ onBackToMain }: CostTabProps) {
  const { theme } = useTheme();
  
  // 차트 데이터
  const chartData = {
    totalCost: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
        {
          label: '총 물류비',
          data: [2500000, 2800000, 3200000, 3500000, 3800000, 4200000, 4500000],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
          data: [2200000, 2500000, 2900000, 3200000, 3500000, 3900000, 4200000, 4000000, 4500000, 4900000, 4600000, 5200000],
          borderColor: '#6b7280',
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
        }
      ]
    },
    airImport: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
        {
          label: '항공수입 비용',
          data: [650000, 720000, 780000, 820000, 880000, 920000, 950000],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
          data: [600000, 650000, 700000, 750000, 800000, 850000, 900000, 880000, 920000, 950000, 930000, 980000],
          borderColor: '#6b7280',
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
        }
      ]
    },
    airExport: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
        {
          label: '항공수출 비용',
          data: [580000, 620000, 680000, 720000, 760000, 800000, 840000],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
          data: [550000, 590000, 640000, 680000, 720000, 760000, 800000, 780000, 820000, 850000, 830000, 870000],
          borderColor: '#6b7280',
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
        }
      ]
    },
    seaImport: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
        {
          label: '해상수입 비용',
          data: [720000, 780000, 850000, 900000, 950000, 1020000, 1080000],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
          data: [680000, 730000, 800000, 850000, 900000, 960000, 1020000, 980000, 1040000, 1080000, 1060000, 1120000],
          borderColor: '#6b7280',
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
        }
      ]
    },
    seaExport: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
        {
          label: '해상수출 비용',
          data: [550000, 600000, 650000, 700000, 750000, 800000, 850000],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
          data: [520000, 570000, 620000, 670000, 720000, 770000, 820000, 800000, 850000, 880000, 860000, 900000],
          borderColor: '#6b7280',
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
        }
      ]
    }
  };

  // 차트 옵션
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: false,
    plugins: {
    legend: {
      labels: {
          color: theme === 'dark' ? 'white' : '#374151',
          font: {
            size: 10
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? 'white' : '#6b7280',
          font: {
            size: 9
          }
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        ticks: {
          color: theme === 'dark' ? 'white' : '#6b7280',
          font: {
            size: 9
          },
          callback: function(value: any) {
            return '₩' + (value / 1000000).toFixed(1) + 'M';
          }
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <div className="space-y-4 h-full overflow-hidden">
      <div className="flex items-center justify-between mb-2">
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

      {/* 모듈별 대표 지표 카드들 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* 항공수입 비용 카드 */}
        <Card className={`p-3 backdrop-blur-md relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-emerald-500/15 to-emerald-600/8 border-emerald-400/25' 
            : 'bg-gradient-to-br from-emerald-50 to-emerald-100/60 border-emerald-200 shadow-lg'
        }`}>
          {/* 배경 패턴 */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
            <Package className="w-full h-full text-emerald-500" />
          </div>
          
          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  <Package className={`w-3.5 h-3.5 ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                </div>
                <span className={`text-xs font-semibold ${
                  theme === 'dark' ? 'text-emerald-200' : 'text-emerald-700'
                }`}>항공수입</span>
              </div>
            </div>

            {/* 2x2 그리드 정보 배치 */}
            <div className="grid grid-cols-2 gap-2 text-center">
              {/* 상단 좌측: 금월 비용 */}
              <div className="bg-emerald-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  ₩<CountUp end={950} duration={2} />K
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>금월</p>
              </div>
              
              {/* 상단 우측: 평균 비용 */}
              <div className="bg-emerald-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
                }`}>₩780K</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>평균</p>
              </div>
              
              {/* 하단 좌측: 전월대비 */}
              <div className="bg-emerald-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className={`w-3 h-3 ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
                  }`}>+30K</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>전월대비</p>
              </div>
              
              {/* 하단 우측: 비율 */}
              <div className="bg-emerald-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>21%</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>총비용대비</p>
              </div>
            </div>
          </div>
        </Card>

        {/* 항공수출 비용 카드 */}
        <Card className={`p-3 backdrop-blur-md relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-amber-500/15 to-amber-600/8 border-amber-400/25' 
            : 'bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200 shadow-lg'
        }`}>
          {/* 배경 패턴 */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
            <Package className="w-full h-full text-amber-500" />
          </div>
          
          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-100'
                }`}>
                  <Package className={`w-3.5 h-3.5 ${
                    theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                </div>
                <span className={`text-xs font-semibold ${
                  theme === 'dark' ? 'text-amber-200' : 'text-amber-700'
                }`}>항공수출</span>
              </div>
            </div>

            {/* 2x2 그리드 정보 배치 */}
            <div className="grid grid-cols-2 gap-2 text-center">
              {/* 상단 좌측: 금월 비용 */}
              <div className="bg-amber-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  ₩<CountUp end={840} duration={2} />K
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>금월</p>
              </div>
              
              {/* 상단 우측: 평균 비용 */}
              <div className="bg-amber-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
                }`}>₩680K</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>평균</p>
              </div>
              
              {/* 하단 좌측: 전월대비 */}
              <div className="bg-amber-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className={`w-3 h-3 ${
                    theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
                  }`}>+40K</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>전월대비</p>
              </div>
              
              {/* 하단 우측: 비율 */}
              <div className="bg-amber-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>19%</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>총비용대비</p>
              </div>
            </div>
          </div>
        </Card>

        {/* 해상수입 비용 카드 */}
        <Card className={`p-3 backdrop-blur-md relative overflow-hidden ${
              theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500/15 to-blue-600/8 border-blue-400/25' 
            : 'bg-gradient-to-br from-blue-50 to-blue-100/60 border-blue-200 shadow-lg'
        }`}>
          {/* 배경 패턴 */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
            <Package className="w-full h-full text-blue-500" />
          </div>
          
          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <Package className={`w-3.5 h-3.5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <span className={`text-xs font-semibold ${
                  theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
                }`}>해상수입</span>
              </div>
            </div>

            {/* 2x2 그리드 정보 배치 */}
            <div className="grid grid-cols-2 gap-2 text-center">
              {/* 상단 좌측: 금월 비용 */}
              <div className="bg-blue-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  ₩<CountUp end={1080} duration={2} />K
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>금월</p>
              </div>
              
              {/* 상단 우측: 평균 비용 */}
              <div className="bg-blue-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}>₩850K</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>평균</p>
              </div>
              
              {/* 하단 좌측: 전월대비 */}
              <div className="bg-blue-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className={`w-3 h-3 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                  }`}>+80K</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>전월대비</p>
              </div>
              
              {/* 하단 우측: 비율 */}
              <div className="bg-blue-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>24%</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>총비용대비</p>
              </div>
            </div>
          </div>
        </Card>

        {/* 해상수출 비용 카드 */}
        <Card className={`p-3 backdrop-blur-md relative overflow-hidden ${
              theme === 'dark' 
            ? 'bg-gradient-to-br from-red-500/15 to-red-600/8 border-red-400/25' 
            : 'bg-gradient-to-br from-red-50 to-red-100/60 border-red-200 shadow-lg'
        }`}>
          {/* 배경 패턴 */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
            <Package className="w-full h-full text-red-500" />
          </div>
          
          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'
                }`}>
                  <Package className={`w-3.5 h-3.5 ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`} />
                </div>
                <span className={`text-xs font-semibold ${
                  theme === 'dark' ? 'text-red-200' : 'text-red-700'
                }`}>해상수출</span>
              </div>
            </div>

            {/* 2x2 그리드 정보 배치 */}
            <div className="grid grid-cols-2 gap-2 text-center">
              {/* 상단 좌측: 금월 비용 */}
              <div className="bg-red-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  ₩<CountUp end={850} duration={2} />K
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>금월</p>
              </div>
              
              {/* 상단 우측: 평균 비용 */}
              <div className="bg-red-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-red-300' : 'text-red-600'
                }`}>₩650K</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>평균</p>
              </div>
              
              {/* 하단 좌측: 전월대비 */}
              <div className="bg-red-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className={`w-3 h-3 ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-red-300' : 'text-red-600'
                  }`}>+50K</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>전월대비</p>
              </div>
              
              {/* 하단 우측: 비율 */}
              <div className="bg-red-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>19%</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>총비용대비</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 총 물류비 차트 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`backdrop-blur-md rounded-xl p-4 border ${
          theme === 'dark' 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/80 border-slate-200 shadow-lg'
        }`}
      >
        {/* 총 물류비 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className={`w-5 h-5 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h3 className={`font-semibold text-lg ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>총 물류비 현황</h3>
          </div>
        </div>

        {/* 총 물류비 차트 */}
        <div className="h-32">
          <Line data={chartData.totalCost} options={chartOptions} />
        </div>
      </motion.div>

      {/* 모듈별 비용 차트 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`backdrop-blur-md rounded-xl p-4 border ${
          theme === 'dark' 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/80 border-slate-200 shadow-lg'
        }`}
      >
        {/* 모듈별 비용 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calculator className={`w-5 h-5 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            <h3 className={`font-semibold text-lg ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>모듈별 비용 현황</h3>
          </div>
        </div>

        {/* 모듈별 비용 차트 영역 - 4개 차트를 2x2로 배치 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 항공수입 비용 차트 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
              }`}>항공수입</h4>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
              }`}>
                ₩<CountUp end={950} duration={2} />K
              </span>
            </div>
            <div className="h-32">
              <Line data={chartData.airImport} options={chartOptions} />
            </div>
          </div>

          {/* 항공수출 비용 차트 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
              }`}>항공수출</h4>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
              }`}>
                ₩<CountUp end={840} duration={2} />K
              </span>
            </div>
            <div className="h-32">
              <Line data={chartData.airExport} options={chartOptions} />
            </div>
          </div>

          {/* 해상수입 비용 차트 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}>해상수입</h4>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}>
                ₩<CountUp end={1080} duration={2} />K
              </span>
            </div>
            <div className="h-32">
              <Line data={chartData.seaImport} options={chartOptions} />
            </div>
          </div>

          {/* 해상수출 비용 차트 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-red-300' : 'text-red-600'
              }`}>해상수출</h4>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-red-300' : 'text-red-600'
              }`}>
                ₩<CountUp end={850} duration={2} />K
              </span>
            </div>
            <div className="h-32">
              <Line data={chartData.seaExport} options={chartOptions} />
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
