'use client';

import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Users, Clock, BarChart3 } from 'lucide-react';
import { Card } from '@/common/components/ui/card';
import { useTheme } from '@/common/contexts/ThemeContext';

interface QualityTabProps {
  onBackToMain: () => void;
}

export default function QualityTab({ onBackToMain }: QualityTabProps) {
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

      {/* 서비스 품질 지표 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <Card className={`p-6 backdrop-blur-md ${
          theme === 'dark' 
            ? 'bg-white/10 border border-white/20' 
            : 'bg-white/80 border border-slate-200 shadow-lg'
        }`}>
          <h3 className={`font-semibold text-lg mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>서비스 품질 지표</h3>
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-2">
                <CheckCircle className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-500'
                }`} />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>정시 배송률</span>
              </div>
              <span className={`font-bold ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>95.2%</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-2">
                <Users className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
                }`} />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>고객 만족도</span>
              </div>
              <span className={`font-bold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>4.8/5.0</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-2">
                <Clock className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-orange-400' : 'text-orange-500'
                }`} />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>평균 응답시간</span>
              </div>
              <span className={`font-bold ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>2.3시간</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-2">
                <BarChart3 className={`w-4 h-4 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
                }`} />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>비용 절감률</span>
              </div>
              <span className={`font-bold ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>12.5%</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
