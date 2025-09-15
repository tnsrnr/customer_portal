'use client';

import { motion } from 'framer-motion';
import { 
  Ship,
  CheckCircle,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { useTheme } from '@/common/contexts/ThemeContext';

interface MainDashboardProps {
  onTabChange: (tab: string) => void;
}

export default function MainDashboard({ onTabChange }: MainDashboardProps) {
  const { theme } = useTheme();
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
    },
    {
      id: 'quality',
      title: '서비스 품질',
      description: '고객 만족도와 서비스 지표를 확인하세요',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-400/30',
      stats: [
        { label: '만족도', value: '4.8/5.0', change: 0.3 },
        { label: '응답시간', value: '2.3시간', change: -0.5 }
      ]
    },
    {
      id: 'analytics',
      title: '분석 리포트',
      description: '상세한 데이터 분석과 트렌드를 확인하세요',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-500/20 to-orange-600/10',
      borderColor: 'border-orange-400/30',
      stats: [
        { label: '월별추이', value: '상승', change: 8.2 },
        { label: '포트분석', value: 'CNSHK', change: 0 }
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
        className="text-center"
      >
        <h1 className={`text-4xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-slate-800'
        }`}>물류 대시보드</h1>
      </motion.div>

      {/* 주요 KPI 요약 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className={`backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-400/30' 
            : 'bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-blue-200' : 'text-blue-600'
                }`}>진행중인 운송</p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>12건</p>
              </div>
              <Ship className={`w-8 h-8 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
              }`} />
            </div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                theme === 'dark' 
                  ? 'text-blue-300 bg-blue-600/30' 
                  : 'text-blue-600 bg-blue-100'
              }`}>
                +2건
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={`backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-400/30' 
            : 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-emerald-200' : 'text-emerald-600'
                }`}>정시 배송률</p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>95.2%</p>
              </div>
              <CheckCircle className={`w-8 h-8 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
              }`} />
            </div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                theme === 'dark' 
                  ? 'text-emerald-300 bg-emerald-600/30' 
                  : 'text-emerald-600 bg-emerald-100'
              }`}>
                +2.3%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={`backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-400/30' 
            : 'bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-purple-200' : 'text-purple-600'
                }`}>월간 총 비용</p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>₩3.2M</p>
              </div>
              <DollarSign className={`w-8 h-8 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
              }`} />
            </div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                theme === 'dark' 
                  ? 'text-red-300 bg-red-600/30' 
                  : 'text-red-600 bg-red-100'
              }`}>
                -5.1%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className={`backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-400/30' 
            : 'bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-orange-200' : 'text-orange-600'
                }`}>문제 발생</p>
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>3건</p>
              </div>
              <AlertTriangle className={`w-8 h-8 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-500'
              }`} />
            </div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                theme === 'dark' 
                  ? 'text-orange-300 bg-orange-600/30' 
                  : 'text-orange-600 bg-orange-100'
              }`}>
                주의
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 메인 카드들 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {mainCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`backdrop-blur-md transition-all duration-300 cursor-pointer group ${
                theme === 'dark' 
                  ? `bg-gradient-to-br ${card.bgColor} ${card.borderColor} hover:border-opacity-50` 
                  : `bg-white/80 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl`
              }`}
              onClick={() => onTabChange(card.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-xl ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>{card.title}</CardTitle>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
                      }`}>{card.description}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'text-blue-300 group-hover:text-white group-hover:translate-x-1' 
                      : 'text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1'
                  }`} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  {card.stats.map((stat, statIndex) => (
                    <div key={statIndex} className={`rounded-lg p-3 ${
                      theme === 'dark' ? 'bg-white/10' : 'bg-slate-50'
                    }`}>
                      <p className={`text-xs font-medium ${
                        theme === 'dark' ? 'text-blue-200' : 'text-slate-600'
                      }`}>{stat.label}</p>
                      <p className={`font-bold text-lg ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>{stat.value}</p>
                      <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                        stat.change >= 0 
                          ? (theme === 'dark' ? 'text-emerald-300 bg-emerald-600/30' : 'text-emerald-600 bg-emerald-100')
                          : (theme === 'dark' ? 'text-red-300 bg-red-600/30' : 'text-red-600 bg-red-100')
                      }`}>
                        {stat.change >= 0 ? '▲' : '▼'} {Math.abs(stat.change)}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* 안내 메시지 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <p className={`text-sm ${
          theme === 'dark' ? 'text-blue-300' : 'text-slate-600'
        }`}>각 카드를 클릭하여 상세 정보를 확인하세요</p>
      </motion.div>
    </div>
  );
}
