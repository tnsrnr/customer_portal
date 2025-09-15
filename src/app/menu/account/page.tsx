'use client';

import { useRouter } from 'next/navigation';
import { Calculator, ArrowRight } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();

  const subMenus = [
    {
      name: 'Acc List',
      path: '/menu/account/acc_list',
      icon: Calculator,
      description: '정산 목록',
      stats: '정산 내역 확인'
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
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              정산 관리
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              물류 서비스 정산 내역을 확인하고 관리할 수 있습니다.
            </p>
          </div>

          {/* 서브 메뉴 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {subMenus.map((subMenu, index) => (
              <div
                key={subMenu.path}
                className="backdrop-blur-2xl rounded-3xl p-6 border transition-all duration-300 cursor-pointer group hover:scale-105 relative overflow-hidden"
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
                  background: `
                    linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, transparent 50%, rgba(34, 197, 94, 0.08) 100%),
                    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)
                  `
                }}></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-3xl flex items-center justify-center relative" style={{ 
                      background: 'linear-gradient(135deg, var(--accent-green) 0%, rgba(34, 197, 94, 0.8) 100%)',
                      boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}>
                      <div className="absolute inset-0 rounded-3xl" style={{ 
                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
                      }}></div>
                      <subMenu.icon className="w-8 h-8 relative z-10 text-white drop-shadow-lg" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {subMenu.name}
                      </h3>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                        {subMenu.description}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {subMenu.stats}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent-green)' }}>
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
