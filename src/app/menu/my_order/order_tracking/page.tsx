'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Package, Truck } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';

export default function OrderTrackingPage() {
  const { theme } = useTheme();
  
  const trackingData = [
    {
      id: 'ORD-2024-001',
      product: '전자제품 운송',
      currentStatus: '배송중',
      progress: 75,
      timeline: [
        {
          status: '주문 접수',
          time: '2024-01-15 09:00',
          location: '서울 본사',
          completed: true
        },
        {
          status: '상품 준비',
          time: '2024-01-15 14:30',
          location: '서울 물류센터',
          completed: true
        },
        {
          status: '출고',
          time: '2024-01-16 08:00',
          location: '서울 물류센터',
          completed: true
        },
        {
          status: '배송중',
          time: '2024-01-16 10:30',
          location: '인천항',
          completed: true
        },
        {
          status: '배송 완료',
          time: '예상: 2024-01-20 18:00',
          location: '부산 목적지',
          completed: false
        }
      ]
    }
  ];

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
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>주문 추적</h1>
          <p style={{ color: 'var(--text-secondary)' }}>실시간으로 주문의 배송 상태를 추적하세요</p>
        </motion.div>

        {/* 주문 정보 카드 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-md rounded-2xl p-6 border mb-8"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-primary)' 
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl" style={{ background: 'var(--accent-blue)', opacity: 0.2 }}>
                <Package className="w-8 h-8" style={{ color: 'var(--accent-blue)' }} />
              </div>
              <div>
                <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{trackingData[0].id}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{trackingData[0].product}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold px-3 py-1 rounded-full border" 
                style={{ 
                  color: 'var(--accent-blue)', 
                  background: 'var(--accent-blue)', 
                  opacity: 0.2,
                  borderColor: 'var(--accent-blue)'
                }}>
                {trackingData[0].currentStatus}
              </div>
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: 'var(--text-secondary)' }}>전체 진행률</span>
              <span style={{ color: 'var(--text-primary)' }}>{trackingData[0].progress}%</span>
            </div>
            <div className="w-full rounded-full h-3" style={{ background: 'var(--bg-secondary)' }}>
              <div 
                className="h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${trackingData[0].progress}%`,
                  background: 'var(--accent-blue)'
                }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* 추적 타임라인 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-md rounded-2xl p-6 border"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-primary)' 
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>배송 추적 타임라인</h2>
          </div>

          <div className="space-y-6">
            {trackingData[0].timeline.map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                {/* 타임라인 아이콘 */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.completed ? 'border-green-400' : 'border-gray-400'
                    }`}
                    style={{ 
                      background: step.completed ? 'var(--accent-green)' : 'var(--bg-tertiary)',
                      opacity: step.completed ? 0.2 : 1
                    }}
                  >
                    {step.completed ? (
                      <Truck className="w-5 h-5" style={{ color: 'var(--accent-green)' }} />
                    ) : (
                      <Clock className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  {index < trackingData[0].timeline.length - 1 && (
                    <div 
                      className="w-0.5 h-16 mt-2"
                      style={{ 
                        background: step.completed ? 'var(--accent-green)' : 'var(--border-secondary)'
                      }}
                    ></div>
                  )}
                </div>

                {/* 타임라인 내용 */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {step.status}
                    </h3>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {step.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {step.location}
                    </span>
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
