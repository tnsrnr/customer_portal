'use client';

import { motion } from 'framer-motion';
import { FileText, Plus, List, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';
import { useRouter } from 'next/navigation';

export default function QuotationPage() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const subMenus = [
    {
      name: '견적서 요청',
      path: '/menu/quotation/quotation_request',
      icon: Plus,
      description: '새로운 물류 서비스 견적서를 요청하세요',
      stats: '신규 요청'
    },
    {
      name: '견적서 리스트',
      path: '/menu/quotation/quotation_list',
      icon: List,
      description: '요청한 견적서 목록과 상태를 확인하세요',
      stats: '견적서 목록'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* 패턴 배경 */}
      <div className="absolute inset-0">
        {/* 기본 그라데이션 */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 50%, rgba(34, 197, 94, 0.12) 100%)
          `
        }}></div>
        
        {/* 격자 패턴 - 사각형 패턴 유지 */}
        <div className="absolute inset-0 opacity-60" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* 점 패턴 - 정적 유지 */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(147, 51, 234, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 75px 75px, rgba(34, 197, 94, 0.4) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 150px 150px',
          backgroundPosition: '0 0, 50px 50px'
        }}></div>
        
        {/* 원형 패턴 - 정적 유지 */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3)  0%, transparent 4%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.25) 0%, transparent 4%),
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.2) 0%, transparent 3%),
            radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.2) 0%, transparent 3%)
          `,
          backgroundSize: '350px 350px, 450px 450px, 250px 250px, 300px 300px',
          backgroundPosition: '0% 0%, 100% 100%, 50% 0%, 0% 100%'
        }}></div>
      </div>
      
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
                <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Quotation</h1>
                <p style={{ color: 'var(--text-secondary)' }}>물류 서비스 견적서 요청 및 관리를 선택하세요</p>
              </div>
            </div>
          </motion.div>

          {/* 서브메뉴 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[calc(100vh-300px)]">
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
                <div className="absolute inset-0" style={{ opacity: 0.4 }}>
                  <div style={{
                    background: index === 0 
                      ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, transparent 50%, rgba(147, 51, 234, 0.08) 100%), radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)'
                      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, transparent 50%, rgba(59, 130, 246, 0.08) 100%), radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)'
                  }}></div>
                </div>
                
                <div className="text-center relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center relative" style={{ 
                    background: index === 0 
                      ? 'linear-gradient(135deg, var(--accent-purple) 0%, rgba(147, 51, 234, 0.8) 100%)'
                      : 'linear-gradient(135deg, var(--accent-blue) 0%, rgba(59, 130, 246, 0.8) 100%)',
                    boxShadow: index === 0 
                      ? '0 8px 32px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      : '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
                    color: index === 0 ? 'var(--accent-purple)' : 'var(--accent-blue)'
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
