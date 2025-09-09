'use client';

import { motion } from 'framer-motion';
import { History, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';

export default function OrderHistoryPage() {
  const { theme } = useTheme();
  
  const orderHistory = [
    {
      id: 'ORD-2023-156',
      product: '전자제품 운송',
      status: '완료',
      completedDate: '2024-01-15',
      amount: '₩2,500,000',
      rating: 5
    },
    {
      id: 'ORD-2023-155',
      product: '의류 운송',
      status: '완료',
      completedDate: '2024-01-10',
      amount: '₩1,800,000',
      rating: 4
    },
    {
      id: 'ORD-2023-154',
      product: '식품 운송',
      status: '취소',
      completedDate: '2024-01-05',
      amount: '₩950,000',
      rating: null
    },
    {
      id: 'ORD-2023-153',
      product: '화학제품 운송',
      status: '완료',
      completedDate: '2023-12-28',
      amount: '₩3,200,000',
      rating: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료':
        return 'text-green-400 bg-green-500/20 border-green-400/30';
      case '취소':
        return 'text-red-400 bg-red-500/20 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '완료':
        return <CheckCircle className="w-5 h-5" style={{ color: 'var(--accent-green)' }} />;
      case '취소':
        return <XCircle className="w-5 h-5" style={{ color: 'var(--accent-red)' }} />;
      default:
        return <Clock className="w-5 h-5" style={{ color: 'var(--accent-orange)' }} />;
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="text-sm"
            style={{ color: i < rating ? 'var(--accent-orange)' : 'var(--text-muted)' }}
          >
            ★
          </span>
        ))}
      </div>
    );
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
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>주문 이력</h1>
          <p style={{ color: 'var(--text-secondary)' }}>과거 주문 내역과 완료된 서비스를 확인하세요</p>
        </motion.div>

        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>4</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>총 주문</div>
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
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>3</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>완료된 주문</div>
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
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>1</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>취소된 주문</div>
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
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>4.7</div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>평균 평점</div>
          </motion.div>
        </div>

        {/* 주문 이력 목록 */}
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
          <div className="flex items-center gap-3 mb-6">
            <History className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>주문 이력 목록</h2>
          </div>

          <div className="space-y-4">
            {orderHistory.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'var(--bg-tertiary)', 
                  borderColor: 'var(--border-secondary)' 
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{order.id}</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{order.product}</div>
                      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>완료일: {order.completedDate}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)} mb-2`}>
                      {order.status}
                    </div>
                    <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{order.amount}</div>
                    {renderStars(order.rating)}
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
