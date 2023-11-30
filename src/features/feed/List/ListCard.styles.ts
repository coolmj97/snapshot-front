import styled from 'styled-components';

export const Card = styled.div`
  width: 300px;
  height: 300px;
  margin: 48px 0;
  border: 1px solid #d3d3d3;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-bottom: 24px;

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

  &.empty-image {
    width: 50%;
    height: 50%;
    object-fit: contain;
    margin: 0 auto;
  }

  &:hover {
    filter: brightness(90%);
  }
`;

export const Text = styled.div`
  font-size: 0.9rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
