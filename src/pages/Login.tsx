import { Layout, Title } from '@/components/common';
import { LoginForm } from '@/features/auth';
import styled from 'styled-components';

const Login = () => {
  return (
    <Layout>
      <Box>
        <Title title="로그인"></Title>
        <LoginForm />
      </Box>
    </Layout>
  );
};

export default Login;

const Box = styled.div`
  width: 400px;
  height: 100vh;
  padding: 48px 0;
  margin: 0 auto;
`;
