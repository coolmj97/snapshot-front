import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import SignUpForm from '../features/signUp/SignUpForm';
import { RootState } from '@/store';
import { signUpByEmail } from '@/service/auth';
import { resetSignUpForm } from '@/redux/userSlice';
import { Layout, Title } from '@/components';
import Modal from '@/components/Modal/Modal';
import { Dimmer, Loader } from 'semantic-ui-react';

const RegistrationPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const { profileImg, email, username, password, passwordCheck } = user;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isSignUpError, setIsSignUpError] = useState<boolean>(false);
  const [errorLog, setErrorLog] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    if (isSignUpError) {
      return errorLog;
    }
  }, [username, email, password, passwordCheck, isSignUpError, errorLog]);

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
      setIsLoading(true);

      const data = await signUpByEmail(payload);
      if (data) {
        updateProfile(data.user, {
          displayName: username,
          photoURL: profileImg,
        });
      }

      navigate('/welcome');
    } catch (e: any) {
      const existedEmail = e.code === 'auth/email-already-in-use';

      if (existedEmail) {
        setErrorLog('이미 가입된 계정입니다.');
      } else {
        setErrorLog('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }

      setIsSignUpError(true);
      setOpenModal(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(resetSignUpForm());
  }, [dispatch, location.pathname]);

  return (
    <>
      <Layout>
        {isLoading ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Box>
            <Title title="회원가입" />
            <SignUpForm onSubmit={onSubmit} user={user} />
          </Box>
        )}
      </Layout>

      <Modal
        content={errorMsg}
        $visible={openModal}
        onClose={() => {
          setOpenModal(false);
          dispatch(resetSignUpForm());
        }}
      />
    </>
  );
};

export default RegistrationPage;

const Box = styled.div`
  width: 400px;
  padding: 48px 0;
  margin: 0 auto;

  @media (max-width: 576px) {
    width: 70%;
  }
`;
