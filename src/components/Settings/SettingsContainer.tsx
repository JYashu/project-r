import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../redux/types';
import Settings from './Settings';
import { selectGlobalConfig, setGlobalConfig } from '../../redux/me';
import { Config } from '../../types';

const mapState = (state: State) => {
  const config = selectGlobalConfig(state);

  return {
    config,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  handleSettingsChange: (newConfig: Config) => {
    dispatch(setGlobalConfig({ config: newConfig }));
  },
});

export default connect(mapState, mapDispatch)(Settings);
