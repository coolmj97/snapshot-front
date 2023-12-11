import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from 'firebase/auth';
import axios from 'axios';
import { Button, Input } from '@/components';
import { Box, Error, Label } from '../shared/styles';
import { DeleteButton, Img, ImgBox } from '../feed/Form/FeedForm.styles';
import { DeleteIcon } from '@/assets/icons/DeleteIcon';
import Upload from '@/components/Upload/Upload';
import { resetProfileImg, setForm, setProfileImg } from '@/redux/userSlice';
import { useForm } from '../shared/useForm';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface UserSettingFormProps {
  currentUser: User | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const UserSettingForm = (props: UserSettingFormProps) => {
  const { currentUser, onSubmit } = props;
  const user = useSelector((state: RootState) => state.user);
  const { profileImg, password, passwordCheck } = user;

  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { isValid, onChangeField } = useForm({
    action: setForm,
  });

  const isGoogleUser = currentUser?.providerData[0].providerId === 'google.com';

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
    <>
      <form onSubmit={onSubmit}>
        <Box>
          <Label htmlFor="username">이름</Label>
          <Value>{currentUser?.displayName}</Value>
        </Box>

        {!isGoogleUser && (
          <Box>
            <Label htmlFor="profileImg">프로필 사진</Label>
            <div
              style={{
                display: 'flex',
              }}
            >
              {profileImg && (
                <ImgBox>
                  <Img src={profileImg ?? currentUser?.photoURL} />
                  <DeleteButton onClick={() => dispatch(resetProfileImg())}>
                    <DeleteIcon />
                  </DeleteButton>
                </ImgBox>
              )}
              <Upload onChange={onUpload} />
            </div>
          </Box>
        )}

        <Box>
          <Label htmlFor="email">이메일</Label>
          <Value>{currentUser?.email}</Value>
        </Box>

        {!isGoogleUser ? (
          <Box>
            <Label htmlFor="password">비밀번호 변경</Label>
            <Input
              type="password"
              id="password"
              placeholder="새 비밀번호"
              value={password}
              minLength={8}
              maxLength={15}
              onChange={(e) => onChangeField('password', e)}
            />
            {password && !isValid.password && (
              <Error>하나 이상의 영문, 숫자, 특수문자 조합 8~15자</Error>
            )}

            <Input
              type="password"
              id="password-check"
              placeholder="새 비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => onChangeField('passwordCheck', e)}
            />
            {passwordCheck && !isValid.passwordCheck && <Error>비밀번호가 일치하지 않습니다</Error>}
          </Box>
        ) : null}

        {!isGoogleUser && (
          <Button type="submit" $background="#f0133a" $color="#fff" $marginTop="48px" $fullWidth>
            정보 수정
          </Button>
        )}
      </form>
    </>
  );
};

export default UserSettingForm;

const Value = styled.div`
  font-weight: 500;
`;
