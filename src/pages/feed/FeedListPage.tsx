import { Layout, Title } from '@/components/common';
import ListCard from '@/features/feed/List/ListCard';
import { generatePath, useNavigate } from 'react-router';
import styled from 'styled-components';

const FeedListPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box>
        <Title title="피드"></Title>
        <CardContainer>
          <ListCard />
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
