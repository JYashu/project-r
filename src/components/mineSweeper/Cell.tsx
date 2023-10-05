import classNames from 'classnames';
import React from 'react';
import { ASSETS_BASE_URL } from '../../utils/assets';
import { ActionType, CellValues } from './types';
import scssObj from './_MineSweeper.scss';

interface Props {
  values: CellValues;
  onPrimaryClick: (e: any, x: number, y: number) => void;
  onSecondaryClick: (e: any, x: number, y: number) => void;
  actionType: ActionType;
  inPlay: boolean;
  gameStarted: boolean;
}

const Cell = ({
  values: details,
  onPrimaryClick,
  onSecondaryClick,
  actionType,
  inPlay,
  gameStarted,
}: Props) => {
  const renderCell = () => {
    if (details.revealed && details.value !== 0) {
      return (
        <img
          height={16}
          width={16}
          alt={details.value.toString()}
          src={`${ASSETS_BASE_URL}/minesweeper/${details.value}.png`}
        />
      );
    }
    if (details.flagged) {
      return (
        <img height={16} width={16} alt="Flag" src={`${ASSETS_BASE_URL}/minesweeper/flag.png`} />
      );
    }
    return '';
  };

  const getClassName = () => {
    if (details.clickedMine) {
      return `${scssObj.baseClass}__clicked-mine-cell`;
    }
    if (details.revealed) {
      return `${scssObj.baseClass}__revealed-cell`;
    }
    return `${scssObj.baseClass}__untouched-cell`;
  };

  return (
    <div
      className={classNames(`${scssObj.baseClass}__cell`, getClassName())}
      onClick={(e) => onPrimaryClick(e, details.row, details.column)}
      onContextMenu={(e) => onSecondaryClick(e, details.row, details.column)}
      onKeyDown={(e) => e.preventDefault()}
      role="none"
    >
      {renderCell()}
    </div>
  );
};

export default Cell;
