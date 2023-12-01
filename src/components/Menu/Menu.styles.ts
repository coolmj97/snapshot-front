import styled from 'styled-components';

export const MenuBox = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

export const Box = styled.ul<{ $top?: number }>`
  ${({ $top }) => `
  top: ${$top || 0}px;
`}

  padding: 8px 0;
  list-style: none;
  border-radius: 8px;
  border: 1px solid #d3d3d3;
  background: #fff;
  font-size: 15px;
  box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.2);

  position: absolute;
  right: 0;
  z-index: 99;

  & > li {
    min-width: 80px;
    padding: 8px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;
