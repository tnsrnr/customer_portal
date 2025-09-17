'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Ship, Plane, TrendingUp, Package, Clock, CheckCircle, MapPin } from 'lucide-react';
import { Card } from '@/common/components/ui/card';
import { useTheme } from '@/common/contexts/ThemeContext';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import CountUp from 'react-countup';

// Chart.js 설정
import '@/global/lib/chart';

interface ShippingTabProps {
  onBackToMain: () => void;
}

export default function ShippingTab({ onBackToMain }: ShippingTabProps) {
  const { theme } = useTheme();

  // 차트 데이터
  const chartData = {
    airImport: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
        {
          label: '항공수입',
          data: [25, 28, 32, 35, 38, 42, 45],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
        data: [22, 25, 29, 32, 35, 39, 42, 40, 45, 49, 46, 52],
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
          label: '항공수출',
          data: [22, 25, 28, 31, 34, 38, 41],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
        data: [20, 23, 26, 29, 32, 36, 39, 37, 42, 46, 43, 49],
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
          label: '해상수입',
          data: [45, 52, 48, 61, 55, 67, 72],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
        data: [42, 49, 45, 58, 52, 64, 69, 65, 72, 79, 75, 82],
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
          label: '해상수출',
          data: [38, 42, 45, 48, 52, 58],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: '전년도',
        data: [36, 40, 43, 46, 50, 56, 60, 57, 63, 69, 66, 72],
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
            return value + '건';
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

      {/* 운송 방식별 대표 지표 카드들 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* 항공수입 카드 - 2x2 그리드 배치 */}
        <Card className={`p-3 backdrop-blur-md relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-emerald-500/15 to-emerald-600/8 border-emerald-400/25' 
            : 'bg-gradient-to-br from-emerald-50 to-emerald-100/60 border-emerald-200 shadow-lg'
        }`}>
          {/* 배경 패턴 */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
            <Plane className="w-full h-full text-emerald-500" />
          </div>
          
          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  <Plane className={`w-3.5 h-3.5 ${
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
              {/* 상단 좌측: 금월 물동량 */}
              <div className="bg-emerald-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <CountUp end={45} duration={2} />건
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>금월</p>
              </div>
              
              {/* 상단 우측: 평균 물동량 */}
              <div className="bg-emerald-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
                }`}>38건</p>
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
                  }`}>+7건</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>전월대비</p>
              </div>
              
              {/* 하단 우측: 포트 정보 */}
              <div className="bg-emerald-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>ICN↔HAN</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>포트</p>
              </div>
          </div>
          </div>
        </Card>

        {/* 항공수출 카드 - 2x2 그리드 배치 */}
        <Card className={`p-3 backdrop-blur-md relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-amber-500/15 to-amber-600/8 border-amber-400/25' 
            : 'bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200 shadow-lg'
        }`}>
          {/* 배경 패턴 */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
            <Plane className="w-full h-full text-amber-500" />
          </div>
          
          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  theme === 'dark' ? 'bg-amber-500/20' : 'bg-amber-100'
                }`}>
                  <Plane className={`w-3.5 h-3.5 ${
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
              {/* 상단 좌측: 금월 물동량 */}
              <div className="bg-amber-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <CountUp end={41} duration={2} />건
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>금월</p>
              </div>
              
              {/* 상단 우측: 평균 물동량 */}
              <div className="bg-amber-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
                }`}>35건</p>
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
                  }`}>+6건</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>전월대비</p>
              </div>
              
              {/* 하단 우측: 포트 정보 */}
              <div className="bg-amber-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>ICN↔LAX</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>포트</p>
              </div>
          </div>
          </div>
        </Card>

        {/* 해상수입 카드 - 2x2 그리드 배치 */}
        <Card className={`p-3 backdrop-blur-md relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500/15 to-blue-600/8 border-blue-400/25' 
            : 'bg-gradient-to-br from-blue-50 to-blue-100/60 border-blue-200 shadow-lg'
        }`}>
          {/* 배경 패턴 */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
            <Ship className="w-full h-full text-blue-500" />
          </div>
          
          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <Ship className={`w-3.5 h-3.5 ${
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
              {/* 상단 좌측: 금월 물동량 */}
              <div className="bg-blue-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <CountUp end={72} duration={2} />건
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>금월</p>
              </div>
              
              {/* 상단 우측: 평균 물동량 */}
              <div className="bg-blue-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}>58건</p>
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
                  }`}>+14건</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>전월대비</p>
              </div>
              
              {/* 하단 우측: 포트 정보 */}
              <div className="bg-blue-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>LAX↔ICN</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>포트</p>
              </div>
          </div>
          </div>
        </Card>

        {/* 해상수출 카드 - 2x2 그리드 배치 */}
        <Card className={`p-3 backdrop-blur-md relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-red-500/15 to-red-600/8 border-red-400/25' 
            : 'bg-gradient-to-br from-red-50 to-red-100/60 border-red-200 shadow-lg'
        }`}>
          {/* 배경 패턴 */}
          <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
            <Ship className="w-full h-full text-red-500" />
          </div>
          
          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${
                  theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'
                }`}>
                  <Ship className={`w-3.5 h-3.5 ${
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
              {/* 상단 좌측: 금월 물동량 */}
              <div className="bg-red-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <CountUp end={58} duration={2} />건
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>금월</p>
              </div>
              
              {/* 상단 우측: 평균 물동량 */}
              <div className="bg-red-500/10 rounded-lg p-2">
                <p className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-red-300' : 'text-red-600'
                }`}>48건</p>
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
                  }`}>+10건</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>전월대비</p>
              </div>
              
              {/* 하단 우측: 포트 정보 */}
              <div className="bg-red-500/10 rounded-lg p-2">
                <div className="flex items-center justify-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>ICN↔LAX</span>
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>포트</p>
              </div>
          </div>
          </div>
        </Card>
      </motion.div>

      {/* 항공 운송 차트 */}
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
        {/* 항공 운송 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Plane className={`w-5 h-5 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            <h3 className={`font-semibold text-lg ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>항공 운송 현황</h3>
          </div>
        </div>

        {/* 항공 차트 영역 - 수입/수출을 좌우로 배치 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 항공수입 차트 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
              }`}>항공수입</h4>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
              }`}>
                <CountUp end={45} duration={2} />건
              </span>
            </div>
            <div className="h-32">
              <Line data={chartData.airImport} options={chartOptions} />
            </div>
            {/* 주요 포트 정보 */}
            <div className={`text-xs space-y-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>출발: ICN, NRT, LAX</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>도착: ICN, GMP</span>
              </div>
            </div>
          </div>

          {/* 항공수출 차트 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
              }`}>항공수출</h4>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
              }`}>
                <CountUp end={41} duration={2} />건
              </span>
            </div>
            <div className="h-32">
              <Line data={chartData.airExport} options={chartOptions} />
            </div>
            {/* 주요 포트 정보 */}
            <div className={`text-xs space-y-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>출발: ICN, GMP</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>도착: NRT, LAX, FRA</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 해상 운송 차트 */}
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
        {/* 해상 운송 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Ship className={`w-5 h-5 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h3 className={`font-semibold text-lg ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>해상 운송 현황</h3>
          </div>
        </div>

        {/* 해상 차트 영역 - 수입/수출을 좌우로 배치 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 해상수입 차트 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}>해상수입</h4>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}>
                <CountUp end={72} duration={2} />건
              </span>
            </div>
            <div className="h-32">
              <Line data={chartData.seaImport} options={chartOptions} />
            </div>
            {/* 주요 포트 정보 */}
            <div className={`text-xs space-y-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>출발: LAX, LGB, OAK</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>도착: ICN, PUS, GIM</span>
              </div>
            </div>
          </div>

          {/* 해상수출 차트 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-red-300' : 'text-red-600'
              }`}>해상수출</h4>
              <span className={`text-xs font-medium ${
                theme === 'dark' ? 'text-red-300' : 'text-red-600'
              }`}>
                <CountUp end={58} duration={2} />건
              </span>
            </div>
            <div className="h-32">
              <Line data={chartData.seaExport} options={chartOptions} />
            </div>
            {/* 주요 포트 정보 */}
            <div className={`text-xs space-y-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>출발: ICN, PUS, GIM</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>도착: LAX, LGB, OAK</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
