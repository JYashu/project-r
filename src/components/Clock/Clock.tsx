import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Icon from '../Icon';
import scssObj from './_Clock.scss';

interface Props {
  is12H: boolean;
}

const Clock = ({ is12H }: Props) => {
  const [stopwatch, setStopwatch] = useState(false);
  const [stopwatchStart, setStopwatchStart] = useState<Date | null>(null);
  const [stopwatchPauseStart, setStopwatchPauseStart] = useState<Date | null>(
    null
  );
  const [stopwatchPauseTime, setStopwatchPauseTime] = useState(0);
  const [sms, setStopwatchMiliSeconds] = useState(0);
  const [sss, setStopwatchSeconds] = useState(0);
  const [smm, setStopwatchMinutes] = useState(0);
  const [date, setDate] = useState(new Date());
  const [hh, setHours] = useState('');
  const [mm, setMinutes] = useState('');
  const [ss, setSeconds] = useState('');
  const [session, setSession] = useState('AM');

  const currentTime = () => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (hours == 0) {
      hours = 12;
    }
    if (hours > 12) {
      if (is12H) hours = hours - 12;
      setSession('PM');
    }

    setHours(hours < 10 ? '0' + hours : '' + hours);
    setMinutes(minutes < 10 ? '0' + minutes : '' + minutes);
    setSeconds(seconds < 10 ? '0' + seconds : '' + seconds);
  };

  const { displayMinutes, displaySeconds, displayMiliSeconds } = {
    displayMinutes: smm < 10 ? '0' + smm : '' + smm,
    displaySeconds: sss < 10 ? '0' + sss : '' + sss,
    displayMiliSeconds:
      sms < 10
        ? '00' + Math.floor(sms)
        : sms < 100
        ? '0' + Math.floor(sms)
        : Math.floor(sms),
  };

  const updateStopwatch = () => {
    if (!stopwatchStart) return;
    const timePassed =
      date.getTime() - stopwatchStart.getTime() - stopwatchPauseTime;
    const minutes = Math.floor(timePassed / (1000 * 60));
    const seconds = Math.floor((timePassed - minutes * 1000 * 60) / 1000);
    const miliSeconds = Math.floor(
      timePassed - minutes * 60 * 1000 - seconds * 1000
    );

    setStopwatchMinutes(minutes);
    setStopwatchSeconds(seconds);
    setStopwatchMiliSeconds(miliSeconds);
  };

  const resetStopwatch = () => {
    setStopwatch(false);
    setStopwatchStart(null);
    setStopwatchPauseStart(null);
    setStopwatchPauseTime(0);
    setStopwatchMiliSeconds(0);
    setStopwatchSeconds(0);
    setStopwatchMinutes(0);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setDate(new Date());
      currentTime();
      if (stopwatch) updateStopwatch();
    }, 1);
    return () => clearInterval(interval);
  });

  const onClick = () => {
    setStopwatch(!stopwatch);
    if (!stopwatchStart) setStopwatchStart(new Date());
    else {
      if (!stopwatchPauseStart) setStopwatchPauseStart(new Date());
      else {
        setStopwatchPauseTime(
          stopwatchPauseTime +
            new Date().getTime() -
            stopwatchPauseStart.getTime()
        );
        setStopwatchPauseStart(null);
      }
    }
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={classNames('item')}>
        {hh !== '' && (
          <div
            className={`${scssObj.baseClass}__item`}
          >{`${hh}:${mm}:${ss} ${session}`}</div>
        )}
      </div>
      <div className={classNames('item')}>
        <div className={`${scssObj.baseClass}__item`}>
          <div
            className={`${scssObj.baseClass}__stopwatch`}
            onClick={onClick}
          >{`${displayMinutes}:${displaySeconds}:${displayMiliSeconds}`}</div>
          <Icon
            icon="restart_alt"
            size="small"
            removeOutline
            onClickHandler={resetStopwatch}
          />
        </div>
      </div>
      <div className={classNames('item')}>
        <div className={`${scssObj.baseClass}__item`}>Timer</div>
      </div>
      {/* {hh !== '' && (
        <div className={`${scssObj.baseClass}__analog`}>
          <div
            className={`${scssObj.baseClass}__hour-hand`}
            style={{
              transform: `rotateZ(${date.getHours() * 30}deg)`,
            }}
          />
          <div
            className={`${scssObj.baseClass}__min-hand`}
            style={{
              transform: `rotateZ(${date.getMinutes() * 6}deg)`,
            }}
          />
          <div
            className={`${scssObj.baseClass}__sec-hand`}
            style={{
              transform: `rotateZ(${date.getSeconds() * 6}deg)`,
            }}
          />
          <span className={`${scssObj.baseClass}__twelve`}>12</span>
          <span className={`${scssObj.baseClass}__one`}>1</span>
          <span className={`${scssObj.baseClass}__two`}>2</span>
          <span className={`${scssObj.baseClass}__three`}>3</span>
          <span className={`${scssObj.baseClass}__four`}>4</span>
          <span className={`${scssObj.baseClass}__five`}>5</span>
          <span className={`${scssObj.baseClass}__six`}>6</span>
          <span className={`${scssObj.baseClass}__seven`}>7</span>
          <span className={`${scssObj.baseClass}__eight`}>8</span>
          <span className={`${scssObj.baseClass}__nine`}>9</span>
          <span className={`${scssObj.baseClass}__ten`}>10</span>
          <span className={`${scssObj.baseClass}__eleven`}>11</span>
        </div>
      )} */}
    </div>
  );
};

export default Clock;
