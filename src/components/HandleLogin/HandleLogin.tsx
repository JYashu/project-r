import React from 'react';
import ReactDOM from 'react-dom';

import { Redirect } from 'react-router';
import scssObj from './_HandleLogin.scss';
import LoadingSpinner from '../../elements/loadingSpinner';

const HandleLogin = () => {
  const [Flag, setFlag] = React.useState(false);

  setTimeout(() => setFlag(true), 4000);

  return ReactDOM.createPortal(
    <div className={scssObj.baseClass}>
      {Flag ? <Redirect to="/home" /> : <LoadingSpinner text="Logging in..." />}
    </div>,
    document.body,
  );
};

export default HandleLogin;
