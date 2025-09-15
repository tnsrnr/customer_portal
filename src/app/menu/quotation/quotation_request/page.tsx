'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, MapPin, Calendar, Clock, User, Phone, Upload, ArrowLeft, Send, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';
import { useRouter } from 'next/navigation';

export default function QuotationRequestPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  
  const [formData, setFormData] = useState({
    // 기본정보 (Basic Information)
    shipmentType: 'AE', // AE/AI/OE/OI
    incoterms: 'FOB', // FCA, FOB, CIF 등
    pol: '', // Port of Loading
    pod: '', // Port of Discharge
    requestedShipmentDate: '', // 선적 요청일
    desiredArrivalDate: '', // 도착 희망일
    shipper: '로그인 회사명', // 자동 입력
    consignee: '', // 수하인
    
    // 화물정보 (Cargo Information)
    cargoType: 'General', // General, DG, Reefer, 특수화물
    itemInfo: '', // 품목 정보
    hsCode: '', // HS 코드
    pkgType: 'CTN', // CTN, PLT, BAG 등
    pkgQty: '', // 포장 수량
    grossWeight: '', // 총 중량
    dimension: { length: '', width: '', height: '' }, // 치수
    cbm: '', // 자동 계산
    volumeWeight: '', // 자동 계산
    chargeableWeight: '', // 자동 계산
    
    // 추가 서비스 (Additional Service)
    customsClearance: false, // 통관 필요 여부
    insurance: false, // 보험 필요 여부
    inlandTransport: false, // 내륙운송 필요 여부
    
    // 첨부 파일 (Attached File)
    cargoSpecPhoto: null, // 화물 스펙/포장 사진
    msds: null, // MSDS
    contractDocuments: null, // 계약/기타 문서
    
    // 비고 (Remarks)
    remarks: '' // 긴급 건, 요청사항 자유 기재
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDimensionChange = (dimension: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dimension: {
        ...prev.dimension,
        [dimension]: value
      }
    }));
    
    // CBM 자동 계산
    if (dimension === 'length' || dimension === 'width' || dimension === 'height') {
      const newDimension = {
        ...formData.dimension,
        [dimension]: value
      };
      const length = parseFloat(newDimension.length) || 0;
      const width = parseFloat(newDimension.width) || 0;
      const height = parseFloat(newDimension.height) || 0;
      const cbm = (length * width * height / 1000000).toFixed(3); // cm to m³
      
      setFormData(prev => ({
        ...prev,
        cbm: cbm,
        volumeWeight: (parseFloat(cbm) * 167).toFixed(2) // 1 CBM = 167 kg
      }));
    }
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 견적서 요청 처리 로직
    console.log('견적서 요청:', formData);
    // 성공 시 견적서 리스트로 이동
    router.push('/menu/quotation/quotation_list');
  };

  const getRequiredFields = () => {
    return [
      'shipmentType', 'incoterms', 'pol', 'pod', 'requestedShipmentDate',
      'cargoType', 'itemInfo', 'pkgType', 'pkgQty', 'grossWeight'
    ];
  };

  const isFieldRequired = (field: string) => {
    return getRequiredFields().includes(field);
  };

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
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                견적서 요청
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                물류 서비스 견적서를 요청하세요
              </p>
            </div>

          </div>

          {/* 견적서 요청 폼 */}
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 기본정보와 화물정보를 좌우로 배치 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* 기본정보 (Basic Information) */}
                <div 
                  className="p-4 rounded-lg space-y-4"
                  style={{
                    background: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 선적 유형 (Shipment Type) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        선적 유형 (Shipment Type) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.shipmentType}
                        onChange={(e) => handleInputChange('shipmentType', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <option value="AE">AE (항공 수출)</option>
                        <option value="AI">AI (항공 수입)</option>
                        <option value="OE">OE (해상 수출)</option>
                        <option value="OI">OI (해상 수입)</option>
                      </select>
                    </div>

                    {/* 인코텀즈 (Incoterms) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        인코텀즈 (Incoterms) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.incoterms}
                        onChange={(e) => handleInputChange('incoterms', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <option value="FCA">FCA</option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="CFR">CFR</option>
                        <option value="EXW">EXW</option>
                        <option value="DAP">DAP</option>
                        <option value="DDP">DDP</option>
                      </select>
                    </div>

                    {/* POL (Port of Loading) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        POL (Port of Loading) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.pol}
                        onChange={(e) => handleInputChange('pol', e.target.value)}
                        placeholder="예: 인천국제공항, 부산항"
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    {/* POD (Port of Discharge) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        POD (Port of Discharge) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.pod}
                        onChange={(e) => handleInputChange('pod', e.target.value)}
                        placeholder="예: 로스앤젤레스국제공항, 로스앤젤레스항"
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    {/* ETD */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        예상출발일 (ETD) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.requestedShipmentDate}
                        onChange={(e) => handleInputChange('requestedShipmentDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    {/* ETA */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        예상도착일 (ETA)
                      </label>
                      <input
                        type="date"
                        value={formData.desiredArrivalDate}
                        onChange={(e) => handleInputChange('desiredArrivalDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    {/* 송하인 (Shipper) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        송하인 (Shipper)
                      </label>
                      <input
                        type="text"
                        value={formData.shipper}
                        readOnly
                        className="w-full px-3 py-2 rounded-lg border bg-gray-100"
                        style={{
                          background: 'var(--bg-tertiary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-muted)'
                        }}
                      />
                    </div>

                    {/* 수하인 (Consignee) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        수하인 (Consignee)
                      </label>
                      <input
                        type="text"
                        value={formData.consignee}
                        onChange={(e) => handleInputChange('consignee', e.target.value)}
                        placeholder="회사명 / 주소 / 국가"
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 화물정보 (Cargo Information) */}
                <div 
                  className="p-4 rounded-lg space-y-4"
                  style={{
                    background: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 화물 유형 (Cargo Type) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        화물 유형 (Cargo Type) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.cargoType}
                        onChange={(e) => handleInputChange('cargoType', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <option value="General">General (일반)</option>
                        <option value="DG">DG (위험물)</option>
                        <option value="Reefer">Reefer (냉장/냉동)</option>
                        <option value="Special">특수화물</option>
                      </select>
                    </div>

                    {/* 품목 정보 (Item Info) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        품목 정보 (Item Info) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.itemInfo}
                        onChange={(e) => handleInputChange('itemInfo', e.target.value)}
                        placeholder="예: Resin, Textile"
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    {/* HS 코드 (HS Code) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        HS 코드 (HS Code)
                      </label>
                      <input
                        type="text"
                        value={formData.hsCode}
                        onChange={(e) => handleInputChange('hsCode', e.target.value)}
                        placeholder="필요 시에만 입력"
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    {/* 포장 유형 (PKG Type) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        포장 유형 (PKG Type) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.pkgType}
                        onChange={(e) => handleInputChange('pkgType', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <option value="CTN">CTN (카톤)</option>
                        <option value="PLT">PLT (팔레트)</option>
                        <option value="BAG">BAG (백)</option>
                        <option value="DRUM">DRUM (드럼)</option>
                        <option value="CASE">CASE (케이스)</option>
                      </select>
                    </div>

                    {/* 포장 수량 (PKG Qty) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        포장 수량 (PKG Qty) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.pkgQty}
                        onChange={(e) => handleInputChange('pkgQty', e.target.value)}
                        placeholder="예: 10 PLT"
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    {/* 총 중량 (G/W) */}
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        총 중량 (G/W) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.grossWeight}
                        onChange={(e) => handleInputChange('grossWeight', e.target.value)}
                        placeholder="예: 1000 kg"
                        className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>

                    {/* 치수 (Dimension) - CBM 자동 계산 */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        치수 (Dimension) - CBM 자동 계산
                      </label>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <input
                          type="number"
                          placeholder="가로 (cm)"
                          value={formData.dimension.length}
                          onChange={(e) => handleDimensionChange('length', e.target.value)}
                          className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{
                            background: 'var(--bg-card)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)'
                          }}
                        />
                        <input
                          type="number"
                          placeholder="세로 (cm)"
                          value={formData.dimension.width}
                          onChange={(e) => handleDimensionChange('width', e.target.value)}
                          className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{
                            background: 'var(--bg-card)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)'
                          }}
                        />
                        <input
                          type="number"
                          placeholder="높이 (cm)"
                          value={formData.dimension.height}
                          onChange={(e) => handleDimensionChange('height', e.target.value)}
                          className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{
                            background: 'var(--bg-card)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-primary)'
                          }}
                        />
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        CBM: {formData.cbm} m³ | Volume Weight: {formData.volumeWeight} kg
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 요청사항 및 파일 업로드 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* 요청사항 및 파일 업로드 */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    요청사항 / Request Details
                  </label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                    placeholder="추가 요청사항이나 담당자에게 전달하고 싶은 내용을 자유롭게 기재해 주세요"
                    rows={8}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm flex-1"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                {/* 오른쪽 컬럼 - 파일 업로드 및 추가 서비스 */}
                <div className="space-y-4">
                  {/* 파일 업로드 */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      파일 업로드 / File Upload
                    </label>
                    <div 
                      className="border-2 border-dashed rounded-lg p-3 text-center cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        borderColor: 'var(--border-color)',
                        background: 'var(--bg-card)'
                      }}
                    >
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        Click or drop files here
                      </p>
                    </div>
                  </div>

                  {/* 추가 서비스 */}
                  <div>
                    <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                      Additional Info 필요한 서비스를 선택해 주세요.
                    </h3>
                    
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.customsClearance}
                          onChange={(e) => handleInputChange('customsClearance', e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>통관 (Customs clearance)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.insurance}
                          onChange={(e) => handleInputChange('insurance', e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>보험 (Insurance)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.inlandTransport}
                          onChange={(e) => handleInputChange('inlandTransport', e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>내륙 운송 (Trucking)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 하단 버튼들 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-between items-center pt-4 border-t"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/menu/quotation')}
                  className="px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                  style={{
                    background: '#ef4444',
                    color: 'white'
                  }}
                >
                  요청취소
                </motion.button>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                    style={{
                      background: 'var(--accent-blue)',
                      color: 'white'
                    }}
                  >
                    견적서 요청
                  </motion.button>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}