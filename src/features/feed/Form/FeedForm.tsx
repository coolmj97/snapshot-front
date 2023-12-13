import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { auth } from '@/service/firebase';
import { createFeed, updateFeed } from '@/apis/feed/feedApi';
import { FeedDataPayload } from '@/apis/feed/feedApi.types';
import { RootState } from '@/store';
import { DeleteIcon } from '@/assets/icons/DeleteIcon';
import { Button, Input } from '@/components';
import Editor from '@/components/Editor/Editor';
import Modal from '@/components/Modal/Modal';
import Upload from '@/components/Upload/Upload';
import { deletePhoto, resetFeedForm, setContent, setPhoto, setTitle } from '@/redux/feedSlice';
import { Box, DeleteButton, Img, ImgBox, Label } from './FeedForm.styles';
import { FeedFormProps, Mode } from './FeedForm.types';
import { v4 as uuidv4 } from 'uuid';

const FeedForm = (props: FeedFormProps) => {
  const { mode } = props;
  const feed = useSelector((state: RootState) => state.feed);
  const { title, photos, content } = feed;

  const params = useParams();
  const id = params.id ?? '';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isFeedError, setIsFeedError] = useState<boolean>(false);
  const [isUploadError, setIsUploadError] = useState<boolean>(false);

  const currentUser = auth.currentUser;

  const modalMsg = useMemo(() => {
    if (isUploadError) {
      return '사진은 최대 5장까지 업로드 가능합니다.';
    }

    if (!title) {
      return '제목을 입력해주세요.';
    }

    if (content === '<p><br></p>') {
      return '내용을 입력해주세요.';
    }

    if (isSubmitted) {
      if (mode === Mode.Create) {
        return '피드가 등록되었습니다.';
      } else {
        return '피드가 수정되었습니다.';
      }
    }

    if (isFeedError) {
      return '피드 제출 중 오류가 발생했습니다. 다시 시도해주세요.';
    }
  }, [mode, title, content, isSubmitted, isFeedError, isUploadError]);

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    if (photos.length === 5 || fileList.length > 5) {
      setIsUploadError(true);
      setOpenModal(true);
      return;
    }

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      const formData = new FormData();
      formData.append('file', file);

      try {
        const { data } = await axios.post(`${baseUrl}/upload`, formData);

        dispatch(setPhoto({ url: data.url, id: uuidv4() }));
      } catch (e) {
        console.log(e);
        alert(e);
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
        if (e) {
          setIsFeedError(true);
          setOpenModal(true);
        }
      }
    }
  };

  useEffect(() => {
    if (mode === Mode.Edit) return;
    dispatch(resetFeedForm());
  }, [mode, dispatch, location.pathname]);

  useEffect(() => {
    setIsFeedError(false);
    setIsUploadError(false);
  }, []);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = '이 페이지를 떠나시겠습니까? 작성한 내용이 저장되지 않을 수 있습니다.';
      event.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

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
              flexWrap: 'wrap',
              gap: '4px',
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

            <Upload onChange={(e) => onUpload(e)} mutiple />
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
          if (isSubmitted) {
            setOpenModal(false);
            navigate('/feed/list');
            dispatch(resetFeedForm());
          } else {
            setOpenModal(false);
          }
        }}
      />
    </div>
  );
};

export default FeedForm;
