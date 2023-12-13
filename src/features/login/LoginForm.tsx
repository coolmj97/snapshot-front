import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { loginByEmail } from '@/service/auth';
import { Button, Input } from '@/components';
import { changeLoginForm, resetLoginForm } from '@/redux/loginSlice';
import { Box, Error, Label } from '../shared/styles';
import { useForm } from '../shared/useForm';
import { RootState } from '@/store';
import Modal from '@/components/Modal/Modal';
import { PrevArrow } from '@/assets/icons/PrevArrow';
import styled from 'styled-components';
import { Dimmer, Loader } from 'semantic-ui-react';

interface LoginFormProps {
  onBack: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const { onBack } = props;
  const login = useSelector((state: RootState) => state.login);
  const { email, password } = login;

  const dispatch = useDispatch();
  const location = useLocation();

  const { isValid, onChangeField } = useForm({
    action: changeLoginForm,
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLogInError, setIsLogInError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errorMsg = useMemo(() => {
    if (!email) {
      return '이메일을 입력해주세요.';
    }

    if (!password) {
      return '비밀번호를 입력해주세요.';
    }

    if (isLogInError) {
      return '아이디 또는 비밀번호가 일치하지 않습니다.';
    }
  }, [email, password, isLogInError]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMsg) {
      setOpenModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        email,
        password,
      };

      await loginByEmail(payload);
    } catch (e: any) {
      const logInError = e.code === 'auth/invalid-login-credentials';

      if (logInError) {
        setIsLogInError(true);
        setOpenModal(true);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(resetLoginForm());
  }, [dispatch, location.pathname]);

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <Box>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => onChangeField('email', e)}
          />
          {email && !isValid.email && <Error>이메일 형식이 아닙니다</Error>}
        </Box>
        <Box>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => onChangeField('password', e)}
          />
          {password && !isValid.password && (
            <Error>하나 이상의 영문, 숫자, 특수문자 조합 8~15자</Error>
          )}
        </Box>
        <Button type="submit" $background="#f0133a" $color="#fff" $marginTop="24px" $fullWidth>
          로그인
        </Button>

        <Divider />

        <BackButton onClick={onBack}>
          <PrevArrow size={32} /> <div>뒤로</div>
        </BackButton>
      </form>

      <Modal
        content={errorMsg}
        $visible={openModal}
        onClose={() => {
          setOpenModal(false);
          dispatch(resetLoginForm());
        }}
      />
    </>
  );
};

export default LoginForm;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.05);
  margin: 48px 0 24px 0;
`;
