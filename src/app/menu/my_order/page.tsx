'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Package, History, Send, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';
import { useRouter } from 'next/navigation';

export default function MyOrderPage() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const subMenus = [
    {
      name: 'Shipping Request',
      path: '/menu/my_order/shipping_request',
      icon: Send,
      description: '배송 요청서를 작성하고 새로운 주문을 신청하세요',
      stats: '신규 요청'
    },
    {
      name: 'SR List',
      path: '/menu/my_order/sr_list',
      icon: Package,
      description: '진행중인 주문과 완료된 주문을 확인하세요',
      stats: '주문목록'
    },
    {
      name: 'SR monitoring',
      path: '/menu/my_order/sr_monitoring',
      icon: History,
      description: '과거 주문 내역과 히스토리를 확인하세요',
      stats: '히스토리확인'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* 고급스러운 배경 패턴 */}
      <div className="absolute inset-0" style={{ opacity: 0.15 }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(147, 51, 234, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)
          `,
          backgroundSize: '1000px 1000px, 800px 800px, 1200px 1200px, 600px 600px',
          backgroundPosition: '0% 0%, 100% 100%, 50% 50%, 30% 20%'
        }}></div>
      </div>
      
      {/* 그리드 패턴 오버레이 */}
      <div className="absolute inset-0" style={{
        opacity: 0.05,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative z-10 p-6">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[calc(100vh-300px)]">
          {subMenus.map((subMenu, index) => (
            <motion.div
              key={subMenu.path}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="backdrop-blur-2xl rounded-3xl p-8 border transition-all duration-300 cursor-pointer hover:scale-105 group flex flex-col justify-center relative overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.15),
                  0 8px 25px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `
              }}
              onClick={() => router.push(subMenu.path)}
            >
              {/* 컴포넌트 내부 그라데이션 오버레이 */}
              <div className="absolute inset-0 opacity-40" style={{
                background: index === 0 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, transparent 50%, rgba(59, 130, 246, 0.08) 100%), radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)'
                  : index === 1
                  ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, transparent 50%, rgba(34, 197, 94, 0.08) 100%), radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)'
                  : 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, transparent 50%, rgba(147, 51, 234, 0.08) 100%), radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)'
              }}></div>
              
              <div className="text-center relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center relative" style={{ 
                  background: index === 0 
                    ? 'linear-gradient(135deg, var(--accent-blue) 0%, rgba(59, 130, 246, 0.8) 100%)'
                    : index === 1
                    ? 'linear-gradient(135deg, var(--accent-green) 0%, rgba(34, 197, 94, 0.8) 100%)'
                    : 'linear-gradient(135deg, var(--accent-purple) 0%, rgba(147, 51, 234, 0.8) 100%)',
                  boxShadow: index === 0 
                    ? '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : index === 1
                    ? '0 8px 32px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    : '0 8px 32px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}>
                  <div className="absolute inset-0 rounded-3xl" style={{ 
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
                  }}></div>
                  <subMenu.icon className="w-10 h-10 relative z-10 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{subMenu.name}</h3>
                <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>{subMenu.stats}</p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-tertiary)' }}>
                  {subMenu.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ 
                  color: index === 0 ? 'var(--accent-blue)' : index === 1 ? 'var(--accent-green)' : 'var(--accent-purple)' 
                }}>
                  <span>자세히 보기</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}