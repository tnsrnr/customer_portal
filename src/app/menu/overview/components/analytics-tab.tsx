'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/common/components/ui/card';
import { useTheme } from '@/common/contexts/ThemeContext';

interface AnalyticsTabProps {
  onBackToMain: () => void;
}

export default function AnalyticsTab({ onBackToMain }: AnalyticsTabProps) {
  const { theme } = useTheme();
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

      {/* 분석 리포트 */}
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
          <h3 className={`font-semibold text-lg mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>데이터 분석 리포트</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className={`font-medium ${
                theme === 'dark' ? 'text-blue-200' : 'text-blue-600'
              }`}>주요 트렌드</h4>
              <div className="space-y-3">
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>월별 운송량 증가</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>+8.2%</span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>비용 효율성</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>+12.5%</span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>고객 만족도</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`}>+0.3점</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className={`font-medium ${
                theme === 'dark' ? 'text-blue-200' : 'text-blue-600'
              }`}>포트 분석</h4>
              <div className="space-y-3">
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>CNSHK (상하이)</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>100%</span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>KRPTK (부산)</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>100%</span>
                </div>
                <div className={`flex justify-between items-center p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                }`}>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>LAX (로스앤젤레스)</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`}>85%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
