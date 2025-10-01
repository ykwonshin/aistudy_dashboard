// Firebase Web SDK를 사용하여 댓글 데이터를 가져오는 함수들
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, orderBy, limit, query } from 'firebase/firestore';

export interface CommentStats {
  totalComments0: number;
  totalComments1: number;
  totalComments2: number;
  name0: string;
  name1: string;
  name2: string;
  timestamp?: string;
}

// Firebase 설정
const firebaseConfig = {
  projectId: 'dashboard-aistudy',
  // 다른 설정은 필요에 따라 추가
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Firebase Web SDK를 통해 댓글 통계 데이터를 가져옵니다
 */
export async function fetchCommentStats(): Promise<CommentStats | null> {
  try {
    console.log('Fetching comment stats from Firestore...');
    
    // dashboard 문서에서 commentStats 필드 가져오기
    const { doc, getDoc } = await import('firebase/firestore');
    const dashboardRef = doc(db, 'dashboard', 'commentStats');
    const dashboardSnap = await getDoc(dashboardRef);
    
    if (!dashboardSnap.exists()) {
      console.warn('Dashboard document not found');
      return null;
    }
    
    const data = dashboardSnap.data();
    console.log('Retrieved dashboard data:', data);
    
    const totalComments0 = data.totalComments0 || 0;
    const totalComments1 = data.totalComments1 || 0;
    const totalComments2 = data.totalComments2 || 0;
    const name0 = data.name0 || '댓글반장 1호';
    const name1 = data.name1 || '댓글반장 2호';
    const name2 = data.name2 || '댓글반장 3호';
    
    return {
      totalComments0,
      totalComments1,
      totalComments2,
      name0,
      name1,
      name2,
      timestamp: data.timestamp ? data.timestamp.toDate().toISOString() : 'unknown',
    };
  } catch (error) {
    console.error('Error fetching comment stats:', error);
    return null;
  }
}

/**
 * 댓글 통계 데이터를 주기적으로 가져오는 함수
 */
export async function startCommentStatsPolling(
  onUpdate: (stats: CommentStats) => void,
  intervalMs: number = 30000 // 30초마다 업데이트
): Promise<() => void> {
  let isPolling = true;

  const poll = async () => {
    if (!isPolling) return;
    
    const stats = await fetchCommentStats();
    if (stats) {
      onUpdate(stats);
    }
    
    if (isPolling) {
      setTimeout(poll, intervalMs);
    }
  };

  // 즉시 한 번 실행
  poll();

  // 폴링 중지 함수 반환
  return () => {
    isPolling = false;
  };
}
