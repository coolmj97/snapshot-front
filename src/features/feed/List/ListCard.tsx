import { Card, CardBox, Img, Text } from './ListCard.styles';
import { ListCardProps } from './ListCard.types';

const ListCard = (props: ListCardProps) => {
  const { onClick, data, hasImg } = props;

  const emptyImgUrl =
    'https://kmj-test-bucket.s3.ap-northeast-2.amazonaws.com/public/logo-gray.png';

  return (
    <CardBox>
      <Card onClick={onClick}>
        <Img
          src={hasImg ? data.photos[0]?.url : emptyImgUrl}
          className={hasImg ? '' : 'empty-image'}
        />
      </Card>
      <Text>{data.title}</Text>
    </CardBox>
  );
};

export default ListCard;
