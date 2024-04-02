import { Coordinates } from '../types';

export const clearBoard = (
  context: CanvasRenderingContext2D | null,
  width: number,
  height: number,
) => {
  if (context) {
    context.clearRect(0, 0, width, height);
  }
};

export const findDigestedTreat = (snakeTail: Coordinates, consumedTreats: Coordinates[]) => {
  const index = consumedTreats.findIndex(
    (coords) => coords.x === snakeTail.x && coords.y === snakeTail.y,
  );
  return index;
};

const isPixelEnlarged = (x: number, y: number, enlargedArray: Coordinates[]) => {
  const array = [...enlargedArray];
  const index = array.findIndex((coords) => coords.x === x && coords.y === y);
  return index;
};

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: Coordinates[],
  fillColor: string,
  enlargedBody: Coordinates[] = [],
  strokeStyle = '#146356',
) => {
  const array = [...objectBody];
  const enlargedArray = [...enlargedBody];
  if (context) {
    if (array.length > 1) {
      context.fillStyle = '#ff0000';
      context.strokeStyle = strokeStyle;
      const isEnlargedIndex = isPixelEnlarged(array[0].x, array[0].y, enlargedArray);
      if (isEnlargedIndex !== -1) {
        context?.fillRect(array[0].x - 2, array[0].y - 2, 20, 20);
        context?.strokeRect(array[0].x - 2, array[0].y - 2, 20, 20);
        enlargedArray.splice(isEnlargedIndex, 1);
      } else {
        context?.fillRect(array[0].x, array[0].y, 16, 16);
        context?.strokeRect(array[0].x, array[0].y, 16, 16);
      }
      array.splice(0, 1);
    }
    array.forEach((object: Coordinates) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      const isEnlargedIndex = isPixelEnlarged(object.x, object.y, enlargedArray);
      if (isEnlargedIndex !== -1) {
        context?.fillRect(object.x - 2, object.y - 2, 20, 20);
        context?.strokeRect(object.x - 2, object.y - 2, 20, 20);
        enlargedArray.splice(isEnlargedIndex, 1);
      } else {
        context?.fillRect(object.x, object.y, 16, 16);
        context?.strokeRect(object.x, object.y, 16, 16);
      }
    });
  }
};

const randomNumber = (min: number, max: number) => {
  const random = Math.random() * max;
  return random - (random % 16);
};

const getRandomCoords = (width: number, height: number) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

export const generateRandomPosition = (width: number, height: number, snake: Coordinates[]) => {
  let coord = getRandomCoords(width - 16, height - 16);
  while (snake.includes(coord)) {
    coord = getRandomCoords(width - 16, height - 16);
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

export const generateNewSnake = (width: number, height: number) => {
  const midPoint = [width / 2 - ((width / 2) % 16), height / 2 - ((height / 2) % 16)];
  return [
    { x: midPoint[0], y: midPoint[1] },
    { x: midPoint[0] - 16, y: midPoint[1] },
    { x: midPoint[0] - 32, y: midPoint[1] },
    { x: midPoint[0] - 48, y: midPoint[1] },
    { x: midPoint[0] - 64, y: midPoint[1] },
  ];
};
