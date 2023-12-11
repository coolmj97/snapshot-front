import styled from 'styled-components';

export const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 16px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    background: rgb(0, 0, 0, 0.5);
  }

  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 1px solid #d3d3d3;
  object-fit: cover;
`;

export const DeleteButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
  cursor: pointer;
  opacity: 1;

  ${ImgBox}:hover & {
    visibility: visible;
  }
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
