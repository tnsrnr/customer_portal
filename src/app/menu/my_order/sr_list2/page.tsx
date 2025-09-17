'use client';

import React, { useState } from 'react';
import { Package, Filter, Download, Eye, ArrowLeft, Search, Calendar, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SRTable } from './components/sr_table';

interface SRData {
  id: number;
  srNo: string;
  houseBl: string;
  bound: string;
  invNo: string;
  consignee: string;
  pol: string;
  pod: string;
  etd: string;
  eta: string;
  bkgStatus: string;
  progress: string[];
  blPrint: string | null;
  account: string;
}

export default function SRList2Page() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  
  // 검색 조건 상태
  const [searchConditions, setSearchConditions] = useState({
    startDate: '',
    endDate: '',
    srNo: '',
    consignee: ''
  });
  
  // 필터링된 데이터
  const [filteredData, setFilteredData] = useState<SRData[]>([]);

  // Mock 데이터 - SR 데이터 (15개)
  const mockData: SRData[] = [
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
      consignee: 'Samsung Electronics',
      pol: 'KRICN',
      pod: 'JPNRT',
      etd: '2025-09-01',
      eta: '2025-09-03',
      bkgStatus: '오더접수',
      progress: ['반입'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 7,
      srNo: 'SR25082607',
      houseBl: 'HINC250207',
      bound: 'IM',
      invNo: '950150585',
      consignee: 'LG Display',
      pol: 'JPNRT',
      pod: 'KRICN',
      etd: '2025-09-02',
      eta: '2025-09-04',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 680,000',
    },
    {
      id: 8,
      srNo: 'SR25082608',
      houseBl: 'HINC250208',
      bound: 'EX',
      invNo: '950150586',
      consignee: 'Hyundai Motor',
      pol: 'KRICN',
      pod: 'DEHAM',
      etd: '2025-09-05',
      eta: '2025-09-20',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착', '통관', '배송'],
      blPrint: 'PDF',
      account: 'KRW 2,150,000',
    },
    {
      id: 9,
      srNo: 'SR25082609',
      houseBl: 'HINC250209',
      bound: 'IM',
      invNo: '950150587',
      consignee: 'SK Hynix',
      pol: 'DEHAM',
      pod: 'KRICN',
      etd: '2025-09-07',
      eta: '2025-09-22',
      bkgStatus: '오더접수',
      progress: ['반입', '출발'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 10,
      srNo: 'SR25082610',
      houseBl: 'HINC250210',
      bound: 'EX',
      invNo: '950150588',
      consignee: 'POSCO',
      pol: 'KRICN',
      pod: 'SGSIN',
      etd: '2025-09-10',
      eta: '2025-09-15',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 890,000',
    },
    {
      id: 11,
      srNo: 'SR25082611',
      houseBl: 'HINC250211',
      bound: 'IM',
      invNo: '950150589',
      consignee: 'Naver Corp',
      pol: 'SGSIN',
      pod: 'KRICN',
      etd: '2025-09-12',
      eta: '2025-09-17',
      bkgStatus: '오더접수',
      progress: ['반입'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 12,
      srNo: 'SR25082612',
      houseBl: 'HINC250212',
      bound: 'EX',
      invNo: '950150590',
      consignee: 'Kakao Corp',
      pol: 'KRICN',
      pod: 'HKHKG',
      etd: '2025-09-14',
      eta: '2025-09-16',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착', '통관'],
      blPrint: 'PDF',
      account: 'KRW 520,000',
    },
    {
      id: 13,
      srNo: 'SR25082613',
      houseBl: 'HINC250213',
      bound: 'IM',
      invNo: '950150591',
      consignee: 'Coupang',
      pol: 'HKHKG',
      pod: 'KRICN',
      etd: '2025-09-16',
      eta: '2025-09-18',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 340,000',
    },
    {
      id: 14,
      srNo: 'SR25082614',
      houseBl: 'HINC250214',
      bound: 'EX',
      invNo: '950150592',
      consignee: 'Doosan Heavy',
      pol: 'KRICN',
      pod: 'AUMEL',
      etd: '2025-09-18',
      eta: '2025-10-05',
      bkgStatus: '오더접수',
      progress: ['반입', '출발'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 15,
      srNo: 'SR25082615',
      houseBl: 'HINC250215',
      bound: 'IM',
      invNo: '950150593',
      consignee: 'Hanwha Systems',
      pol: 'AUMEL',
      pod: 'KRICN',
      etd: '2025-09-20',
      eta: '2025-10-08',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 1,850,000',
    },
    {
      id: 16,
      srNo: 'SR25082616',
      houseBl: 'HINC250216',
      bound: 'EX',
      invNo: '950150594',
      consignee: 'KT Corporation',
      pol: 'KRICN',
      pod: 'THBKK',
      etd: '2025-09-22',
      eta: '2025-09-28',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착', '통관', '배송'],
      blPrint: 'PDF',
      account: 'KRW 750,000',
    },
    {
      id: 17,
      srNo: 'SR25082617',
      houseBl: 'HINC250217',
      bound: 'IM',
      invNo: '950150595',
      consignee: 'Lotte Chemical',
      pol: 'THBKK',
      pod: 'KRICN',
      etd: '2025-09-24',
      eta: '2025-09-30',
      bkgStatus: '오더접수',
      progress: ['반입'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 18,
      srNo: 'SR25082618',
      houseBl: 'HINC250218',
      bound: 'EX',
      invNo: '950150596',
      consignee: 'GS Caltex',
      pol: 'KRICN',
      pod: 'MYPEN',
      etd: '2025-09-26',
      eta: '2025-10-02',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 920,000',
    },
    {
      id: 19,
      srNo: 'SR25082619',
      houseBl: 'HINC250219',
      bound: 'IM',
      invNo: '950150597',
      consignee: 'S-Oil Corporation',
      pol: 'MYPEN',
      pod: 'KRICN',
      etd: '2025-09-28',
      eta: '2025-10-04',
      bkgStatus: '오더접수',
      progress: ['반입', '출발'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 20,
      srNo: 'SR25082620',
      houseBl: 'HINC250220',
      bound: 'EX',
      invNo: '950150598',
      consignee: 'Hanjin Shipping',
      pol: 'KRICN',
      pod: 'PHMNL',
      etd: '2025-09-30',
      eta: '2025-10-08',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착', '통관'],
      blPrint: 'PDF',
      account: 'KRW 1,120,000',
    },
    {
      id: 21,
      srNo: 'SR25082621',
      houseBl: 'HINC250221',
      bound: 'IM',
      invNo: '950150599',
      consignee: 'HMM Logistics',
      pol: 'PHMNL',
      pod: 'KRICN',
      etd: '2025-10-01',
      eta: '2025-10-09',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 580,000',
    },
    {
      id: 22,
      srNo: 'SR25082622',
      houseBl: 'HINC250222',
      bound: 'EX',
      invNo: '950150600',
      consignee: 'CJ Logistics',
      pol: 'KRICN',
      pod: 'IDBLJ',
      etd: '2025-10-03',
      eta: '2025-10-12',
      bkgStatus: '오더접수',
      progress: ['반입'],
      blPrint: null,
      account: 'KRW 0',
    },
    {
      id: 23,
      srNo: 'SR25082623',
      houseBl: 'HINC250223',
      bound: 'IM',
      invNo: '950150601',
      consignee: 'Pantos Logistics',
      pol: 'IDBLJ',
      pod: 'KRICN',
      etd: '2025-10-05',
      eta: '2025-10-14',
      bkgStatus: '오더확정',
      progress: ['반입', '출발', '도착'],
      blPrint: 'PDF',
      account: 'KRW 1,340,000',
    },
    {
      id: 24,
      srNo: 'SR25082624',
      houseBl: 'HINC250224',
      bound: 'EX',
      invNo: '950150602',
      consignee: 'KMTC Logistics',
      pol: 'KRICN',
      pod: 'INCCU',
      etd: '2025-10-07',
      eta: '2025-10-20',
      bkgStatus: '오더마감',
      progress: ['반입', '출발', '도착', '통관', '배송'],
      blPrint: 'PDF',
      account: 'KRW 2,450,000',
    },
    {
      id: 25,
      srNo: 'SR25082625',
      houseBl: 'HINC250225',
      bound: 'IM',
      invNo: '950150603',
      consignee: 'Sinotrans Korea',
      pol: 'INCCU',
      pod: 'KRICN',
      etd: '2025-10-09',
      eta: '2025-10-22',
      bkgStatus: '오더접수',
      progress: ['반입', '출발'],
      blPrint: null,
      account: 'KRW 0',
    }
  ];

  const [isLoading, setIsLoading] = useState(false);

  // 검색 조건 변경 핸들러
  const handleSearchConditionChange = (field: string, value: string) => {
    setSearchConditions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 검색 실행
  const handleSearch = () => {
    let filtered = [...mockData];
    
    if (searchConditions.startDate) {
      filtered = filtered.filter(item => 
        new Date(item.etd) >= new Date(searchConditions.startDate)
      );
    }
    
    if (searchConditions.endDate) {
      filtered = filtered.filter(item => 
        new Date(item.etd) <= new Date(searchConditions.endDate)
      );
    }
    
    if (searchConditions.srNo) {
      filtered = filtered.filter(item => 
        item.srNo.toLowerCase().includes(searchConditions.srNo.toLowerCase())
      );
    }
    
    if (searchConditions.consignee) {
      filtered = filtered.filter(item => 
        item.consignee.toLowerCase().includes(searchConditions.consignee.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  };

  // 검색 조건 초기화
  const handleReset = () => {
    setSearchConditions({
      startDate: '',
      endDate: '',
      srNo: '',
      consignee: ''
    });
    setFilteredData([]);
  };

  // 초기 데이터 설정
  React.useEffect(() => {
    setFilteredData(mockData);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* 레벨 2 패턴 배경 - My Order 초록색 계열 */}
      <div className="absolute inset-0">
        {/* 기본 그라데이션 - 초록색 계열 */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, rgba(34, 197, 94, 0.06) 0%, rgba(16, 185, 129, 0.08) 50%, rgba(5, 150, 105, 0.06) 100%)
          `
        }}></div>
        
        {/* 격자 패턴 - 더 작고 미묘하게 */}
        <div className="absolute inset-0 opacity-38" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px'
        }}></div>
        
        {/* 점 패턴 - 초록색 계열 */}
        <div className="absolute inset-0 opacity-32" style={{
          backgroundImage: `
            radial-gradient(circle at 21px 21px, rgba(34, 197, 94, 0.28) 1.5px, transparent 1.5px),
            radial-gradient(circle at 63px 63px, rgba(16, 185, 129, 0.28) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '84px 84px, 126px 126px',
          backgroundPosition: '0 0, 42px 42px'
        }}></div>
        
        {/* 원형 패턴 - 초록색 색조 */}
        <div className="absolute inset-0 opacity-16" style={{
          backgroundImage: `
            radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.18) 0%, transparent 3%),
            radial-gradient(circle at 65% 75%, rgba(255, 255, 255, 0.14) 0%, transparent 3%),
            radial-gradient(circle at 15% 65%, rgba(255, 255, 255, 0.1) 0%, transparent 2%),
            radial-gradient(circle at 85% 35%, rgba(255, 255, 255, 0.1) 0%, transparent 2%)
          `,
          backgroundSize: '320px 320px, 420px 420px, 200px 200px, 260px 260px',
          backgroundPosition: '0% 0%, 100% 100%, 15% 65%, 85% 35%'
        }}></div>
      </div>
      
      <div className="relative z-10 p-6">
        <div className="w-full">
          {/* 헤더 */}
          <div className="mb-8">
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
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                SR List 2
              </h1>
            </div>
          </div>

          {/* 통합된 검색 조건 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 p-4 rounded-lg border backdrop-blur-sm"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)'
            }}
          >
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              {/* ETD 시작 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar className="w-3 h-3 inline mr-1" />
                  ETD (시작)
                </label>
                <input
                  type="date"
                  value={searchConditions.startDate}
                  onChange={(e) => handleSearchConditionChange('startDate', e.target.value)}
                  className="w-full px-2 py-1 rounded border text-xs"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              
              {/* ETD 종료 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar className="w-3 h-3 inline mr-1" />
                  ETD (종료)
                </label>
                <input
                  type="date"
                  value={searchConditions.endDate}
                  onChange={(e) => handleSearchConditionChange('endDate', e.target.value)}
                  className="w-full px-2 py-1 rounded border text-xs"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              
              {/* SR 번호 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <FileText className="w-3 h-3 inline mr-1" />
                  SR 번호
                </label>
                <input
                  type="text"
                  placeholder="SR25082601"
                  value={searchConditions.srNo}
                  onChange={(e) => handleSearchConditionChange('srNo', e.target.value)}
                  className="w-full px-2 py-1 rounded border text-xs"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              
              {/* 수하인 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <FileText className="w-3 h-3 inline mr-1" />
                  수하인
                </label>
                <input
                  type="text"
                  placeholder="SDV, ABC Corp"
                  value={searchConditions.consignee}
                  onChange={(e) => handleSearchConditionChange('consignee', e.target.value)}
                  className="w-full px-2 py-1 rounded border text-xs"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
            
            {/* 검색 버튼들 */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="px-3 py-1 rounded border transition-colors flex items-center gap-1 text-xs"
                style={{
                  background: 'var(--bg-primary)',
                  borderColor: 'var(--border-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                <Search className="w-3 h-3" />
                검색
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="px-3 py-1 rounded border transition-colors text-xs"
                style={{
                  background: 'var(--bg-primary)',
                  borderColor: 'var(--border-secondary)',
                  color: 'var(--text-secondary)'
                }}
              >
                초기화
              </motion.button>
              
              <div className="ml-auto text-xs" style={{ color: 'var(--text-secondary)' }}>
                검색 결과: {filteredData.length}건
              </div>
            </div>
          </motion.div>

          {/* 통합된 테이블 컨테이너 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg border overflow-hidden shadow-lg"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* 통합된 테이블 영역 */}
            <div className="p-6">
              {/* SR 목록 테이블만 */}
              <div className="w-full">
                <SRTable 
                  data={filteredData.length > 0 ? filteredData : mockData} 
                  loading={isLoading} 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
