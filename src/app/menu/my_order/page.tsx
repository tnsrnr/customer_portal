'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Package, History, MapPin, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';
import { useRouter } from 'next/navigation';

export default function MyOrderPage() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const subMenus = [
    {
      name: '진행중인 주문',
      path: '/menu/my_order/active_orders',
      icon: Package,
      description: '현재 처리 중인 주문 현황을 확인하세요',
      stats: '3개 주문'
    },
    {
      name: '주문 이력',
      path: '/menu/my_order/order_history',
      icon: History,
      description: '과거 주문 내역과 완료된 서비스를 확인하세요',
      stats: '12개 완료'
    },
    {
      name: '주문 추적',
      path: '/menu/my_order/order_tracking',
      icon: MapPin,
      description: '실시간으로 주문의 배송 상태를 추적하세요',
      stats: '실시간 추적'
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
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 rounded-lg transition-colors"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>My Order</h1>
              <p style={{ color: 'var(--text-secondary)' }}>물류 주문 관련 서비스를 선택하세요</p>
            </div>
          </div>
        </motion.div>

        {/* 서브메뉴 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {subMenus.map((subMenu, index) => (
            <motion.div
              key={subMenu.path}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:scale-105"
              style={{ 
                background: 'var(--bg-card)', 
                borderColor: 'var(--border-primary)' 
              }}
              onClick={() => router.push(subMenu.path)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl" style={{ background: 'var(--accent-blue)', opacity: 0.2 }}>
                  <subMenu.icon className="w-8 h-8" style={{ color: 'var(--accent-blue)' }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{subMenu.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{subMenu.stats}</p>
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {subMenu.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 추가 정보 섹션 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-md rounded-2xl p-6 border"
            style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>My Order 서비스</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent-blue)' }}>3</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>서비스 유형</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent-green)' }}>24/7</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>실시간 모니터링</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--accent-purple)' }}>100%</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>투명한 추적</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}