import { createFeed } from '@/apis/feed/feedApi';
import { FeedDataPayload } from '@/apis/feed/feedApi.types';
import { DeleteIcon } from '@/assets/icons/Delete';
import { Button, Input } from '@/components';
import Editor from '@/components/Editor/Editor';
import Modal from '@/components/Modal/Modal';
import Upload from '@/components/Upload/Upload';
import { deletePhoto, resetForm, setContent, setPhoto, setTitle } from '@/redux/feedSlice';
import { auth } from '@/service/firebase';
import { RootState } from '@/store';
import axios from 'axios';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const FeedForm = () => {
  const feed = useSelector((state: RootState) => state.feed);
  const { title, photos, content } = feed;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const currentUser = auth.currentUser;

  const errorMsg = useMemo(() => {
    if (!title) {
      return '제목을 입력해주세요.';
    }

    if (!content) {
      return '글을 입력해주세요.';
    }
  }, [title, content]);

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (photos.length === 5) {
      alert('사진은 최대 5장까지 업로드 가능합니다.');
      return;
    }
    const fileList = e.target.files;

    if (!fileList) return;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      const formData = new FormData();
      formData.append('file', file);

      try {
        const { data } = await axios.post(`${baseUrl}/upload`, formData);

        dispatch(setPhoto({ url: data.url, id: uuidv4() }));
      } catch (e) {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }

    e.target.value = '';
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMsg) {
      setOpenModal(true);
      return;
    }

    if (currentUser) {
      const userInfo = {
        username: currentUser?.displayName ?? '',
        uid: currentUser?.uid ?? '',
        email: currentUser?.email ?? '',
        profileImgUrl: currentUser?.photoURL ?? '',
      };

      const payload: FeedDataPayload = {
        user: userInfo,
        uid: userInfo.uid,
        title,
        photos,
        content: content.replace('<p><br></p>', ''),
      };

      try {
        await createFeed(payload);

        dispatch(resetForm());
        alert('피드가 등록되었습니다.');
        navigate('/feed/list');
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <Box>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            placeholder="제목"
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
            fullWidth
          />
        </Box>

        <Box>
          <Label>사진 (최대 5장)</Label>

          <div
            style={{
              display: 'flex',
            }}
          >
            {photos.map((photo) => {
              return (
                <ImgBox key={photo.id}>
                  <Img src={photo.url} />
                  <DeleteButton onClick={() => dispatch(deletePhoto(photo.id))}>
                    <DeleteIcon />
                  </DeleteButton>
                </ImgBox>
              );
            })}
            <Upload onChange={(e) => onUpload(e)} />
          </div>
        </Box>

        <Box>
          <Label>글</Label>
          <Editor content={content} onChange={(value) => dispatch(setContent(value))} />
        </Box>

        <Button type="submit" $background="#f0133a" $color="#fff" $fullWidth>
          등록
        </Button>
      </form>

      <Modal content={errorMsg} $visible={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default FeedForm;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 16px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    background: rgb(0, 0, 0, 0.5);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 1px solid #d3d3d3;
  object-fit: cover;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
  cursor: pointer;
  opacity: 1;

  ${ImgBox}:hover & {
    visibility: visible;
  }
`;

const Box = styled.div`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 1.2rem;
`;
