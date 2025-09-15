'use client';

import { useEffect } from 'react';
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '@/common/hooks/useTheme';
import { ShippingRequestForm } from '../../shipping_request/components/ShippingRequestForm';

interface ShippingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  srNo?: string;
}

export function ShippingRequestModal({ isOpen, onClose, srNo }: ShippingRequestModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`relative w-full max-w-6xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모달 헤더 */}
          <div className={`flex items-center justify-between p-4 border-b ${
            isDark ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div>
              <h2 className={`text-xl font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Shipping Request
              </h2>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {srNo ? `SR No: ${srNo}` : 'CASE ① 신규 SR 입력 시'}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDark 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 모달 컨텐츠 */}
          <div className="overflow-y-auto max-h-[calc(90vh-72px)]">
            <div className="p-6">
              <ShippingRequestForm srNo={srNo} isEditMode={!!srNo} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
