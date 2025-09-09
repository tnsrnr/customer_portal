// SR List 데이터 타입 정의
export interface SRListData {
  // 1번째 API: 상위 4개 KPI 컴포넌트 데이터
  kpiMetrics: {
    activeOrders: number;              // 진행중인 주문
    completedOrders: number;           // 완료된 주문
    pendingQuotations: number;         // 대기중인 견적
    completedQuotations: number;       // 완료된 견적
    activeOrdersChange: number;        // 진행중인 주문 변화
    completedOrdersChange: number;     // 완료된 주문 변화
    pendingQuotationsChange: number;   // 대기중인 견적 변화
    completedQuotationsChange: number; // 완료된 견적 변화
  };
  // 2번째 API: 중간 그리드 테이블 데이터
  gridData: {
    srList: Array<{
      srNo: string;                    // SR 번호
      houseBl: string;                 // House B/L
      bound: string;                   // Bound
      invNo: string;                   // 인보이스 번호
      consignee: string;               // 수하인
      pol: string;                     // POL
      pod: string;                     // POD
      etd: string;                     // ETD
      eta: string;                     // ETA
      bkgStatus: string;               // BKG Status
      progress: string[];              // Progress
      blPrint: string | null;          // B/L Print
      account: string;                 // Account
      selected: boolean;               // 선택 상태
    }>;
  };
}
