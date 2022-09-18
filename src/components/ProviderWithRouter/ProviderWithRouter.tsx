/* eslint-disable no-param-reassign */
import { Provider } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import React from 'react';
import store from '../../redux/store';
import { getTokens } from '../../utils/requestTokens';

type Props = RouteComponentProps;

class ProviderWithRouter extends React.Component<Props> {
  store: ReturnType<typeof store>;

  constructor(props: Props) {
    super(props);

    const { accessToken } = getTokens();

    let lastLocation: any = null;
    props.history.listen((location) => {
      lastLocation = location;
    });
    const prevHistoryPush = props.history.push;
    props.history.push = (pathname: any, state?: any) => {
      if (
        lastLocation === null ||
        pathname !== lastLocation.pathname + lastLocation.search + lastLocation.hash ||
        JSON.stringify(state) !== JSON.stringify(lastLocation.state)
      ) {
        prevHistoryPush(pathname, state);
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
