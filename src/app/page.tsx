'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3, ShoppingCart, FileText, 
  Package, Truck, ArrowRight
} from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';

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
  const { theme } = useTheme();

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
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="relative z-10 p-6">

        {/* 메인 콘텐츠 */}
        <div className="max-w-7xl mx-auto">
          {/* 브랜드 헤더 */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-blue)' }}>
                <Package className="w-6 h-6 text-white" />
            </div>
              <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>화주 포탈</h1>
            </div>
            <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
              스마트한 물류 관리의 시작
            </p>
          </motion.div>
          
          {/* 통계 대시보드 */}
            <motion.div
            initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            {/* 활성 주문 */}
            <div className="backdrop-blur-md rounded-xl p-6 border" style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: 'var(--accent-blue)', opacity: 0.2 }}>
                  <Package className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} />
                </div>
                <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>3</span>
                </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>진행중인 주문</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>이번 주 +1</p>
                </div>

            {/* 완료된 주문 */}
            <div className="backdrop-blur-md rounded-xl p-6 border" style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: 'var(--accent-green)', opacity: 0.2 }}>
                  <Truck className="w-5 h-5" style={{ color: 'var(--accent-green)' }} />
                </div>
                <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>12</span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>완료된 주문</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>이번 달 +3</p>
              </div>
              
            {/* 견적 요청 */}
            <div className="backdrop-blur-md rounded-xl p-6 border" style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: 'var(--accent-purple)', opacity: 0.2 }}>
                  <FileText className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
                </div>
                <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>5</span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>대기중인 견적</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>평균 2일</p>
                </div>

            {/* 완료된 견적 */}
            <div className="backdrop-blur-md rounded-xl p-6 border" style={{ 
              background: 'var(--bg-card)', 
              borderColor: 'var(--border-primary)' 
            }}>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: 'var(--accent-orange)', opacity: 0.2 }}>
                  <FileText className="w-5 h-5" style={{ color: 'var(--accent-orange)' }} />
                </div>
                <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>8</span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>완료된 견적</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>이번 달 +2</p>
                  </div>
                </motion.div>


          {/* 메인 서비스 */}
                <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
              주요 서비스
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Overview */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 cursor-pointer hover:scale-105 group"
                style={{ 
                  background: 'var(--bg-card)', 
                  borderColor: 'var(--border-primary)' 
                }}
                onClick={() => router.push('/menu/overview')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent-blue)', opacity: 0.2 }}>
                    <BarChart3 className="w-8 h-8" style={{ color: 'var(--accent-blue)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Overview</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>서비스 현황 개요</p>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    물류 서비스 현황과 주요 지표를 한눈에 확인할 수 있습니다.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: 'var(--accent-blue)' }}>
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                </motion.div>

              {/* My Order */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 cursor-pointer hover:scale-105 group"
                style={{ 
                  background: 'var(--bg-card)', 
                  borderColor: 'var(--border-primary)' 
                }}
                onClick={() => router.push('/menu/my_order')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent-green)', opacity: 0.2 }}>
                    <ShoppingCart className="w-8 h-8" style={{ color: 'var(--accent-green)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>My Order</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>내 물류 주문</p>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    내가 신청한 물류 서비스 주문 현황을 확인할 수 있습니다.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: 'var(--accent-green)' }}>
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                  </motion.div>
                  
              {/* Quotation */}
                  <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 cursor-pointer hover:scale-105 group"
                style={{ 
                  background: 'var(--bg-card)', 
                  borderColor: 'var(--border-primary)' 
                }}
                onClick={() => router.push('/menu/quotation')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accent-purple)', opacity: 0.2 }}>
                    <FileText className="w-8 h-8" style={{ color: 'var(--accent-purple)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Quotation</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>물류 견적</p>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    물류 서비스 견적서 요청 및 관리를 할 수 있습니다.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                  </motion.div>
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}