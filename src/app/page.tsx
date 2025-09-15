'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, ShoppingCart, FileText, Calculator, ArrowRight
} from 'lucide-react';

interface SessionData {
  jsessionId: string;
  csrfToken: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    empID?: string;
    hMenu?: string;
    roles?: string[];
  };
}

export default function HomePage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Profile Card 3D 효과를 위한 상태
  const [cardRotations, setCardRotations] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / rect.height) * -30;
    const rotateY = (mouseX / rect.width) * 30;
    
    setCardRotations(prev => {
      const newRotations = [...prev];
      newRotations[cardIndex] = { x: rotateX, y: rotateY };
      return newRotations;
    });
  };

  const handleMouseLeave = (cardIndex: number) => {
    setCardRotations(prev => {
      const newRotations = [...prev];
      newRotations[cardIndex] = { x: 0, y: 0 };
      return newRotations;
    });
  };

  useEffect(() => {
    const sessionData = localStorage.getItem('htns-session');
    if (sessionData) {
      try {
        const parsedSession = JSON.parse(sessionData);
        if (parsedSession.jsessionId && parsedSession.csrfToken) {
          setSession(parsedSession);
        } else {
          router.push('/auth');
        }
      } catch (e) {
        localStorage.removeItem('htns-session');
        router.push('/auth');
      }
    } else {
      router.push('/auth');
    }
    setIsLoading(false);
  }, [router]);


  if (isLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 mx-auto" style={{ borderColor: 'var(--accent-blue)' }}></div>
          <p className="mt-4" style={{ color: 'var(--text-primary)' }}>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
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
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3) 0%, transparent 4%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.25) 0%, transparent 4%),
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.2) 0%, transparent 3%),
            radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.2) 0%, transparent 3%)
          `,
          backgroundSize: '350px 350px, 450px 450px, 250px 250px, 300px 300px',
          backgroundPosition: '0% 0%, 100% 100%, 50% 0%, 0% 100%'
        }}></div>
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center -mt-16">

        {/* 메인 콘텐츠 */}
        <div className="w-full max-w-6xl px-6">
          {/* 메인 서비스 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full h-[450px]">
            {/* Overview */}
            <div
              className="profile-card blue-glow backdrop-blur-2xl rounded-3xl p-5 border transition-all duration-500 cursor-pointer group flex flex-col justify-center relative overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.15),
                  0 8px 25px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                transform: `perspective(1000px) rotateX(${cardRotations[0].x}deg) rotateY(${cardRotations[0].y}deg) scale3d(1.1, 1.1, 1.1)`,
                transformStyle: 'preserve-3d',
                opacity: 1
              }}
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
              onClick={() => router.push('/menu/overview')}
            >
              {/* 컴포넌트 내부 그라데이션 오버레이 */}
              <div className="absolute inset-0 opacity-40" style={{
                background: `
                  linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, transparent 50%, rgba(59, 130, 246, 0.08) 100%),
                  radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)
                `
              }}></div>
              <div className="text-center relative z-10" style={{
                transform: `translateZ(50px) rotateX(${cardRotations[0].x * 0.1}deg) rotateY(${cardRotations[0].y * 0.1}deg)`,
                transformStyle: 'preserve-3d'
              }}>
                <div className="w-14 h-14 mx-auto mb-3 rounded-3xl flex items-center justify-center relative" style={{ 
                  background: 'linear-gradient(135deg, var(--accent-blue) 0%, rgba(59, 130, 246, 0.8) 100%)',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  transform: `translateZ(30px) rotateX(${cardRotations[0].x * 0.2}deg) rotateY(${cardRotations[0].y * 0.2}deg)`,
                  transformStyle: 'preserve-3d'
                }}>
                  <div className="absolute inset-0 rounded-3xl" style={{ 
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
                  }}></div>
                  <BarChart3 className="w-7 h-7 relative z-10 text-white drop-shadow-lg" style={{
                    transform: `translateZ(20px)`
                  }} />
                </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Overview</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>서비스 현황 개요</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    물류 서비스 현황과 주요 지표를 한눈에 확인할 수 있습니다.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: 'var(--accent-blue)' }}>
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
            </div>

            {/* My Order */}
            <div
              className="profile-card green-glow backdrop-blur-2xl rounded-3xl p-5 border transition-all duration-500 cursor-pointer group flex flex-col justify-center relative overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.15),
                  0 8px 25px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                transform: `perspective(1000px) rotateX(${cardRotations[1].x}deg) rotateY(${cardRotations[1].y}deg) scale3d(1.1, 1.1, 1.1)`,
                transformStyle: 'preserve-3d',
                opacity: 1
              }}
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
              onClick={() => router.push('/menu/my_order')}
            >
              {/* 컴포넌트 내부 그라데이션 오버레이 */}
              <div className="absolute inset-0 opacity-40" style={{
                background: `
                  linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, transparent 50%, rgba(34, 197, 94, 0.08) 100%),
                  radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)
                `
              }}></div>
              <div className="text-center relative z-10" style={{
                transform: `translateZ(50px) rotateX(${cardRotations[1].x * 0.1}deg) rotateY(${cardRotations[1].y * 0.1}deg)`,
                transformStyle: 'preserve-3d'
              }}>
                <div className="w-14 h-14 mx-auto mb-3 rounded-3xl flex items-center justify-center relative" style={{ 
                  background: 'linear-gradient(135deg, var(--accent-green) 0%, rgba(34, 197, 94, 0.8) 100%)',
                  boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  transform: `translateZ(30px) rotateX(${cardRotations[1].x * 0.2}deg) rotateY(${cardRotations[1].y * 0.2}deg)`,
                  transformStyle: 'preserve-3d'
                }}>
                  <div className="absolute inset-0 rounded-3xl" style={{ 
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
                  }}></div>
                  <ShoppingCart className="w-7 h-7 relative z-10 text-white drop-shadow-lg" style={{
                    transform: `translateZ(20px)`
                  }} />
                </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>My Order</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>내 물류 주문</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    내가 신청한 물류 서비스 주문 현황을 확인할 수 있습니다.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: 'var(--accent-green)' }}>
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
            </div>
                  
            {/* Quotation */}
            <div
              className="profile-card purple-glow backdrop-blur-2xl rounded-3xl p-5 border transition-all duration-500 cursor-pointer group flex flex-col justify-center relative overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.15),
                  0 8px 25px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                transform: `perspective(1000px) rotateX(${cardRotations[2].x}deg) rotateY(${cardRotations[2].y}deg) scale3d(1.1, 1.1, 1.1)`,
                transformStyle: 'preserve-3d',
                opacity: 1
              }}
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
              onClick={() => router.push('/menu/quotation')}
            >
              {/* 컴포넌트 내부 그라데이션 오버레이 */}
              <div className="absolute inset-0 opacity-40" style={{
                background: `
                  linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, transparent 50%, rgba(147, 51, 234, 0.08) 100%),
                  radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)
                `
              }}></div>
              <div className="text-center relative z-10" style={{
                transform: `translateZ(50px) rotateX(${cardRotations[2].x * 0.1}deg) rotateY(${cardRotations[2].y * 0.1}deg)`,
                transformStyle: 'preserve-3d'
              }}>
                <div className="w-14 h-14 mx-auto mb-3 rounded-3xl flex items-center justify-center relative" style={{ 
                  background: 'linear-gradient(135deg, var(--accent-purple) 0%, rgba(147, 51, 234, 0.8) 100%)',
                  boxShadow: '0 8px 32px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  transform: `translateZ(30px) rotateX(${cardRotations[2].x * 0.2}deg) rotateY(${cardRotations[2].y * 0.2}deg)`,
                  transformStyle: 'preserve-3d'
                }}>
                  <div className="absolute inset-0 rounded-3xl" style={{ 
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
                  }}></div>
                  <FileText className="w-7 h-7 relative z-10 text-white drop-shadow-lg" style={{
                    transform: `translateZ(20px)`
                  }} />
                </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Quotation</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>물류 견적</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    물류 서비스 견적서 요청 및 관리를 할 수 있습니다.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
            </div>

            {/* Account */}
            <div
              className="profile-card orange-glow backdrop-blur-2xl rounded-3xl p-5 border transition-all duration-500 cursor-pointer group flex flex-col justify-center relative overflow-hidden"
              style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 20px 60px rgba(0, 0, 0, 0.15),
                  0 8px 25px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                transform: `perspective(1000px) rotateX(${cardRotations[3].x}deg) rotateY(${cardRotations[3].y}deg) scale3d(1.1, 1.1, 1.1)`,
                transformStyle: 'preserve-3d',
                opacity: 1
              }}
              onMouseMove={(e) => handleMouseMove(e, 3)}
              onMouseLeave={() => handleMouseLeave(3)}
              onClick={() => router.push('/menu/account')}
            >
              {/* 컴포넌트 내부 그라데이션 오버레이 */}
              <div className="absolute inset-0 opacity-40" style={{
                background: `
                  linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, transparent 50%, rgba(249, 115, 22, 0.08) 100%),
                  radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)
                `
              }}></div>
              <div className="text-center relative z-10" style={{
                transform: `translateZ(50px) rotateX(${cardRotations[3].x * 0.1}deg) rotateY(${cardRotations[3].y * 0.1}deg)`,
                transformStyle: 'preserve-3d'
              }}>
                <div className="w-14 h-14 mx-auto mb-3 rounded-3xl flex items-center justify-center relative" style={{ 
                  background: 'linear-gradient(135deg, #f97316 0%, rgba(249, 115, 22, 0.8) 100%)',
                  boxShadow: '0 8px 32px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  transform: `translateZ(30px) rotateX(${cardRotations[3].x * 0.2}deg) rotateY(${cardRotations[3].y * 0.2}deg)`,
                  transformStyle: 'preserve-3d'
                }}>
                  <div className="absolute inset-0 rounded-3xl" style={{ 
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
                  }}></div>
                  <Calculator className="w-7 h-7 relative z-10 text-white drop-shadow-lg" style={{
                    transform: `translateZ(20px)`
                  }} />
                </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Account</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>정산 관리</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    물류 서비스 정산 내역을 확인하고 관리할 수 있습니다.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: '#f97316' }}>
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}