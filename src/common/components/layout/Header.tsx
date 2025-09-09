'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { menuItems } from './menu_config';
// 드래그 앤 드롭 제거 - 단순화
import { useState, useEffect, useRef } from 'react';

function cn(...classes: Array<string | false | undefined | null>): string {
  return classes.filter(Boolean).join(' ');
}

import { RefreshCw, Calendar, Settings, LogOut, Sun, Moon, ChevronDown } from 'lucide-react';
import { useGlobalStore } from '@/global/store/slices/global';
import { clearSession } from '@/app/auth/session';
import { useTheme } from '@/common/hooks/useTheme';

// 드롭다운 메뉴 아이템 컴포넌트
function MenuItem({ menu, pathname }: { 
  menu: any; 
  pathname: string; 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isActive = pathname === menu.path || (menu.submenu && menu.submenu.some((sub: any) => pathname === sub.path));
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 서브메뉴가 있는 경우
  if (menu.submenu && menu.submenu.length > 0) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex flex-row items-center gap-x-2 px-2 py-2 rounded-lg transition-all duration-200 font-medium text-base backdrop-blur-sm border"
          style={{
            background: isActive ? 'var(--bg-card)' : 'var(--bg-tertiary)',
            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
            borderColor: isActive ? 'var(--border-primary)' : 'var(--border-secondary)',
            boxShadow: isActive ? 'var(--shadow-md)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = 'var(--bg-card)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--border-primary)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = 'var(--bg-tertiary)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-secondary)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {menu.icon && <menu.icon className="w-5 h-5" />}
          <span className="whitespace-nowrap">{menu.name}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl z-50 border"
            style={{
              background: 'var(--bg-dropdown)',
              borderColor: 'var(--border-primary)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="p-2">
              {menu.submenu.map((subItem: any, index: number) => {
                const isSubActive = pathname === subItem.path;
                return (
                  <Link
                    key={subItem.path}
                    href={subItem.path}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{
                      background: isSubActive ? 'var(--bg-tertiary)' : 'transparent',
                      color: isSubActive ? 'var(--text-dropdown)' : 'var(--text-dropdown-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubActive) {
                        e.currentTarget.style.background = 'var(--bg-tertiary)';
                        e.currentTarget.style.color = 'var(--text-dropdown)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-dropdown-secondary)';
                      }
                    }}
                  >
                    {subItem.icon && <subItem.icon className="w-5 h-5" />}
                    <div>
                      <div className="font-medium">{subItem.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text-dropdown-secondary)' }}>
                        {subItem.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 일반 메뉴 아이템
  return (
    <Link
      href={menu.path}
      className="flex flex-row items-center gap-x-2 px-2 py-2 rounded-lg transition-all duration-200 font-medium text-base backdrop-blur-sm border"
      style={{
        background: isActive ? 'var(--bg-card)' : 'var(--bg-tertiary)',
        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
        borderColor: isActive ? 'var(--border-primary)' : 'var(--border-secondary)',
        boxShadow: isActive ? 'var(--shadow-md)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'var(--bg-card)';
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.borderColor = 'var(--border-primary)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'var(--bg-tertiary)';
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.borderColor = 'var(--border-secondary)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {menu.icon && <menu.icon className="w-5 h-5" />}
      <span className="whitespace-nowrap">{menu.name}</span>
    </Link>
  );
}

// 설정 드롭다운 메뉴 컴포넌트
function SettingsDropdown({ 
  isOpen, 
  onToggle, 
  onClose, 
  handleLogout 
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  handleLogout: () => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-3 py-2 text-base rounded-lg transition-colors border"
        style={{
          color: 'var(--text-secondary)',
          background: 'var(--bg-tertiary)',
          borderColor: 'var(--border-secondary)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.background = 'var(--bg-card)';
          e.currentTarget.style.borderColor = 'var(--border-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.background = 'var(--bg-tertiary)';
          e.currentTarget.style.borderColor = 'var(--border-secondary)';
        }}
        title="설정"
      >
        <Settings className="w-5 h-5" />
        <span className="hidden sm:inline">설정</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 backdrop-blur-md rounded-xl shadow-2xl z-50 border"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-primary)'
          }}
        >
          <div className="p-2 space-y-1">
            {/* 테마 변경 섹션 */}
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
                테마 설정
              </h3>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.background = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                <span>{theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}</span>
              </button>
            </div>

            {/* 구분선 */}
            <div className="border-t" style={{ borderColor: 'var(--border-secondary)' }}></div>

            {/* 로그아웃 섹션 */}
            <div className="px-3 py-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors"
                style={{
                  color: 'var(--accent-red)',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-red)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.opacity = '0.1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--accent-red)';
                  e.currentTarget.style.opacity = '1';
                }}
              >
                <LogOut className="w-4 h-4" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    isRefreshing, 
    triggerGlobalRefresh, 
    selectedYear, 
    selectedMonth, 
    setSelectedYear, 
    setSelectedMonth
  } = useGlobalStore();
  const [isClient, setIsClient] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = useTheme();

  // 클라이언트 사이드 렌더링 보장
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 페이지 설정 제거 - 단순화

  // 로그인 페이지에서는 헤더를 숨김
  if (pathname === '/auth') {
    return null;
  }

  const handleLogout = () => {
    // localStorage에서 세션 정보 제거
    clearSession();
    // 로그인 페이지로 리다이렉트
    router.push('/auth');
  };

  const handleGlobalRefresh = () => {
    triggerGlobalRefresh();
  };



  // 단순화된 메뉴 표시
  const visibleMenus = menuItems;

  // 년도 옵션 (현재 년도 기준 ±2년)
  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);
  
  // 월 옵션
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // 서버 사이드 렌더링 시 기본 메뉴 순서 사용
  const serverSideMenus = menuItems;

  return (
    <header className="backdrop-blur-md shadow-xl border-none z-50 relative" style={{ 
      background: 'var(--bg-primary)' 
    }}>
      <div className="flex justify-between items-center px-3 py-3">
        <div className="flex items-center space-x-4">
          {/* HTNS 로고 */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image 
                src="/images/htns-logo.png" 
                alt="HTNS Logo" 
                width={110} 
                height={38} 
                className="object-contain"
              />
            </div>
          </Link>
          {/* 메뉴 네비게이션 */}
          <div className="flex items-center space-x-2">
            {/* 메뉴 목록 */}
            <nav className="flex space-x-2">
              {visibleMenus.map((menu) => (
                <MenuItem
                  key={menu.path}
                  menu={menu}
                  pathname={pathname}
                />
              ))}
            </nav>
          </div>
        </div>
        {/* 우측 버튼들 */}
        <div className="flex items-center space-x-3">
          {/* 년도/월 선택기 */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg border border-white/20">
            {isClient ? (
              <Calendar className="w-4 h-4 text-blue-100" />
            ) : (
              <span className="w-4 h-4 bg-blue-100 rounded"></span>
            )}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent text-blue-100 text-sm border-none outline-none cursor-pointer"
            >
              {yearOptions.map(year => (
                <option key={year} value={year} className="bg-slate-800 text-white">
                  {year}년
                </option>
              ))}
            </select>
            <span className="text-blue-100 text-sm">/</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-transparent text-blue-100 text-sm border-none outline-none cursor-pointer"
            >
              {monthOptions.map(month => (
                <option key={month} value={month} className="bg-slate-800 text-white">
                  {month}월
                </option>
              ))}
            </select>
          </div>
          
          {/* 전역 조회 버튼 */}
          <button
            onClick={handleGlobalRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-3 py-2 text-base text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-white/20"
            title="현재 페이지 데이터 새로고침"
          >
            {isClient ? (
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            ) : (
              <span className="w-5 h-5 bg-blue-100 rounded"></span>
            )}
            <span className="hidden sm:inline">조회</span>
          </button>
          
          {/* 설정 드롭다운 */}
          {isClient && (
            <SettingsDropdown
              isOpen={isSettingsOpen}
              onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
              onClose={() => setIsSettingsOpen(false)}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </header>
  );
} 