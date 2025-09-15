'use client';

import React, { useRef, useState, useEffect } from 'react';
import TabulatorGrid, { TabulatorGridRef, DataType } from '@/common/components/TabulatorGrid';
import "tabulator-tables/dist/css/tabulator.min.css";
import { useTheme } from '@/common/hooks/useTheme';
import { X } from "lucide-react";

interface CostDetailData extends DataType {
  id: number;
  costName: string;
  applicationUnit: string;
  contractCurrencyUnit: string;
  contractUnitPrice: number;
  contractAmount: number;
  contractExchangeRate: number;
  billingAmount: number;
}

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

interface CostDetailTableProps {
  selectedRowData?: AccData | null;
}

export function CostDetailTable({ selectedRowData }: CostDetailTableProps) {
  const gridRef = useRef<TabulatorGridRef>(null);
  const { theme } = useTheme();

  // 선택된 행에 따른 비용 상세 데이터 생성
  const generateCostDetailData = (rowData: AccData | null): CostDetailData[] => {
    if (!rowData) {
      return [];
    }

    // 기본 비용 데이터 (실제로는 API에서 가져올 데이터)
    const baseData: CostDetailData[] = [
    {
      id: 1,
      costName: 'Ocean Freight',
      applicationUnit: 'Per CTNR',
      contractCurrencyUnit: 'USD',
      contractUnitPrice: 400,
      contractAmount: 400,
      contractExchangeRate: 1398.40,
      billingAmount: 559360
    },
    {
      id: 2,
      costName: 'Trucking Charge',
      applicationUnit: 'Per JOB',
      contractCurrencyUnit: 'KRW',
      contractUnitPrice: 326900,
      contractAmount: 326900,
      contractExchangeRate: 1.00,
      billingAmount: 326900
    },
    {
      id: 3,
      costName: 'H/D Charge(OI)',
      applicationUnit: 'Per B/L',
      contractCurrencyUnit: 'KRW',
      contractUnitPrice: 15000,
      contractAmount: 15000,
      contractExchangeRate: 1.00,
      billingAmount: 15000
    },
    {
      id: 4,
      costName: 'THC',
      applicationUnit: 'Per CTNR',
      contractCurrencyUnit: 'KRW',
      contractUnitPrice: 150000,
      contractAmount: 150000,
      contractExchangeRate: 1.00,
      billingAmount: 150000
    },
    {
      id: 5,
      costName: 'Wharfage',
      applicationUnit: 'Per CTNR',
      contractCurrencyUnit: 'KRW',
      contractUnitPrice: 4200,
      contractAmount: 4200,
      contractExchangeRate: 1.00,
      billingAmount: 4200
    },
    {
      id: 6,
      costName: 'Document Fee',
      applicationUnit: 'Per B/L',
      contractCurrencyUnit: 'KRW',
      contractUnitPrice: 40000,
      contractAmount: 40000,
      contractExchangeRate: 1.00,
      billingAmount: 40000
    },
    {
      id: 7,
      costName: 'CNTR Cleaning Charge',
      applicationUnit: 'Per CTNR',
      contractCurrencyUnit: 'KRW',
      contractUnitPrice: 35000,
      contractAmount: 35000,
      contractExchangeRate: 1.00,
      billingAmount: 35000
    },
    {
      id: 8,
      costName: 'PFS Charge',
      applicationUnit: 'Per CTNR',
      contractCurrencyUnit: 'KRW',
      contractUnitPrice: 86,
      contractAmount: 86,
      contractExchangeRate: 1.00,
      billingAmount: 86
    },
    {
      id: 9,
      costName: 'Port Safety Management Fee',
      applicationUnit: 'Per CTNR',
      contractCurrencyUnit: 'KRW',
      contractUnitPrice: 251,
      contractAmount: 251,
      contractExchangeRate: 1.00,
      billingAmount: 251
    },
    {
      id: 10,
      costName: '소계',
      applicationUnit: '',
      contractCurrencyUnit: '',
      contractUnitPrice: 0,
      contractAmount: 0,
      contractExchangeRate: 0,
      billingAmount: rowData.finalAmount
    }
  ];

    // 선택된 행의 정산근거번호에 따라 다른 데이터 반환 (실제로는 API 호출)
    return baseData.map(item => ({
      ...item,
      billingAmount: item.costName === '소계' ? rowData.finalAmount : item.billingAmount
    }));
  };

  const mockData = generateCostDetailData(selectedRowData);

  const columns = [
    {
      title: "비용명",
      field: "costName",
      width: 220,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        const isSubtotal = value === '소계';
        return `
          <span class="text-sm text-center ${isSubtotal ? 'font-bold' : ''}">${value}</span>
        `;
      }
    },
    {
      title: "적용단위",
      field: "applicationUnit",
      width: 90,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return `<span class="text-sm text-center">${value}</span>`;
      }
    },
    {
      title: "계약통화단위",
      field: "contractCurrencyUnit",
      width: 100,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return `<span class="text-sm text-center">${value}</span>`;
      }
    },
    {
      title: "계약단가",
      field: "contractUnitPrice",
      width: 90,
      hozAlign: "right" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        const rowData = cell.getRow().getData();
        if (rowData.costName === '소계') {
          return `<span class="text-sm font-bold text-center">-</span>`;
        }
        return `<span class="text-sm font-mono text-right">${value.toLocaleString()}</span>`;
      }
    },
    {
      title: "계약금액",
      field: "contractAmount",
      width: 90,
      hozAlign: "right" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        const rowData = cell.getRow().getData();
        if (rowData.costName === '소계') {
          return `<span class="text-sm font-bold text-center">-</span>`;
        }
        return `<span class="text-sm font-mono text-right">${value.toLocaleString()}</span>`;
      }
    },
    {
      title: "계약환율",
      field: "contractExchangeRate",
      width: 80,
      hozAlign: "right" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        const rowData = cell.getRow().getData();
        if (rowData.costName === '소계') {
          return `<span class="text-sm font-bold text-center">-</span>`;
        }
        return `<span class="text-sm font-mono text-right">${value.toLocaleString()}</span>`;
      }
    },
    {
      title: "청구금액",
      field: "billingAmount",
      width: 90,
      hozAlign: "right" as const,
      headerHozAlign: "center" as const,
      formatter: (cell: any) => {
        const value = cell.getValue();
        const rowData = cell.getRow().getData();
        if (rowData.costName === '소계') {
          return `<span class="text-sm font-bold text-right">${value.toLocaleString()}</span>`;
        }
        return `<span class="text-sm font-mono text-right">${value.toLocaleString()}</span>`;
      }
    }
  ];

  const additionalOptions = {
    layout: "fitData" as const,
    width: 770,
    responsiveLayout: false,
    pagination: false,
    movableColumns: false,
    resizableColumns: true,
    selectable: false,
    headerSort: false,
    height: "500px",
    footerElement: false
  };

  if (!selectedRowData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-lg font-medium mb-2">비용 상세 정보</div>
          <div className="text-sm">왼쪽 그리드에서 최종금액을 클릭하여 상세 정보를 확인하세요</div>
        </div>
      </div>
    );
  }

  if (mockData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-lg font-medium mb-2">비용 상세 정보</div>
          <div className="text-sm">선택된 항목의 상세 정보가 없습니다</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* 선택된 행 정보 표시 */}
      <div className="p-3 border-b" style={{ 
        background: 'var(--bg-primary)', 
        borderColor: 'var(--border-secondary)' 
      }}>
        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          정산근거번호: {selectedRowData.settlementBasisNo}
        </div>
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {selectedRowData.billingDate} | {selectedRowData.functionName} | 최종금액: {selectedRowData.finalAmount.toLocaleString()}원
        </div>
      </div>

      {/* 그리드 테이블 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-x-auto">
          <TabulatorGrid
            ref={gridRef}
            data={mockData}
            columns={columns}
            additionalOptions={additionalOptions}
            className="w-full h-full"
            showFooter={false}
          />
        </div>
      </div>
    </div>
  );
}
