'use client';

import { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { motion } from 'framer-motion';
import { useTheme } from '@/common/hooks/useTheme';

interface QuotationData {
  id: number;
  quotationNo: string;
  shipmentType: string;
  incoterms: string;
  pol: string;
  pod: string;
  etd: string;
  eta: string;
  shipper: string;
  consignee: string;
  cargoType: string;
  itemInfo: string;
  pkgType: string;
  pkgQty: string;
  grossWeight: string;
  cbm: string;
  status: string;
  quotationAmount: string;
  requestDate: string;
  customsClearance: boolean;
  insurance: boolean;
  inlandTransport: boolean;
}

interface QuotationTableProps {
  data: QuotationData[];
  loading: boolean;
}

export function QuotationTable({ data, loading }: QuotationTableProps) {
  const { theme } = useTheme();
  const tableRef = useRef<HTMLDivElement>(null);
  const [tabulator, setTabulator] = useState<Tabulator | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '승인':
        return 'background: #10b981; color: white;';
      case '검토중':
        return 'background: #f59e0b; color: white;';
      case '대기':
        return 'background: #3b82f6; color: white;';
      default:
        return 'background: #6b7280; color: white;';
    }
  };

  const getShipmentTypeText = (type: string) => {
    switch (type) {
      case 'AE': return '항공수출';
      case 'AI': return '항공수입';
      case 'OE': return '해상수출';
      case 'OI': return '해상수입';
      default: return type;
    }
  };

  const getCargoTypeText = (type: string) => {
    switch (type) {
      case 'General': return '일반';
      case 'DG': return '위험물';
      case 'Reefer': return '냉장/냉동';
      case 'Special': return '특수화물';
      default: return type;
    }
  };

  const getAdditionalServices = (row: QuotationData) => {
    const services = [];
    if (row.customsClearance) services.push('통관');
    if (row.insurance) services.push('보험');
    if (row.inlandTransport) services.push('내륙운송');
    return services.join(', ') || '-';
  };

  useEffect(() => {
    if (!tableRef.current || !data.length) return;

    const table = new Tabulator(tableRef.current, {
      data: data,
      layout: 'fitColumns',
      pagination: true,
      paginationSize: 20,
      paginationSizeSelector: [10, 20, 50, 100],
      movableColumns: true,
      resizableRows: true,
      height: 'calc(100vh - 200px)',
      theme: theme === 'dark' ? 'dark' : 'default',
      columns: [
        {
          title: '견적번호',
          field: 'quotationNo',
          width: 120,
          headerFilter: 'input',
          formatter: (cell) => {
            const value = cell.getValue();
            return `<button class="text-blue-500 hover:text-blue-700 font-medium cursor-pointer" style="color: var(--accent-blue);">${value}</button>`;
          }
        },
        {
          title: '선적유형',
          field: 'shipmentType',
          width: 80,
          headerFilter: 'select',
          headerFilterParams: {
            values: { '': '전체', 'AE': '항공수출', 'AI': '항공수입', 'OE': '해상수출', 'OI': '해상수입' }
          },
          formatter: (cell) => {
            const value = cell.getValue();
            return getShipmentTypeText(value);
          }
        },
        {
          title: '인코텀즈',
          field: 'incoterms',
          width: 80,
          headerFilter: 'select',
          headerFilterParams: {
            values: { '': '전체', 'FOB': 'FOB', 'CIF': 'CIF', 'FCA': 'FCA', 'CFR': 'CFR', 'EXW': 'EXW', 'DAP': 'DAP', 'DDP': 'DDP' }
          }
        },
        {
          title: 'POL',
          field: 'pol',
          width: 80,
          headerFilter: 'input'
        },
        {
          title: 'POD',
          field: 'pod',
          width: 80,
          headerFilter: 'input'
        },
        {
          title: 'ETD',
          field: 'etd',
          width: 100,
          headerFilter: 'input'
        },
        {
          title: 'ETA',
          field: 'eta',
          width: 100,
          headerFilter: 'input'
        },
        {
          title: '송하인',
          field: 'shipper',
          width: 120,
          headerFilter: 'input'
        },
        {
          title: '수하인',
          field: 'consignee',
          width: 120,
          headerFilter: 'input'
        },
        {
          title: '화물유형',
          field: 'cargoType',
          width: 80,
          headerFilter: 'select',
          headerFilterParams: {
            values: { '': '전체', 'General': '일반', 'DG': '위험물', 'Reefer': '냉장/냉동', 'Special': '특수화물' }
          },
          formatter: (cell) => {
            const value = cell.getValue();
            return getCargoTypeText(value);
          }
        },
        {
          title: '품목정보',
          field: 'itemInfo',
          width: 100,
          headerFilter: 'input'
        },
        {
          title: '포장유형',
          field: 'pkgType',
          width: 80,
          headerFilter: 'select',
          headerFilterParams: {
            values: { '': '전체', 'CTN': 'CTN', 'PLT': 'PLT', 'BAG': 'BAG', 'DRUM': 'DRUM', 'CASE': 'CASE' }
          }
        },
        {
          title: '수량',
          field: 'pkgQty',
          width: 60,
          headerFilter: 'input'
        },
        {
          title: '중량',
          field: 'grossWeight',
          width: 80,
          headerFilter: 'input'
        },
        {
          title: 'CBM',
          field: 'cbm',
          width: 60,
          headerFilter: 'input'
        },
        {
          title: '상태',
          field: 'status',
          width: 80,
          headerFilter: 'select',
          headerFilterParams: {
            values: { '': '전체', '승인': '승인', '검토중': '검토중', '대기': '대기' }
          },
          formatter: (cell) => {
            const value = cell.getValue();
            return `<span class="px-2 py-1 rounded-full text-xs font-medium" style="${getStatusColor(value)}">${value}</span>`;
          }
        },
        {
          title: '견적금액',
          field: 'quotationAmount',
          width: 120,
          headerFilter: 'input',
          formatter: (cell) => {
            const value = cell.getValue();
            return `<span class="font-semibold" style="color: var(--accent-green);">${value}</span>`;
          }
        },
        {
          title: '요청일',
          field: 'requestDate',
          width: 100,
          headerFilter: 'input'
        },
        {
          title: '추가서비스',
          field: 'additionalServices',
          width: 120,
          formatter: (cell) => {
            const row = cell.getRow().getData();
            return getAdditionalServices(row);
          }
        }
      ],
      rowFormatter: (row) => {
        const element = row.getElement();
        element.style.borderBottom = '1px solid var(--border-secondary)';
        element.addEventListener('mouseenter', () => {
          element.style.backgroundColor = 'var(--bg-hover)';
        });
        element.addEventListener('mouseleave', () => {
          element.style.backgroundColor = '';
        });
      }
    });

    setTabulator(table);

    return () => {
      table.destroy();
    };
  }, [data, theme]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow-sm border"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          견적서 목록
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          총 {data.length}건의 견적서가 있습니다.
        </p>
      </div>
      
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--accent-blue)' }}></div>
          </div>
        ) : (
          <div ref={tableRef} className="w-full"></div>
        )}
      </div>
    </motion.div>
  );
}
