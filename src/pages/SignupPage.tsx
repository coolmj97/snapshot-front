import { Button, Layout, Title } from '@/components';
import styled from 'styled-components';
import SignUpForm from '../features/signUp/SignUpForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { postNewUser } from '@/apis/user/userApi';
import { FormEvent, useMemo, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { useNavigate } from 'react-router';

const SignUpPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const { email, username, password, passwordCheck } = user;

  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const errorMsg = useMemo(() => {
    if (!username) {
      return '이름을 입력해주세요.';
    }

    if (!email) {
      return '이메일을 입력해주세요.';
    }

    if (!password) {
      return '비밀번호를 입력해주세요.';
    }

    if (!passwordCheck) {
      return '비밀번호 확인을 입력해주세요.';
    }
  }, [username, email, password, passwordCheck]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMsg) {
      setOpenModal(true);
      return;
    }

    const payload = {
      email,
      password,
      username,
    };

    try {
      await postNewUser(payload);
      setIsSubmitted(true);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <Layout>
        <Box>
          {!isSubmitted ? (
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
                onClick={() => navigate('/login')}
              >
                로그인
              </Button>
            </div>
          ) : (
            <>
              <Title title="회원가입"></Title>
              <SignUpForm onSubmit={onSubmit} user={user} />
            </>
          )}
        </Box>
      </Layout>

      <Modal description={errorMsg} visible={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default SignUpPage;

const Box = styled.div`
  width: 400px;
  padding: 48px 0;
  margin: 0 auto;
`;

const Desc = styled.div`
  margin-bottom: 24px;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
`;

const SubTitle = styled.div`
  margin-bottom: 24px;
  font-size: 2rem;
  text-align: center;
`;
