'use client';

import { motion } from 'framer-motion';
import { History, User, Clock, FileText, CheckCircle, Edit, Plus, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/common/hooks/useTheme';
import { useRouter } from 'next/navigation';

export default function SRMonitoringPage() {
  const { theme } = useTheme();
  const router = useRouter();
  
  // SR 히스토리 데이터
  const srHistory = [
    {
      srNo: 'SR25082611',
      status: 'BL 확정',
      currentStep: 'BL 확정 완료',
      timeline: [
        {
          id: 1,
          action: 'SR 요청',
          description: '화주가 포워더에게 SR 요청',
          timestamp: '2024-01-15 09:30',
          user: '김화주',
          userRole: '화주',
          status: 'completed'
        },
        {
          id: 2,
          action: 'SR 접수',
          description: '포워더가 SR 요청을 접수하고 검토',
          timestamp: '2024-01-15 10:15',
          user: '이포워더',
          userRole: '포워더',
          status: 'completed'
        },
        {
          id: 3,
          action: 'BL 생성',
          description: 'Bill of Lading 초안 생성',
          timestamp: '2024-01-15 14:20',
          user: '박운송',
          userRole: '운송담당자',
          status: 'completed'
        },
        {
          id: 4,
          action: 'BL 검토',
          description: 'BL 내용 검토 및 수정 요청',
          timestamp: '2024-01-16 09:45',
          user: '최검토',
          userRole: '검토담당자',
          status: 'completed'
        },
        {
          id: 5,
          action: 'BL 수정',
          description: 'BL 내용 수정 및 재검토',
          timestamp: '2024-01-16 11:30',
          user: '박운송',
          userRole: '운송담당자',
          status: 'completed'
        },
        {
          id: 6,
          action: 'BL 확정',
          description: 'BL 최종 확정 및 승인',
          timestamp: '2024-01-16 15:00',
          user: '이포워더',
          userRole: '포워더',
          status: 'completed'
        }
      ]
    },
    {
      srNo: 'SR25082610',
      status: 'BL 생성',
      currentStep: 'BL 생성 중',
      timeline: [
        {
          id: 1,
          action: 'SR 요청',
          description: '화주가 포워더에게 SR 요청',
          timestamp: '2024-01-14 16:20',
          user: '정화주',
          userRole: '화주',
          status: 'completed'
        },
        {
          id: 2,
          action: 'SR 접수',
          description: '포워더가 SR 요청을 접수하고 검토',
          timestamp: '2024-01-14 17:00',
          user: '김포워더',
          userRole: '포워더',
          status: 'completed'
        },
        {
          id: 3,
          action: 'BL 생성',
          description: 'Bill of Lading 초안 생성 중',
          timestamp: '2024-01-15 10:00',
          user: '이운송',
          userRole: '운송담당자',
          status: 'in_progress'
        }
      ]
    },
    {
      srNo: 'SR25082609',
      status: 'SR 접수',
      currentStep: 'SR 검토 중',
      timeline: [
        {
          id: 1,
          action: 'SR 요청',
          description: '화주가 포워더에게 SR 요청',
          timestamp: '2024-01-13 14:30',
          user: '박화주',
          userRole: '화주',
          status: 'completed'
        },
        {
          id: 2,
          action: 'SR 접수',
          description: '포워더가 SR 요청을 접수하고 검토 중',
          timestamp: '2024-01-13 15:15',
          user: '최포워더',
          userRole: '포워더',
          status: 'in_progress'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'in_progress':
        return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      case 'pending':
        return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" style={{ color: 'var(--accent-green)' }} />;
      case 'in_progress':
        return <Clock className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />;
      case 'pending':
        return <Clock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />;
      default:
        return <Clock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'SR 요청':
        return <Plus className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />;
      case 'SR 접수':
        return <FileText className="w-4 h-4" style={{ color: 'var(--accent-green)' }} />;
      case 'BL 생성':
        return <FileText className="w-4 h-4" style={{ color: 'var(--accent-purple)' }} />;
      case 'BL 검토':
        return <Edit className="w-4 h-4" style={{ color: 'var(--accent-orange)' }} />;
      case 'BL 수정':
        return <Edit className="w-4 h-4" style={{ color: 'var(--accent-orange)' }} />;
      case 'BL 확정':
        return <CheckCircle className="w-4 h-4" style={{ color: 'var(--accent-green)' }} />;
      default:
        return <History className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case '화주':
        return 'text-blue-400 bg-blue-500/20';
      case '포워더':
        return 'text-green-400 bg-green-500/20';
      case '운송담당자':
        return 'text-purple-400 bg-purple-500/20';
      case '검토담당자':
        return 'text-orange-400 bg-orange-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* 레벨 2 패턴 배경 - My Order 초록색 계열 */}
      <div className="absolute inset-0">
        {/* 기본 그라데이션 - 초록색 계열 */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, rgba(34, 197, 94, 0.06) 0%, rgba(16, 185, 129, 0.08) 50%, rgba(5, 150, 105, 0.06) 100%)
          `
        }}></div>
        
        {/* 격자 패턴 - 더 작고 미묘하게 */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* 점 패턴 - 초록색 계열 */}
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, rgba(34, 197, 94, 0.25) 1.5px, transparent 1.5px),
            radial-gradient(circle at 60px 60px, rgba(16, 185, 129, 0.25) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '80px 80px, 120px 120px',
          backgroundPosition: '0 0, 40px 40px'
        }}></div>
        
        {/* 원형 패턴 - 더 작고 미묘하게 */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 3%),
            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 3%),
            radial-gradient(circle at 20% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 2%),
            radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 2%)
          `,
          backgroundSize: '300px 300px, 400px 400px, 200px 200px, 250px 250px',
          backgroundPosition: '0% 0%, 100% 100%, 30% 70%, 70% 30%'
        }}></div>
      </div>
      
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="p-6 max-w-6xl mx-auto pb-8">
        {/* 헤더 */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/menu/my_order')}
              className="p-2 rounded-lg transition-colors"
            style={{ 
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>SR monitoring</h1>
              <p style={{ color: 'var(--text-secondary)' }}>SR 요청부터 BL 생성/확정까지의 전체 히스토리를 확인하세요</p>
            </div>
          </div>
          </motion.div>


        {/* SR 히스토리 목록 */}
        <div className="space-y-6">
          {srHistory.map((sr, srIndex) => (
        <motion.div
              key={sr.srNo}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 + srIndex * 0.1 }}
          className="backdrop-blur-md rounded-2xl p-6 border"
          style={{ 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-primary)' 
          }}
        >
              {/* SR 헤더 */}
              <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: 'var(--accent-blue)', opacity: 0.2 }}>
                    <History className="w-6 h-6" style={{ color: 'var(--accent-blue)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{sr.srNo}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{sr.currentStep}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor('completed')}`}>
                  {sr.status}
                </div>
              </div>

              {/* 타임라인 */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ background: 'var(--border-secondary)' }}></div>
                
                <div className="space-y-6">
                  {sr.timeline.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + srIndex * 0.1 + index * 0.05 }}
                      className="relative flex items-start gap-4"
                    >
                      {/* 타임라인 아이콘 */}
                      <div className={`relative z-10 p-2 rounded-full border-2 ${
                        item.status === 'completed' 
                          ? 'bg-green-500/20 border-green-400' 
                          : item.status === 'in_progress'
                          ? 'bg-blue-500/20 border-blue-400'
                          : 'bg-gray-500/20 border-gray-400'
                      }`}>
                        {getActionIcon(item.action)}
                      </div>

                      {/* 타임라인 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.action}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status === 'completed' ? '완료' : item.status === 'in_progress' ? '진행중' : '대기'}
                          </span>
                        </div>
                        
                        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{item.user}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${getRoleColor(item.userRole)}`}>
                              {item.userRole}
                            </span>
                          </div>
                  </div>
                </div>
              </motion.div>
            ))}
                </div>
          </div>
        </motion.div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}