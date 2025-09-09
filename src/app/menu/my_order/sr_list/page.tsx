'use client';

import { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/common/hooks/useTheme';
import { SRTable } from './components/sr_table';

// Mock 데이터
const mockData = {
  srList: [
    {
      id: 1,
      srNo: 'SR25082601',
      houseBl: 'HINC250201',
      bound: 'EX',
      invNo: '950109240',
      consignee: 'SDV',
      pol: 'KRICN',
      pod: 'VNHAN',
      etd: '2025-08-20',
      eta: '2025-08-21',
      bkgStatus: '오더접수',
      progress: ['반입', '출발', '도착', '배송(D텀)'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 2,
      srNo: 'SR25082602',
      houseBl: 'HINC250202',
      bound: 'EX',
      invNo: '950150580',
      consignee: 'SDV',
      pol: 'KRICN',
      pod: 'VNHAN',
      etd: '2025-08-20',
      eta: '2025-08-21',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 302,000',
    },
    {
      id: 3,
      srNo: 'SR25082603',
      houseBl: 'HINC250203',
      bound: 'IM',
      invNo: '950150581',
      consignee: 'ABC Corp',
      pol: 'VNHAN',
      pod: 'KRICN',
      etd: '2025-08-22',
      eta: '2025-08-23',
      bkgStatus: '오더확정',
      progress: ['반입', '출발'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 4,
      srNo: 'SR25082604',
      houseBl: 'HINC250204',
      bound: 'EX',
      invNo: '950150582',
      consignee: 'Global Logistics',
      pol: 'KRICN',
      pod: 'USLAX',
      etd: '2025-08-25',
      eta: '2025-09-05',
      bkgStatus: '오더접수',
      progress: ['반입', '출발'],
      blPrint: 'PDF',
      account: 'KRW 1,250,000',
    },
    {
      id: 5,
      srNo: 'SR25082605',
      houseBl: 'HINC250205',
      bound: 'IM',
      invNo: '950150583',
      consignee: 'Tech Solutions',
      pol: 'USLAX',
      pod: 'KRICN',
      etd: '2025-08-28',
      eta: '2025-09-08',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 6,
      srNo: 'SR25082606',
      houseBl: 'HINC250206',
      bound: 'EX',
      invNo: '950150584',
      consignee: 'Marine Express',
      pol: 'KRICN',
      pod: 'SGSIN',
      etd: '2025-08-30',
      eta: '2025-09-02',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착', '배송(D텀)'],
      blPrint: 'PDF',
      account: 'KRW 850,000',
    },
    {
      id: 7,
      srNo: 'SR25082607',
      houseBl: 'HINC250207',
      bound: 'IM',
      invNo: '950150585',
      consignee: 'Asia Trading',
      pol: 'SGSIN',
      pod: 'KRICN',
      etd: '2025-09-01',
      eta: '2025-09-04',
      bkgStatus: '오더접수',
      progress: ['반입'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 8,
      srNo: 'SR25082608',
      houseBl: 'HINC250208',
      bound: 'EX',
      invNo: '950150586',
      consignee: 'European Imports',
      pol: 'KRICN',
      pod: 'DEHAM',
      etd: '2025-09-03',
      eta: '2025-09-15',
      bkgStatus: '오더확정',
      progress: ['반입', '출발'],
      blPrint: 'PDF',
      account: 'KRW 2,100,000',
    },
    {
      id: 9,
      srNo: 'SR25082609',
      houseBl: 'HINC250209',
      bound: 'IM',
      invNo: '950150587',
      consignee: 'Auto Parts Co',
      pol: 'DEHAM',
      pod: 'KRICN',
      etd: '2025-09-05',
      eta: '2025-09-18',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 10,
      srNo: 'SR25082610',
      houseBl: 'HINC250210',
      bound: 'EX',
      invNo: '950150588',
      consignee: 'Pacific Shipping',
      pol: 'KRICN',
      pod: 'JPYOK',
      etd: '2025-09-08',
      eta: '2025-09-10',
      bkgStatus: '오더접수',
      progress: ['반입', '출발', '도착', '배송(D텀)'],
      blPrint: 'PDF',
      account: 'KRW 450,000',
    },
    {
      id: 11,
      srNo: 'SR25082611',
      houseBl: 'HINC250211',
      bound: 'IM',
      invNo: '950150589',
      consignee: 'Ocean Freight Ltd',
      pol: 'JPYOK',
      pod: 'KRICN',
      etd: '2025-09-12',
      eta: '2025-09-14',
      bkgStatus: '오더확정',
      progress: ['반입', '출발'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 12,
      srNo: 'SR25082612',
      houseBl: 'HINC250212',
      bound: 'EX',
      invNo: '950150590',
      consignee: 'Global Trade Co',
      pol: 'KRICN',
      pod: 'CNTSN',
      etd: '2025-09-15',
      eta: '2025-09-18',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착', '배송(D텀)'],
      blPrint: 'PDF',
      account: 'KRW 1,800,000',
    },
    {
      id: 13,
      srNo: 'SR25082613',
      houseBl: 'HINC250213',
      bound: 'IM',
      invNo: '950150591',
      consignee: 'China Logistics',
      pol: 'CNTSN',
      pod: 'KRICN',
      etd: '2025-09-18',
      eta: '2025-09-21',
      bkgStatus: '오더접수',
      progress: ['반입'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 14,
      srNo: 'SR25082614',
      houseBl: 'HINC250214',
      bound: 'EX',
      invNo: '950150592',
      consignee: 'International Shipping',
      pol: 'KRICN',
      pod: 'THLCH',
      etd: '2025-09-20',
      eta: '2025-09-23',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 750,000',
    },
    {
      id: 15,
      srNo: 'SR25082615',
      houseBl: 'HINC250215',
      bound: 'IM',
      invNo: '950150593',
      consignee: 'Thai Import Co',
      pol: 'THLCH',
      pod: 'KRICN',
      etd: '2025-09-25',
      eta: '2025-09-28',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착', '배송(D텀)'],
      blPrint: null,
      account: 'KRW 0',
    }
  ]
};

export default function SRListPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="relative z-10 min-h-[calc(100vh-64px)] p-3 space-y-3">
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
          <div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              SR List
            </h1>
          </div>
        </div>

        {/* 그리드 테이블 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 mb-6 flex-1"
        >
          <SRTable 
            data={data.srList} 
            loading={loading} 
          />
        </motion.div>
      </div>
    </div>
  );
}