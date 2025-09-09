'use client';

import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft, FileText, Download, CheckCircle, Circle, Clock, Truck, MapPin } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/components/ui/table';

export default function SRListPage() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const srList = [
    {
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
      selected: true
    },
    {
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
      selected: false
    },
    {
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
      selected: false
    }
  ];

  const getBkgStatusColor = (status: string) => {
    switch (status) {
      case '오더접수':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case '오더확정':
        return 'text-green-600 bg-green-100 border-green-200';
      case '오더마감':
        return 'text-gray-600 bg-gray-100 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getProgressIcon = (step: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <Circle className="w-4 h-4 text-gray-300" />;
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-full mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/menu/my_order')}
            className="p-3 rounded-full transition-colors border"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              color: 'var(--text-primary)'
            }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>SR List</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Shipping Request 목록을 확인하고 관리하세요</p>
          </div>
        </motion.div>

        {/* 검색 및 필터 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="SR 번호, B/L 번호, 인보이스 번호로 검색..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border transition-colors"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-primary)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <button
            className="px-6 py-3 rounded-xl border transition-colors flex items-center gap-2"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              color: 'var(--text-primary)'
            }}
          >
            <Filter className="w-5 h-5" />
            필터
          </button>
        </motion.div>

        {/* SR List 테이블 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="backdrop-blur-md rounded-2xl border overflow-hidden"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-primary)' 
          }}
        >
          <Table className="min-w-[1400px]">
            <TableHeader>
              <TableRow style={{ background: 'var(--bg-tertiary)' }}>
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead className="w-32" style={{ color: 'var(--text-primary)' }}>SR NO.</TableHead>
                <TableHead className="w-32" style={{ color: 'var(--text-primary)' }}>House B/L</TableHead>
                <TableHead className="w-16" style={{ color: 'var(--text-primary)' }}>Bound</TableHead>
                <TableHead className="w-32" style={{ color: 'var(--text-primary)' }}>INV NO.</TableHead>
                <TableHead className="w-24" style={{ color: 'var(--text-primary)' }}>Consignee</TableHead>
                <TableHead className="w-20" style={{ color: 'var(--text-primary)' }}>POL</TableHead>
                <TableHead className="w-20" style={{ color: 'var(--text-primary)' }}>POD</TableHead>
                <TableHead className="w-28" style={{ color: 'var(--text-primary)' }}>ETD</TableHead>
                <TableHead className="w-28" style={{ color: 'var(--text-primary)' }}>ETA</TableHead>
                <TableHead className="w-28" style={{ color: 'var(--text-primary)' }}>BKG Status</TableHead>
                <TableHead className="w-48" style={{ color: 'var(--text-primary)' }}>Progress</TableHead>
                <TableHead className="w-24" style={{ color: 'var(--text-primary)' }}>B/L Print</TableHead>
                <TableHead className="w-32" style={{ color: 'var(--text-primary)' }}>Account</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {srList.map((sr, index) => (
                <motion.tr
                  key={sr.srNo}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className={`transition-colors hover:bg-opacity-50 ${
                    sr.selected ? 'bg-blue-50 bg-opacity-20' : ''
                  }`}
                  style={{ 
                    borderColor: 'var(--border-secondary)',
                    background: sr.selected ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                  }}
                >
                  <TableCell className="w-12">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={sr.selected}
                      onChange={() => {}}
                    />
                  </TableCell>
                  <TableCell className="w-32">
                    <button 
                      className="underline font-medium hover:no-underline transition-all text-sm"
                      style={{ color: 'var(--accent-blue)' }}
                      onClick={() => {}}
                    >
                      {sr.srNo}
                    </button>
                  </TableCell>
                  <TableCell className="w-32">
                    <button 
                      className="underline font-medium hover:no-underline transition-all text-sm"
                      style={{ color: 'var(--accent-blue)' }}
                      onClick={() => {}}
                    >
                      {sr.houseBl}
                    </button>
                  </TableCell>
                  <TableCell className="w-16 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{sr.bound}</TableCell>
                  <TableCell className="w-32 text-sm" style={{ color: 'var(--text-secondary)' }}>{sr.invNo}</TableCell>
                  <TableCell className="w-24 text-sm" style={{ color: 'var(--text-secondary)' }}>{sr.consignee}</TableCell>
                  <TableCell className="w-20 text-sm" style={{ color: 'var(--text-secondary)' }}>{sr.pol}</TableCell>
                  <TableCell className="w-20 text-sm" style={{ color: 'var(--text-secondary)' }}>{sr.pod}</TableCell>
                  <TableCell className="w-28 text-sm" style={{ color: 'var(--text-secondary)' }}>{sr.etd}</TableCell>
                  <TableCell className="w-28 text-sm" style={{ color: 'var(--text-secondary)' }}>{sr.eta}</TableCell>
                  <TableCell className="w-28">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getBkgStatusColor(sr.bkgStatus)}`}>
                      {sr.bkgStatus}
                    </span>
                  </TableCell>
                  <TableCell className="w-48">
                    <div className="flex items-center gap-1 flex-wrap">
                      {sr.progress.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center gap-1">
                          {getProgressIcon(step, true)}
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{step}</span>
                          {stepIndex < sr.progress.length - 1 && <span className="text-gray-300 text-xs">→</span>}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="w-24">
                    {sr.blPrint ? (
                      <button className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors">
                        <FileText className="w-4 h-4" />
                        <span className="text-xs">PDF</span>
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="w-32">
                    {sr.account !== 'KRW 0' ? (
                      <button 
                        className="underline font-medium hover:no-underline transition-all text-sm"
                        style={{ color: 'var(--accent-blue)' }}
                        onClick={() => {}}
                      >
                        {sr.account}
                      </button>
                    ) : (
                      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{sr.account}</span>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* 하단 설명 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center">
            <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              SR NO. 클릭하면 Shipping request 화면으로 이동
            </div>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              해당 화면에서 S/R 변경, 취소요청 가능
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              BKG Status: 오더요청 → 접수 → 확정 → 마감 순
            </div>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              주문 처리 단계별 상태 확인
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              B/L FINAL 단계에서 PDF 생성, 금액 확정 시 인보이스 PDF 오픈
            </div>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              최종 금액 클릭 시 인보이스 PDF 다운로드
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
