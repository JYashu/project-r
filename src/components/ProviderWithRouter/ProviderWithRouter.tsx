/* eslint-disable no-param-reassign */
import { Provider } from 'react-redux';
import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import store from '../../redux/store';
import { SagaContext } from '../../redux/utils/sagaContext';

interface Props {
  children?: React.ReactNode;
}

interface RouterProps {
  navigate: any;
  location: any;
  children?: React.ReactNode;
}

class ProviderWithRouterClass extends React.Component<RouterProps> {
  store: ReturnType<typeof store>;

  constructor(props: RouterProps) {
    super(props);

    const lastLocationRef: any = props.location;

    const enhancedNavigate = (pathname: string, state?: any) => {
      const newState = { ...state, from: lastLocationRef?.pathname };
      if (
        lastLocationRef === null ||
        pathname !== lastLocationRef.pathname + lastLocationRef.search + lastLocationRef.hash ||
        JSON.stringify(newState) !== JSON.stringify(lastLocationRef.newState)
      ) {
        props.navigate(pathname, { ...newState });
      }
    };

    const sagaContext: SagaContext = {
      routerHistory: {
        push: enhancedNavigate,
        replace: enhancedNavigate,
        location: props.location,
      } as any,
    };

    this.store = store(sagaContext);
  }

  render() {
    const { children } = this.props;
    return <Provider store={this.store}>{children}</Provider>;
  }
}

// Functional wrapper to inject React Router v6 hooks
const ProviderWithRouter: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastLocationRef = useRef(location);

  useEffect(() => {
    lastLocationRef.current = location;
  }, [location]);

  return (
    <ProviderWithRouterClass navigate={navigate} location={lastLocationRef.current}>
      {children}
    </ProviderWithRouterClass>
  );
};

export default ProviderWithRouter;
