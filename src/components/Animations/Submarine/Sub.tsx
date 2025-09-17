import classNames from 'classnames';
import Draggable from 'react-draggable';
import { useEffect, useRef, useState } from 'react';
import scssObj from './_Submarine.scss';

interface Props {
  id?: 1 | 2;
  animate?: boolean;
  oceanRef?: any;
  subRef?: any;
  lightRef?: any;
}

const Sub = ({ id, animate, oceanRef, subRef, lightRef }: Props) => {
  const [bounds, setBounds] = useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>();

  useEffect(() => {
    const updateBounds = () => {
      if (!oceanRef.current || !subRef.current) return;

      const oceanRect = oceanRef.current.getBoundingClientRect();
      const subRect = subRef.current.getBoundingClientRect();

      const offsetX = subRect.left - oceanRect.left;
      const offsetY = subRect.top - oceanRect.top;

      setBounds({
        top: -offsetY,
        left: -offsetX,
        right: oceanRect.width - subRect.width - offsetX,
        bottom: oceanRect.height - subRect.height - offsetY,
      });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [oceanRef, subRef]);

  const sub1 = (
    <div className={`${scssObj.baseClass}__cont`}>
      <div className={`${scssObj.baseClass}__submarine-wrapper`}>
        <div className={`${scssObj.baseClass}__submarine-body`} ref={subRef}>
          <div className={`${scssObj.baseClass}__window`} />
          <div className={`${scssObj.baseClass}__engine`} />
          <div className={`${scssObj.baseClass}__light-a`} ref={lightRef}>
            <div className="beam" />
          </div>
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
    <div className={classNames(`${scssObj.baseClass}__cont`)}>
      <div className={classNames(`${scssObj.baseClass}__cont-2`)}>
        <div className={`${scssObj.baseClass}__submarine__container`}>
          <div className={`${scssObj.baseClass}__light`} ref={lightRef} />
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
          <div className={`${scssObj.baseClass}__submarine__body`} ref={subRef}>
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
            className={classNames(
              `${scssObj.baseClass}__bubbles`,
              `${scssObj.baseClass}__bubble-1`,
            )}
          />
          <span
            className={classNames(
              `${scssObj.baseClass}__bubbles`,
              `${scssObj.baseClass}__bubble-2`,
            )}
          />
          <span
            className={classNames(
              `${scssObj.baseClass}__bubbles`,
              `${scssObj.baseClass}__bubble-3`,
            )}
          />
          <span
            className={classNames(
              `${scssObj.baseClass}__bubbles`,
              `${scssObj.baseClass}__bubble-4`,
            )}
          />
        </div>
      </div>
    </div>
  );

  const subs = [sub1, sub2];

  const idx = parseInt(sessionStorage.getItem('subKey') || '0', 10);

  const sub = id ? subs[id - 1] : subs[idx];

  return animate ? <Draggable bounds={bounds}>{sub}</Draggable> : sub;
};

export default Sub;
