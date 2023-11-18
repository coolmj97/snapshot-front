import { Layout, Title } from '@/components';
import styled from 'styled-components';
import SignupForm from '../features/signUp/SignUpForm';

const SignUpPage = () => {
  return (
    <>
      <Layout>
        <Box>
          <Title title="회원가입"></Title>
          <Desc>
            머릿속을 떠다니는 생각, 간직하고 싶은 추억
            <br /> 지금 이 순간의 나를 기록해보세요.
          </Desc>
          <SignupForm />
        </Box>
      </Layout>
    </>
  );
};

export default SignUpPage;

const Box = styled.div`
  width: 400px;
  height: 100vh;
  padding: 48px 0;
  margin: 0 auto;
`;

const Desc = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.5rem;
  text-align: center;
`;
