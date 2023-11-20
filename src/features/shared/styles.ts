import styled from 'styled-components';

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 8px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Error = styled.div`
  color: red;
  font-size: 0.8rem;
`;
