import { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button, Input } from '@/components';
import { Box, Error, Label } from '../shared/styles';
import { UserState, resetProfileImg, setForm, setProfileImg } from '@/redux/userSlice';
import { useForm } from '../shared/useForm';
import Upload from '@/components/Upload/Upload';
import styled from 'styled-components';
import { DeleteButton, Img, ImgBox } from '../feed/Form/FeedForm.styles';
import { DeleteIcon } from '@/assets/icons/DeleteIcon';

interface SignUpFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  user: UserState;
}

const SignUpForm = (props: SignUpFormProps) => {
  const { onSubmit, user } = props;
  const { profileImg, email, username, password, passwordCheck } = user;

  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { isValid, onChangeField } = useForm({
    action: setForm,
  });

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      const formData = new FormData();
      formData.append('file', file);

      try {
        const { data } = await axios.post(`${baseUrl}/upload`, formData);

        dispatch(setProfileImg(data.url));
      } catch (e) {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }

    e.target.value = '';
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
            onChange={(e) => dispatch(setForm({ key: 'username', value: e.target.value }))}
          />
        </Box>

        <Box>
          <Label htmlFor="profileImg">프로필 사진</Label>

          <div
            style={{
              display: 'flex',
            }}
          >
            {profileImg && (
              <ImgBox>
                <Img src={profileImg} />
                <DeleteButton onClick={() => dispatch(resetProfileImg())}>
                  <DeleteIcon />
                </DeleteButton>
              </ImgBox>
            )}
            <Upload onChange={onUpload} />
          </div>
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
