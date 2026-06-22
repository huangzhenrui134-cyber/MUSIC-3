// @ts-nocheck
import React, { useState, useCallback, useRef } from 'react';
import { questions, albums } from './data/musicData';
import './App.css';

function App() {
  const [page, setPage] = useState('welcome');
  const [scoreBoard, setScoreBoard] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recommendedAlbum, setRecommendedAlbum] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchOffset, setTouchOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const isDragging = useRef(false);
  const touchStartPos = useRef(0);

  const initScoreBoard = () => {
    const board = {};
    albums.forEach(album => {
      album.tags.forEach(tag => { board[tag] = 0; });
    });
    return board;
  };

  const startQuiz = useCallback(() => {
    setPage('quiz');
    setCurrentQuestion(0);
    setScoreBoard(initScoreBoard());
    setRecommendedAlbum(null);
  }, []);

  const handleAnswer = useCallback((tags) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      const newScoreBoard = { ...scoreBoard };
      tags.forEach(tag => {
        newScoreBoard[tag] = (newScoreBoard[tag] || 0) + 1;
      });
      setScoreBoard(newScoreBoard);

      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setIsTransitioning(false);
      } else {
        let maxScore = -1;
        let bestAlbum = albums[0];
        albums.forEach(album => {
          let score = 0;
          album.tags.forEach(tag => { score += newScoreBoard[tag] || 0; });
          if (score > maxScore) {
            maxScore = score;
            bestAlbum = album;
          }
        });
        setRecommendedAlbum(bestAlbum);
        setPage('result');
        setIsTransitioning(false);
      }
    }, 400);
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
    const diff = e.touches[0].clientX - touchStartPos.current;
    setTouchOffset(diff);
    if (diff > 50) setSwipeDirection('right');
    else if (diff < -50) setSwipeDirection('left');
    else setSwipeDirection(null);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    const q = questions[currentQuestion];
    if (swipeDirection === 'right' && q) {
      handleAnswer(q.options[0].tags);
    } else if (swipeDirection === 'left' && q) {
      handleAnswer(q.options[1].tags);
    }
    setTouchOffset(0);
    setSwipeDirection(null);
  };

  const q = questions[currentQuestion];

  return (
    <div className="app-container">
      {page === 'welcome' && (
        <div className="welcome-card">
          <h1>音乐风格倾向测试</h1>
          <p>回答10个问题，发现属于你的专辑</p>
          <button onClick={startQuiz}>开始探索</button>
        </div>
      )}

      {page === 'quiz' && q && (
        <div className="quiz-container">
          <div className="progress">
            {currentQuestion + 1} / {questions.length}
          </div>

          <div
            className={`swipe-card ${swipeDirection || ''} ${isTransitioning ? 'fade-out' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ transform: `translateX(${touchOffset}px) rotate(${touchOffset * 0.03}deg)` }}
          >
            <h3 className="question-text">{q.text}</h3>
          </div>

          <div className="options">
            {q.options.map(option => (
              <button
                key={option.id}
                className="option-btn"
                onClick={() => handleAnswer(option.tags)}
                disabled={isTransitioning}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {page === 'result' && recommendedAlbum && (
        <div className="result-card">
          <h2>为你推荐</h2>
          <img
            src={recommendedAlbum.coverUrl}
            alt={recommendedAlbum.title}
            className="album-cover"
          />
          <h3>{recommendedAlbum.title}</h3>
          <p className="artist">{recommendedAlbum.artist}</p>
          <p className="comment">{recommendedAlbum.comment}</p>
          <button onClick={restart}>再试一次</button>
        </div>
      )}
    </div>
  );
}

export default App;
