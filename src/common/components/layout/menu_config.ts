import { 
  BarChart3, 
  ShoppingCart, 
  FileText,
  Calculator,
  Package,
  History,
  MapPin,
  Send
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
    description: '내 물류 주문'
  },
  { 
    name: 'Quotation', 
    path: '/menu/quotation', 
    icon: FileText,
    description: '물류 견적'
  },
  { 
    name: 'Account', 
    path: '/menu/account', 
    icon: Calculator,
    description: '정산 관리'
  }
];

// 유틸리티 함수들
export const getMenuByPath = (path: string): MenuItem | undefined => {
  return menuItems.find(item => item.path === path);
};

export const getAllMenuPaths = (): string[] => {
  return menuItems.map(item => item.path);
}; 