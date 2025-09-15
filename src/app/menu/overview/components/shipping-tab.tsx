'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Ship, Plane, TrendingUp, Package, Clock, CheckCircle } from 'lucide-react';
import { Card } from '@/common/components/ui/card';
import { useTheme } from '@/common/contexts/ThemeContext';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useState, useRef } from 'react';

// ApexCharts를 동적으로 import (SSR 문제 방지)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ShippingTabProps {
  onBackToMain: () => void;
}

export default function ShippingTab({ onBackToMain }: ShippingTabProps) {
  const { theme } = useTheme();
  const [activeAirSeries, setActiveAirSeries] = useState('전체(수입+수출)');
  const [activeSeaSeries, setActiveSeaSeries] = useState('전체(수입+수출)');

  // 항공 차트 시리즈 토글 함수
  const toggleAirSeries = (seriesName: string) => {
    setActiveAirSeries(seriesName);
  };

  // 해상 차트 시리즈 토글 함수
  const toggleSeaSeries = (seriesName: string) => {
    setActiveSeaSeries(seriesName);
  };

  // 항공 차트 동적 시리즈 생성
  const getAirShippingSeries = () => {
    const allSeries = [
      {
        name: '전체(수입+수출)',
        data: [47, 53, 60, 66, 72, 80, 86, 82, 92, 100, 94, 106]
      },
      {
        name: '전체(수입+수출) 전년도',
        data: [42, 48, 55, 61, 67, 75, 81, 77, 87, 95, 89, 101],
        type: 'line',
        showInLegend: false
      },
      {
        name: '항공수입',
        data: [25, 28, 32, 35, 38, 42, 45, 43, 48, 52, 49, 55]
      },
      {
        name: '항공수입 전년도',
        data: [22, 25, 29, 32, 35, 39, 42, 40, 45, 49, 46, 52],
        type: 'line',
        showInLegend: false
      },
      {
        name: '항공수출',
        data: [22, 25, 28, 31, 34, 38, 41, 39, 44, 48, 45, 51]
      },
      {
        name: '항공수출 전년도',
        data: [20, 23, 26, 29, 32, 36, 39, 37, 42, 46, 43, 49],
        type: 'line',
        showInLegend: false
      }
    ];

    // 활성화된 시리즈만 반환
    if (activeAirSeries === '전체(수입+수출)') {
      return [allSeries[0], allSeries[1]]; // 전체 + 전체 전년도
    } else if (activeAirSeries === '항공수입') {
      return [allSeries[2], allSeries[3]]; // 항공수입 + 항공수입 전년도
    } else if (activeAirSeries === '항공수출') {
      return [allSeries[4], allSeries[5]]; // 항공수출 + 항공수출 전년도
    }
    
    return [allSeries[0], allSeries[1]]; // 기본값
  };

  // 해상 차트 동적 시리즈 생성
  const getSeaShippingSeries = () => {
    const allSeries = [
      {
        name: '전체(수입+수출)',
        data: [83, 94, 93, 109, 107, 125, 134, 127, 140, 153, 146, 159]
      },
      {
        name: '전체(수입+수출) 전년도',
        data: [78, 89, 88, 104, 102, 120, 129, 122, 135, 148, 141, 154],
        type: 'line',
        showInLegend: false
      },
      {
        name: '해상수입',
        data: [45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 85]
      },
      {
        name: '해상수입 전년도',
        data: [42, 49, 45, 58, 52, 64, 69, 65, 72, 79, 75, 82],
        type: 'line',
        showInLegend: false
      },
      {
        name: '해상수출',
        data: [38, 42, 45, 48, 52, 58, 62, 59, 65, 71, 68, 74]
      },
      {
        name: '해상수출 전년도',
        data: [36, 40, 43, 46, 50, 56, 60, 57, 63, 69, 66, 72],
        type: 'line',
        showInLegend: false
      }
    ];

    // 활성화된 시리즈만 반환
    if (activeSeaSeries === '전체(수입+수출)') {
      return [allSeries[0], allSeries[1]]; // 전체 + 전체 전년도
    } else if (activeSeaSeries === '해상수입') {
      return [allSeries[2], allSeries[3]]; // 해상수입 + 해상수입 전년도
    } else if (activeSeaSeries === '해상수출') {
      return [allSeries[4], allSeries[5]]; // 해상수출 + 해상수출 전년도
    }
    
    return [allSeries[0], allSeries[1]]; // 기본값
  };

  // 항공 수출입 추이 차트
  const airShippingOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 250,
      toolbar: { show: false },
      background: 'transparent',
    },
    theme: {
      mode: theme === 'dark' ? 'dark' : 'light',
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    xaxis: {
      categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
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
        formatter: (value) => `${value}건`,
      },
    },
    grid: {
      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
    },
    legend: {
      show: false,
    },
    colors: ['#8b5cf6', '#a855f7', '#10b981', '#34d399', '#f59e0b', '#fbbf24'],
  };


  // 해상 수출입 추이 차트
  const seaShippingOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 250,
      toolbar: { show: false },
      background: 'transparent',
    },
    theme: {
      mode: theme === 'dark' ? 'dark' : 'light',
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    xaxis: {
      categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
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
        formatter: (value) => `${value}건`,
      },
    },
    grid: {
      borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
    },
    legend: {
      show: false,
    },
    colors: ['#8b5cf6', '#a855f7', '#3b82f6', '#60a5fa', '#ef4444', '#f87171'],
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

      {/* 주요 지표 카드들 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <Card className={`p-3 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/30' 
            : 'bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-blue-200' : 'text-blue-600'
              }`}>총 운송건수</p>
              <p className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>1,247건</p>
            </div>
            <Package className={`w-6 h-6 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
            }`} />
          </div>
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === 'dark' 
                ? 'text-emerald-300 bg-emerald-600/30' 
                : 'text-emerald-600 bg-emerald-100'
            }`}>
              +12.5%
            </span>
          </div>
        </Card>

        <Card className={`p-3 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-400/30' 
            : 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-emerald-200' : 'text-emerald-600'
              }`}>정시 배송률</p>
              <p className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>94.8%</p>
            </div>
            <CheckCircle className={`w-6 h-6 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
            }`} />
          </div>
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === 'dark' 
                ? 'text-emerald-300 bg-emerald-600/30' 
                : 'text-emerald-600 bg-emerald-100'
            }`}>
              +2.1%
            </span>
          </div>
        </Card>

        <Card className={`p-3 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-400/30' 
            : 'bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-orange-200' : 'text-orange-600'
              }`}>평균 소요시간</p>
              <p className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>8.5일</p>
            </div>
            <Clock className={`w-6 h-6 ${
              theme === 'dark' ? 'text-orange-400' : 'text-orange-500'
            }`} />
          </div>
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === 'dark' 
                ? 'text-red-300 bg-red-600/30' 
                : 'text-red-600 bg-red-100'
            }`}>
              -0.8일
            </span>
          </div>
        </Card>

        <Card className={`p-3 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-400/30' 
            : 'bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-purple-200' : 'text-purple-600'
              }`}>월간 성장률</p>
              <p className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>+8.2%</p>
            </div>
            <TrendingUp className={`w-6 h-6 ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
            }`} />
          </div>
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === 'dark' 
                ? 'text-emerald-300 bg-emerald-600/30' 
                : 'text-emerald-600 bg-emerald-100'
            }`}>
              +1.3%
            </span>
          </div>
        </Card>
      </motion.div>

      {/* 항공 수출입 추이 차트 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card className={`p-4 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-white/10 border border-white/20' 
            : 'bg-white/80 border border-slate-200 shadow-lg'
        }`}>
          <h3 className={`font-semibold text-lg mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>2024년 항공 수출입 추이</h3>
          <div className="h-[280px]">
            <Chart
              options={airShippingOptions}
              series={getAirShippingSeries()}
              type="area"
              height={250}
            />
          </div>
          {/* 커스텀 범례 */}
          <div className="flex items-center justify-center mt-4 space-x-6">
            <button
              onClick={() => toggleAirSeries('전체(수입+수출)')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeAirSeries === '전체(수입+수출)'
                  ? theme === 'dark'
                    ? 'bg-purple-600/30 text-purple-200'
                    : 'bg-purple-200 text-purple-800'
                  : theme === 'dark'
                    ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm font-medium">전체(수입+수출)</span>
            </button>
            <button
              onClick={() => toggleAirSeries('항공수입')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeAirSeries === '항공수입'
                  ? theme === 'dark'
                    ? 'bg-green-600/30 text-green-200'
                    : 'bg-green-200 text-green-800'
                  : theme === 'dark'
                    ? 'bg-green-600/20 text-green-300 hover:bg-green-600/30'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">항공수입</span>
            </button>
            <button
              onClick={() => toggleAirSeries('항공수출')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeAirSeries === '항공수출'
                  ? theme === 'dark'
                    ? 'bg-orange-600/30 text-orange-200'
                    : 'bg-orange-200 text-orange-800'
                  : theme === 'dark'
                    ? 'bg-orange-600/20 text-orange-300 hover:bg-orange-600/30'
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm font-medium">항공수출</span>
            </button>
          </div>
        </Card>
      </motion.div>

      {/* 해상 수출입 추이 차트 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Card className={`p-4 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-white/10 border border-white/20' 
            : 'bg-white/80 border border-slate-200 shadow-lg'
        }`}>
          <h3 className={`font-semibold text-lg mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>2024년 해상 수출입 추이</h3>
          <div className="h-[280px]">
            <Chart
              options={seaShippingOptions}
              series={getSeaShippingSeries()}
              type="area"
              height={250}
            />
          </div>
          {/* 커스텀 범례 */}
          <div className="flex items-center justify-center mt-4 space-x-6">
            <button
              onClick={() => toggleSeaSeries('전체(수입+수출)')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeSeaSeries === '전체(수입+수출)'
                  ? theme === 'dark'
                    ? 'bg-purple-600/30 text-purple-200'
                    : 'bg-purple-200 text-purple-800'
                  : theme === 'dark'
                    ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm font-medium">전체(수입+수출)</span>
            </button>
            <button
              onClick={() => toggleSeaSeries('해상수입')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeSeaSeries === '해상수입'
                  ? theme === 'dark'
                    ? 'bg-blue-600/30 text-blue-200'
                    : 'bg-blue-200 text-blue-800'
                  : theme === 'dark'
                    ? 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">해상수입</span>
            </button>
            <button
              onClick={() => toggleSeaSeries('해상수출')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeSeaSeries === '해상수출'
                  ? theme === 'dark'
                    ? 'bg-red-600/30 text-red-200'
                    : 'bg-red-200 text-red-800'
                  : theme === 'dark'
                    ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">해상수출</span>
            </button>
          </div>
        </Card>
      </motion.div>

    </div>
  );
}
