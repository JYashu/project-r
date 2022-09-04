import classNames from 'classnames';
import useActiveSidebarItem from '../../hooks/useActiveSidebarItem';
import useSetGlobalHeader from '../../hooks/useSetGlobalHeader';
import { ActiveSidebarItem, SpinnerType } from '../../types';
import Button from '../Button';
import LoadingSpinner from '../LoadingSpinner';
import scssObj from './_SpinnerPage.scss';

interface Props {
  copyText: (text: string) => void;
}

const array = [
  { type: SpinnerType.BarLoader, description: 'BarLoader' },
  { type: SpinnerType.CircleLoader, description: 'CircleLoader' },
  { type: SpinnerType.ClimbingBoxLoader, description: 'ClimbingBoxLoader' },
  { type: SpinnerType.ClockLoader, description: 'ClockLoader' },
  { type: SpinnerType.DotsBarSpinner, description: 'DotsBarSpinner' },
  { type: SpinnerType.GridLoader, description: 'GridLoader' },
  { type: SpinnerType.HashLoader, description: 'HashLoader' },
  { type: SpinnerType.MorphLoader, description: 'MorphLoader' },
  { type: SpinnerType.PacmanLoader, description: 'PacmanLoader' },
  { type: SpinnerType.PropagateLoader, description: 'PropagateLoader' },
  { type: SpinnerType.PuffLoader, description: 'PuffLoader' },
  { type: SpinnerType.PulseLoader, description: 'PulseLoader' },
  { type: SpinnerType.RingLoader, description: 'RingLoader' },
  { type: SpinnerType.RiseLoader, description: 'RiseLoader' },
  { type: SpinnerType.RotateLoader, description: 'RotateLoader' },
  { type: SpinnerType.ScaleLoader, description: 'ScaleLoader' },
  { type: SpinnerType.SkewLoader, description: 'SkewLoader' },
  { type: SpinnerType.SquareLoader, description: 'SquareLoader' },
  { type: SpinnerType.SyncLoader, description: 'SyncLoader' },
  // { type: SpinnerType.CubeFlipSpinner, description: 'CubeFlipSpinner' },
];

const smallSpinners = [
  SpinnerType.CircleLoader,
  SpinnerType.HashLoader,
  SpinnerType.ClockLoader,
  SpinnerType.RingLoader,
  SpinnerType.PuffLoader,
];

const SpinnerPage = ({ copyText }: Props) => {
  useActiveSidebarItem(ActiveSidebarItem.SpinnerPage);
  useSetGlobalHeader('Loading Spinners');

  return (
    <div className={`${scssObj.baseClass}`}>
      {array.map(({ type, description }) => {
        return (
          <div className={`${scssObj.baseClass}__container`}>
            <div className="inner">
              <div className="front">
                <div className="child">
                  {smallSpinners.includes(type) ? (
                    <LoadingSpinner type={type} size="xlarge" />
                  ) : (
                    <LoadingSpinner type={type} />
                  )}
                </div>
              </div>
              <div className="back">
                <div className={classNames(`${scssObj.baseClass}__back`, 'child')}>
                  {smallSpinners.includes(type) ? (
                    <LoadingSpinner type={type} />
                  ) : (
                    <LoadingSpinner type={type} size="small" />
                  )}

                  <Button
                    className={`${scssObj.baseClass}__button`}
                    icon="copy"
                    iconSize="small"
                    rightIcon
                    buttonStyle="glossy"
                    isRound
                    onClick={() => copyText(description)}
                  >
                    {description}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpinnerPage;
