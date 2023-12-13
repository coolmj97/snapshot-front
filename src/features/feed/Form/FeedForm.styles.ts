import styled from 'styled-components';

export const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 8px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #d3d3d3;
  object-fit: cover;
`;

export const DeleteButton = styled.div`
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 100%;
  background: red;
  text-align: center;

  position: absolute;
  top: 4px;
  left: 4px;
`;

export const Box = styled.div`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 1.2rem;
`;
