import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { copyText } from '../../redux/me';
import { ModalTypes, openModal } from '../../redux/modal';
import TestPage from './TestPage';
import { withState } from './utils';

const mapDispatch = (dispatch: Dispatch) => ({
  handleOpenModal: () => dispatch(openModal({ id: ModalTypes.Test, delay: 100 })),
  copyText: (text: string) => {
    dispatch(copyText.request({ text }));
  },
});

export default connect(undefined, mapDispatch)(withState(TestPage));
