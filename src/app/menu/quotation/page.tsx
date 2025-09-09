'use client';

import { motion } from 'framer-motion';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';

export default function QuotationPage() {
  const { theme } = useTheme();
  
  const quotations = [
    {
      id: 'QUO-001',
      client: 'ABC 물류',
      service: '해상 운송 서비스',
      status: '승인',
      date: '2024-01-15',
      amount: '₩3,500,000'
    },
    {
      id: 'QUO-002',
      client: 'XYZ 트레이딩',
      service: '항공 운송 서비스',
      status: '검토중',
      date: '2024-01-20',
      amount: '₩2,100,000'
    },
    {
      id: 'QUO-003',
      client: 'DEF 그룹',
      service: '종합 물류 서비스',
      status: '대기',
      date: '2024-01-25',
      amount: '₩5,800,000'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '승인':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case '검토중':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case '대기':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>물류 견적</h1>
              <p style={{ color: 'var(--text-secondary)' }}>물류 서비스 견적서 요청 및 관리를 하세요</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
              style={{ 
                background: 'var(--accent-blue)', 
                color: 'white' 
              }}
            >
              <Plus className="w-5 h-5" />
              새 견적 요청
            </motion.button>
          </div>
        </motion.div>

        {/* 검색 및 필터 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-md rounded-2xl p-6 border mb-8"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-primary)' 
          }}
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="물류 견적서 검색..."
                className="w-full rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-colors"
                style={{ 
                  background: 'var(--bg-tertiary)', 
                  border: '1px solid var(--border-secondary)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            <button className="px-4 py-3 rounded-xl flex items-center gap-2 transition-colors border"
              style={{ 
                background: 'var(--bg-tertiary)', 
                borderColor: 'var(--border-secondary)',
                color: 'var(--text-primary)'
              }}
            >
              <Filter className="w-5 h-5" />
              필터
            </button>
          </div>
        </motion.div>

        {/* 견적서 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>3</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>총 견적 요청</div>
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
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>1</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>승인된 견적</div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="backdrop-blur-md rounded-2xl p-6 border"
            style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}
          >
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>1</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>검토중인 견적</div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="backdrop-blur-md rounded-2xl p-6 border"
            style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}
          >
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>₩11,400,000</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>총 견적 비용</div>
          </motion.div>
        </div>

        {/* 견적서 목록 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="backdrop-blur-md rounded-2xl p-6 border"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-primary)' 
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>물류 견적서 목록</h2>
          </div>

          <div className="space-y-4">
            {quotations.map((quotation, index) => (
              <motion.div
                key={quotation.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'var(--bg-tertiary)', 
                  borderColor: 'var(--border-secondary)' 
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ background: 'var(--accent-purple)', opacity: 0.2 }}>
                      <FileText className="w-6 h-6" style={{ color: 'var(--accent-purple)' }} />
                    </div>
                    <div>
                      <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{quotation.id}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{quotation.client}</div>
                      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{quotation.service}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(quotation.status)}`}>
                      {quotation.status}
                    </div>
                    <div className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>{quotation.amount}</div>
                    <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{quotation.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
