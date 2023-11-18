import { Layout, Title } from '@/components';
import UserSettingForm from '../features/userSetting/UserSettingForm';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { findOneByUserId } from '@/apis/user/userApi';

const UserSettingPage = () => {
  const id = '653906538b29dcdbbae514ae';

  const { data } = useQuery({
    queryKey: ['getUser', id],
    queryFn: () => findOneByUserId('653906538b29dcdbbae514ae'),
  });
  console.log('data', data);

  return (
    <Layout>
      <Box>
        <Title title="정보수정"></Title>
        <UserSettingForm />
      </Box>
    </Layout>
  );
};

export default UserSettingPage;

const Box = styled.div`
  width: 400px;
  padding: 48px 0;
  margin: 0 auto;

  @media (max-width: 576px) {
    width: auto;
    margin: 0 auto;
    padding: 24px;
  }
`;
