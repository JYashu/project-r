import { connect } from 'react-redux';

import { closeModal, selectModalsState } from '../../redux/modal';
import { State } from '../../redux/types';

import ModalDialogController from './ModalDialogController';

const mapState = (state: State) => ({
  modals: selectModalsState(state),
});

const mapDispatch = {
  closeModal,
};

export default connect(mapState, mapDispatch)(ModalDialogController);
