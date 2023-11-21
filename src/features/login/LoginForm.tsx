import { Button, Input } from '@/components';
import { Box, Error, Label } from '../shared/styles';
import { changeLoginForm } from '@/redux/loginSlice';
import { useForm } from '../shared/useForm';
import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { loginByEmail } from '@/service/auth';
import Modal from '@/components/Modal/Modal';

const LoginForm = () => {
  const login = useSelector((state: RootState) => state.login);
  const { email, password } = login;
  const navigate = useNavigate();

  const { isValid, onChangeField } = useForm({
    action: changeLoginForm,
  });

  const [openModal, setOpenModal] = useState<boolean>(false);

  const errorMsg = useMemo(() => {
    if (!email) {
      return '이메일을 입력해주세요.';
    }

    if (!password) {
      return '비밀번호를 입력해주세요.';
    }
  }, [email, password]);

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
      const data = await loginByEmail(payload);
      navigate('/feed/list');
    } catch (e) {
      console.log(e);
    }
  };

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

      <Modal description={errorMsg} $visible={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default LoginForm;
