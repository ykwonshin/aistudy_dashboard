import React, { useState, useEffect } from 'react';
import type { LeaderData } from './types';
import Dashboard from './components/Dashboard';
import CommentIcon from './components/icons/CommentIcon';
import { fetchCommentStats, startCommentStatsPolling, type CommentStats } from './api/firestore';

const App: React.FC = () => {
  const [leadersData, setLeadersData] = useState<LeaderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stopPolling: (() => void) | null = null;

    const initializeData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 초기 데이터 로드
        const initialStats = await fetchCommentStats();
        if (initialStats) {
          const leaders: LeaderData[] = [
            {
              id: 'comment-leader-0',
              name: initialStats.name0,
              description: '커뮤니티 활성화를 위해 댓글 50개 작성하기',
              current: initialStats.totalComments0,
              target: 50,
              icon: CommentIcon,
            },
            {
              id: 'comment-leader-1',
              name: initialStats.name1,
              description: '커뮤니티 활성화를 위해 댓글 50개 작성하기',
              current: initialStats.totalComments1,
              target: 50,
              icon: CommentIcon,
            },
            {
              id: 'comment-leader-2',
              name: initialStats.name2,
              description: '커뮤니티 활성화를 위해 댓글 50개 작성하기',
              current: initialStats.totalComments2,
              target: 50,
              icon: CommentIcon,
            },
          ];
          setLeadersData(leaders);
          setIsLoading(false);
        } else {
          setError('댓글 데이터를 불러올 수 없습니다.');
          setIsLoading(false);
        }

        // 실시간 폴링 시작 (30초마다 업데이트)
        stopPolling = await startCommentStatsPolling((stats: CommentStats) => {
          const leaders: LeaderData[] = [
            {
              id: 'comment-leader-0',
              name: stats.name0,
              description: '커뮤니티 활성화를 위해 댓글 50개 작성하기',
              current: stats.totalComments0,
              target: 50,
              icon: CommentIcon,
            },
            {
              id: 'comment-leader-1',
              name: stats.name1,
              description: '커뮤니티 활성화를 위해 댓글 50개 작성하기',
              current: stats.totalComments1,
              target: 50,
              icon: CommentIcon,
            },
            {
              id: 'comment-leader-2',
              name: stats.name2,
              description: '커뮤니티 활성화를 위해 댓글 50개 작성하기',
              current: stats.totalComments2,
              target: 50,
              icon: CommentIcon,
            },
          ];
          setLeadersData(leaders);
        }, 30000);

      } catch (err) {
        console.error('Error initializing comment data:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    initializeData();

    // 컴포넌트 언마운트 시 폴링 중지
    return () => {
      if (stopPolling) {
        stopPolling();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
       <main className="z-10 w-full flex flex-col items-center">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            학습반장 미션 대시보드
          </h1>
          <p className="text-slate-400 text-lg">미션 달성 현황을 실시간으로 확인하세요.</p>
        </header>
        
        <div className="w-full" style={{minHeight: '350px'}}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 pt-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
              <p className="text-slate-300 text-lg">댓글 데이터를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center space-y-4 pt-16">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <p className="text-red-400 text-center text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                다시 시도
              </button>
            </div>
          ) : leadersData.length > 0 ? (
            <Dashboard leaders={leadersData} />
          ) : (
            <p className="text-red-400 text-center pt-16">데이터를 불러오는데 실패했습니다.</p>
          )}
        </div>
      </main>
       <footer className="z-10 mt-12 text-center text-slate-500">
        <p>댓글반장 대시보드 v1.0</p>
      </footer>
    </div>
  );
};

export default App;
