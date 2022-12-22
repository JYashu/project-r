import { useHistory } from 'react-router-dom';

import scssObj from './_LoginPage.scss';

import OnboardingLayout from '../onboardingLayout';
import LoginForm from '../loginForm';
import { Img } from '../../types';
import PermissionsManager from '../../elements/permissionsManager';

interface Props {
  email?: string | string[];
}

const LoginPage = ({ email }: Props) => {
  const title = 'Welcome';

  const header = <></>;

  return (
    <div className={`${scssObj.baseClass}`}>
      <OnboardingLayout title={title} image={Img.WaveLarge} header={header}>
        <LoginForm email={email} />
      </OnboardingLayout>
    </div>
  );
};

const LoginPageWithPermissionsManager = (props: Props) => {
  return (
    <PermissionsManager isBetaOnly>
      <LoginPage {...props} />
    </PermissionsManager>
  );
};
export default LoginPageWithPermissionsManager;
