import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../redux/types';
import Settings from './Settings';
import { selectGlobalConfig, setGlobalAccess, setGlobalConfig } from '../../redux/me';
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
  handleAccessCode: (access: { devAccess?: boolean; apiAccess?: boolean }) => {
    dispatch(setGlobalAccess(access));
  },
});

export default connect(mapState, mapDispatch)(Settings);
