'use client';

import React, { useRef, useState, useEffect } from 'react';
import TabulatorGrid, { TabulatorGridRef, DataType } from '@/common/components/TabulatorGrid';
import "tabulator-tables/dist/css/tabulator.min.css";
import { DateTime } from "luxon";
import { useTheme } from '@/common/hooks/useTheme';
import { Filter, X } from "lucide-react";
import { ShippingRequestModal } from './ShippingRequestModal';

interface SRData extends DataType {
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

interface SRTableProps {
  data?: SRData[];
  loading?: boolean;
}

export function SRTable({ data, loading }: SRTableProps) {
  const gridRef = useRef<TabulatorGridRef>(null);
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSrNo, setSelectedSrNo] = useState<string>('');
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">테이블 데이터를 불러오는 중...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <span className="text-gray-600">데이터가 없습니다.</span>
      </div>
    );
  }

  // 컬럼 정의
  const columns = [
    {  
      title: "", 
      field: "selected", 
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      headerSort: false,
      resizable: false,
      frozen: true,
      headerHozAlign: "center",
      hozAlign: "center",
      width: 30
    },
    { 
      title: "SR NO.", 
      field: "srNo", 
      sorter: "string", 
      headerFilter: true,
      headerFilterPlaceholder: "SR NO. 검색",
      headerFilterLiveFilter: true,
      headerHozAlign: "center",
      hozAlign: "center",
      width: 120,
      formatter: function(cell: any) {
        const value = cell.getValue();
        const linkColor = isDark ? 'text-blue-400' : 'text-blue-600';
        return `<button class="underline font-medium ${linkColor} hover:opacity-80 cursor-pointer" data-sr-no="${value}">${value}</button>`;
      }
    },
    { 
      title: "House B/L", 
      field: "houseBl", 
      sorter: "string", 
      headerFilter: true,
      headerFilterPlaceholder: "House B/L 검색",
      headerHozAlign: "center",
      hozAlign: "center",
      width: 120,
      formatter: function(cell: any) {
        const value = cell.getValue();
        const linkColor = isDark ? 'text-blue-400' : 'text-blue-600';
        return `<button class="underline font-medium ${linkColor} hover:opacity-80" onclick="console.log('House B/L 상세 페이지로 이동: ${value}')">${value}</button>`;
      }
    },
    { 
      title: "Bound", 
      field: "bound", 
      sorter: "string",
      headerHozAlign: "center",
      hozAlign: "center",
      width: 80
    },
    { 
      title: "INV NO.", 
      field: "invNo", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "INV NO. 검색",
      headerHozAlign: "center",
      hozAlign: "center",
      width: 120
    },
    { 
      title: "Consignee", 
      field: "consignee", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "Consignee 검색",
      headerHozAlign: "center",
      hozAlign: "center",
      width: 140
    },
    { 
      title: "POL", 
      field: "pol", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "POL",
      headerHozAlign: "center",
      hozAlign: "center",
      width: 80
    },
    { 
      title: "POD", 
      field: "pod", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "POD",
      headerHozAlign: "center",
      hozAlign: "center",
      width: 80
    },
    { 
      title: "ETD", 
      field: "etd", 
      sorter: function(a: any, b: any) {
        try {
          return DateTime.fromISO(a).toMillis() - DateTime.fromISO(b).toMillis();
        } catch (e) {
          return 0;
        }
      },
      formatter: "datetime", 
      formatterParams: {
        inputFormat: "yyyy-MM-dd",
        outputFormat: "yyyy-MM-dd",
        invalidPlaceholder: "(유효하지 않은 날짜)"
      },
      headerFilter: true,
      headerFilterPlaceholder: "ETD 검색",
      headerHozAlign: "center",
      hozAlign: "center",
      width: 100
    },
    { 
      title: "ETA", 
      field: "eta", 
      sorter: function(a: any, b: any) {
        try {
          return DateTime.fromISO(a).toMillis() - DateTime.fromISO(b).toMillis();
        } catch (e) {
          return 0;
        }
      },
      formatter: "datetime", 
      formatterParams: {
        inputFormat: "yyyy-MM-dd",
        outputFormat: "yyyy-MM-dd",
        invalidPlaceholder: "(유효하지 않은 날짜)"
      },
      headerFilter: true,
      headerFilterPlaceholder: "ETA 검색",
      headerHozAlign: "center",
      hozAlign: "center",
      width: 100
    },
    { 
      title: "BKG Status", 
      field: "bkgStatus", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "상태",
      headerFilterParams: {
        values: { "오더접수": "오더접수", "오더확정": "오더확정", "오더마감": "오더마감" },
        clearable: true
      },
      headerHozAlign: "center",
      hozAlign: "center",
      width: 120,
      formatter: function(cell: any) {
        const value = cell.getValue();
        let color = "";
        
        if (value === "오더접수") {
          color = isDark ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800";
        } else if (value === "오더확정") {
          color = isDark ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800";
        } else if (value === "오더마감") {
          color = isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800";
        }
        
        return `<span class="py-1 px-2 rounded-full text-xs font-medium ${color}">${value}</span>`;
      }
    },
    { 
      title: "Progress", 
      field: "progress", 
      sorter: "string",
      headerHozAlign: "center",
      hozAlign: "left",
      width: 250,
      formatter: function(cell: any) {
        const progress = cell.getValue();
        if (!progress || !Array.isArray(progress)) return '';
        
        const progressHtml = progress.map((step: string, index: number) => {
          const icon = `<span class="inline-block w-4 h-4 rounded-full bg-green-500 mr-1"></span>`;
          const arrowColor = isDark ? 'text-gray-500' : 'text-gray-400';
          const textColor = isDark ? 'text-gray-300' : 'text-gray-600';
          const arrow = index < progress.length - 1 ? `<span class="mx-1 ${arrowColor}">→</span>` : '';
          return `${icon}<span class="text-xs ${textColor}">${step}</span>${arrow}`;
        }).join('');
        
        return `<div class="flex items-center justify-start">${progressHtml}</div>`;
      }
    },
    { 
      title: "B/L Print", 
      field: "blPrint", 
      sorter: "string",
      headerHozAlign: "center",
      hozAlign: "left",
      width: 100,
      formatter: function(cell: any) {
        const value = cell.getValue();
        if (value) {
          const linkColor = isDark ? 'text-blue-400' : 'text-blue-600';
          return `<button class="flex items-center gap-1 ${linkColor} hover:opacity-80" onclick="console.log('PDF 다운로드: ${value}')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span class="text-xs">PDF</span>
                  </button>`;
        } else {
          const dashColor = isDark ? 'text-gray-500' : 'text-gray-400';
          return `<span class="${dashColor}">-</span>`;
        }
      }
    },
    { 
      title: "Account", 
      field: "account", 
      sorter: "string",
      headerHozAlign: "center",
      hozAlign: "right",
      width: 120,
      formatter: function(cell: any) {
        const value = cell.getValue();
        if (value && value !== 'KRW 0') {
          const linkColor = isDark ? 'text-blue-400' : 'text-blue-600';
          return `<button class="underline font-medium ${linkColor} hover:opacity-80" onclick="console.log('인보이스 PDF 다운로드: ${value}')">${value}</button>`;
        } else {
          const textColor = isDark ? 'text-gray-500' : 'text-gray-400';
          return `<span class="${textColor}">${value}</span>`;
        }
      }
    }
  ] as any;

  // 테마에 따른 스타일 설정
  const isDark = theme === 'dark';
  const gridTheme = isDark ? 'dark' : 'light';

  // BKG Status 필터링 함수
  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  // 필터링된 데이터 계산
  const filteredData = selectedStatus === 'all' 
    ? data 
    : data?.filter(item => item.bkgStatus === selectedStatus) || [];

  // 모달 열기 함수
  const handleOpenModal = (srNo: string) => {
    setSelectedSrNo(srNo);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSrNo('');
  };

  // SR NO 버튼 클릭 이벤트 핸들러
  const handleSrNoClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-sr-no')) {
      const srNo = target.getAttribute('data-sr-no');
      if (srNo) {
        handleOpenModal(srNo);
      }
    }
  };

  // 테이블 렌더링 후 이벤트 리스너 추가
  useEffect(() => {
    const tableElement = gridRef.current?.getTable()?.element;
    if (tableElement) {
      tableElement.addEventListener('click', handleSrNoClick);
      
      return () => {
        tableElement.removeEventListener('click', handleSrNoClick);
      };
    }
  }, [filteredData]);
  
  // Tabulator 추가 옵션
  const additionalOptions = {
    movableColumns: true,
    layout: "fitData", // fitColumns에서 fitData로 변경하여 고정 넓이 사용
    renderVertical: "basic",
    placeholder: "데이터가 없습니다.",
    placeholderBackground: isDark ? "#1f2937" : "white",
    dataLoaderLoading: "데이터 로딩중...",
    dataLoaderError: "데이터 로드 실패",
    // width: 1400, // 고정 넓이 (픽셀 단위) - 더 큰 값으로 설정
    resizableColumns: true,
    responsiveLayout: false, // 반응형 레이아웃 비활성화
    // 테마 설정
    theme: gridTheme,
    // 필터 이벤트 핸들러
    dataFiltered: function(filters: any) {
      setHasActiveFilters(filters.length > 0);
    }
  };

  return (
    <div className="h-full flex justify-center">
      <div className={`rounded-lg border overflow-hidden shadow-lg ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`} style={{ width: '1590px' }}>
        {/* 필터 컨트롤 */}
        <div className={`px-6 py-6 border-b-2 relative ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-600' 
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-100 border-gray-300'
        }`} style={{
          boxShadow: isDark 
            ? 'inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.05), 0 4px 8px rgba(0,0,0,0.3)' 
            : 'inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -1px 0 rgba(255,255,255,0.9), 0 4px 8px rgba(0,0,0,0.1)'
        }}>
          {/* 상단 하이라이트 라인 */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${
            isDark 
              ? 'bg-gradient-to-r from-transparent via-gray-400 to-transparent' 
              : 'bg-gradient-to-r from-transparent via-gray-500 to-transparent'
          }`} style={{
            boxShadow: isDark 
              ? '0 0 8px rgba(156, 163, 175, 0.4)'
              : '0 0 8px rgba(107, 114, 128, 0.3)'
          }}></div>
          
          {/* 배경 패턴 오버레이 */}
          <div className={`absolute inset-0 opacity-5 ${
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          }`} style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px)',
            backgroundSize: '20px 20px'
          }}></div>
          
          <div className="flex justify-center relative z-10">
            <div className="flex items-center gap-3 p-4 rounded-2xl" style={{
              background: isDark 
                ? 'linear-gradient(145deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.95) 50%, rgba(31, 41, 55, 0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.95) 50%, rgba(255, 255, 255, 0.9) 100%)',
              boxShadow: isDark 
                ? '0 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)'
                : '0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.1)',
              border: isDark 
                ? '1px solid rgba(75, 85, 99, 0.6)'
                : '1px solid rgba(209, 213, 219, 0.6)'
            }}>
              <button
                onClick={() => handleStatusFilter('all')}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedStatus === 'all'
                    ? isDark
                      ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg border border-blue-500'
                      : 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg border border-blue-400'
                    : isDark
                    ? 'bg-gradient-to-b from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700 border border-gray-600 shadow-md'
                    : 'bg-gradient-to-b from-white to-gray-50 text-gray-600 hover:from-gray-50 hover:to-gray-100 border border-gray-300 shadow-md'
                }`}
                style={{
                  textShadow: selectedStatus === 'all' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                전체
              </button>
              
              <button
                onClick={() => handleStatusFilter('오더접수')}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedStatus === '오더접수'
                    ? isDark
                      ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg border border-blue-500'
                      : 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg border border-blue-400'
                    : isDark
                    ? 'bg-gradient-to-b from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700 border border-gray-600 shadow-md'
                    : 'bg-gradient-to-b from-white to-gray-50 text-gray-600 hover:from-gray-50 hover:to-gray-100 border border-gray-300 shadow-md'
                }`}
                style={{
                  textShadow: selectedStatus === '오더접수' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                오더접수
              </button>
              
              <button
                onClick={() => handleStatusFilter('오더확정')}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedStatus === '오더확정'
                    ? isDark
                      ? 'bg-gradient-to-b from-green-600 to-green-700 text-white shadow-lg border border-green-500'
                      : 'bg-gradient-to-b from-green-500 to-green-600 text-white shadow-lg border border-green-400'
                    : isDark
                    ? 'bg-gradient-to-b from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700 border border-gray-600 shadow-md'
                    : 'bg-gradient-to-b from-white to-gray-50 text-gray-600 hover:from-gray-50 hover:to-gray-100 border border-gray-300 shadow-md'
                }`}
                style={{
                  textShadow: selectedStatus === '오더확정' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                오더확정
              </button>
              
              <button
                onClick={() => handleStatusFilter('오더마감')}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedStatus === '오더마감'
                    ? isDark
                      ? 'bg-gradient-to-b from-gray-600 to-gray-700 text-white shadow-lg border border-gray-500'
                      : 'bg-gradient-to-b from-gray-500 to-gray-600 text-white shadow-lg border border-gray-400'
                    : isDark
                    ? 'bg-gradient-to-b from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700 border border-gray-600 shadow-md'
                    : 'bg-gradient-to-b from-white to-gray-50 text-gray-600 hover:from-gray-50 hover:to-gray-100 border border-gray-300 shadow-md'
                }`}
                style={{
                  textShadow: selectedStatus === '오더마감' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                오더마감
              </button>
            </div>
          </div>
        </div>

        {/* 그리드 테이블 */}
        <div className="overflow-x-auto">
          <TabulatorGrid
            ref={gridRef}
            data={filteredData}
            columns={columns}
            height="370px"
            minHeight="300px"
            selectable={true}
            enableCellSelection={true}
            enableClipboard={true}
            theme={theme}
            className=""
            additionalOptions={additionalOptions}
          />
        </div>
      </div>

      {/* Shipping Request 모달 */}
      <ShippingRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        srNo={selectedSrNo}
      />
    </div>
  );
}