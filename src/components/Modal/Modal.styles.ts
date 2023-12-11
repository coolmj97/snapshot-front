import styled from 'styled-components';

interface ModalStyleProps {
  visible: boolean;
}

export const ModalDesc = styled.div`
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.2em;
`;

export const ModalTitle = styled.div`
  margin-bottom: 16px;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const StyledModal = styled.div<ModalStyleProps>`
  ${({ visible }) => `

    animation: ${
      visible ? 'fadeInModal 0.5s ease-in-out forwards' : 'fadeOutModal 0.5s ease-in-out forwards'
    };


  `};

  width: 500px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  z-index: 99;

  @media (max-width: 576px) {
    width: 90%;
  }

  @keyframes fadeInModal {
    from {
      transform: translateY(-100px);
      opacity: 0;
    }
    to {
      transform: translateY(70px);
      opacity: 1;
    }
  }
  @keyframes fadeOutModal {
    from {
      transform: translateY(70px);
      opacity: 1;
    }
    to {
      transform: translateY(-100px);
      opacity: 0;
    }
  }
`;

export const Dim = styled.div<ModalStyleProps>`
  ${({ visible }) => `
      display:${visible ? 'block' : 'none'};
      animation: ${
        visible ? 'fadeInDim 0.3s ease-in-out forwards' : 'fadeOutDim 0.3s ease-in-out forwards'
      };

  `};

  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgb(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;

  @keyframes fadeInDim {
    from {
      display: none;
      opacity: 0;
    }
    to {
      display: flex;
      opacity: 1;
    }
  }
  @keyframes fadeOutDim {
    from {
      display: flex;
      opacity: 1;
    }
    to {
      display: none;
      opacity: 0;
    }
  }
`;
