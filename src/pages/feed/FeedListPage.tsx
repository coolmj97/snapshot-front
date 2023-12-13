import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { auth } from '@/service/firebase';
import { findAllFeed } from '@/apis/feed/feedApi';
import { Layout, Title } from '@/components';
import ListCard from '@/features/feed/List/ListCard';
import { FeedParams } from '@/apis/feed/feedApi.types';
import { Dimmer, Loader } from 'semantic-ui-react';
import { EditIcon } from '@/assets/icons/EditIcon';

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

  const { data, fetchNextPage, hasNextPage, isFetched } = useInfiniteQuery({
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

  return (
    <Layout>
      <Box>
        {!isFetched ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Box>
            <Title title="피드" />
            {feeds?.length ? (
              <CardContainer>
                {feeds?.map((feed) => {
                  const hasImg = feed.photos.length ? true : false;

                  return (
                    <ListCard
                      key={feed._id}
                      data={feed}
                      hasImg={hasImg}
                      onClick={() => {
                        console.log('click');
                        const path = generatePath('/feed/:id', {
                          id: feed._id,
                        });
                        navigate(path);
                      }}
                    />
                  );
                })}
              </CardContainer>
            ) : (
              <EmptyFeeds>작성된 피드가 없습니다.</EmptyFeeds>
            )}

            <WritingButton onClick={() => navigate('/feed/create')}>
              <EditIcon color="#fff" />
            </WritingButton>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default FeedListPage;

const WritingButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  padding: 8px;
  background: #f0133a;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 10px;
  margin-right: 16px;
  cursor: pointer;

  box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.2);
`;

const Box = styled.div`
  height: 100vh;
  padding: 24px 0;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  padding: 48px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @media (max-width: 576px) {
    padding: 16px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 3fr));
  }
`;

const EmptyFeeds = styled.div`
  padding: 40px;
  color: #a9a9a9;
  font-size: 1rem;
  text-align: center;
`;
