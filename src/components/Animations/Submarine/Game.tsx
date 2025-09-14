/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Sub from './Sub';
import Ocean from './Ocean';
import scssObj from './_Submarine.scss';

interface Fish {
  id: string;
  x: number;
  y: number;
  speed: number;
}

function checkCollision(a: DOMRect, b: DOMRect) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

const Game = () => {
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const submarineRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // 🐟 spawn fish
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setFishes((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          x: window.innerWidth,
          y: Math.random() * (window.innerHeight - 200),
          speed: 2 + Math.random() * 3,
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameOver]);

  // 🐟 move fish
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setFishes((prev) => prev.map((f) => ({ ...f, x: f.x - f.speed })).filter((f) => f.x > -100));
    }, 30);

    return () => clearInterval(interval);
  }, [gameOver]);

  // ⚡ collisions
  useEffect(() => {
    if (gameOver) return;
    const check = () => {
      const subRect = submarineRef.current?.getBoundingClientRect();
      const lightRect = lightRef.current?.getBoundingClientRect();

      if (!subRect || !lightRect) return;

      setFishes((prev) =>
        prev.filter((fish) => {
          const el = document.getElementById(fish.id);
          if (!el) return true;
          const rect = el.getBoundingClientRect();

          // 🚨 submarine hit fish
          if (checkCollision(subRect, rect)) {
            setGameOver(true);
            return false;
          }

          // 🌟 light hit fish
          if (checkCollision(lightRect, rect)) {
            setScore((s) => s + 1);
            return false;
          }

          return true;
        }),
      );
    };

    const interval = setInterval(check, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  const restart = () => {
    setFishes([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <Ocean>
      {/* HUD */}
      <div className={`${scssObj.baseClass}__hud`}>
        <p className={`${scssObj.baseClass}__score`}>Score: {score}</p>
        {gameOver && (
          <button onClick={restart} className={scssObj.restartBtn}>
            Restart
          </button>
        )}
      </div>

      <div className={`${scssObj.baseClass}__submarine`}>
        <Sub animate subRef={submarineRef} lightRef={lightRef} id={1} />
      </div>

      {/* Fish */}
      {fishes.map((fish) => (
        <div
          key={fish.id}
          id={fish.id}
          className={`${scssObj.baseClass}__fish`}
          style={{ top: fish.y, left: fish.x }}
        >
          <div className="top-fin" />
          <div className="bottom-fin" />
        </div>
      ))}
    </Ocean>
  );
};

export default Game;
