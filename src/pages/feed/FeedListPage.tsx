import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { auth } from '@/service/firebase';
import { findAllFeed } from '@/apis/feed/feedApi';
import { Layout, Title } from '@/components';
import ListCard from '@/features/feed/List/ListCard';
import { FeedParams } from '@/apis/feed/feedApi.types';

const FeedListPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight) {
      fetchNextPage();
    }
  };

  const getFeeds = async ({ pageParam = 0 }) => {
    const params: FeedParams = {
      limit: 10,
      offset: pageParam * 10,
    };
    const { data } = await findAllFeed(params);
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['feeds', isLoggedIn],
    queryFn: ({ pageParam }) => getFeeds({ pageParam }),
    enabled: isLoggedIn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const feeds = data?.pages.flatMap((page) => page);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    window.addEventListener('scroll', onScroll);
  }, []);

  if (isLoading) return '로딩 중...';

  return (
    <Layout>
      <Box>
        <Title title="피드" />
        <CardContainer>
          {feeds?.map((feed) => {
            const hasImg = feed.photos.length ? true : false;

            return (
              <ListCard
                key={feed._id}
                data={feed}
                hasImg={hasImg}
                onClick={() => {
                  const path = generatePath('/feed/:id', {
                    id: feed._id,
                  });
                  navigate(path);
                }}
              />
            );
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
