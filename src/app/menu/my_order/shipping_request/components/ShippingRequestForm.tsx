'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Upload, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from '@/common/hooks/useTheme';

interface ShippingRequestFormProps {
  srNo?: string;
  isEditMode?: boolean;
}

export function ShippingRequestForm({ srNo, isEditMode = false }: ShippingRequestFormProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState<'air' | 'sea'>('air');
  const [formData, setFormData] = useState({
    pol: 'Incheon Airport (ICN)',
    pod: 'Noi bai Airport (HAN)',
    entryDate: '2025-05-28',
    entryTime: '09:30 AM',
    requestDetails: '',
    services: {
      trucking: true,
      customs: true,
      insurance: true
    },
    pickupDate: '2025-05-28',
    pickupTime: '09:30 AM',
    pickupLocation: '서울특별시 마포구 양화로 19',
    contactName: '정민정',
    contactPhone: '010-1234-5678'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: checked
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* 탭 메뉴 */}
      <div className="flex gap-1">
        <button
          onClick={() => setActiveTab('air')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'air' 
              ? 'bg-black text-white' 
              : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          항공
        </button>
        <button
          onClick={() => setActiveTab('sea')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'sea' 
              ? 'bg-black text-white' 
              : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          해상
        </button>
      </div>

      {/* 메인 폼 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* 왼쪽 컬럼 */}
        <div 
          className="p-4 rounded-lg space-y-4"
          style={{
            background: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'
          }}
        >
          {/* 선적지(POL) */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              선적지(POL) / Port of Loading
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.pol}
                onChange={(e) => handleInputChange('pol', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          {/* 도착지(POD) */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              도착지(POD) / Port of Discharge
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.pod}
                onChange={(e) => handleInputChange('pod', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          {/* 화물반입시간 */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              화물반입시간(Entry time) / Cargo Entry Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.entryDate}
                  onChange={(e) => handleInputChange('entryDate', e.target.value)}
                  className="w-full pl-8 pr-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.entryTime}
                  onChange={(e) => handleInputChange('entryTime', e.target.value)}
                  className="w-full pl-8 pr-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 컬럼 */}
        <div 
          className="p-4 rounded-lg space-y-4"
          style={{
            background: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'
          }}
        >
          {/* 픽업장소 */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              픽업장소 / Pickup Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          {/* 출고담당자 */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              출고담당자(성함/연락처) / Shipping Contact Person
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="성함"
                  className="w-full pl-8 pr-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="연락처"
                  className="w-full pl-8 pr-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 픽업일시 */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              픽업일시 / Pickup Date/Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  className="w-full pl-8 pr-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.pickupTime}
                  onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                  className="w-full pl-8 pr-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
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
        {/* 요청사항 - 아래쪽 확장 */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            요청사항 / Request Details
          </label>
          <textarea
            value={formData.requestDetails}
            onChange={(e) => handleInputChange('requestDetails', e.target.value)}
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
          {/* 파일 업로드 - 크기 절반으로 축소 */}
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
              <div className="flex items-center justify-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <Lightbulb className="w-3 h-3" />
                <span>파일 카테고리 선택 : 업로드 시 "MSDS", "INVOICE" 등 파일 종류 Auto-tag 기능</span>
              </div>
            </div>
          </div>

          {/* 추가 서비스 */}
          <div>
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Additional Info 항공 운송 외 필요한 서비스를 선택해 주세요.
            </h3>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.services.trucking}
                  onChange={(e) => handleServiceChange('trucking', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>내륙 운송 (Trucking)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.services.customs}
                  onChange={(e) => handleServiceChange('customs', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>통관 (Customs clearance)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.services.insurance}
                  onChange={(e) => handleServiceChange('insurance', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>보험 (Insurance)</span>
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
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            style={{
              background: 'var(--bg-card)',
              borderColor: '#dc2626',
              color: '#dc2626',
              border: '1px solid'
            }}
          >
            부킹삭제
          </motion.button>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              border: '1px solid'
            }}
          >
            부킹저장
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              border: '1px solid'
            }}
          >
            부킹요청
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
