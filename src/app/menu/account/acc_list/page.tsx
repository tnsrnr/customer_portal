'use client';

import React, { useState } from 'react';
import { Calculator, Filter, Download, Eye, ArrowLeft, Search, Calendar, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AccTable } from './components/acc_table';
import { CostDetailTable } from './components/cost_detail_table';

interface AccData {
  id: number;
  doc: number;
  billingDate: string;
  functionName: string;
  settlementBasisNo: string;
  zeroRatedTotal: number;
  taxableAmount: number;
  finalAmount: number;
}

export default function AccListPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedRowData, setSelectedRowData] = useState<AccData | null>(null);
  
  // 검색 조건 상태
  const [searchConditions, setSearchConditions] = useState({
    startDate: '',
    endDate: '',
    functionName: '',
    settlementBasisNo: ''
  });
  
  // 필터링된 데이터
  const [filteredData, setFilteredData] = useState<AccData[]>([]);

  // Mock 데이터 - 청구 내역 데이터 (20개)
  const mockData: AccData[] = [
    {
      id: 1,
      doc: 3,
      billingDate: '2025.08.22',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHAINC25070066',
      zeroRatedTotal: 788897,
      taxableAmount: 376090,
      finalAmount: 1164987
    },
    {
      id: 2,
      doc: 3,
      billingDate: '2025.08.12',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHKINC25080001',
      zeroRatedTotal: 510337,
      taxableAmount: 376090,
      finalAmount: 886427
    },
    {
      id: 3,
      doc: 3,
      billingDate: '2025.07.16',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHKPTK25060004',
      zeroRatedTotal: 707527,
      taxableAmount: 363110,
      finalAmount: 1070637
    },
    {
      id: 4,
      doc: 3,
      billingDate: '2025.07.04',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHKPTK25050003',
      zeroRatedTotal: 755395,
      taxableAmount: 363110,
      finalAmount: 1118505
    },
    {
      id: 5,
      doc: 2,
      billingDate: '2025.06.28',
      functionName: '해상 수출',
      settlementBasisNo: 'HSHKPTK25040002',
      zeroRatedTotal: 623450,
      taxableAmount: 298750,
      finalAmount: 922200
    },
    {
      id: 6,
      doc: 4,
      billingDate: '2025.06.15',
      functionName: '항공 수입',
      settlementBasisNo: 'HSHAINC25030001',
      zeroRatedTotal: 445230,
      taxableAmount: 198450,
      finalAmount: 643680
    },
    {
      id: 7,
      doc: 3,
      billingDate: '2025.06.02',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHKPTK25020001',
      zeroRatedTotal: 892340,
      taxableAmount: 445120,
      finalAmount: 1337460
    },
    {
      id: 8,
      doc: 2,
      billingDate: '2025.05.20',
      functionName: '해상 수출',
      settlementBasisNo: 'HSHKPTK25010001',
      zeroRatedTotal: 567890,
      taxableAmount: 234560,
      finalAmount: 802450
    },
    {
      id: 9,
      doc: 5,
      billingDate: '2025.05.08',
      functionName: '항공 수출',
      settlementBasisNo: 'HSHAINC25000001',
      zeroRatedTotal: 345670,
      taxableAmount: 156780,
      finalAmount: 502450
    },
    {
      id: 10,
      doc: 3,
      billingDate: '2025.04.25',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHKPTK24090001',
      zeroRatedTotal: 678910,
      taxableAmount: 312450,
      finalAmount: 991360
    },
    {
      id: 11,
      doc: 4,
      billingDate: '2025.04.12',
      functionName: '항공 수입',
      settlementBasisNo: 'HSHAINC24080001',
      zeroRatedTotal: 456780,
      taxableAmount: 198340,
      finalAmount: 655120
    },
    {
      id: 12,
      doc: 2,
      billingDate: '2025.03.30',
      functionName: '해상 수출',
      settlementBasisNo: 'HSHKPTK24070001',
      zeroRatedTotal: 789120,
      taxableAmount: 345670,
      finalAmount: 1134790
    },
    {
      id: 13,
      doc: 3,
      billingDate: '2025.03.18',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHAINC24060001',
      zeroRatedTotal: 567340,
      taxableAmount: 234560,
      finalAmount: 801900
    },
    {
      id: 14,
      doc: 5,
      billingDate: '2025.03.05',
      functionName: '항공 수출',
      settlementBasisNo: 'HSHKPTK24050001',
      zeroRatedTotal: 345670,
      taxableAmount: 156780,
      finalAmount: 502450
    },
    {
      id: 15,
      doc: 4,
      billingDate: '2025.02.20',
      functionName: '항공 수입',
      settlementBasisNo: 'HSHAINC24040001',
      zeroRatedTotal: 456780,
      taxableAmount: 198340,
      finalAmount: 655120
    },
    {
      id: 16,
      doc: 3,
      billingDate: '2025.02.08',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHKPTK24030001',
      zeroRatedTotal: 678910,
      taxableAmount: 312450,
      finalAmount: 991360
    },
    {
      id: 17,
      doc: 2,
      billingDate: '2025.01.25',
      functionName: '해상 수출',
      settlementBasisNo: 'HSHAINC24020001',
      zeroRatedTotal: 789120,
      taxableAmount: 345670,
      finalAmount: 1134790
    },
    {
      id: 18,
      doc: 5,
      billingDate: '2025.01.12',
      functionName: '항공 수출',
      settlementBasisNo: 'HSHKPTK24010001',
      zeroRatedTotal: 345670,
      taxableAmount: 156780,
      finalAmount: 502450
    },
    {
      id: 19,
      doc: 4,
      billingDate: '2024.12.30',
      functionName: '항공 수입',
      settlementBasisNo: 'HSHAINC24000001',
      zeroRatedTotal: 456780,
      taxableAmount: 198340,
      finalAmount: 655120
    },
    {
      id: 20,
      doc: 3,
      billingDate: '2024.12.18',
      functionName: '해상 수입',
      settlementBasisNo: 'HSHKPTK23120001',
      zeroRatedTotal: 678910,
      taxableAmount: 312450,
      finalAmount: 991360
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
        new Date(item.billingDate.replace(/\./g, '-')) >= new Date(searchConditions.startDate)
      );
    }
    
    if (searchConditions.endDate) {
      filtered = filtered.filter(item => 
        new Date(item.billingDate.replace(/\./g, '-')) <= new Date(searchConditions.endDate)
      );
    }
    
    if (searchConditions.functionName) {
      filtered = filtered.filter(item => 
        item.functionName.toLowerCase().includes(searchConditions.functionName.toLowerCase())
      );
    }
    
    if (searchConditions.settlementBasisNo) {
      filtered = filtered.filter(item => 
        item.settlementBasisNo.toLowerCase().includes(searchConditions.settlementBasisNo.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  };

  // 검색 조건 초기화
  const handleReset = () => {
    setSearchConditions({
      startDate: '',
      endDate: '',
      functionName: '',
      settlementBasisNo: ''
    });
    setFilteredData([]);
  };

  // 초기 데이터 설정
  React.useEffect(() => {
    setFilteredData(mockData);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* 레벨 2 패턴 배경 - Account 오렌지색 계열 */}
      <div className="absolute inset-0">
        {/* 기본 그라데이션 - 오렌지색 계열 */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, rgba(249, 115, 22, 0.06) 0%, rgba(251, 146, 60, 0.08) 50%, rgba(234, 88, 12, 0.06) 100%)
          `
        }}></div>
        
        {/* 격자 패턴 - 더 작고 미묘하게 */}
        <div className="absolute inset-0 opacity-38" style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 146, 60, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px'
        }}></div>
        
        {/* 점 패턴 - 오렌지색 계열 */}
        <div className="absolute inset-0 opacity-32" style={{
          backgroundImage: `
            radial-gradient(circle at 21px 21px, rgba(249, 115, 22, 0.28) 1.5px, transparent 1.5px),
            radial-gradient(circle at 63px 63px, rgba(251, 146, 60, 0.28) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '84px 84px, 126px 126px',
          backgroundPosition: '0 0, 42px 42px'
        }}></div>
        
        {/* 원형 패턴 - 따뜻한 색조 */}
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
                onClick={() => router.back()}
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
                청구 내역
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
              {/* 청구일자 시작 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar className="w-3 h-3 inline mr-1" />
                  청구일자 (시작)
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
              
              {/* 청구일자 종료 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar className="w-3 h-3 inline mr-1" />
                  청구일자 (종료)
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
              
              {/* 기능명 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <FileText className="w-3 h-3 inline mr-1" />
                  기능명
                </label>
                <input
                  type="text"
                  placeholder="해상 수입, 해상 수출 등"
                  value={searchConditions.functionName}
                  onChange={(e) => handleSearchConditionChange('functionName', e.target.value)}
                  className="w-full px-2 py-1 rounded border text-xs"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              
              {/* 정산근거번호 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <FileText className="w-3 h-3 inline mr-1" />
                  정산근거번호
                </label>
                <input
                  type="text"
                  placeholder="HSHAINC25070066"
                  value={searchConditions.settlementBasisNo}
                  onChange={(e) => handleSearchConditionChange('settlementBasisNo', e.target.value)}
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
              <div className="flex flex-col lg:flex-row gap-6">
                {/* 왼쪽: 청구 내역 테이블 */}
                <div className="flex-1" style={{ minWidth: '780px' }}>
                  <AccTable 
                    data={filteredData.length > 0 ? filteredData : mockData} 
                    loading={isLoading} 
                    onRowSelect={setSelectedRowData}
                  />
                </div>

                {/* 오른쪽: 비용 상세 정보 테이블 */}
                <div className="flex-1" style={{ minWidth: '770px', maxWidth: '770px' }}>
                  <div style={{ height: '500px' }}>
                    <CostDetailTable selectedRowData={selectedRowData} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
