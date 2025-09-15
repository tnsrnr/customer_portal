'use client';

import React, { useRef, useState, useEffect } from 'react';
import TabulatorGrid, { TabulatorGridRef, DataType } from '@/common/components/TabulatorGrid';
import "tabulator-tables/dist/css/tabulator.min.css";
import { DateTime } from "luxon";
import { useTheme } from '@/common/hooks/useTheme';
import { Filter, Plus, Search, Calculator } from "lucide-react";

interface AccData extends DataType {
  id: number;
  doc: number;
  billingDate: string;
  functionName: string;
  settlementBasisNo: string;
  zeroRatedTotal: number;
  taxableAmount: number;
  finalAmount: number;
}

interface AccTableProps {
  data?: AccData[];
  loading?: boolean;
  onRowSelect?: (rowData: AccData) => void;
}

export function AccTable({ data, loading, onRowSelect }: AccTableProps) {
  const gridRef = useRef<TabulatorGridRef>(null);
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);
  const { theme } = useTheme();

  // cellClick 이벤트 핸들러
  const handleCellClick = (e: Event, cell: any) => {
    const target = e.target as HTMLElement;
    console.log('클릭된 요소:', target);
    console.log('클래스 목록:', target.classList.toString());
    
    if (target.classList.contains('final-amount-click')) {
      console.log('최종금액 클릭 감지!');
      const rowId = target.getAttribute('data-row-id');
      console.log('행 ID:', rowId);
      
      if (rowId && data) {
        const rowData = data.find(item => item.id.toString() === rowId);
        console.log('찾은 행 데이터:', rowData);
        
        if (rowData && onRowSelect) {
          console.log('onRowSelect 호출');
          onRowSelect(rowData);
        }
      }
    }
  };

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
      <div className="flex items-center justify-center h-32 text-gray-500">
        <span>청구 내역이 없습니다.</span>
      </div>
    );
  }

  const columns = [
    {
      title: "",
      field: "selected",
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      headerSort: false,
      resizable: false,
      frozen: true,
      headerHozAlign: "center" as const,
      hozAlign: "center" as const,
      width: 30
    },
    {
      title: "Doc",
      field: "doc",
      width: 63,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return `
          <div class="flex items-center justify-center gap-1">
            <span class="font-medium text-center">${value}</span>
            <button class="doc-plus-btn" data-doc="${value}">
              <svg class="w-3 h-3 text-gray-500 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
        `;
      }
    },
    {
      title: "청구일자",
      field: "billingDate",
      width: 100,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return `<span class="text-sm text-center">${value}</span>`;
      }
    },
    {
      title: "기능명",
      field: "functionName",
      width: 80,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return `<span class="text-sm text-center">${value}</span>`;
      }
    },
    {
      title: "정산근거번호",
      field: "settlementBasisNo",
      width: 170,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return `
          <div class="flex items-center justify-center gap-1">
            <span class="text-sm font-mono text-center">${value}</span>
            <button class="search-btn" data-settlement="${value}">
              <svg class="w-3 h-3 text-gray-500 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        `;
      }
    },
    {
      title: "영세율 합계",
      field: "zeroRatedTotal",
      width: 100,
      hozAlign: "right" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return `<span class="text-sm font-mono text-right">${value.toLocaleString()}</span>`;
      }
    },
    {
      title: "과세 금액",
      field: "taxableAmount",
      width: 100,
      hozAlign: "right" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return `<span class="text-sm font-mono text-right">${value.toLocaleString()}</span>`;
      }
    },
    {
      title: "최종 금액",
      field: "finalAmount",
      width: 120,
      hozAlign: "right" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        const rowData = cell.getRow().getData();
        return `
          <div class="flex items-center justify-end gap-1">
            <span class="text-sm font-mono font-semibold text-right cursor-pointer hover:text-blue-600 hover:underline final-amount-click" 
                  data-row-id="${rowData.id}" 
                  title="클릭하여 상세 정보 보기">${value.toLocaleString()}</span>
            <button class="calculator-btn" data-amount="${value}">
              <svg class="w-3 h-3 text-gray-500 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        `;
      }
    }
  ];

  const additionalOptions = {
    layout: "fitData" as const,
    width: 780,
    responsiveLayout: false,
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 15, 25, 50, 100],
    movableColumns: false,
    resizableColumns: true,
    selectable: false,
    headerSort: true,
    height: "500px",
    footerElement: false
  };


  return (
    <div className="h-full flex flex-col">
      {/* 필터 섹션 */}
      <div className="mb-4 p-4 rounded-lg border backdrop-blur-sm" style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-primary)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.1),
          0 4px 16px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        borderTop: '3px solid #6b7280'
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>청구 내역</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded-md border text-sm transition-colors"
                style={{
                  background: 'var(--bg-primary)',
                  borderColor: 'var(--border-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                확정
              </button>
              
              <button
                className="px-3 py-1 rounded-md border text-sm transition-colors"
                style={{
                  background: 'var(--bg-primary)',
                  borderColor: 'var(--border-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                취소
              </button>
              
              <button
                className="px-3 py-1 rounded-md border text-sm transition-colors"
                style={{
                  background: 'var(--bg-primary)',
                  borderColor: 'var(--border-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                EXCEL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 그리드 테이블 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-x-auto">
          <TabulatorGrid
            ref={gridRef}
            data={data}
            columns={columns}
            additionalOptions={additionalOptions}
            className="w-full h-full"
            showFooter={false}
            onCellClick={handleCellClick}
          />
        </div>
      </div>
    </div>
  );
}
