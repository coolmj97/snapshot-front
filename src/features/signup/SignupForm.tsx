import { Button, Input } from '@/components';
import { Box, Error, Label } from '../shared/styles';
import { UserState, changeForm } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';
import { FormEvent } from 'react';
import { useForm } from '../shared/useForm';

interface SignUpFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  user: UserState;
}

const SignUpForm = (props: SignUpFormProps) => {
  const { onSubmit, user } = props;
  const { email, username, password, passwordCheck } = user;
  const dispatch = useDispatch();

  const { isValid, onChangeField } = useForm({
    action: changeForm,
  });

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
            minLength={8}
            maxLength={15}
            onChange={(e) => onChangeField('password', e)}
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
            onChange={(e) => onChangeField('passwordCheck', e)}
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
