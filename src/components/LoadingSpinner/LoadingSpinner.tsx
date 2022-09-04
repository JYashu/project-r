import {
  PulseLoader,
  BarLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClockLoader,
  GridLoader,
  HashLoader,
  PacmanLoader,
  PropagateLoader,
  PuffLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader,
} from 'react-spinners';
import classnames from 'classnames';
import scssObj from './_LoadingSpinner.scss';
import { SpinnerType } from '../../types';

interface Props {
  className?: string;
  intent?: 'cancel' | 'destructive' | 'primary' | 'warning' | 'none';
  size?: 'small' | 'large' | 'xlarge';
  text?: string;
  type?: SpinnerType;
  color?: string;
}

const DEFAULT_SIZE = 15;

const SIZES = {
  small: 8,
  large: 18,
  xlarge: 28,
};

const LoadingSpinner = ({ text, size, intent, className, type, color }: Props) => {
  const loaderSize = size ? SIZES[size] : DEFAULT_SIZE;
  const cls = classnames(scssObj.baseClass, className, {
    [`${scssObj.baseClass}--size-${size}`]: size,
    [`${scssObj.baseClass}--intent-${intent}`]: intent,
    [`${scssObj.baseClass}--has-text`]: text,
  });

  const clr = color || '#2A2961';
  return (
    <div className={cls}>
      {!type && <PulseLoader color={clr} size={loaderSize} margin="10px" />}

      {type === SpinnerType.BarLoader && <BarLoader color={clr} />}

      {type === SpinnerType.CircleLoader && <CircleLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.ClimbingBoxLoader && <ClimbingBoxLoader color={clr} />}

      {type === SpinnerType.ClockLoader && <ClockLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.GridLoader && <GridLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.HashLoader && <HashLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.PacmanLoader && <PacmanLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.PropagateLoader && <PropagateLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.PuffLoader && <PuffLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.RingLoader && <RingLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.RiseLoader && <RiseLoader color={color} size={loaderSize} />}

      {type === SpinnerType.RotateLoader && <RotateLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.ScaleLoader && <ScaleLoader color={color} />}

      {type === SpinnerType.SkewLoader && <SkewLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.SquareLoader && <SquareLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.SyncLoader && <SyncLoader color={clr} size={loaderSize} />}

      {type === SpinnerType.MorphLoader && (
        <div className={classnames(`${scssObj.baseClass}__morph${size ? `-${size}` : ''}`)} />
      )}

      {type === SpinnerType.CubeFlipSpinner && (
        <div className={`${scssObj.baseClass}__cube-wrapper`}>
          <div className={`${scssObj.baseClass}__cube-folding`}>
            <span className={`${scssObj.baseClass}__leaf1`} />
            <span className={`${scssObj.baseClass}__leaf2`} />
            <span className={`${scssObj.baseClass}__leaf3`} />
            <span className={`${scssObj.baseClass}__leaf4`} />
          </div>
        </div>
      )}

      {type === SpinnerType.DotsBarSpinner && <div className={`${scssObj.baseClass}__dots-bars`} />}

      {text && <p className={`${scssObj.baseClass}__text`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
