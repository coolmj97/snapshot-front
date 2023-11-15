import styled from 'styled-components';

export const Card = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #d3d3d3;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #fff;

  &:hover {
    filter: brightness(90%);
  }

  @media (max-width: 576px) {
    width: 100px;
    height: 100px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

export const Text = styled.div`
  margin: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
