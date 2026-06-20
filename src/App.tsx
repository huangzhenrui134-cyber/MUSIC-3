import React, { useState, useEffect } from 'react';
import { questions, albums } from './data/musicData';
import { ScoreBoard, Album } from './types';
import './App.css';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [_scoreBoard, setScoreBoard] = useState<ScoreBoard>({});
  const [result, setResult] = useState<Album | null>(null);
  
  // 手势状态
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);

  // 处理抉择逻辑
  const handleSelect = (direction: 'up' | 'right' | 'down' | 'left') => {
    const question = questions[currentQuestion];
    const selectedOption = question.options.find(o => o.direction === direction);
    
    if (!selectedOption) return;

    // 记录权重
    setScoreBoard(prev => {
      const next = { ...prev };
      selectedOption.tags.forEach(tag => {
        next[tag] = (next[tag] || 0) + 1;
      });
      return next;
    });

    // 切换下一题
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTouchOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    } else {
      calculateResult();
    }
  };

  // 监听键盘方向键（电脑端）
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

  const calculateResult = () => {
    let bestAlbum = albums[0];
    setResult(bestAlbum);
  };

  // 手机端手势开始
  const handleTouchStart = (e: React.TouchEvent) => {
    if (result) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  // 手机端手势移动
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || result) return;
    const touch = e.touches[0];
    const offsetX = touch.clientX - touchStart.x;
    const offsetY = touch.clientY - touchStart.y;
    
    setTouchOffset({ x: offsetX, y: offsetY });

    // 判定滑动方向
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      if (offsetX > 40) setSwipeDirection('right');
      else if (offsetX < -40) setSwipeDirection('left');
    } else {
      if (offsetY > 40) setSwipeDirection('down');
      else if (offsetY < -40) setSwipeDirection('up');
    }
  };

  // 手机端手势结束
  const handleTouchEnd = () => {
    if (!isDragging || result) return;
    setIsDragging(false);

    const threshold = 80; // 划过 80 像素就切题
    if (Math.abs(touchOffset.x) > threshold || Math.abs(touchOffset.y) > threshold) {
      if (swipeDirection) {
        handleSelect(swipeDirection);
        return;
      }
    }
    setTouchOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
  };

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

  // 卡片实时跟随动效
  const cardStyle = {
    transform: `translate(${touchOffset.x}px, ${touchOffset.y}px) rotate(${touchOffset.x * 0.04}deg)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
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
        
        {swipeDirection && (
          <div className={`swipe-hint-overlay ${swipeDirection}`}>
            <p className="hint-text">{getHintText()}</p>
          </div>
        )}
      </div>

      {/* 基础网格区域（电脑端由它渲染，手机端会被 CSS 隐藏掉） */}
      <div className="options-grid">
        {questions[currentQuestion].options.map((option) => (
          <button
            key={option.direction}
            className={`option-button ${option.direction}`}
            onClick={() => handleSelect(option.direction)}
          >
            <span className="direction-label">{option.direction.toUpperCase()}</span>
            <span className="btn-label">{option.text}</span>
          </button>
        ))}
      </div>

      <div className="desktop-hints">
        <p>键盘 ⬆️ ⬇️ ⬅️ ➡️ 方向键亦可做出抉择</p>
      </div>
    </div>
  );
}
