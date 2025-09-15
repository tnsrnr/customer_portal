'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';
import QuotationRequestForm from './QuotationRequestForm';

interface QuotationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotationNo: string;
}

export function QuotationRequestModal({ isOpen, onClose, quotationNo }: QuotationRequestModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 모달 컨테이너 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-6xl max-h-[90vh] mx-4 rounded-lg shadow-2xl overflow-hidden"
            style={{
              background: isDark ? 'var(--bg-card)' : 'white',
              border: `1px solid ${isDark ? 'var(--border-color)' : '#e5e7eb'}`
            }}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  견적서 요청 수정 - {quotationNo}
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  견적서 정보를 수정하거나 확인하세요
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full transition-colors"
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
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* 모달 내용 */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              <QuotationRequestForm quotationNo={quotationNo} onClose={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
