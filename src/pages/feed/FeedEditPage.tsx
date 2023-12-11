import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { findOneByFeedId } from '@/apis/feed/feedApi';
import { Layout } from '@/components';
import FeedForm from '@/features/feed/Form/FeedForm';
import { Mode } from '@/features/feed/Form/FeedForm.types';
import { initPhoto, setContent, setTitle } from '@/redux/feedSlice';

const FeedEditPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id ?? '';

  const getFeedById = async () => {
    const { data } = await findOneByFeedId(id);
    return data;
  };

  const {
    data: feed,
    isFetched,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['getFeedById', id],
    queryFn: () => getFeedById(),
    enabled: !!id,
  });

  useEffect(() => {
    if (isLoading) return;

    dispatch(setTitle(feed?.title));
    dispatch(initPhoto(feed?.photos));
    dispatch(setContent(feed?.content));
  }, [isLoading, feed, dispatch]);

  return (
    <Layout>
      <Box>
        <FeedForm mode={Mode.Edit} />
      </Box>
    </Layout>
  );
};

export default FeedEditPage;

const Box = styled.div`
  width: auto;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: center;
`;
