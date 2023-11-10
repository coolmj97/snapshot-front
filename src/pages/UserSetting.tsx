import { Layout, Title } from '@/components/common';
import UserSettingForm from '@/features/userSetting/UserSettingForm';
import styled from 'styled-components';

const UserSetting = () => {
  return (
    <Layout>
      <Box>
        <Title title="정보수정"></Title>
        <UserSettingForm />
      </Box>
    </Layout>
  );
};

export default UserSetting;

const Box = styled.div`
  width: 400px;
  padding: 48px 0;
  margin: 0 auto;
`;
