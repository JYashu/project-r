import { useHistory } from 'react-router-dom';

import scssObj from './_LoginPage.scss';

import OnboardingLayout from '../OnboardingLayout';
import LoginForm from '../LoginForm';
import { Img } from '../../types';

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

export default LoginPage;
