import { Layout } from '@/components';
import FeedForm from '@/features/feed/Form/FeedForm';
import { Mode } from '@/features/feed/Form/FeedForm.types';
import styled from 'styled-components';

const FeedCreatePage = () => {
  return (
    <Layout>
      <Box>
        <FeedForm mode={Mode.Create} />
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
