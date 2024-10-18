import React, { useState, useEffect } from 'react';
import { Keyboard } from 'lucide-react';
import { words } from './words';

function App() {
  const [currentWord, setCurrentWord] = useState(() => words[Math.floor(Math.random() * words.length)]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [showMiss, setShowMiss] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameStarted(false);
    }
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (input.toLowerCase() === currentWord.en.toLowerCase()) {
      setScore(score + 1);
      setInput('');
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      setShowMiss(false);
    } else if (input.length > 0 && !currentWord.en.toLowerCase().startsWith(input.toLowerCase())) {
      setShowMiss(true);
    } else {
      setShowMiss(false);
    }
  }, [input, currentWord, score]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    setInput(e.target.value);
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setInput('');
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setGameStarted(false);
    setShowMiss(false);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 40) return "素晴らしい！あなたは英語の達人です！";
    if (score >= 30) return "すごい！とても優秀な成績です！";
    if (score >= 20) return "よくできました！着実に上達しています！";
    if (score >= 10) return "がんばりました！次はもっと上を目指しましょう！";
    return "チャレンジしてくれてありがとう！次はもっと頑張りましょう！";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">英単語タイピングゲーム</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {timeLeft > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-semibold">スコア: {score}</span>
              <span className="text-xl font-semibold">残り時間: {timeLeft}秒</span>
            </div>
            <div className="text-center mb-6">
              <p className="text-3xl font-bold mb-2">{currentWord.en}</p>
              <p className="text-xl text-gray-600">{currentWord.ja}</p>
            </div>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-4 text-center text-xl"
              placeholder={gameStarted ? "単語を入力してください" : "入力してゲームを開始"}
            />
            {showMiss && (
              <p className="text-red-500 text-center font-bold mb-4">ミス！</p>
            )}
            <div className="flex items-center justify-center text-gray-500 mb-4">
              <Keyboard className="mr-2" />
              <span>{gameStarted ? "タイピングを続けてください！" : "入力してゲームを開始してください！"}</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">ゲーム終了！</h2>
            <p className="text-2xl mb-4">あなたのスコア: <span className="font-bold text-blue-600">{score}</span></p>
            <p className="text-xl mb-6">{getScoreMessage(score)}</p>
            <button
              onClick={resetGame}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              もう一度プレイ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;