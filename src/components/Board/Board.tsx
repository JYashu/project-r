import scssObj from './_Board.scss';

interface Props {
  squares: any[];
  onClick: (i: any) => void;
}

interface SquareProps {
  value: string;
  onClick: (i: any) => void;
}

const Square = ({ value, onClick }: SquareProps) => {
  return (
    <button className={`${scssObj.baseClass}__square`} onClick={onClick}>
      {value}
    </button>
  );
};

function Board({ squares, onClick }: Props) {
  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  }

  return (
    <div>
      <div className={`${scssObj.baseClass}__board-row`}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={`${scssObj.baseClass}__board-row`}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={`${scssObj.baseClass}__board-row`}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;
