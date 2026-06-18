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
  const [, setScoreBoard] = useState<ScoreBoard>({});
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
    const weight = currentQ.weight;

    setScoreBoard(prev => {
      const newBoard = { ...prev };
      tags.forEach(tag => {
        if (tag in newBoard) {
          newBoard[tag] += weight;
        } else {
          newBoard[tag] = weight;
        }
      });
      return newBoard;
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
      if (page !== 'quiz') return;
      if (isTransitioning) return;

      const q = questions[currentQuestion];
      const keyMap: Record<string, number> = {
        'ArrowUp': 0,
        'ArrowRight': 1,
        'ArrowDown': 2,
        'ArrowLeft': 3,
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
      };

      const optionIndex = keyMap[e.key];
      if (optionIndex !== undefined && q.options[optionIndex]) {
        handleAnswer(q.options[optionIndex].tags);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, currentQuestion, isTransitioning, handleAnswer]);

  return (
    <div className="app">
      <FloatingBubbles />
      <div className="glass-overlay"></div>

      {page === 'home' && (
        <div className="home-container">
          <h1 className="title">今天你适合听什么？</h1>
          <p className="subtitle">回答 {questions.length} 个问题，找到此刻属于你的专辑</p>
          <button className="start-btn" onClick={startQuiz}>
            <span>开始测试</span>
          </button>
        </div>
      )}

      {page === 'quiz' && (
        <div className="quiz-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentQuestion + 1} / {questions.length}
            {questions[currentQuestion].weight > 1 && (
              <span className="weight-indicator"> x{questions[currentQuestion].weight}</span>
            )}
          </div>

          <div className={`question-card ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            <h2 className="question-text">{questions[currentQuestion].text}</h2>
            <div className="options-grid">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={option.id}
                  className="option-btn"
                  style={{
                    '--ripple-x': `${ripplePos.x}%`,
                    '--ripple-y': `${ripplePos.y}%`,
                  } as React.CSSProperties}
                  onClick={(e) => handleAnswer(option.tags, e)}
                >
                  <span className="option-key">{['上', '右', '下', '左'][index]}</span>
                  <span className="option-text">{option.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hint">使用方向键或点击选择</div>
        </div>
      )}

      {page === 'result' && recommendedAlbum && (
        <div className="result-container">
          <div className="album-cover-wrapper">
            <img
              src={recommendedAlbum.coverUrl}
              alt={recommendedAlbum.title}
              className="album-cover"
            />
            <div className="vinyl-ripple"></div>
          </div>
          <h2 className="album-title">{recommendedAlbum.title}</h2>
          <h3 className="artist-name">{recommendedAlbum.artist}</h3>
          <p className="album-comment">"{recommendedAlbum.comment}"</p>
          <div className="album-tags">
            {recommendedAlbum.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <button className="restart-btn" onClick={restart}>
            重新测试
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
