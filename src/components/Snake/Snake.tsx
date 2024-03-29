/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef, useState } from 'react';
import useSetActiveSidebarItem from '../../hooks/useSetActiveNavigationItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ActiveNavigationItem, Coordinates } from '../../types';
import { Pages } from '../../utils/consts';
import { isMobileOrTablet } from '../../utils/getMobileOrTabletInfo';
import { clearBoard, drawObject, hasSnakeCollided } from '../../utils/snakeUtils';
import scssObj from './_Snake.scss';
import Cursor from '../cursor';

interface Props {
  height: number;
  width: number;
  score: number;
  snake: Coordinates[];
  disallowedDirection: string;
  mock: Coordinates;
  inPlay: boolean;
  updateScore: (reset?: boolean) => void;
  move: (direction: string, dx: number, dy: number) => void;
  increaseSnake: () => void;
  stopGame: () => void;
  setMock: () => void;
  setInPlay: (inPlay: boolean) => void;
}

const Snake = ({
  height,
  width,
  score,
  snake,
  disallowedDirection,
  mock,
  inPlay,
  updateScore,
  move,
  increaseSnake,
  stopGame,
  setMock,
  setInPlay,
}: Props) => {
  useSetActiveSidebarItem(ActiveNavigationItem.Snake);
  useSetGlobalHeader(Pages.SNAKE);

  const [gameEnded, setGameEnded] = useState(false);
  const [isConsumed, setIsConsumed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const moveSnake = (dx = 0, dy = 0) => {
    if (dx > 0 && dy === 0 && disallowedDirection !== 'RIGHT') {
      setInPlay(true);
      move('RIGHT', dx, dy);
    }

    if (dx < 0 && dy === 0 && disallowedDirection !== 'LEFT') {
      setInPlay(true);
      move('LEFT', dx, dy);
    }

    if (dx === 0 && dy < 0 && disallowedDirection !== 'UP') {
      setInPlay(true);
      move('UP', dx, dy);
    }

    if (dx === 0 && dy > 0 && disallowedDirection !== 'DOWN') {
      setInPlay(true);
      move('DOWN', dx, dy);
    }
  };

  const handleKeyEvents = useCallback(
    (event: any) => {
      switch (event.key) {
        case 'w':
        case 'i':
          moveSnake(0, -20);
          break;
        case 's':
        case 'k':
          moveSnake(0, 20);
          break;
        case 'a':
        case 'j':
          if (disallowedDirection) moveSnake(-20, 0);
          break;
        case 'd':
        case 'l':
          event.preventDefault();
          moveSnake(20, 0);
          break;
        case 'q':
          setInPlay(!inPlay);
          if (!disallowedDirection) moveSnake(20, 0);
          break;
        case 'r':
          window.location.reload();
          break;
        default:
          break;
      }
    },
    [disallowedDirection, moveSnake], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    // eslint-disable-line consistent-return
    if (inPlay) {
      const interval = setInterval(() => {
        switch (disallowedDirection) {
          case 'RIGHT':
            moveSnake(-20, 0);
            break;
          case 'LEFT':
            moveSnake(20, 0);
            break;
          case 'UP':
            moveSnake(0, 20);
            break;
          case 'DOWN':
            moveSnake(0, -20);
            break;
          default:
            break;
        }
      }, 100);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    if (isConsumed) {
      setMock();
      setIsConsumed(false);

      increaseSnake();

      updateScore();
    }
  }, [isConsumed, mock, height, width]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    clearBoard(context);
    drawObject(context, snake, '#91C483');
    drawObject(context, [mock], '#676FA3');

    if (snake[0].x === mock?.x && snake[0].y === mock?.y) {
      setIsConsumed(true);
    }

    if (
      hasSnakeCollided(snake, snake[0]) ||
      snake[0].x >= width ||
      snake[0].x < 0 ||
      snake[0].y < 0 ||
      snake[0].y >= height
    ) {
      setGameEnded(true);
      stopGame();
      window.removeEventListener('keypress', handleKeyEvents);
    } else setGameEnded(false);
  }, [context, mock, snake, height, width, handleKeyEvents]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('keypress', handleKeyEvents);

    return () => {
      window.removeEventListener('keypress', handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  if (isMobileOrTablet) {
    if (inPlay) {
      setInPlay(false);
    }
    return (
      <div className={`${scssObj.baseClass}__message`}>
        Snake is not accessible on mobile use a laptop/desktop to continue playing.
      </div>
    );
  }

  if (windowWidth < 1321 && windowHeight < 672) {
    return (
      <div className={`${scssObj.baseClass}__message`}>
        Increase the window width and height to continue playing.
      </div>
    );
  }

  if (windowWidth < 1321) {
    return (
      <div className={`${scssObj.baseClass}__message`}>
        Increase the window width to continue playing.
      </div>
    );
  }

  if (windowHeight < 672) {
    return (
      <div className={`${scssObj.baseClass}__message`}>
        Increase the window height to continue playing.
      </div>
    );
  }

  return (
    <div className={`${scssObj.baseClass}`}>
      <Cursor />
      <div className={`${scssObj.baseClass}__content`}>
        <canvas
          className={`${scssObj.baseClass}__canvas`}
          ref={canvasRef}
          style={{
            border: `3px solid ${gameEnded ? '#EA4435' : '#CA7D82'}`, // 8A463F, BB6B70
          }}
          width={width}
          height={height}
        />
        <div className={`${scssObj.baseClass}__instructions`}>
          <div className={`${scssObj.baseClass}__heading`}>How to Play</div>
          <div className={`${scssObj.baseClass}__note`}>
            NOTE: Start the game by pressing <strong>D</strong>
          </div>
          <div className={`${scssObj.baseClass}__first-instruction`}>
            Press <strong>W or I</strong> to Move Up
          </div>
          <div>
            Press <strong>A or J</strong> to Move Left
          </div>
          <div>
            Press <strong>S or K</strong> to Move Down
          </div>
          <div>
            Press <strong>D or L</strong> to Move Right
          </div>
          <div>
            Press <strong>Q</strong> to Pause / Play and Start
          </div>
          <div className={`${scssObj.baseClass}__note`}>
            Press <strong>R</strong> or Refresh the page to restart
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snake;
