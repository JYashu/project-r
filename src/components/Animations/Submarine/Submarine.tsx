import { useEffect, useRef, useState } from 'react';
import Sub from './Sub';
import Ocean from './Ocean';
import scssObj from './_Submarine.scss';
import Button from '../../../elements/button';

interface Fish {
  id: string;
  x: number;
  y: number;
  speed: number;
}

function checkCollision(a: DOMRect, b: DOMRect) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

function getTrianglePoints(lightEl: HTMLElement): [number, number][] {
  const rect = lightEl.getBoundingClientRect();

  const topX = rect.left + rect.width / 2;
  const topY = rect.top;

  const baseHalf = 40;
  const height = 150;

  return [
    [topX, topY],
    [topX - baseHalf, topY + height],
    [topX + baseHalf, topY + height],
  ];
}

function pointInTriangle(
  px: number,
  py: number,
  [ax, ay]: [number, number],
  [bx, by]: [number, number],
  [cx, cy]: [number, number],
) {
  const areaOrig = Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay));
  const area1 = Math.abs((ax - px) * (by - py) - (bx - px) * (ay - py));
  const area2 = Math.abs((bx - px) * (cy - py) - (cx - px) * (by - py));
  const area3 = Math.abs((cx - px) * (ay - py) - (ax - px) * (cy - py));
  return area1 + area2 + area3 === areaOrig;
}

function rectPoints(rect: DOMRect): [number, number][] {
  return [
    [rect.left, rect.top],
    [rect.right, rect.top],
    [rect.right, rect.bottom],
    [rect.left, rect.bottom],
  ];
}

function triangleRectCollision(triangle: [number, number][], rect: DOMRect) {
  return (
    rectPoints(rect).some(([x, y]) =>
      pointInTriangle(x, y, triangle[0], triangle[1], triangle[2]),
    ) ||
    triangle.some(
      ([x, y]) => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom,
    )
  );
}

/*
 * CSS animations by @data._.pirates: https://github.com/data-pirates07/submarine-animation-using-pure-css
 */

/* http://drbl.in/nOzJ
 * CSS Submarine
 * A pen by Alberto Jerez
 * www.ajerez.es
 */
const Submarine = ({ isGame, startGame }: { isGame?: boolean; startGame?: boolean }) => {
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(startGame === undefined ? false : !startGame);
  const fishCount = isGame ? 10 : 5;

  const oceanRef = useRef<HTMLDivElement>(null);
  const submarineRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // 🐟 spawn fish
  useEffect(() => {
    if (isGame && gameOver) return undefined;
    const interval = setInterval(() => {
      setFishes((prev) => {
        if (prev.length >= fishCount) return prev;
        return [
          ...prev,
          {
            id: Date.now().toString(),
            x: window.innerWidth,
            y: Math.random() * Math.max(0, (oceanRef.current?.offsetHeight ?? 500) - 200),
            speed: 2 + Math.random() * 3,
          },
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, isGame]);

  // 🐟 move fish
  useEffect(() => {
    if (isGame && gameOver) return undefined;
    const interval = setInterval(() => {
      setFishes((prev) => prev.map((f) => ({ ...f, x: f.x - f.speed })).filter((f) => f.x > -100));
    }, 30);

    return () => clearInterval(interval);
  }, [gameOver, isGame]);

  // ⚡ collisions
  useEffect(() => {
    if (!isGame || (isGame && gameOver)) return undefined;

    let animationId: number;

    const check = () => {
      const oceanRect = oceanRef.current?.getBoundingClientRect();
      const subRect = submarineRef.current?.getBoundingClientRect();
      const lightEl = lightRef.current;
      if (!subRect || !lightEl) {
        animationId = requestAnimationFrame(check);
        return;
      }

      const triangle = getTrianglePoints(lightEl);

      setFishes((prev) =>
        prev.filter((fish) => {
          if (fish.x < subRect.left - 200 || fish.x > subRect.right + 200) return true;

          const el = document.getElementById(fish.id);
          if (!el) return true;
          const rect = el.getBoundingClientRect();

          if (checkCollision(subRect, rect)) {
            setGameOver(true);
            return false;
          }

          if (triangleRectCollision(triangle, rect)) {
            setScore((s) => s + 1);
            return false;
          }

          return true;
        }),
      );

      animationId = requestAnimationFrame(check);
    };

    animationId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(animationId);
  }, [isGame, gameOver]);

  const restart = () => {
    setFishes([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <Ocean ref={oceanRef}>
      {/* HUD */}
      {isGame && (
        <div className={`${scssObj.baseClass}__hud`}>
          <p className={`${scssObj.baseClass}__score`}>Score: {score}</p>
          {gameOver && (
            <Button onClick={restart} className={scssObj.restartBtn}>
              Restart
            </Button>
          )}
        </div>
      )}

      <div className={`${scssObj.baseClass}__submarine`}>
        <Sub
          animate
          oceanRef={oceanRef}
          subRef={submarineRef}
          lightRef={lightRef}
          id={isGame ? 1 : undefined}
        />
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

export default Submarine;
