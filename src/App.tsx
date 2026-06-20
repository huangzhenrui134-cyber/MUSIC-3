// @ts-nocheck
import React, { useState, useEffect } from "react";
import { questions, albums } from "./data/musicData";
import type { ScoreBoard, Album } from "./types";
import "./App.css";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [_scoreBoard, setScoreBoard] = useState<ScoreBoard>({});
  const [result, setResult] = useState<Album | null>(null);
  
  // 用于卡片拖拽手势的变量
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null);

  // 处理选择逻辑
  const handleSelect = (direction: 'up' | 'right' | 'down' | 'left') => {
    const question = questions[currentQuestion];
    if (!question) return; // 💡 提前拦截：如果题目不存在，直接返回，这样下面就不会报错了

    const selectedOption = question.options.find(o => o.direction === direction);
    if (!selectedOption) return;

    // 记录权重分数
    setScoreBoard((prev: ScoreBoard) => { // 💡 显式告诉 TypeScript，prev 的类型是 ScoreBoard
      const next = { ...prev };
      selectedOption.tags.forEach(tag => {
        next[tag] = (next[tag] || 0) + 1;
      });
      return next;
    });

    // 切换下一题或计算结果
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev: number) => prev + 1); // 💡 显式告诉 TypeScript，prev 是个数字
      // 重置手势状态
      setTouchOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    } else {
      calculateResult();
    }
  };

  // 监听键盘（留给电脑端黑客仪式感）
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