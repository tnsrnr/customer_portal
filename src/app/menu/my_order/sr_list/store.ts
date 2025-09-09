import { create } from 'zustand';
import { SRListData } from './types';

// Mock 데이터 생성 함수
const generateMockData = (): SRListData => {
  return {
    kpiMetrics: {
      activeOrders: 3,
      completedOrders: 12,
      pendingQuotations: 5,
      completedQuotations: 8,
      activeOrdersChange: 1,
      completedOrdersChange: 3,
      pendingQuotationsChange: -1,
      completedQuotationsChange: 2
    },
    gridData: {
      srList: [
        {
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
          selected: false
        },
        {
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
          selected: false
        },
        {
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
          selected: false
        }
      ]
    }
  };
};

interface SRListStore {
  data: SRListData | null;
  loading: boolean;
  error: string | null;
  
  fetchAllData: () => Promise<void>;
  setData: (data: SRListData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleSelection: (srNo: string) => void;
  reset: () => void;
}

export const useSRListStore = create<SRListStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchAllData: async () => {
    set({ loading: true, error: null });
    
    try {
      // 실제 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = generateMockData();
      set({ data: mockData, loading: false });
    } catch (error) {
      console.error('❌ 데이터 로드 실패:', error);
      set({ 
        error: error instanceof Error ? error.message : '데이터 로드 중 오류가 발생했습니다.', 
        loading: false 
      });
    }
  },

  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  toggleSelection: (srNo) => set(state => {
    if (!state.data) return state;
    
    return {
      data: {
        ...state.data,
        gridData: {
          ...state.data.gridData,
          srList: state.data.gridData.srList.map(sr => ({
            ...sr,
            selected: sr.srNo === srNo ? !sr.selected : false
          }))
        }
      }
    };
  }),
  
  reset: () => set({ data: null, loading: false, error: null })
}));
