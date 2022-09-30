import { useDispatch } from 'react-redux';
import { ModalClosePayload, ModalStateModal, ModalTypes } from '../../redux/modal';
import Modal, { ModalSize } from '../modal';
import TestPage from '../testPage';
import GameWon from '../gameWon';
import Confirmation from '../confirmationModal';

interface Props {
  closeModal: (payload?: ModalClosePayload) => void;
  modals: ModalStateModal[];
}

const modalSizes: { [modalId: string]: ModalSize } = {
  [ModalTypes.Test]: 'medium',
  [ModalTypes.GameWon]: 'small',
};

const ModalDialogController = ({ modals, closeModal }: Props) => {
  const handleClose = () => closeModal();
  const dispatch = useDispatch();
  let size = 'medium';
  if (modals[0]?.size) {
    size = modals[0]?.size;
  } else if (modals[0]?.id) {
    size = modalSizes[modals[0]?.id];
  }

  function handleNothingOnClose(): void {}

  const theme = modals[0] as { dark?: boolean };

  return (
    <Modal
      isOpen={Boolean(modals.length)}
      cancellable={modals[0]?.cancellable === undefined ? true : modals[0]?.cancellable}
      handleClose={() => {
        if (modals[0]?.cancellable === undefined) {
          return closeModal();
        }
        return handleNothingOnClose();
      }}
      size={size as ModalSize}
      dark={theme && theme.dark}
    >
      {modals.map((modal, index) => (
        <div style={index ? { display: 'none' } : undefined} key={modal.uuid}>
          {modal.id === ModalTypes.Test && <TestPage delay={100000} />}
          {modal.id === ModalTypes.GameWon && (
            <GameWon
              name={modal.name}
              score={modal.score}
              handleReplay={modal.handleReplay}
              handleReset={modal.handleReset}
              handleClose={handleClose}
            />
          )}
          {modal.id === ModalTypes.Confirmation && (
            <Confirmation
              content={modal.content}
              icon={modal.icon}
              title={modal.title}
              onCancel={modal.onCancel}
              onConfirm={modal.onConfirm}
              cancelText={modal.cancelText}
              continueText={modal.continueText}
              hasBackButton={modal.hasBackButton}
              dark={modal.dark}
            />
          )}
        </div>
      ))}
    </Modal>
  );
};

export default ModalDialogController;
