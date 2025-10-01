import React, { useState, useEffect } from 'react';
import type { LeaderData } from './types';
import Dashboard from './components/Dashboard';
import CommentIcon from './components/icons/CommentIcon';

const App: React.FC = () => {
  const [leaderData, setLeaderData] = useState<LeaderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from Firebase/n8n
    const fetchCommentCount = () => {
      setIsLoading(true);
      setTimeout(() => {
        // Mock data: A random number of comments to show different states on refresh.
        // Let's make it between 0 and 60 for variety.
        const commentCount = Math.floor(Math.random() * 61);
        
        const data: LeaderData = {
          id: 'comment-leader',
          name: '댓글반장',
          description: '커뮤니티 활성화를 위해 댓글 50개 작성하기',
          current: commentCount,
          target: 50,
          icon: CommentIcon,
        };
        setLeaderData(data);
        setIsLoading(false);
      }, 1500); // Simulate network delay
    };

    fetchCommentCount();
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
          ) : leaderData ? (
            <Dashboard leaders={[leaderData]} />
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
