import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '..';
import { Dim, ModalDesc, ModalTitle, StyledModal } from './Modal.styles';

interface ModalProps {
  content: ReactNode | string;
  $visible: boolean;
  onClose?: () => void;
  footer?: ReactNode;
}

const Modal = (props: ModalProps) => {
  const { content, $visible, onClose, footer } = props;

  const modal = document.querySelector('#modal') as HTMLElement;

  return createPortal(
    <Dim $visible={$visible}>
      <StyledModal $visible={$visible}>
        <div style={{ width: '100%' }}>
          <ModalTitle>알림</ModalTitle>
          <ModalDesc>{content}</ModalDesc>

          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            {footer ? (
              footer
            ) : (
              <Button $background="#f0133a" $color="#fff" onClick={onClose}>
                확인
              </Button>
            )}
          </div>
        </div>
      </StyledModal>
    </Dim>,
    modal
  );
};

export default Modal;
