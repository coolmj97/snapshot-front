import { Button, Input } from '@/components';
import { Box, Error, Label } from '../shared/styles';
import { UserState, changeForm } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
import { ChangeEvent, FormEvent, useState } from 'react';

interface SignUpFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  user: UserState;
}

interface IsValidType {
  email: boolean;
  password: boolean;
  passwordCheck: boolean;
}

const SignUpForm = (props: SignUpFormProps) => {
  const { onSubmit, user } = props;
  const { email, username, password, passwordCheck } = user;
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState<IsValidType>({
    email: true,
    password: true,
    passwordCheck: true,
  });

  const checkField = (name: keyof IsValidType, e: any) => {
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const pwRegex = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,15}');

    if (name === 'email') {
      return emailRegex.test(e.target.value);
    } else if (name === 'password' || name === 'passwordCheck') {
      return pwRegex.test(e.target.value);
    }
  };

  const onChange = (name: keyof IsValidType, e: ChangeEvent<HTMLInputElement>) => {
    const isValid = checkField(name, e);

    setIsValid((prev) => ({
      ...prev,
      [name]: isValid,
    }));

    dispatch(changeForm({ key: name, value: e.target.value }));
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <Box>
          <Label htmlFor="username">이름</Label>
          <Input
            id="username"
            placeholder="이름"
            value={username}
            maxLength={15}
            onChange={(e) => dispatch(changeForm({ key: 'username', value: e.target.value }))}
          />
        </Box>

        <Box>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => onChange('email', e)}
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
            minLength={8}
            maxLength={15}
            onChange={(e) => onChange('password', e)}
          />
          {password && !isValid.password && (
            <Error>하나 이상의 영문, 숫자, 특수문자 조합 8~15자</Error>
          )}
        </Box>

        <Box>
          <Label htmlFor="password-check">비밀번호 확인</Label>
          <Input
            type="password"
            id="password-check"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => onChange('passwordCheck', e)}
          />
          {passwordCheck && !isValid.passwordCheck && <Error>비밀번호가 일치하지 않습니다</Error>}
        </Box>

        <Button type="submit" $background="#f0133a" $color="#fff" $marginTop="48px" $fullWidth>
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
