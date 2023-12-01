import { findOneByFeedId } from '@/apis/feed/feedApi';
import { MenuDot } from '@/assets/icons/MenuDot';
import { Carousel, Layout } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Dompurify from 'dompurify';
import Menu from '@/components/Menu/Menu';
import { MenuListType } from '@/components/Menu/Menu.types';
import { useState } from 'react';
import { MenuBox } from '@/components/Menu/Menu.styles';
import Profile from '@/components/Profile/Profile';

const FeedDetailPage = () => {
  const params = useParams();

  const [openMenu, setOpenMenu] = useState(false);

  const getFeedById = async () => {
    const id = params.id ?? '';

    const { data } = await findOneByFeedId(id);
    return data;
  };

  const { data: feed } = useQuery({
    queryKey: ['getFeedById'],
    queryFn: () => getFeedById(),
  });

  const menuList: MenuListType[] = [
    {
      name: '수정',
      onClick: () => {},
    },
    {
      name: '삭제',
      onClick: () => {},
    },
  ];

  if (!feed) {
    return <></>;
  }

  return (
    <Layout>
      <Box>
        <Title>{feed?.title}</Title>

        <ProfileMenuBox>
          <Profile
            url={feed?.user.profileImgUrl}
            name={feed?.user.username}
            date={feed?.updatedAt}
          />

          <MenuBox>
            <div style={{ cursor: 'pointer' }} onClick={() => setOpenMenu(!openMenu)}>
              <MenuDot />
            </div>
            {openMenu && <Menu list={menuList} $top={32} />}
          </MenuBox>
        </ProfileMenuBox>

        {feed?.photos.length ? <Carousel data={feed?.photos} /> : null}

        {feed && (
          <Content
            $hasPhoto={feed?.photos.length ? true : false}
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(feed.content),
            }}
          />
        )}
      </Box>
    </Layout>
  );
};

export default FeedDetailPage;

const Box = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 48px;
`;

const ProfileMenuBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
`;

const Title = styled.div`
  margin-bottom: 32px;
  font-size: 32px;
  font-weight: 500;
`;

const Content = styled.div<{ $hasPhoto: boolean }>`
  ${({ $hasPhoto }) => `
  
  padding-top: ${$hasPhoto ? '80px' : 0};

`}

  height: 100%;
  margin-bottom: 40px;
  line-height: 1.5rem;
  font-size: 16px;
  overflow-y: auto;
`;
