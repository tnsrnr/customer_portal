import { 
  BarChart3, 
  ShoppingCart, 
  FileText,
  Calculator,
  Package,
  History,
  MapPin,
  Send,
  List,
  Plus,
  Eye,
  Monitor,
  DollarSign,
  Receipt
} from "lucide-react";
import type { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  name: string;
  path: string;
  icon?: LucideIcon;
  description?: string;
}

export interface MenuItem {
  name: string;
  path: string;
  icon?: LucideIcon;
  description?: string;
  submenu?: SubMenuItem[];
}

// 화주 포탈 메뉴 구조
export const menuItems: MenuItem[] = [
  { 
    name: 'Overview', 
    path: '/menu/overview', 
    icon: BarChart3,
    description: '서비스 현황 개요'
  },
  { 
    name: 'My Order', 
    path: '/menu/my_order', 
    icon: ShoppingCart,
    description: '내 물류 주문',
    submenu: [
      {
        name: '배송 요청',
        path: '/menu/my_order/shipping_request',
        icon: Send,
        description: '새로운 배송 요청 등록'
      },
      {
        name: '배송 요청 목록',
        path: '/menu/my_order/sr_list',
        icon: List,
        description: '배송 요청 현황 조회'
      },
      {
        name: '배송 모니터링',
        path: '/menu/my_order/sr_monitoring',
        icon: Monitor,
        description: '실시간 배송 추적'
      }
    ]
  },
  { 
    name: 'Quotation', 
    path: '/menu/quotation', 
    icon: FileText,
    description: '물류 견적',
    submenu: [
      {
        name: '견적 요청',
        path: '/menu/quotation/quotation_request',
        icon: Plus,
        description: '새로운 견적 요청'
      },
      {
        name: '견적 목록',
        path: '/menu/quotation/quotation_list',
        icon: List,
        description: '견적 현황 조회'
      }
    ]
  },
  { 
    name: 'Account', 
    path: '/menu/account', 
    icon: Calculator,
    description: '정산 관리',
    submenu: [
      {
        name: '계정 목록',
        path: '/menu/account/acc_list',
        icon: List,
        description: '계정 현황 조회'
      }
    ]
  }
];

// 유틸리티 함수들
export const getMenuByPath = (path: string): MenuItem | undefined => {
  return menuItems.find(item => item.path === path);
};

export const getAllMenuPaths = (): string[] => {
  return menuItems.map(item => item.path);
}; 