// @ts-nocheck
import React, { useState, useCallback, useRef } from 'react';
import { musicData } from './data/musicData';
import './App.css';

function App() {
  const [page, setPage] = useState('welcome');
  const [scoreBoard, setScoreBoard] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recommendedAlbum, setRecommendedAlbum] = useState(null);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [touchOffset, setTouchOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  // ✅ 修复：isDragging 改为 useRef，不能用 useState 再当 .current 用
  const isDragging = useRef(false);
  const touchStartPos = useRef(0);

  const initScoreBoard = () => {
    const board = {};
    musicData.forEach(album => {
      album.tags.forEach(tag => {
        board[tag] = 0;
      });
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

  const handleAnswer = useCallback((tags, event) => {
    if (isTransitioning) return;

    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setRipplePos({ x, y });
    }

    setIsTransitioning(true);

    setTimeout(() => {
      const newScoreBoard = { ...scoreBoard };
      tags.forEach(tag => {
        newScoreBoard[tag] = (newScoreBoard[tag] || 0) + 1;
      });
      setScoreBoard(newScoreBoard);

      const nextQuestion = currentQuestion + 1;
      // ✅ 修复：题目总数应该从 questions 字段读，而不是 musicData[0].questions
      //    如果你的数据结构里题目是独立的 questions 数组，请按实际调整
      const totalQuestions = musicData.length;

      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
        setIsTransitioning(false);
      } else {
        let maxScore = -1;
        let bestAlbum = musicData[0];

        musicData.forEach(album => {
          let score = 0;
          album.tags.forEach(tag => {
            score += newScoreBoard[tag] || 0;
          });
          if (score > maxScore) {
            maxScore = score;
            bestAlbum = album;
          }
        });

        setRecommendedAlbum(bestAlbum);
        setPage('result');
        setIsTransitioning(false);
      }
    }, 600);
  }, [currentQuestion, scoreBoard, isTransitioning]);

  const restart = () => {
    setPage('welcome');
    setScoreBoard({});
    setCurrentQuestion(0);
    setRecommendedAlbum(null);
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    touchStartPos.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartPos.current;
    setTouchOffset(diff);
    if (diff > 50) setSwipeDirection('right');
    else if (diff < -50) setSwipeDirection('left');
    else setSwipeDirection(null);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (swipeDirection === 'left') {
      handleAnswer(['experimental', 'post-rock']);
    } else if (swipeDirection === 'right') {
      handleAnswer(['chamber-pop', 'indie']);
    }
    setTouchOffset(0);
    setSwipeDirection(null);
  };

  const handleSelect = (direction) => {
    if (direction === 'left') handleAnswer(['experimental', 'post-rock']);
    if (direction === 'right') handleAnswer(['chamber-pop', 'indie']);
  };

  const currentAlbumData = musicData[currentQuestion];

  return (
    <div className="app-container">
      {page === 'welcome' && (
        <div className="welcome-card">
          <h1>音乐风格倾向测试</h1>
          <button onClick={startQuiz}>开始探索</button>
        </div>
      )}

      {page === 'quiz' && currentAlbumData && (
        <div className="quiz-container">
          <div
            className={`swipe-card ${swipeDirection || ''} ${isTransitioning ? 'fade-out' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ transform: `translateX(${touchOffset}px) rotate(${touchOffset * 0.05}deg)` }}
          >
            <img src={`/src/assets/${currentAlbumData.cover}`} alt="Cover" className="album-cover" />
            <h3>{currentAlbumData.title}</h3>
            <p>{currentAlbumData.artist}</p>
          </div>
          <div className="actions">
            <button onClick={() => handleSelect('left')}>不喜欢 (左滑)</button>
            <button onClick={() => handleSelect('right')}>喜欢 (右滑)</button>
          </div>
        </div>
      )}

      {page === 'result' && recommendedAlbum && (
        <div className="result-card">
          <h2>为你推荐的专辑：</h2>
          <img src={`/src/assets/${recommendedAlbum.cover}`} alt="Result Cover" className="album-cover" />
          <h3>{recommendedAlbum.title}</h3>
          <p>{recommendedAlbum.artist}</p>
          <button onClick={restart}>再试一次</button>
        </div>
      )}
    </div>
  );
}

export default App;
