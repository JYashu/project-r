/* eslint-disable no-param-reassign */
import { Provider } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import React from 'react';
import store from '../../redux/store';

type Props = RouteComponentProps;

class ProviderWithRouter extends React.Component<Props> {
  store: ReturnType<typeof store>;

  constructor(props: Props) {
    super(props);

    let lastLocation: any = null;
    props.history.listen((location) => {
      lastLocation = location;
    });
    const prevHistoryPush = props.history.push;
    props.history.push = (pathname: any, state?: any) => {
      const newState = { ...state, from: lastLocation?.pathname };
      if (
        lastLocation === null ||
        pathname !== lastLocation.pathname + lastLocation.search + lastLocation.hash ||
        JSON.stringify(newState) !== JSON.stringify(lastLocation.newState)
      ) {
        prevHistoryPush(pathname, { ...newState });
      }
    };

    this.store = store({
      routerHistory: props.history,
    });
  }

  render() {
    const { children } = this.props;

    return <Provider store={this.store}>{children}</Provider>;
  }
}

export default withRouter(ProviderWithRouter);
