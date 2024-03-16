/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Cat from '../animations/cat';
import Scape from '../animations/scape';
import Submarine from '../animations/submarine';
import Truck from '../animations/truck';
import scssObj from './_Home.scss';

const clsRelative = `${scssObj.baseClass}__panel-relative`;
const clsSticky = `${scssObj.baseClass}__panel-sticky`;

const Home = () => {
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const [firstCls, setFirstCls] = useState(clsRelative);
  const [secondCls, setSecondCls] = useState(clsRelative);

  const { height } = useWindowDimensions();

  const [panelHeight, setPanelHeight] = useState(height - 306);

  useEffect(() => {
    setPanelHeight(height - 306);
  }, [height]);

  const updateState = () => {
    if (
      firstRef &&
      firstRef.current &&
      firstRef.current.offsetTop >= panelHeight &&
      firstCls !== clsSticky
    ) {
      setFirstCls(clsSticky);
    }
    if (
      firstRef &&
      firstRef.current &&
      firstRef.current.offsetTop < panelHeight &&
      firstCls !== clsRelative
    ) {
      setFirstCls(clsRelative);
    }
    if (
      secondRef &&
      secondRef.current &&
      secondRef.current.offsetTop >= panelHeight * 2 &&
      secondCls !== clsSticky
    ) {
      setSecondCls(clsSticky);
    }
    if (
      secondRef &&
      secondRef.current &&
      secondRef.current.offsetTop < panelHeight * 2 &&
      secondCls !== clsRelative
    ) {
      setSecondCls(clsRelative);
    }
  };

  setInterval(() => updateState(), 100);

  if (!sessionStorage.getItem('subKey')) {
    sessionStorage.setItem('subKey', Math.round(Math.random()).toString());
  }
  if (!sessionStorage.getItem('scapeKey')) {
    sessionStorage.setItem('scapeKey', Math.round(Math.random()).toString());
  }

  window.onunload = () => {
    sessionStorage.removeItem('subKey');
    sessionStorage.removeItem('scapeKey');
  };

  return (
    <div className={`${scssObj.baseClass}`}>
      <div className={`${scssObj.baseClass}__wrapper`}>
        <div className={`${scssObj.baseClass}__base-panel`} ref={firstRef}>
          <Scape />
        </div>

        <div className={firstCls} ref={secondRef}>
          <Submarine animate />
        </div>

        <div className={secondCls}>
          <Cat />
        </div>
        <div className={`${scssObj.baseClass}__panel-relative`}>
          <Truck />
        </div>
      </div>
    </div>
  );
};

export default Home;
