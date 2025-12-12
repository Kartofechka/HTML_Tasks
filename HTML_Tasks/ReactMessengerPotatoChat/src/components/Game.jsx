import React, { useState, useEffect, useCallback } from "react";
import "../assets/gameStyles.css";

const SIZE = 4;

export default function Game2048() {
  const [grid, setGrid] = useState(Array.from({ length: SIZE }, () => Array(SIZE).fill(0)));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("best2048") || 0));
  const [message, setMessage] = useState("");

  const spawn = (g) => {
    const empty = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (!g[r][c]) empty.push([r, c]);
      }
    }
    if (!empty.length) return;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    g[r][c] = Math.random() < 0.9 ? 2 : 4;
  };

  const init = useCallback(() => {
    const newGrid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    spawn(newGrid);
    spawn(newGrid);
    setGrid(newGrid);
    setScore(0);
    setMessage("");
  }, []);

  const compress = (arr) => {
    arr = arr.filter((v) => v);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        setScore((s) => {
          const newScore = s + arr[i];
          if (newScore > best) {
            setBest(newScore);
            localStorage.setItem("best2048", newScore);
          }
          return newScore;
        });
        arr[i + 1] = 0;
        i++;
      }
    }
    arr = arr.filter((v) => v);
    while (arr.length < SIZE) arr.push(0);
    return arr;
  };

  const move = useCallback(
    (dir) => {
      const newGrid = grid.map((row) => row.slice());
      let moved = false;

      if (dir === "left" || dir === "right") {
        for (let r = 0; r < SIZE; r++) {
          let row = newGrid[r].slice();
          if (dir === "right") row.reverse();
          let newRow = compress(row);
          if (dir === "right") newRow.reverse();
          if (newRow.toString() !== newGrid[r].toString()) {
            newGrid[r] = newRow;
            moved = true;
          }
        }
      } else {
        for (let c = 0; c < SIZE; c++) {
          let col = newGrid.map((row) => row[c]);
          if (dir === "down") col.reverse();
          let newCol = compress(col);
          if (dir === "down") newCol.reverse();
          for (let r = 0; r < SIZE; r++) {
            if (newGrid[r][c] !== newCol[r]) {
              newGrid[r][c] = newCol[r];
              moved = true;
            }
          }
        }
      }

      if (moved) {
        spawn(newGrid);
        setGrid(newGrid);
      }

      if (!canMove(newGrid)) {
        setMessage("Игра окончена! Ходов больше нет.");
      }
    },
    [grid, best]
  );

  const canMove = (g) => {
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (g[r][c] === 0) return true;
      }
    }
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const v = g[r][c];
        if (r + 1 < SIZE && g[r + 1][c] === v) return true;
        if (c + 1 < SIZE && g[r][c + 1] === v) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") move("left");
      if (e.key === "ArrowRight") move("right");
      if (e.key === "ArrowUp") move("up");
      if (e.key === "ArrowDown") move("down");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

  return (
    <div className="game-container">
      <div>
        <header>
          <div className="title">2048</div>
          <div className="score-wrap">
            <div className="score">
              Счёт: <span>{score}</span>
            </div>
            <div className="best">
              Лучший: <span>{best}</span>
            </div>
          </div>
        </header>

        <div className="controls">
          <button onClick={init}>Новая игра</button>
          <div className="hint">Управление стрелками на клавиатуре</div>
        </div>

        <div className="board">
          {grid.flat().map((val, idx) => (
            <div key={idx} className={`cell ${val ? "v" + val : ""}`}>
              {val || ""}
            </div>
          ))}
          {message && (
            <div className={`message ${message ? "show" : ""}`}>
              <div className="box">
                <div>{message}</div>
                <div className="hint">Нажми «Новая игра», чтобы начать заново</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
