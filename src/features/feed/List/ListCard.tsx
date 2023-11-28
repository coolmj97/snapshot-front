import { Card, Img, Text } from './ListCard.styles';
import { ListCardProps } from './ListCard.types';

const ListCard = (props: ListCardProps) => {
  const { onClick, data } = props;

  return (
    <Card onClick={onClick}>
      {data.photos?.length ? <Img src={data.photos[0]?.url} /> : null}
      <Text>{data.title}</Text>
    </Card>
  );
};

export default ListCard;
