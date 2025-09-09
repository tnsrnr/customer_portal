import { 
  BarChart3, 
  ShoppingCart, 
  FileText,
  Package,
  History,
  MapPin
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
        name: '진행중인 주문',
        path: '/menu/my_order/active_orders',
        icon: Package,
        description: '현재 처리 중인 주문'
      },
      {
        name: '주문 이력',
        path: '/menu/my_order/order_history',
        icon: History,
        description: '과거 주문 내역'
      },
      {
        name: '주문 추적',
        path: '/menu/my_order/order_tracking',
        icon: MapPin,
        description: '실시간 배송 추적'
      }
    ]
  },
  { 
    name: 'Quotation', 
    path: '/menu/quotation', 
    icon: FileText,
    description: '물류 견적'
  }
];

// 유틸리티 함수들
export const getMenuByPath = (path: string): MenuItem | undefined => {
  return menuItems.find(item => item.path === path);
};

export const getAllMenuPaths = (): string[] => {
  return menuItems.map(item => item.path);
}; 