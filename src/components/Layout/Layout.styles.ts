import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  padding: 1rem;
  margin: 0 auto;

  @media (max-width: 576px) {
    width: auto;
    height: 65px;
  }
`;

export const LogoBox = styled.div`
  cursor: pointer;

  @media (max-width: 576px) {
    width: 30%;
  }
`;
