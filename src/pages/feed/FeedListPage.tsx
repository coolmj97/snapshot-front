import { findAllFeed } from '@/apis/feed/feedApi';
import { Layout, Title } from '@/components';
import ListCard from '@/features/feed/List/ListCard';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const FeedListPage = () => {
  const getFeeds = async () => {
    const { data } = await findAllFeed();
    return data;
  };

  const { data: feeds } = useQuery({
    queryKey: ['fetchFeeds'],
    queryFn: () => getFeeds(),
  });

  return (
    <Layout>
      <Box>
        <Title title="피드" />
        <CardContainer>
          {feeds?.map((feed) => {
            return <ListCard key={feed._id} data={feed} />;
          })}
        </CardContainer>
      </Box>
    </Layout>
  );
};

export default FeedListPage;

const Box = styled.div`
  height: 100vh;
  padding: 48px 0;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  padding: 48px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 16px;

  @media (max-width: 576px) {
    padding: 16px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 3fr));
  }
`;
