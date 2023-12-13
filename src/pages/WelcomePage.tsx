import { Button, Layout } from '@/components';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box>
        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SubTitle>회원가입이 완료되었습니다!</SubTitle>
          <Desc>
            머릿속을 떠다니는 생각, 간직하고 싶은 추억
            <br /> 지금 이 순간의 나를 기록해보세요.
          </Desc>
          <Button
            $background="#f0133a"
            $color="#fff"
            $marginTop="48px"
            $fullWidth
            onClick={() => navigate('/feed/list')}
          >
            피드 목록으로 가기
          </Button>
        </div>
      </Box>
    </Layout>
  );
};

export default WelcomePage;

const Box = styled.div`
  width: 400px;
  padding: 48px 0;
  margin: 0 auto;

  @media (max-width: 576px) {
    width: 70%;
  }
`;

const Desc = styled.div`
  margin-bottom: 24px;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
`;

const SubTitle = styled.div`
  margin-bottom: 24px;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;
