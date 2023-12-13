import { Card, CardBox, Img, Text } from './ListCard.styles';
import { ListCardProps } from './ListCard.types';

const ListCard = (props: ListCardProps) => {
  const { onClick, data, hasImg } = props;

  return (
    <CardBox>
      <Card onClick={onClick}>
        <Img
          src={hasImg ? data.photos[0]?.url : '/src/assets/logo-gray.png'}
          className={hasImg ? '' : 'empty-image'}
        />
      </Card>
      <Text>{data.title}</Text>
    </CardBox>
  );
};

export default ListCard;
