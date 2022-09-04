import React from 'react';
import ReactDOM from 'react-dom';

import scssObj from './_HandleLogin.scss';
import LoadingSpinner from '../LoadingSpinner';
import { Redirect } from 'react-router';

interface Props {
  accessToken: string | null;
  authCode: string | null;
  state: string | null;
  // completeSignIn: typeof completeSignIn.request;
}

const HandleLogin = ({
  accessToken,
  authCode,
  state,
}: // completeSignIn: completeSignInProp,
Props) => {
  const [Flag, setFlag] = React.useState(false);
  // React.useEffect(() => {
  //   completeSignInProp({
  //     hasAccessToken: accessToken != null,
  //     authCode,
  //     state,
  //   });
  //   const timeout = setTimeout(() => {
  //     setFlag(true);
  //   }, 35000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [accessToken, authCode, completeSignInProp, state]);

  setTimeout(() => setFlag(true), 4000);

  return ReactDOM.createPortal(
    <div className={scssObj.baseClass}>
      {/* {(accessToken === null && Flag === true) || !navigator.onLine ? (
        <UnAvailableScreen />
      ) : (
        <LoadingSpinner text={`Logging in to ${BRAND_NAME}...`} />
      )} */}
      {Flag ? (
        <Redirect to="/home" />
      ) : (
        <LoadingSpinner text={`Logging in...`} />
      )}
    </div>,
    document.body
  );
};

export default HandleLogin;
