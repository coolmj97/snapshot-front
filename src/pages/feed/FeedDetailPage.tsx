import { deleteFeed, findOneByFeedId } from '@/apis/feed/feedApi';
import { MenuDot } from '@/assets/icons/MenuDot';
import { Button, Carousel, Layout } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import Dompurify from 'dompurify';
import Menu from '@/components/Menu/Menu';
import { MenuListType } from '@/components/Menu/Menu.types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MenuBox } from '@/components/Menu/Menu.styles';
import Profile from '@/components/Profile/Profile';
import Modal from '@/components/Modal/Modal';
import { Dimmer, Loader } from 'semantic-ui-react';
import { auth } from '@/service/firebase';

const FeedDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ?? '';

  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [canAccess, setCanAccess] = useState<boolean>(true);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(true);

  const dropdownRef = useRef<any>(null);

  const getFeedById = async () => {
    const { data } = await findOneByFeedId(id);
    return data;
  };

  const { data: feed, isLoading } = useQuery({
    queryKey: ['getFeedById', id],
    queryFn: () => getFeedById(),
    enabled: !!id,
  });

  const onDelete = async () => {
    try {
      await deleteFeed(id);
      navigate('/feed/list');
    } catch (e) {
      console.log(e);
    }
  };

  const menuList: MenuListType[] = [
    {
      name: '수정',
      onClick: () => {
        navigate(`/feed/${id}/edit`);
      },
    },
    {
      name: '삭제',
      onClick: () => {
        setShowConfirmModal(true);
        setOpenModal(true);
        setOpenMenu(false);
      },
    },
  ];

  const onBlur = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onBlur);
  }, []);

  const modalMsg = useMemo(() => {
    if (!canAccess) {
      return '권한이 없습니다.';
    }

    if (showConfirmModal) {
      return '정말 삭제하시겠습니까?';
    }
  }, [canAccess, showConfirmModal]);

  useEffect(() => {
    if (!feed) return;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.uid !== feed?.uid) {
        navigate('/feed/list');
        setCanAccess(false);
        setOpenModal(true);
      } else {
        setCanAccess(true);
      }
    });

    return () => unsubscribe();
  }, [feed, navigate]);

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <Layout>
      <Box>
        <Title>{feed?.title}</Title>

        <ProfileMenuBox>
          <Profile
            url={feed?.user.profileImgUrl || ''}
            name={feed?.user.username || ''}
            date={feed?.updatedAt}
          />

          <MenuBox ref={dropdownRef}>
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

      <Modal
        $visible={openModal}
        content={modalMsg}
        footer={
          !canAccess ? (
            <Button
              $background="#f0133a"
              $color="#fff"
              $marginRight="8px"
              onClick={() => navigate('/feed/list')}
            >
              확인
            </Button>
          ) : (
            <>
              <Button $background="#f0133a" $color="#fff" $marginRight="8px" onClick={onDelete}>
                네
              </Button>
              <Button $border="1px solid #D3D3D3" onClick={() => setOpenModal(false)}>
                아니오
              </Button>
            </>
          )
        }
      />
    </Layout>
  );
};

export default FeedDetailPage;

const Box = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 48px;

  @media (max-width: 576px) {
    width: 80%;
    padding: 32px 0;
  }
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
  font-size: 1.5rem;
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
