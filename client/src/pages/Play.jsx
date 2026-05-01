import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GridPattern from '../components/ui/GridPattern';

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
    <section className="relative pt-24 pb-16 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <GridPattern />
      <div className="relative z-10 max-w-lg w-full px-6 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-yellow-500 text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Let's play</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            You Can't Beat Me
          </h1>
          <div className="w-16 h-0.5 bg-yellow-500 mx-auto mb-4" />
          <p className="text-gray-400 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {winner ? (winner === 'Draw' ? "seee. you can't beat me." : `${winner} wins.`) : (xIsNext ? "> Your turn (X)" : "> hmmm... good move")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-3 gap-2 bg-gray-800 p-2 rounded-lg shadow-[0_0_30px_rgba(234,179,8,0.05)] border border-gray-800"
        >
          {board.map((cell, index) => (
            <motion.button
              key={index}
              className={`w-24 h-24 md:w-32 md:h-32 bg-black flex items-center justify-center rounded transition-colors ${!cell && !winner && xIsNext ? 'hover:bg-gray-900 cursor-pointer' : 'cursor-default'
                } ${winningLine.includes(index) ? 'bg-yellow-500/10' : ''}`}
              onClick={() => handleClick(index)}
              whileHover={!cell && !winner && xIsNext ? { scale: 0.98 } : {}}
              whileTap={!cell && !winner && xIsNext ? { scale: 0.95 } : {}}
            >
              {cell && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`text-5xl md:text-7xl font-bold ${cell === 'X' ? 'text-white' : 'text-red'
                    } ${winningLine.includes(index) ? 'text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]' : ''}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {cell}
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {winner && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest rounded-full transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={resetGame}
          >
            Play Again
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default Play;
