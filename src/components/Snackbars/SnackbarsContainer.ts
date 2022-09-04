import { connect } from 'react-redux';

import { selectSnacks, removeSnack } from '../../redux/snackbar';
import { State } from '../../redux/types';

import Snackbars from './Snackbars';

const mapState = (state: State) => ({ snacks: selectSnacks(state) });

const mapDispatch = {
  removeSnack,
};

export default connect(mapState, mapDispatch)(Snackbars);
