'use client';

import { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/common/hooks/useTheme';
import { QuotationRequestModal } from './components/QuotationRequestModal';

// Mock 데이터 - quotation_request의 필드들을 기반으로 구성
const mockData = {
  quotationList: [
    {
      id: 1,
      quotationNo: 'QUO25082601',
      shipmentType: 'AE',
      incoterms: 'FOB',
      pol: 'KRICN',
      pod: 'VNHAN',
      etd: '2025-08-20',
      eta: '2025-08-21',
      shipper: 'ABC 물류',
      consignee: 'SDV',
      cargoType: 'General',
      itemInfo: 'Electronics',
      pkgType: 'CTN',
      pkgQty: '10',
      grossWeight: '500 kg',
      cbm: '2.5',
      status: '승인',
      quotationAmount: '₩3,500,000',
      requestDate: '2025-08-15',
      approvalDate: '2025-08-16',
      validUntil: '2026-02-16',
      customsClearance: true,
      insurance: false,
      inlandTransport: true,
    },
    {
      id: 2,
      quotationNo: 'QUO25082602',
      shipmentType: 'AI',
      incoterms: 'CIF',
      pol: 'VNHAN',
      pod: 'KRICN',
      etd: '2025-08-22',
      eta: '2025-08-23',
      shipper: 'XYZ 트레이딩',
      consignee: 'ABC Corp',
      cargoType: 'DG',
      itemInfo: 'Chemicals',
      pkgType: 'DRUM',
      pkgQty: '5',
      grossWeight: '200 kg',
      cbm: '1.2',
      status: '검토중',
      quotationAmount: '₩2,100,000',
      requestDate: '2025-08-18',
      approvalDate: null,
      validUntil: null,
      customsClearance: true,
      insurance: true,
      inlandTransport: false,
    },
    {
      id: 3,
      quotationNo: 'QUO25082603',
      shipmentType: 'OE',
      incoterms: 'FCA',
      pol: 'KRICN',
      pod: 'USLAX',
      etd: '2025-08-25',
      eta: '2025-09-05',
      shipper: 'DEF 그룹',
      consignee: 'Global Logistics',
      cargoType: 'Reefer',
      itemInfo: 'Food Products',
      pkgType: 'PLT',
      pkgQty: '20',
      grossWeight: '1000 kg',
      cbm: '5.8',
      status: '대기',
      quotationAmount: '₩5,800,000',
      requestDate: '2025-08-20',
      approvalDate: null,
      validUntil: null,
      customsClearance: false,
      insurance: true,
      inlandTransport: true,
    },
    {
      id: 4,
      quotationNo: 'QUO25082604',
      shipmentType: 'OI',
      incoterms: 'DDP',
      pol: 'USLAX',
      pod: 'KRICN',
      etd: '2025-08-28',
      eta: '2025-09-08',
      shipper: 'Tech Solutions',
      consignee: 'Marine Express',
      cargoType: 'General',
      itemInfo: 'Machinery',
      pkgType: 'CASE',
      pkgQty: '3',
      grossWeight: '800 kg',
      cbm: '3.2',
      status: '승인',
      quotationAmount: '₩4,200,000',
      requestDate: '2025-08-22',
      approvalDate: '2025-08-23',
      validUntil: '2026-02-23',
      customsClearance: true,
      insurance: true,
      inlandTransport: true,
    },
    {
      id: 5,
      quotationNo: 'QUO25082605',
      shipmentType: 'AE',
      incoterms: 'FOB',
      pol: 'KRICN',
      pod: 'SGSIN',
      etd: '2025-08-30',
      eta: '2025-09-02',
      shipper: 'Asia Trading',
      consignee: 'Singapore Corp',
      cargoType: 'General',
      itemInfo: 'Textiles',
      pkgType: 'BAG',
      pkgQty: '15',
      grossWeight: '300 kg',
      cbm: '1.8',
      status: '검토중',
      quotationAmount: '₩1,850,000',
      requestDate: '2025-08-25',
      approvalDate: null,
      validUntil: null,
      customsClearance: false,
      insurance: false,
      inlandTransport: false,
    },
    {
      id: 6,
      quotationNo: 'QUO25082606',
      shipmentType: 'OE',
      incoterms: 'CIF',
      pol: 'KRICN',
      pod: 'DEHAM',
      etd: '2025-09-03',
      eta: '2025-09-15',
      shipper: 'European Imports',
      consignee: 'German Logistics',
      cargoType: 'Special',
      itemInfo: 'Auto Parts',
      pkgType: 'PLT',
      pkgQty: '8',
      grossWeight: '600 kg',
      cbm: '2.4',
      status: '대기',
      quotationAmount: '₩3,200,000',
      requestDate: '2025-08-28',
      customsClearance: true,
      insurance: true,
      inlandTransport: false,
    },
    {
      id: 7,
      quotationNo: 'QUO25082607',
      shipmentType: 'AI',
      incoterms: 'EXW',
      pol: 'DEHAM',
      pod: 'KRICN',
      etd: '2025-09-05',
      eta: '2025-09-18',
      shipper: 'Auto Parts Co',
      consignee: 'Korean Motors',
      cargoType: 'General',
      itemInfo: 'Vehicle Parts',
      pkgType: 'CTN',
      pkgQty: '12',
      grossWeight: '400 kg',
      cbm: '2.0',
      status: '승인',
      quotationAmount: '₩2,800,000',
      requestDate: '2025-08-30',
      customsClearance: true,
      insurance: false,
      inlandTransport: true,
    },
    {
      id: 8,
      quotationNo: 'QUO25082608',
      shipmentType: 'AE',
      incoterms: 'FOB',
      pol: 'KRICN',
      pod: 'JPYOK',
      etd: '2025-09-08',
      eta: '2025-09-10',
      shipper: 'Pacific Shipping',
      consignee: 'Japan Trading',
      cargoType: 'General',
      itemInfo: 'Electronics',
      pkgType: 'CTN',
      pkgQty: '25',
      grossWeight: '750 kg',
      cbm: '3.5',
      status: '검토중',
      quotationAmount: '₩1,450,000',
      requestDate: '2025-09-02',
      customsClearance: false,
      insurance: true,
      inlandTransport: false,
    },
    {
      id: 9,
      quotationNo: 'QUO25082609',
      shipmentType: 'OI',
      incoterms: 'DAP',
      pol: 'JPYOK',
      pod: 'KRICN',
      etd: '2025-09-12',
      eta: '2025-09-14',
      shipper: 'Ocean Freight Ltd',
      consignee: 'Korean Import Co',
      cargoType: 'Reefer',
      itemInfo: 'Seafood',
      pkgType: 'CASE',
      pkgQty: '6',
      grossWeight: '150 kg',
      cbm: '0.9',
      status: '대기',
      quotationAmount: '₩950,000',
      requestDate: '2025-09-05',
      customsClearance: true,
      insurance: true,
      inlandTransport: true,
    },
    {
      id: 10,
      quotationNo: 'QUO25082610',
      shipmentType: 'OE',
      incoterms: 'CFR',
      pol: 'KRICN',
      pod: 'CNTSN',
      etd: '2025-09-15',
      eta: '2025-09-18',
      shipper: 'Global Trade Co',
      consignee: 'China Logistics',
      cargoType: 'General',
      itemInfo: 'Industrial Goods',
      pkgType: 'PLT',
      pkgQty: '18',
      grossWeight: '900 kg',
      cbm: '4.2',
      status: '승인',
      quotationAmount: '₩2,600,000',
      requestDate: '2025-09-08',
      customsClearance: false,
      insurance: false,
      inlandTransport: true,
    }
  ]
};

export default function QuotationListPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    shipmentType: '',
    pol: '',
    pod: ''
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedQuotationNo, setSelectedQuotationNo] = useState<string>('');

  // 필터링된 데이터
  const filteredData = data.quotationList.filter(quotation => {
    return (
      (filters.shipmentType === '' || quotation.shipmentType === filters.shipmentType) &&
      (filters.pol === '' || quotation.pol === filters.pol) &&
      (filters.pod === '' || quotation.pod === filters.pod)
    );
  });

  // 고유값 추출
  const uniqueShipmentTypes = Array.from(new Set(data.quotationList.map(q => q.shipmentType)));
  const uniquePOLs = Array.from(new Set(data.quotationList.map(q => q.pol)));
  const uniquePODs = Array.from(new Set(data.quotationList.map(q => q.pod)));

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      shipmentType: '',
      pol: '',
      pod: ''
    });
  };

  // 모달 열기 함수
  const handleOpenModal = (quotationNo: string) => {
    setSelectedQuotationNo(quotationNo);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuotationNo('');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* 레벨 2 패턴 배경 - Quotation 보라색 계열 */}
      <div className="absolute inset-0">
        {/* 기본 그라데이션 - 보라색 계열 */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, rgba(147, 51, 234, 0.06) 0%, rgba(168, 85, 247, 0.08) 50%, rgba(124, 58, 237, 0.06) 100%)
          `
        }}></div>
        
        {/* 격자 패턴 - 더 작고 미묘하게 */}
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px'
        }}></div>
        
        {/* 점 패턴 - 보라색 계열 */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 22px 22px, rgba(147, 51, 234, 0.25) 1.5px, transparent 1.5px),
            radial-gradient(circle at 65px 65px, rgba(168, 85, 247, 0.25) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '90px 90px, 130px 130px',
          backgroundPosition: '0 0, 45px 45px'
        }}></div>
        
        {/* 원형 패턴 - 보라색 색조 */}
        <div className="absolute inset-0 opacity-18" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 3%),
            radial-gradient(circle at 75% 70%, rgba(255, 255, 255, 0.12) 0%, transparent 3%),
            radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 2%),
            radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 2%)
          `,
          backgroundSize: '280px 280px, 380px 380px, 180px 180px, 220px 220px',
          backgroundPosition: '0% 0%, 100% 100%, 40% 80%, 60% 20%'
        }}></div>
      </div>
      
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="p-3 space-y-3">
        {/* 헤더 */}
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/menu/quotation')}
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
              견적서 리스트
            </h1>
          </div>
        </div>

        {/* 필터 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border p-4 mb-4"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              필터:
            </div>
            
            {/* 선적유형 필터 */}
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                선적유형
              </label>
              <select
                value={filters.shipmentType}
                onChange={(e) => handleFilterChange('shipmentType', e.target.value)}
                className="px-3 py-1 rounded border text-sm"
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="">전체</option>
                {uniqueShipmentTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'AE' ? '항공수출' : 
                     type === 'AI' ? '항공수입' :
                     type === 'OE' ? '해상수출' : '해상수입'}
                  </option>
                ))}
              </select>
            </div>

            {/* POL 필터 */}
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                출발지
              </label>
              <select
                value={filters.pol}
                onChange={(e) => handleFilterChange('pol', e.target.value)}
                className="px-3 py-1 rounded border text-sm"
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="">전체</option>
                {uniquePOLs.map(pol => (
                  <option key={pol} value={pol}>{pol}</option>
                ))}
              </select>
            </div>

            {/* POD 필터 */}
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                도착지
              </label>
              <select
                value={filters.pod}
                onChange={(e) => handleFilterChange('pod', e.target.value)}
                className="px-3 py-1 rounded border text-sm"
                style={{
                  background: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="">전체</option>
                {uniquePODs.map(pod => (
                  <option key={pod} value={pod}>{pod}</option>
                ))}
              </select>
            </div>

            {/* 필터 초기화 버튼 */}
            <button
              onClick={clearFilters}
              className="px-3 py-1 rounded text-sm border transition-colors"
              style={{
                background: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              초기화
            </button>
          </div>
        </motion.div>

        {/* 견적서 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm border p-6"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              견적서 목록
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              총 {filteredData.length}건의 견적서가 있습니다.
              {filteredData.length !== data.quotationList.length && (
                <span className="ml-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  (전체 {data.quotationList.length}건 중)
                </span>
              )}
            </p>
          </div>

          <div className="space-y-6">
            {filteredData.map((quotation, index) => (
              <motion.div
                key={quotation.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="backdrop-blur-sm rounded-lg p-6 border transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-xl"
                style={{ 
                  background: 'var(--bg-card)', 
                  borderColor: 'var(--border-color)',
                  borderLeft: '4px solid var(--accent-blue)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                onClick={() => {
                  // 견적서 상세보기 또는 수정 기능
                  console.log('견적서 클릭:', quotation.quotationNo);
                }}
              >
                {/* 견적번호 헤더 */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleOpenModal(quotation.quotationNo)}
                      className="text-xl font-bold underline hover:opacity-80 cursor-pointer transition-opacity"
                      style={{ color: 'var(--accent-blue)' }}
                    >
                      {quotation.quotationNo}
                    </button>
                    <div 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        background: quotation.status === '승인' ? '#10b981' : 
                                   quotation.status === '검토중' ? '#f59e0b' : '#3b82f6',
                        color: 'white'
                      }}
                    >
                      {quotation.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="px-3 py-1 rounded-lg font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                      요청일: {quotation.requestDate}
                    </div>
                    {quotation.status === '승인' ? (
                      <>
                        <div className="px-3 py-1 rounded-lg font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                          승인일: {quotation.approvalDate}
                        </div>
                        <div className="px-3 py-1 rounded-lg font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                          유효일: {quotation.validUntil}
                        </div>
                      </>
                    ) : (
                      <div className="px-3 py-1 rounded-lg font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                        상태: {quotation.status}
                      </div>
                    )}
                  </div>
                </div>

                {/* 견적 정보 - 좌우 분할 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 왼쪽: 기본 정보 */}
                  <div className="space-y-3 p-4 rounded-lg border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                    <div className="text-sm font-semibold mb-3 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                      기본 정보
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>선적유형:</span>
                        <span style={{ color: 'var(--text-primary)' }}>
                          {quotation.shipmentType === 'AE' ? '항공수출' : 
                           quotation.shipmentType === 'AI' ? '항공수입' :
                           quotation.shipmentType === 'OE' ? '해상수출' : '해상수입'}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>인코텀즈:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.incoterms}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>POL:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.pol}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>POD:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.pod}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>ETD:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.etd}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>ETA:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.eta}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>송하인:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.shipper}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>수하인:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.consignee}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>화물유형:</span>
                        <span style={{ color: 'var(--text-primary)' }}>
                          {quotation.cargoType === 'General' ? '일반' :
                           quotation.cargoType === 'DG' ? '위험물' :
                           quotation.cargoType === 'Reefer' ? '냉장/냉동' : '특수화물'}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>품목정보:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.itemInfo}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>포장유형:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.pkgType}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded" style={{ background: 'var(--bg-card)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>수량/중량:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{quotation.pkgQty} / {quotation.grossWeight}</span>
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽: 비용 정보 */}
                  <div className="space-y-3 p-4 rounded-lg border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                    <div className="text-sm font-semibold mb-3 pb-2 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                      비용 정보
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'var(--bg-card)' }}>
                        <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>기본 운송비:</span>
                        <span className="font-bold text-lg" style={{ color: 'var(--accent-green)' }}>
                          {quotation.quotationAmount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'var(--bg-card)' }}>
                        <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>통관비:</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {quotation.customsClearance ? '₩150,000' : '미포함'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'var(--bg-card)' }}>
                        <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>보험료:</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {quotation.insurance ? '₩75,000' : '미포함'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'var(--bg-card)' }}>
                        <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>내륙운송비:</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {quotation.inlandTransport ? '₩200,000' : '미포함'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg" style={{ background: 'var(--bg-card)' }}>
                        <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>기타 수수료:</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>₩50,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>

      {/* Quotation Request 모달 */}
      <QuotationRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quotationNo={selectedQuotationNo}
      />
    </div>
  );
}