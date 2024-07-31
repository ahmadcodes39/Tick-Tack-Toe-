import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
function MyTurn() {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(""));
  const [lock, setLock] = useState(false);
  const [count, setCount] = useState(0);
  const [isDraw, setIsDraw] = useState(false);
  const [isWinner, setIsWinner] = useState(null);

  const switchTurn = (index) => {
    if (lock || gameBoard[index]) {
      return;
    }
    const newBoard = [...gameBoard];

    if (count % 2 === 0) {
      newBoard[index] = "x";
    } else {
      newBoard[index] = "o";
    }
    setGameBoard(newBoard);
    setCount(count + 1);
    checkWinner(newBoard)
  };

  const checkDraw = (cell) => {
    return cell !== "";
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combinations of winningCombinations) {
      const [a, b, c] = combinations;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setLock(true);
        setIsWinner(newBoard[a]);
      }

      if (newBoard.every(checkDraw)) {
        setIsDraw(true);
        setLock(true);
      }
    }
  };

  const resetGame=()=>{
    setLock(false);
    setCount(0);
    setGameBoard(Array(9).fill(""));
    setIsDraw(false);
    setIsWinner(null);
  }

  return (
    <div className="font-mono">
      <div className="text-center mt-5">
        {
            !isWinner && !isDraw ?(
                <h1 className="text-5xl font-semibold text-white">
                    Tick Tack Toe Game In <span className="text-sky-600">React</span>
                 </h1>
            ):isWinner?(
               <h1 className="text-5xl font-semibold text-white">
                  Conguralation Player with {isWinner==='x'?<FaXmark className="text-6xl inline text-yellow-400"/>:<FaRegCircle className="text-5xl inline text-sky-400" />} Wins
               </h1>
            ):(
                <h1 className="text-5xl font-semibold text-white">
                    Game <span className="text-sky-600">Draws</span>
                </h1>
            )
        }
        
      </div>
      <div className="flex justify-center items-center h-[85vh] mb-5">
        <div className="grid grid-cols-3 gap-1">
          {gameBoard.map((cell, index) => (
            <div
              className="w-[170px] h-[170px] cursor-pointer rounded-lg bg-slate-800 flex justify-center items-center"
              onClick={() => {
                switchTurn(index);
              }}
            >
              {cell === "x" && (
                <FaXmark className="text-9xl inline text-yellow-400" />
              )}
              {cell === "o" && (
                <FaRegCircle className="text-8xl inline text-sky-400" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-[-72px]">
        <button className="text-white text-4xl bg-sky-700 p-4 w-80 rounded-lg hover:bg-sky-900 " onClick={resetGame}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default MyTurn;
