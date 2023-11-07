import styled from 'styled-components';
import Button from '../components/common/button/Button';

const IntroPage = () => {
  return (
    <Container>
      <Intro>
        <img src="./src/assets/logo-large.png" width={'100%'} />

        <IntroParagraph>지금 나의 순간을 기록하세요</IntroParagraph>

        <IntroButtons>
          <Button
            width="100%"
            justifyContent="center"
            marginBottom="8px"
            background="#f0133a"
            color="#fff"
          >
            로그인
          </Button>
          <Button width="100%" justifyContent="center">
            회원가입
          </Button>
        </IntroButtons>
      </Intro>
    </Container>
  );
};

export default IntroPage;

const IntroButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  padding: 0 16px;
  background: linear-gradient(
    0deg,
    rgba(255, 253, 213, 1) 0%,
    rgba(255, 147, 166, 1) 100%,
    rgba(255, 147, 166, 1) 100%
  );
`;

const IntroParagraph = styled.p`
  font-size: 1.2rem;
  margin: 8px 0 48px;
  color: transparent;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  &::after {
    content: '지금 나의 순간을 기록하세요';
    position: absolute;
    top: 0;
    left: 0;
    color: #191919;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-right: 2px solid black;
    animation: typing 8s steps(30) infinite;
  }

  @keyframes typing {
    0% {
      width: 0%;
    }
    30% {
      width: 100%;
    }
    50% {
      width: 100%;
    }
    70% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
`;

const Intro = styled.div`
  width: 512px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    width: 100%;
  }
`;
