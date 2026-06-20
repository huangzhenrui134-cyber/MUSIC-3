import { useState, useEffect, useCallback } from 'react';
import { questions, albums } from './data/musicData';
import type { Album, ScoreBoard } from './types';
import './App.css';

type Page = 'home' | 'quiz' | 'result';

function FloatingBubbles() {
  return (
    <div className="bubble-container">
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<Page>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // 【修复点 1】把之前漏掉的 scoreBoard 变量正式补回来，允许程序读取它
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard>({});
  const [recommendedAlbum, setRecommendedAlbum] = useState<Album | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 50, y: 50 });

  const initScoreBoard = (): ScoreBoard => {
    const board: ScoreBoard = {};
    const allTags = new Set<string>();
    albums.forEach(album => album.tags.forEach(tag => allTags.add(tag)));
    allTags.forEach(tag => {
      board[tag] = 0;
    });
    return board;
  };

  const startQuiz = useCallback(() => {
    const initialBoard = initScoreBoard();
    setPage('quiz');
    setCurrentQuestion(0);
    setScoreBoard(initialBoard);
    setRecommendedAlbum(null);
  }, []);

  const handleAnswer = useCallback((tags: string[], event?: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return;

    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setRipplePos({ x, y });
    }

    setIsTransitioning(true);
    const currentQ = questions[currentQuestion];
    // 【修复点 2】防御性代码：防止 weight 未定义导致相加变成 NaN 崩溃
    const weight = currentQ.weight || 1;

    setScoreBoard(prev => {
      const newBoard = { ...prev };
      tags.forEach(tag => {
        if (tag in newBoard) {
          newBoard[tag] += weight;
        } else {
          newBoard[tag] = weight;
        }
      });
      return next;
    });

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setScoreBoard(prevBoard => {
          const bestMatch = findBestMatch(prevBoard);
          setRecommendedAlbum(bestMatch);
          setPage('result');
          return prevBoard;
        });
      }
      setIsTransitioning(false);
    }, 350);
  }, [currentQuestion, isTransitioning]);

  const findBestMatch = (board: ScoreBoard): Album => {
    interface AlbumScore { album: Album; score: number }
    const scores: AlbumScore[] = albums.map(album => {
      const totalScore = album.tags.reduce((sum, tag) => {
        return sum + (board[tag] || 0);
      }, 0);
      return { album, score: totalScore };
    });

    scores.sort((a, b) => b.score - a.score);

    // 【修复点 3】兜底防崩：万一库里没专辑，不至于引发前端白屏
    if (scores.length === 0) return albums[0];

    const maxScore = scores[0].score;
    const topAlbums = scores.filter(s => s.score === maxScore);

    if (topAlbums.length > 1) {
      const randomIndex = Math.floor(Math.random() * topAlbums.length);
      return topAlbums[randomIndex].album;
    }

    return scores[0].album;
  };

  const restart = () => {
    setPage('home');
    setCurrentQuestion(0);
    setScoreBoard({});
    setRecommendedAlbum(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (result) return;
      if (e.key === 'ArrowUp') handleSelect('up');
      if (e.key === 'ArrowRight') handleSelect('right');
      if (e.key === 'ArrowDown') handleSelect('down');
      if (e.key === 'ArrowLeft') handleSelect('left');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, result]);

  // 计算最终推荐专辑
  const calculateResult = () => {
    // 简易计算：找出得分最高的 tag（这里可根据实际逻辑微调）
    let bestAlbum = albums[0];
    setResult(bestAlbum);
  };

  // 手机端触摸开始
  const handleTouchStart = (e: React.TouchEvent) => {
    if (result) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  // 手机端触摸移动
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || result) return;
    const touch = e.touches[0];
    const offsetX = touch.clientX - touchStart.x;
    const offsetY = touch.clientY - touchStart.y;
    
    setTouchOffset({ x: offsetX, y: offsetY });

    // 判断滑动意图方向
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      if (offsetX > 30) setSwipeDirection('right');
      else if (offsetX < -30) setSwipeDirection('left');
    } else {
      if (offsetY > 30) setSwipeDirection('down');
      else if (offsetY < -30) setSwipeDirection('up');
    }
  };

  // 手机端触摸结束
  const handleTouchEnd = () => {
    if (!isDragging || result) return;
    setIsDragging(false);

    const threshold = 100; // 判定滑走的临界距离（像素）
    
    if (Math.abs(touchOffset.x) > threshold || Math.abs(touchOffset.y) > threshold) {
      if (swipeDirection) {
        handleSelect(swipeDirection);
        return;
      }
    }
    
    // 没滑够距离，弹回原位
    setTouchOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
  };

  // 渲染当前选项的 Hint 文本
  const getHintText = () => {
    if (!swipeDirection) return '';
    const option = questions[currentQuestion].options.find(o => o.direction === swipeDirection);
    return option ? option.text : '';
  };

  if (result) {
    return (
      <div className="app-container result-page">
        <div className="vinyl-wrapper">
          <div className="vinyl-record">
            <img src={result.coverUrl} alt={result.title} className="album-cover" />
          </div>
        </div>
        <h2>{result.title}</h2>
        <h3>{result.artist}</h3>
        <p className="album-comment">"{result.comment || '暂无乐评'}"</p>
        <button onClick={() => window.location.reload()} className="retry-btn">重新探索</button>
      </div>
    );
  }

  // 计算卡片跟随手指移动的实时样式
  const cardStyle = {
    transform: `translate(${touchOffset.x}px, ${touchOffset.y}px) rotate(${touchOffset.x * 0.05}px)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease, rotate 0.3s ease',
  };

  return (
    <div className="app-container">
      <div className="progress-bar">
        <div className="progress-inner" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
      </div>

      <div 
        className={`swipe-card ${isDragging ? 'dragging' : ''}`}
        style={cardStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <span className="question-number">QUESTION 0{currentQuestion + 1}</span>
        <h2 className="question-text">{questions[currentQuestion].text}</h2>
        
        {/* 滑动时在卡片内部动态浮现对应的选项内容 */}
        {swipeDirection && (
          <div className={`swipe-hint-overlay ${swipeDirection}`}>
            <p className="hint-text">{getHintText()}</p>
          </div>
        )}
      </div>

      {/* 电脑端保留的键盘操作提示，手机端会自动隐藏 */}
      <div className="desktop-hints">
        <p>使用键盘键盘键盘键盘 ⬆️ ⬇️ ⬅️ ➡️ 方向键进行做出抉择</p>
      </div>
    </div>
  );
}