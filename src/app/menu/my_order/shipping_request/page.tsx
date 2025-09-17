'use client';

import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/common/hooks/useTheme';
import { ShippingRequestForm } from './components/ShippingRequestForm';

export default function ShippingRequestPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const srNo = searchParams.get('sr_no');
  const isEditMode = !!srNo;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* 레벨 2 패턴 배경 - My Order 초록색 계열 */}
      <div className="absolute inset-0">
        {/* 기본 그라데이션 - 초록색 계열 */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, rgba(34, 197, 94, 0.06) 0%, rgba(16, 185, 129, 0.08) 50%, rgba(5, 150, 105, 0.06) 100%)
          `
        }}></div>
        
        {/* 격자 패턴 - 더 작고 미묘하게 */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* 점 패턴 - 초록색 계열 */}
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, rgba(34, 197, 94, 0.25) 1.5px, transparent 1.5px),
            radial-gradient(circle at 60px 60px, rgba(16, 185, 129, 0.25) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '80px 80px, 120px 120px',
          backgroundPosition: '0 0, 40px 40px'
        }}></div>
        
        {/* 원형 패턴 - 더 작고 미묘하게 */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 3%),
            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 3%),
            radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 2%),
            radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 2%)
          `,
          backgroundSize: '300px 300px, 400px 400px, 200px 200px, 250px 250px',
          backgroundPosition: '0% 0%, 100% 100%, 30% 70%, 70% 30%'
        }}></div>
      </div>
      <div className="relative z-10 min-h-[calc(100vh-64px)] p-3 space-y-3">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/menu/my_order')}
              className="p-3 rounded-full transition-colors border backdrop-blur-sm"
              style={{
                background: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)',
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
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Shipping Request
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {srNo ? `SR No: ${srNo}` : 'CASE ① 신규 SR 입력 시'}
              </p>
            </div>

          </div>

          {/* Shipping Request 폼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm border p-6"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-color)'
            }}
          >
            <ShippingRequestForm srNo={srNo || undefined} isEditMode={isEditMode} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}