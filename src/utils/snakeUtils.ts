import { Coordinates } from '../types';

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) {
    context.clearRect(0, 0, 1000, 600);
  }
};

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: Coordinates[],
  fillColor: string,
  strokeStyle = '#146356',
) => {
  const array = [...objectBody];
  if (context) {
    if (array.length > 1) {
      context.fillStyle = '#ff0000';
      context.strokeStyle = strokeStyle;
      context?.fillRect(array[0].x, array[0].y, 20, 20);
      context?.strokeRect(array[0].x, array[0].y, 20, 20);
      array.splice(0, 1);
    }
    array.forEach((object: Coordinates) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      context?.fillRect(object.x, object.y, 20, 20);
      context?.strokeRect(object.x, object.y, 20, 20);
    });
  }
};

const randomNumber = (min: number, max: number) => {
  const random = Math.random() * max;
  return random - (random % 20);
};

const getRandomCoords = (width: number, height: number) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

export const generateRandomPosition = (width: number, height: number, snake: Coordinates[]) => {
  let coord = getRandomCoords(width, height);
  while (snake.includes(coord)) {
    coord = getRandomCoords(width, height);
  }
  return coord;
};

export const hasSnakeCollided = (snake: Coordinates[], currentHeadPos: Coordinates) => {
  let flag = false;
  snake.forEach((pos: Coordinates, index: number) => {
    if (pos.x === currentHeadPos.x && pos.y === currentHeadPos.y && index !== 0) {
      flag = true;
    }
  });

  return flag;
};
