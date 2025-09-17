'use client';

import { motion } from 'framer-motion';
import { 
  Ship,
  CheckCircle,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Plane,
  Package,
  TrendingUp,
  MapPin,
  Calculator
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { useTheme } from '@/common/contexts/ThemeContext';
import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';

// Chart.js 설정
import '@/global/lib/chart';

interface MainDashboardProps {
  onTabChange: (tab: string) => void;
}

export default function MainDashboard({ onTabChange }: MainDashboardProps) {
  const { theme } = useTheme();

  // 차트 데이터
  const chartData = {
    shipping: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
      datasets: [
        {
          label: '총 물동량',
          data: [130, 147, 153, 174, 179, 205, 218],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        }
      ]
    },
    cost: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
      datasets: [
        {
          label: '총 물류비',
          data: [2500000, 2800000, 3200000, 3500000, 3800000, 4200000, 4500000],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
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
          }
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  // 메인 대시보드 카드 데이터
  const mainCards = [
    {
      id: 'shipping',
      title: '운송 현황',
      description: '진행중인 운송과 배송 현황을 확인하세요',
      icon: Ship,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-500/20 to-blue-600/10',
      borderColor: 'border-blue-400/30',
      stats: [
        { label: '진행중', value: '12건', change: 2 },
        { label: '정시배송률', value: '95.2%', change: 2.3 }
      ]
    },
    {
      id: 'cost',
      title: '비용 분석',
      description: '운송 비용과 정산 현황을 분석하세요',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-400/30',
      stats: [
        { label: '월간비용', value: '₩3.2M', change: -5.1 },
        { label: '절감률', value: '12.5%', change: 1.2 }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center relative"
      >
        <div className={`inline-block px-8 py-4 rounded-2xl backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10' 
            : 'bg-gradient-to-r from-blue-100/80 to-purple-100/80 border border-slate-200 shadow-lg'
        }`}>
          <h1 className={`text-5xl font-extrabold bg-gradient-to-r ${
            theme === 'dark' 
              ? 'from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' 
              : 'from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
          }`}>Overview</h1>
          <p className={`text-sm mt-2 ${
            theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
          }`}>물류 현황 종합 대시보드</p>
        </div>
      </motion.div>

      {/* 주요 지표 요약 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* 총 물동량 */}
        <div className={`flex items-center p-6 rounded-xl backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30' 
            : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-lg'
        }`}>
          <div className={`p-3 rounded-lg mr-4 ${
            theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-100'
          }`}>
            <Package className={`w-6 h-6 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-blue-200' : 'text-blue-600'
            }`}>총 물동량</span>
            <span className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              <CountUp end={216} duration={2} />건
            </span>
            <div className="flex items-center space-x-1">
              <TrendingUp className={`w-4 h-4 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
              }`}>+38건</span>
            </div>
          </div>
        </div>

        {/* 총 비용 */}
        <div className={`flex items-center p-6 rounded-xl backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30' 
            : 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 shadow-lg'
        }`}>
          <div className={`p-3 rounded-lg mr-4 ${
            theme === 'dark' ? 'bg-emerald-500/30' : 'bg-emerald-100'
          }`}>
            <DollarSign className={`w-6 h-6 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
          </div>
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-emerald-200' : 'text-emerald-600'
            }`}>총 물류비</span>
            <span className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              ₩<CountUp end={4.5} duration={2} decimals={1} />M
            </span>
            <div className="flex items-center space-x-1">
              <TrendingUp className={`w-4 h-4 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
              }`}>+0.7M</span>
            </div>
          </div>
        </div>

      </motion.div>

      {/* 모듈별 상세 카드들 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* 항공수입 카드 */}
        <Card className={`group relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-105 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30 hover:border-emerald-400/50' 
            : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300 shadow-lg hover:shadow-2xl'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                theme === 'dark' ? 'bg-emerald-500/30' : 'bg-emerald-100'
              }`}>
                <Plane className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                }`} />
              </div>
              <div className="text-right">
                <p className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
                }`}>항공수입</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>Air Import</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>금월 물동량</span>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <CountUp end={45} duration={2} />건
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>평균 물동량</span>
                <span className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
                }`}>38건</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>전월대비</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-emerald-300' : 'text-emerald-600'
                  }`}>+7건</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>주요 포트</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className={`w-3 h-3 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`} />
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>ICN↔HAN</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 항공수출 카드 */}
        <Card className={`group relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
            ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400/30 hover:border-amber-400/50' 
            : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300 shadow-lg hover:shadow-2xl'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                theme === 'dark' ? 'bg-amber-500/30' : 'bg-amber-100'
              }`}>
                <Plane className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                }`} />
              </div>
              <div className="text-right">
                <p className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
                }`}>항공수출</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>Air Export</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>금월 물동량</span>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <CountUp end={41} duration={2} />건
              </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>평균 물동량</span>
                <span className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
                }`}>34건</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>전월대비</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
                  }`}>+7건</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-amber-500/20">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>주요 포트</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className={`w-3 h-3 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>ICN↔LAX</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 해상수입 카드 */}
        <Card className={`group relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-105 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-400/30 hover:border-blue-400/50' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-2xl'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-100'
              }`}>
                <Ship className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <div className="text-right">
                <p className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}>해상수입</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>Sea Import</p>
              </div>
            </div>
            
            <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>금월 물동량</span>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <CountUp end={72} duration={2} />건
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>평균 물동량</span>
                <span className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`}>58건</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>전월대비</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                  }`}>+14건</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-500/20">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>주요 포트</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className={`w-3 h-3 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`} />
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>CNSHK↔ICN</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 해상수출 카드 */}
        <Card className={`group relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
            ? 'bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-400/30 hover:border-red-400/50' 
            : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:border-red-300 shadow-lg hover:shadow-2xl'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                theme === 'dark' ? 'bg-red-500/30' : 'bg-red-100'
              }`}>
                <Ship className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`} />
              </div>
              <div className="text-right">
                <p className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-red-300' : 'text-red-600'
                }`}>해상수출</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>Sea Export</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>금월 물동량</span>
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  <CountUp end={58} duration={2} />건
              </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>평균 물동량</span>
                <span className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-red-300' : 'text-red-600'
                }`}>48건</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>전월대비</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-red-300' : 'text-red-600'
                  }`}>+10건</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-red-500/20">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>주요 포트</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className={`w-3 h-3 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>ICN↔LAX</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 차트 섹션 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* 운송 현황 차트 */}
        <Card className={`group relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${
                theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/20 hover:border-blue-400/40' 
            : 'bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border-blue-200 hover:border-blue-300 shadow-xl hover:shadow-2xl'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-100'
                }`}>
                  <Ship className={`w-6 h-6 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                    </div>
                    <div>
                  <CardTitle className={`text-xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>운송 현황</CardTitle>
                  <p className={`text-sm ${
                        theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
                  }`}>월별 물동량 트렌드</p>
                    </div>
                  </div>
              <button
                onClick={() => onTabChange('shipping')}
                className={`group/btn flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 hover:text-white' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800'
                }`}
              >
                <span className="text-sm font-medium">상세보기</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 relative z-10">
            <div className="h-48">
              <Line data={chartData.shipping} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* 비용 분석 차트 */}
        <Card className={`group relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'dark' 
            ? 'bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-400/20 hover:border-emerald-400/40' 
            : 'bg-gradient-to-br from-emerald-50/80 to-green-50/80 border-emerald-200 hover:border-emerald-300 shadow-xl hover:shadow-2xl'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="pb-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-emerald-500/30' : 'bg-emerald-100'
                }`}>
                  <DollarSign className={`w-6 h-6 ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                </div>
                <div>
                  <CardTitle className={`text-xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>비용 분석</CardTitle>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-emerald-200' : 'text-slate-600'
                  }`}>월별 물류비 트렌드</p>
                </div>
              </div>
              <button
                onClick={() => onTabChange('cost')}
                className={`group/btn flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 hover:text-white' 
                    : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:text-emerald-800'
                }`}
              >
                <span className="text-sm font-medium">상세보기</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
                    </div>
          </CardHeader>
          <CardContent className="pt-0 relative z-10">
            <div className="h-48">
              <Line data={chartData.cost} options={{
                ...chartOptions,
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    ticks: {
                      ...chartOptions.scales.y.ticks,
                      callback: function(value: any) {
                        return '₩' + (value / 1000000).toFixed(1) + 'M';
                      }
                    }
                  }
                }
              }} />
                </div>
              </CardContent>
            </Card>
      </motion.div>

    </div>
  );
}
