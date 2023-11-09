import { Box, Label } from '../auth.styles';
import { Button, Input } from '@/components/common';

const LoginForm = () => {
  return (
    <>
      <form>
        <Box>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            placeholder="이메일"
            value=""
            onChange={(e) => console.log(e.target.value)}
          />
        </Box>

        <Box>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            placeholder="비밀번호"
            value=""
            onChange={(e) => console.log(e.target.value)}
          />
        </Box>
      </form>

      <Button background="#f0133a" color="#fff" marginTop="48px" fullWidth>
        로그인
      </Button>
    </>
  );
};

export default LoginForm;
