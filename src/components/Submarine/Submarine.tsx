import classNames from 'classnames';
import { useState } from 'react';
import Draggable from 'react-draggable';
import scssObj from './_Submarine.scss';

/*
 *https://github.com/data-pirates07/submarine-animation-using-pure-css
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
  const [x, setX] = useState('40px');
  const [y, setY] = useState('400px');

  window.onunload = () => {
    sessionStorage.removeItem('subKey');
  };

  const sub1 = (
    <div className={`${scssObj.baseClass}__cont`}>
      <div className={`${scssObj.baseClass}__submarine-wrapper`}>
        <div className={`${scssObj.baseClass}__submarine-body`}>
          <div className={`${scssObj.baseClass}__window`} />
          <div className={`${scssObj.baseClass}__engine`} />
          <div className={`${scssObj.baseClass}__light-a`} />
        </div>
        <div className={`${scssObj.baseClass}__helix`} />
        <div className={`${scssObj.baseClass}__hat`}>
          <div className={`${scssObj.baseClass}__leds-wrapper`}>
            <div className={`${scssObj.baseClass}__periscope`} />
            <div className={`${scssObj.baseClass}__leds`} />
          </div>
        </div>
      </div>
    </div>
  );

  const sub2 = (
    <div className={`${scssObj.baseClass}__cont`}>
      <div className={`${scssObj.baseClass}__submarine__container`}>
        <div className={`${scssObj.baseClass}__light`} />
        <div className={`${scssObj.baseClass}__submarine__periscope`} />
        <div className={`${scssObj.baseClass}__submarine__periscope-glass`} />
        <div className={`${scssObj.baseClass}__submarine__sail`}>
          <div
            className={classNames(
              `${scssObj.baseClass}__submarine__sail-shadow`,
              `${scssObj.baseClass}__dark1`,
            )}
          />
          <div
            className={classNames(
              `${scssObj.baseClass}__submarine__sail-shadow`,
              `${scssObj.baseClass}__light1`,
            )}
          />
          <div
            className={classNames(
              `${scssObj.baseClass}__submarine__sail-shadow`,
              `${scssObj.baseClass}__dark2`,
            )}
          />
        </div>
        <div className={`${scssObj.baseClass}__submarine__body`}>
          <div
            className={classNames(
              `${scssObj.baseClass}__submarine__window`,
              `${scssObj.baseClass}__one`,
            )}
          />
          <div
            className={classNames(
              `${scssObj.baseClass}__submarine__window`,
              `${scssObj.baseClass}__two`,
            )}
          />
          <div className={`${scssObj.baseClass}__submarine__shadow-dark`} />
          <div className={`${scssObj.baseClass}__submarine__shadow-light`} />
          <div className={`${scssObj.baseClass}__submarine__shadow-arcLight`} />
        </div>
        <div className={`${scssObj.baseClass}__submarine__propeller`}>
          <div className={`${scssObj.baseClass}__propeller__perspective`}>
            <div
              className={classNames(
                `${scssObj.baseClass}__submarine__propeller-parts`,
                `${scssObj.baseClass}__darkOne`,
              )}
            />
            <div
              className={classNames(
                `${scssObj.baseClass}__submarine__propeller-parts`,
                `${scssObj.baseClass}__lightOne`,
              )}
            />
          </div>
        </div>
      </div>
      <div className={`${scssObj.baseClass}__bubbles__container`}>
        <span
          className={classNames(`${scssObj.baseClass}__bubbles`, `${scssObj.baseClass}__bubble-1`)}
        />
        <span
          className={classNames(`${scssObj.baseClass}__bubbles`, `${scssObj.baseClass}__bubble-2`)}
        />
        <span
          className={classNames(`${scssObj.baseClass}__bubbles`, `${scssObj.baseClass}__bubble-3`)}
        />
        <span
          className={classNames(`${scssObj.baseClass}__bubbles`, `${scssObj.baseClass}__bubble-4`)}
        />
      </div>
    </div>
  );

  const subs = [sub1, sub2];

  if (!sessionStorage.getItem('subKey')) {
    sessionStorage.setItem('subKey', Math.round(Math.random()).toString());
  }

  const idx = parseInt(sessionStorage.getItem('subKey') || '0', 10);

  return (
    <div className={`${scssObj.baseClass}__seaContainer`}>
      {animate ? <Draggable>{subs[idx]}</Draggable> : <>{subs[idx]}</>}
      <div className={`${scssObj.baseClass}__ground__container`}>
        <div
          className={classNames(`${scssObj.baseClass}__ground`, `${scssObj.baseClass}__ground1`)}
        >
          <span className={`${scssObj.baseClass}__up-1`} />
          <span className={`${scssObj.baseClass}__up-2`} />
          <span className={`${scssObj.baseClass}__up-3`} />
          <span className={`${scssObj.baseClass}__up-4`} />
          <span className={`${scssObj.baseClass}__up-5`} />
          <span className={`${scssObj.baseClass}__up-6`} />
          <span className={`${scssObj.baseClass}__up-7`} />
          <span className={`${scssObj.baseClass}__up-8`} />
          <span className={`${scssObj.baseClass}__up-9`} />
          <span className={`${scssObj.baseClass}__up-10`} />
        </div>
        <div
          className={classNames(`${scssObj.baseClass}__ground`, `${scssObj.baseClass}__ground2`)}
        >
          <span className={`${scssObj.baseClass}__up-1`} />
          <span className={`${scssObj.baseClass}__up-2`} />
          <span className={`${scssObj.baseClass}__up-3`} />
          <span className={`${scssObj.baseClass}__up-4`} />
          <span className={`${scssObj.baseClass}__up-5`} />
          <span className={`${scssObj.baseClass}__up-6`} />
          <span className={`${scssObj.baseClass}__up-7`} />
          <span className={`${scssObj.baseClass}__up-8`} />
          <span className={`${scssObj.baseClass}__up-9`} />
          <span className={`${scssObj.baseClass}__up-10`} />
          <span className={`${scssObj.baseClass}__up-11`} />
          <span className={`${scssObj.baseClass}__up-12`} />
          <span className={`${scssObj.baseClass}__up-13`} />
          <span className={`${scssObj.baseClass}__up-14`} />
          <span className={`${scssObj.baseClass}__up-15`} />
          <span className={`${scssObj.baseClass}__up-16`} />
          <span className={`${scssObj.baseClass}__up-17`} />
          <span className={`${scssObj.baseClass}__up-18`} />
          <span className={`${scssObj.baseClass}__up-19`} />
          <span className={`${scssObj.baseClass}__up-20`} />
        </div>
      </div>
    </div>
  );
};

export default Submarine;
