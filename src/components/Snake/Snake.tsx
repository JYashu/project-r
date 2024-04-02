/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef, useState } from 'react';
import useSetActiveSidebarItem from '../../hooks/useSetActiveNavigationItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ActiveNavigationItem, Coordinates, SwipeActionType } from '../../types';
import { Pages } from '../../utils/consts';
import { isMobileOrTablet } from '../../utils/getMobileOrTabletInfo';
import { clearBoard, drawObject, hasSnakeCollided } from '../../utils/snakeUtils';
import scssObj from './_Snake.scss';
import Cursor from '../cursor';
import useSwipeAction from '../../hooks/useSwipeAction';

interface Props {
  // height: number;
  // width: number;
  score: number;
  snake: Coordinates[];
  disallowedDirection: string;
  treat: Coordinates;
  inPlay: boolean;
  consumedTreats: Coordinates[];
  updateScore: (reset?: boolean) => void;
  move: (direction: string, dx: number, dy: number) => void;
  handleTreatConsumed: (treat: Coordinates) => void;
  stopGame: () => void;
  generateTreat: (width: number, height: number) => void;
  setInPlay: (inPlay: boolean) => void;
  resetGame: (width: number, height: number) => void;
}

const Snake = ({
  // height,
  // width,
  score,
  snake,
  disallowedDirection,
  treat,
  inPlay,
  consumedTreats,
  updateScore,
  move,
  handleTreatConsumed,
  stopGame,
  generateTreat,
  setInPlay,
  resetGame,
}: Props) => {
  useSetActiveSidebarItem(ActiveNavigationItem.Snake);
  useSetGlobalHeader(Pages.SNAKE);

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const width = isMobileOrTablet ? windowWidth - 64 - ((windowWidth - 64) % 16) : 1008;
  const height = isMobileOrTablet ? windowHeight - 194 - ((windowHeight - 128) % 16) : 608;

  const { action, userAction, handlers } = useSwipeAction();

  useEffect(() => {
    resetGame(width, height);
  }, [height, resetGame, width]);

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

  useEffect(() => {
    switch (userAction) {
      case SwipeActionType.UP:
        moveSnake(0, -16);
        break;
      case SwipeActionType.DOWN:
        moveSnake(0, 16);
        break;
      case SwipeActionType.LEFT:
        if (disallowedDirection) moveSnake(-16, 0);
        break;
      case SwipeActionType.RIGHT:
        moveSnake(16, 0);
        break;
      default:
        break;
    }
  }, [action]); // eslint-disable-line react-hooks/exhaustive-deps

  const [gameEnded, setGameEnded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const handleKeyEvents = useCallback(
    (event: any) => {
      switch (event.key) {
        case 'w':
        case 'i':
        case 'W':
        case 'I':
          moveSnake(0, -16);
          break;
        case 's':
        case 'k':
        case 'S':
        case 'K':
          moveSnake(0, 16);
          break;
        case 'a':
        case 'j':
        case 'A':
        case 'J':
          if (disallowedDirection) moveSnake(-16, 0);
          break;
        case 'd':
        case 'l':
        case 'D':
        case 'L':
          event.preventDefault();
          moveSnake(16, 0);
          break;
        case 'q':
        case 'Q':
          setInPlay(!inPlay);
          if (!disallowedDirection) moveSnake(16, 0);
          break;
        case 'r':
        case 'R':
          resetGame(width, height);
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
            moveSnake(-16, 0);
            break;
          case 'LEFT':
            moveSnake(16, 0);
            break;
          case 'UP':
            moveSnake(0, 16);
            break;
          case 'DOWN':
            moveSnake(0, -16);
            break;
          default:
            break;
        }
      }, 150);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
    clearBoard(context, width, height);
    drawObject(context, snake, '#91C483', consumedTreats);
    drawObject(context, [treat], '#676FA3');
  }, [context, treat, snake, consumedTreats, width, height]);

  useEffect(() => {
    if (snake[0].x === treat?.x && snake[0].y === treat?.y) {
      handleTreatConsumed(treat);
      updateScore(false);
      generateTreat(width, height);
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
  }, [snake, height, width, handleKeyEvents]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('keypress', handleKeyEvents);

    return () => {
      window.removeEventListener('keypress', handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);

  if (!isMobileOrTablet) {
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
  }

  return (
    <div className={`${scssObj.baseClass}`}>
      {!isMobileOrTablet && <Cursor />}
      <div className={`${scssObj.baseClass}__content`}>
        <div {...handlers}>
          <canvas
            className={`${scssObj.baseClass}__canvas`}
            ref={canvasRef}
            style={{
              border: `3px solid ${gameEnded ? '#EA4435' : '#CA7D82'}`, // 8A463F, BB6B70
            }}
            width={width}
            height={height}
          />
        </div>
        {!isMobileOrTablet && (
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
        )}
      </div>
    </div>
  );
};

export default Snake;
