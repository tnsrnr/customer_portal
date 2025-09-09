'use client';

import React, { useRef, useState } from 'react';
import TabulatorGrid, { TabulatorGridRef, DataType } from '@/common/components/TabulatorGrid';
import "tabulator-tables/dist/css/tabulator.min.css";
import { DateTime } from "luxon";
import { useTheme } from '@/common/hooks/useTheme';

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
      width: 120,
      formatter: function(cell: any) {
        const value = cell.getValue();
        const linkColor = isDark ? 'text-blue-400' : 'text-blue-600';
        return `<button class="underline font-medium ${linkColor} hover:opacity-80" onclick="console.log('SR 상세 페이지로 이동: ${value}')">${value}</button>`;
      }
    },
    { 
      title: "House B/L", 
      field: "houseBl", 
      sorter: "string", 
      headerFilter: true,
      headerFilterPlaceholder: "House B/L 검색",
      headerHozAlign: "center",
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
      width: 80
    },
    { 
      title: "INV NO.", 
      field: "invNo", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "INV NO. 검색",
      headerHozAlign: "center",
      width: 120
    },
    { 
      title: "Consignee", 
      field: "consignee", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "Consignee 검색",
      headerHozAlign: "center",
      width: 140
    },
    { 
      title: "POL", 
      field: "pol", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "POL",
      headerHozAlign: "center",
      width: 80
    },
    { 
      title: "POD", 
      field: "pod", 
      sorter: "string",
      headerFilter: true,
      headerFilterPlaceholder: "POD",
      headerHozAlign: "center",
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
        
        return `<div class="flex items-center justify-center">${progressHtml}</div>`;
      }
    },
    { 
      title: "B/L Print", 
      field: "blPrint", 
      sorter: "string",
      headerHozAlign: "center",
      width: 100,
      formatter: function(cell: any) {
        const value = cell.getValue();
        if (value) {
          const linkColor = isDark ? 'text-blue-400' : 'text-blue-600';
          return `<button class="flex items-center gap-1 mx-auto ${linkColor} hover:opacity-80" onclick="console.log('PDF 다운로드: ${value}')">
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
  
  // Tabulator 추가 옵션
  const additionalOptions = {
    movableColumns: true,
    layout: "fitColumns",
    renderVertical: "basic",
    placeholder: "데이터가 없습니다.",
    placeholderBackground: isDark ? "#1f2937" : "white",
    dataLoaderLoading: "데이터 로딩중...",
    dataLoaderError: "데이터 로드 실패",
    width: "100%",
    resizableColumns: true,
    responsiveLayout: "hide",
    // 테마 설정
    theme: gridTheme,
    // 필터 이벤트 핸들러
    dataFiltered: function(filters: any) {
      setHasActiveFilters(filters.length > 0);
    }
  };

  return (
    <div className="w-full h-full">
      <TabulatorGrid
        ref={gridRef}
        data={data}
        columns={columns}
        height="370px"
        minHeight="300px"
        selectable={true}
        enableCellSelection={true}
        enableClipboard={true}
        theme={theme}
        className="w-full"
        additionalOptions={additionalOptions}
      />
    </div>
  );
}