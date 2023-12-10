import { Button, Input } from '@/components';
import { Box, Error, Label } from '../shared/styles';
import { changeLoginForm, resetLoginForm } from '@/redux/loginSlice';
import { useForm } from '../shared/useForm';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { loginByEmail } from '@/service/auth';
import Modal from '@/components/Modal/Modal';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const login = useSelector((state: RootState) => state.login);
  const { email, password } = login;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isValid, onChangeField } = useForm({
    action: changeLoginForm,
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLogInError, setIsLogInError] = useState<boolean>(false);

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

    try {
      const payload = {
        email,
        password,
      };

      await loginByEmail(payload);
      navigate('/feed/list');
    } catch (e: any) {
      const logInError = e.code === 'auth/invalid-login-credentials';

      if (logInError) {
        setIsLogInError(true);
        setOpenModal(true);
      }
    }
  };

  useEffect(() => {
    dispatch(resetLoginForm());
  }, [dispatch, location.pathname]);

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
