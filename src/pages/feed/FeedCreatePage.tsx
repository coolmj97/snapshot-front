import { Layout } from '@/components';
import FeedForm from '@/features/feed/Form/FeedForm';
import styled from 'styled-components';

const FeedCreatePage = () => {
  return (
    <Layout>
      <Box>
        <FeedForm />
      </Box>
    </Layout>
  );
};

export default FeedCreatePage;

const Box = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding: 48px;
  display: flex;
  justify-content: center;
`;
