import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Button } from '..';
import { Dim, ModalDesc, ModalTitle, StyledModal } from './Modal.styles';

interface ModalProps {
  description: ReactNode | string;
  visible: boolean;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
  const { description, visible, onClose } = props;

  const modal = document.querySelector('#modal') as HTMLElement;

  return createPortal(
    <Dim visible={visible}>
      <StyledModal visible={visible}>
        <div style={{ width: '100%' }}>
          <ModalTitle>알림</ModalTitle>
          <ModalDesc>{description}</ModalDesc>

          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <Button $background="#f0133a" $color="#fff" onClick={onClose}>
              확인
            </Button>
          </div>
        </div>
      </StyledModal>
    </Dim>,
    modal
  );
};

export default Modal;
