'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/card';
import { Lock, User } from 'lucide-react';

type Variant = 'basic' | 'compact' | 'classic';

export default function AuthPage() {
  const [username, setUsername] = useState('tnsrnr');
  const [password, setPassword] = useState('tnsrnr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  // 디자인 변형 상태
  const [variant, setVariant] = useState<Variant>(() => {
    try {
      const fromQuery = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('variant') as Variant | null) : null;
      if (fromQuery === 'basic' || fromQuery === 'compact' || fromQuery === 'classic') return fromQuery;
      const saved = typeof window !== 'undefined' ? (localStorage.getItem('auth-variant') as Variant | null) : null;
      if (saved === 'basic' || saved === 'compact' || saved === 'classic') return saved;
      return 'basic';
    } catch {
      return 'basic';
    }
  });

  // variant에 따라 카드/폼 크기 클래스 설정
  const sizing = useMemo(() => {
    switch (variant) {
      case 'compact':
        return {
          card: 'max-w-xs p-6',
          input: 'pl-9 pr-3 py-1.5 text-sm',
          icon: 'w-4 h-4',
          btn: 'py-2 text-sm',
          title: 'text-2xl',
          lockBadge: 'p-3',
        } as const;
      case 'classic':
        return {
          card: 'max-w-md p-10',
          input: 'pl-11 pr-4 py-3 text-base',
          icon: 'w-5 h-5',
          btn: 'py-3 text-base',
          title: 'text-3xl',
          lockBadge: 'p-5',
        } as const;
      default:
        return {
          card: 'max-w-sm p-8',
          input: 'pl-10 pr-3 py-2 text-sm',
          icon: 'w-5 h-5',
          btn: 'py-2.5 text-sm',
          title: 'text-3xl',
          lockBadge: 'p-4',
        } as const;
    }
  }, [variant]);

  // variant 동기화: localStorage & URL 쿼리
  useEffect(() => {
    try {
      localStorage.setItem('auth-variant', variant);
    } catch {}

    // URL 쿼리 업데이트 (불필요한 replace 방지)
    const currentInQuery = searchParams?.get('variant');
    if (currentInQuery !== variant) {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('variant', variant);
      router.replace(`/auth?${params.toString()}`);
    }
  }, [variant, router, searchParams]);

  // 세션 체크
  useEffect(() => {
    const session = localStorage.getItem('htns-session');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        if (sessionData.jsessionId && sessionData.csrfToken) {
          router.push('/');
        }
      } catch (e) {
        localStorage.removeItem('htns-session');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('🔍 Spring 서버 로그인 시도:', { username });
      
      const response = await fetch('/auth/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      console.log('🔍 로그인 응답:', data);

      if (data.success) {
        // 세션 정보 저장
        localStorage.setItem('htns-session', JSON.stringify({
          jsessionId: data.user.jsessionId,
          csrfToken: data.user.csrfToken,
          username: data.user.name,
          loginTime: Date.now()
        }));
        
        // 브라우저 쿠키 동기화
        // 기존 CSRF 토큰 쿠키들 모두 삭제
        document.cookie = 'X-CSRF-TOKEN=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'X_CSRF_TOKEN=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'x-csrf-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        // 새로운 세션 쿠키 설정
        document.cookie = `JSESSIONID=${data.user.jsessionId}; path=/; SameSite=Strict`;
        document.cookie = `X-CSRF-TOKEN=${data.user.csrfToken}; path=/; SameSite=Strict`;
        
        console.log('✅ 세션 저장 완료:', {
          jsessionId: data.user.jsessionId,
          csrfToken: data.user.csrfToken
        });
        
        // 로그인 성공 시 메인 페이지로 이동
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSession = () => {
    setUsername('');
    setPassword('');
    localStorage.removeItem('htns-session');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 relative overflow-hidden" data-variant={variant}>
      {/* 배경 효과 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-[28rem] h-[28rem] opacity-25 animate-spin-slow" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="#2563eb" strokeWidth="40" strokeDasharray="40 40" />
          <text
            x="200"
            y="235"
            textAnchor="middle"
            fontSize="72"
            fontWeight="bold"
            fill="white"
            opacity="0.25"
            style={{ letterSpacing: 18 }}
          >
            HTNS
          </text>
        </svg>
        <svg className="absolute bottom-0 right-0 w-[32rem] h-[32rem] opacity-50 animate-pulse-slow" viewBox="0 0 512 512" fill="none">
          <text
            x="256"
            y="320"
            textAnchor="middle"
            fontSize="110"
            fontWeight="900"
            fill="#3b82f6"
            opacity="0.5"
            style={{ letterSpacing: 32 }}
          >
            HTNS
          </text>
        </svg>
      </div>
      {/* 디자인 전환 버튼 */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {(['basic','compact','classic'] as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`px-3 py-1 rounded border transition ${variant === v ? 'bg-white/30 text-white border-white/50' : 'bg-white/10 text-gray-200 border-white/20 hover:bg-white/20'}`}
            type="button"
            aria-pressed={variant === v}
          >
            {v}
          </button>
        ))}
      </div>

      <Card className={`relative z-10 w-full ${sizing.card} shadow-2xl rounded-2xl bg-white/80 border-0`}>
        <div className="flex flex-col items-center mb-8">
          <div className={`bg-blue-600 rounded-full ${sizing.lockBadge} shadow-lg mb-4 animate-bounce`}>
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className={`${sizing.title} font-extrabold text-slate-800 tracking-tight mb-2`}>HTNS 경영정보시스템</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
              아이디
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                <User className={sizing.icon} />
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${sizing.input}`}
                required
                autoFocus
                placeholder="아이디를 입력하세요"
                autoComplete="username"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
              비밀번호
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                <Lock className={sizing.icon} />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${sizing.input}`}
                required
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
              />
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white px-4 rounded-lg font-bold shadow-md hover:from-blue-700 hover:to-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizing.btn}`}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>

          <button
            type="button"
            onClick={handleClearSession}
            className="w-full mt-2 bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200"
          >
            🧹 세션 초기화
          </button>
        </form>
        <div className="mt-8 text-center text-xs text-slate-500 select-none">
          <p>인증서버: <span className="font-semibold text-blue-600">qa-lv1.htns.com</span></p>
          <p>테스트 계정: <span className="font-semibold text-blue-600">tnsrnr</span></p>
          <p>비밀번호: <span className="font-semibold text-blue-600">tnsrnr</span></p>
        </div>
      </Card>
    </div>
  );
} 