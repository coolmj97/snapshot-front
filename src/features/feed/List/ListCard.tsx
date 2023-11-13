import styled from 'styled-components';

interface ListCardProps {
  onClick?: () => void;
}

const ListCard = (props: ListCardProps) => {
  const { onClick } = props;
  return (
    <Card onClick={onClick}>
      <Text>
        가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하
      </Text>
      {/* <Img src="https://fastly.picsum.photos/id/785/536/354.jpg?hmac=3cV8MuI_fMNjlG5HlThVzH_L9OjpFGvlxgIGhXHO6Y4" /> */}
    </Card>
  );
};

export default ListCard;

const Card = styled.div`
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

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const Text = styled.div`
  margin: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
