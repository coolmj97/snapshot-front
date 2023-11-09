import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import styled from 'styled-components';

const SignupForm = () => {
  return (
    <div>
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

        <Box>
          <Label htmlFor="username">이름</Label>
          <Input
            id="username"
            placeholder="이름"
            value=""
            onChange={(e) => console.log(e.target.value)}
          />
        </Box>
      </form>

      <Button background="#f0133a" color="#fff" marginTop="48px" fullWidth>
        회원가입
      </Button>
    </div>
  );
};

export default SignupForm;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 8px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;
