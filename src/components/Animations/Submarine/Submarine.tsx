import classNames from 'classnames';
import Draggable from 'react-draggable';
import Link from '../../../elements/link';
import scssObj from './_Submarine.scss';
import Ocean from './Ocean';
import Sub from './Sub';

/*
 * CSS animations by @data._.pirates: https://github.com/data-pirates07/submarine-animation-using-pure-css
 */

/* http://drbl.in/nOzJ
 * CSS Submarine
 * A pen by Alberto Jerez
 * www.ajerez.es
 */

interface Props {
  animate?: boolean;
}

const Submarine = ({ animate }: Props) => {
  return (
    <Ocean>
      <Sub animate={animate} />
    </Ocean>
  );
};

export default Submarine;
