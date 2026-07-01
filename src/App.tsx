// @ts-nocheck
cat > /mnt/user-data/outputs/App.tsx << 'EOF'
// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomQuestions, getRecommendedAlbum } from './data/musicData';
import type { Question, Album } from './data/musicData';
import './App.css';

function App() {
  const [page, setPage] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [recommendedAlbum, setRecommendedAlbum] = useState<Album | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [hintDirection, setHintDirection] = useState<'left' | 'right' | null>(null);

  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const startQuiz = useCallback(() => {
    setQuestions(getRandomQuestions());
    setScores({});
    setCurrentIndex(0);
    setRecommendedAlbum(null);
    setPage('quiz');
  }, []);

  const answer = useCallback((isYes: boolean) => {
    if (isTransitioning) return;
    const q = questions[currentIndex];
    if (!q) return;

    const tag = isYes ? q.yesTag : q.noTag;
    const newScores = { ...scores, [tag]: (scores[tag] || 0) + 1 };
    setScores(newScores);
    setIsTransitioning(true);

    setTimeout(() => {
      const next = currentIndex + 1;
      if (next < questions.length) {
        setCurrentIndex(next);
        setDragOffset(0);
        setHintDirection(null);
        setIsTransitioning(false);
      } else {
        const album = getRecommendedAlbum(newScores);
        setRecommendedAlbum(album);
        setPage('result');
        setIsTransitioning(false);
      }
    }, 350);
  }, [isTransitioning, questions, currentIndex, scores]);

  const restart = () => {
    setPage('welcome');
    setDragOffset(0);
    setHintDirection(null);
  };

  // 键盘方向键
  useEffect(() => {
    if (page !== 'quiz') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') answer(true);
      if (e.key === 'ArrowLeft') answer(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [page, answer]);

  // 鼠标拖动
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
    if (diff > 40) setHintDirection('right');
    else if (diff < -40) setHintDirection('left');
    else setHintDirection(null);
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragOffset > 80) answer(true);
    else if (dragOffset < -80) answer(false);
    else { setDragOffset(0); setHintDirection(null); }
    dragStartX.current = null;
  };

  // 触摸滑动
  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const diff = e.touches[0].clientX - dragStartX.current;
    setDragOffset(diff);
    if (diff > 40) setHintDirection('right');
    else if (diff < -40) setHintDirection('left');
    else setHintDirection(null);
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    if (dragOffset > 80) answer(true);
    else if (dragOffset < -80) answer(false);
    else { setDragOffset(0); setHintDirection(null); }
    dragStartX.current = null;
  };

  const q = questions[currentIndex];
  const rotation = dragOffset * 0.04;

  return (
    <div className="app-container" onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      {page === 'welcome' && (
        <div className="welcome-card">
          <h1>今天的音乐</h1>
          <p>10个问题，找到现在最适合你的专辑</p>
          <button onClick={startQuiz}>开始</button>
        </div>
      )}

      {page === 'quiz' && q && (
        <div className="quiz-container">
          <div className="progress-bar-wrap">
            <div className="progress-bar" style={{ width: `${(currentIndex / questions.length) * 100}%` }} />
          </div>
          <div className="progress-text">{currentIndex + 1} / {questions.length}</div>

          <div className="card-row">
            <span className={`arrow-hint left ${hintDirection === 'left' ? 'active' : ''}`}>←</span>

            <div
              ref={cardRef}
              className={`swipe-card ${hintDirection || ''} ${isTransitioning ? 'fade-out' : ''}`}
              style={{ transform: `translateX(${dragOffset}px) rotate(${rotation}deg)` }}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <p className="question-text">{q.text}</p>
            </div>

            <span className={`arrow-hint right ${hintDirection === 'right' ? 'active' : ''}`}>→</span>
          </div>

          <div className="swipe-labels">
            <span>否</span>
            <span>是</span>
          </div>
        </div>
      )}

      {page === 'result' && recommendedAlbum && (
        <div className="result-card">
          <p className="result-label">现在适合你的</p>
          <img src={recommendedAlbum.coverUrl} alt={recommendedAlbum.title} className="album-cover" />
          <h2>{recommendedAlbum.title}</h2>
          <p className="artist">{recommendedAlbum.artist}</p>
          <p className="comment">{recommendedAlbum.comment}</p>
          <button onClick={restart}>再来一次</button>
        </div>
      )}
    </div>
  );
}

export default App;
EOF