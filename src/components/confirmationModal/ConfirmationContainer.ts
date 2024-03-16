import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { closeModal, confirmConfirmation } from '../../redux/modal';
import Confirmation from './Confirmation';

interface OwnProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

const mapDispatch = (dispatch: Dispatch, { onConfirm, onCancel }: OwnProps) => ({
  handleCancel: () => {
    if (onCancel) {
      onCancel();
    }
    dispatch(closeModal());
  },
  handleContinue: () => {
    if (onConfirm) {
      onConfirm();
    } else dispatch(confirmConfirmation());
    dispatch(closeModal());
  },
});

export default connect(null, mapDispatch)(Confirmation);
