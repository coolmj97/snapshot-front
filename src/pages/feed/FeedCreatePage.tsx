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
  width: auto;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: center;
`;
