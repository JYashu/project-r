import { connect } from 'react-redux';
import { selectClockFormat } from '../../redux/me';
import { State } from '../../redux/types';
import Clock from './Clock';

const mapState = (state: State) => {
  return {
    is12H: selectClockFormat(state),
  };
};

export default connect(mapState)(Clock);
