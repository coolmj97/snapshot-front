import { Card, Text } from './ListCard.styles';

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
