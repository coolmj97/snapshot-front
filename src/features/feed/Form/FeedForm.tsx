import { createFeed, updateFeed } from '@/apis/feed/feedApi';
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
import { useNavigate, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { Box, DeleteButton, Img, ImgBox, Label } from './FeedForm.styles';
import { FeedFormProps, Mode } from './FeedForm.types';

const FeedForm = (props: FeedFormProps) => {
  const { mode } = props;
  const feed = useSelector((state: RootState) => state.feed);
  const { title, photos, content } = feed;

  const params = useParams();
  const id = params.id ?? '';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentUser = auth.currentUser;

  const modalMsg = useMemo(() => {
    if (!title) {
      return '제목을 입력해주세요.';
    }

    if (isSubmitted) {
      if (mode === Mode.Create) {
        return '피드가 등록되었습니다.';
      } else {
        return '피드가 수정되었습니다.';
      }
    }
  }, [title, isSubmitted, mode]);

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

    if (modalMsg) {
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
        content,
      };

      try {
        if (mode === Mode.Create) {
          await createFeed(payload);
        }

        if (mode === Mode.Edit) {
          await updateFeed(id, payload);
        }

        setOpenModal(true);
        setIsSubmitted(true);
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
            $fullWidth
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
                  <Img key={photo.id} src={photo.url} />
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
          {mode === Mode.Create ? '등록' : '수정'}
        </Button>
      </form>

      <Modal
        content={modalMsg}
        $visible={openModal}
        onClose={() => {
          setOpenModal(false);
          navigate('/feed/list');
          dispatch(resetForm());
        }}
      />
    </div>
  );
};

export default FeedForm;
