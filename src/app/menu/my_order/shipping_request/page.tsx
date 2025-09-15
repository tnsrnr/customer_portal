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