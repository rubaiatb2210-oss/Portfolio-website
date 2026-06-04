import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PosterFrame from '../components/ui/PosterFrame';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Minimax algorithm
const minimax = (board, depth, isMaximizing) => {
  const winner = checkWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (!board.includes(null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const getBestMove = (board) => {
  let bestScore = -Infinity;
  let move = null;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

const checkWinner = (squares) => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Play = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  useEffect(() => {
    // Check for winner
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningLine([a, b, c]);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner('Draw');
      return;
    }

    // Computer's turn (O)
    if (!xIsNext && !winner) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove([...board]);
        if (bestMove !== null) {
          const newBoard = [...board];
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setXIsNext(true);
        }
      }, 500); // Small delay for realism
      return () => clearTimeout(timer);
    }
  }, [board, xIsNext, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !xIsNext) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setXIsNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  return (
    <PosterFrame variant="play">
      {/* Scanline CRT simulation overlay */}
      <div className="absolute inset-0 bg-scanlines pointer-events-none z-10 opacity-30 select-none" />

      <div className="max-w-lg w-full mx-auto px-4 py-6 md:py-10 flex flex-col items-center">
        {/* Retro arcade header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-8"
        >
          <p className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Let's Play
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            You Can't <span className="text-yellow-500 font-serif">Beat Me</span>
          </h1>
          <div className="w-20 h-0.5 bg-yellow-500 mx-auto mb-6" />

          {/* CRT Terminal status display box */}
          <div 
            className="px-4 py-2 border border-yellow-950 bg-black/60 rounded-sm font-mono text-xs text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)] inline-block select-none"
          >
            {winner ? (
              winner === 'Draw' ? (
                <span>&gt; SEEE, YOU CAN'T BEAT ME.</span>
              ) : (
                <span className="text-red-500 animate-pulse">&gt; {winner} WINS. SYSTEM TERMINATED.</span>
              )
            ) : (
              xIsNext ? (
                <span>&gt; YOUR TURN (X) // WAITING INPUT...</span>
              ) : (
                <span className="animate-pulse">&gt; HMMM... THINKING...</span>
              )
            )}
          </div>
        </motion.div>

        {/* Arcade Grid Matrix */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-3 gap-2 bg-yellow-950/20 p-2.5 rounded-sm border border-yellow-950/60 shadow-[0_0_30px_rgba(234,179,8,0.06)]"
        >
          {board.map((cell, index) => (
            <motion.button
              key={index}
              className={`w-24 h-24 md:w-32 md:h-32 bg-black border border-yellow-950/40 flex items-center justify-center rounded-sm transition-all duration-300 ${
                !cell && !winner && xIsNext 
                  ? 'hover:bg-neutral-900 hover:border-yellow-500/50 cursor-pointer' 
                  : 'cursor-default'
              } ${winningLine.includes(index) ? 'bg-yellow-500/10 border-yellow-500 shadow-[inset_0_0_10px_rgba(234,179,8,0.2)]' : ''}`}
              onClick={() => handleClick(index)}
              whileHover={!cell && !winner && xIsNext ? { scale: 0.98 } : {}}
              whileTap={!cell && !winner && xIsNext ? { scale: 0.96 } : {}}
            >
              {cell && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`text-5xl md:text-7xl font-bold font-mono ${
                    cell === 'X' 
                      ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' 
                      : 'text-red drop-shadow-[0_0_6px_rgba(255,0,0,0.6)]'
                  } ${winningLine.includes(index) ? 'text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]' : ''}`}
                >
                  {cell}
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Reset Button */}
        {winner && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 px-8 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold uppercase tracking-widest rounded-sm transition-all duration-300 font-mono shadow-[0_0_20px_rgba(234,179,8,0.3)] text-sm border border-yellow-600"
            onClick={resetGame}
          >
            [ REBOOT SYSTEM ]
          </motion.button>
        )}
      </div>
    </PosterFrame>
  );
};

export default Play;
