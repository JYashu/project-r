import { connect } from 'react-redux';

import { closeModal, selectModalsState } from '../../redux/modal';
import { State } from '../../redux/types';

import ModalManager from './ModalManager';

const mapState = (state: State) => ({
  modals: selectModalsState(state),
});

const mapDispatch = {
  closeModal,
};

export default connect(mapState, mapDispatch)(ModalManager);
