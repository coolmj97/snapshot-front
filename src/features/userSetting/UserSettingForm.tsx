import { Button, Input } from '@/components';
import { Box, Label } from '../shared/styles';
import { useState } from 'react';

interface UserSettingFormProps {
  onSubmit: () => void;
}

const UserSettingForm = (props: UserSettingFormProps) => {
  const { onSubmit } = props;
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box>
          <Label htmlFor="email">이메일</Label>
          <div>mj340@naver.com</div>
        </Box>

        <Box>
          <Label htmlFor="password">비밀번호</Label>
          {!isPasswordEditMode ? (
            <>
              <Input
                id="password"
                placeholder="새 비밀번호"
                value=""
                onChange={(e) => console.log(e.target.value)}
              />
              <Input
                id="password-confirm"
                placeholder="새 비밀번호 확인"
                value=""
                onChange={(e) => console.log(e.target.value)}
              />
            </>
          ) : (
            <Button $border="1px solid #D3D3D3">비밀번호 수정</Button>
          )}
        </Box>

        <Box>
          <Label htmlFor="username">닉네임</Label>
          <Input
            id="username"
            placeholder="닉네임"
            value="user3048956893475"
            onChange={(e) => console.log(e.target.value)}
          />
        </Box>
      </form>

      <Button type="submit" $background="#f0133a" $color="#fff" $marginTop="48px" $fullWidth>
        정보 수정
      </Button>
    </>
  );
};

export default UserSettingForm;
