import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, reauthenticateWithCredential, updatePassword, updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import { Layout, Title } from '@/components';
import UserSettingForm from '../features/userSetting/UserSettingForm';
import { auth } from '@/service/firebase';
import { setForm } from '@/redux/userSlice';
import { RootState } from '@/store';
import Modal from '@/components/Modal/Modal';
import firebase from 'firebase/compat/app';

const UserSettingPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const { profileImg, email, password } = user;
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    try {
      await updateProfile(currentUser, {
        photoURL: profileImg,
      });
      await updatePassword(currentUser, password);

      setOpenModal(true);

      const credential = firebase.auth?.EmailAuthProvider.credential(email, password);

      if (credential) await reauthenticateWithCredential(currentUser, credential);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        dispatch(setForm({ key: 'profileImg', value: user?.photoURL }));
      }
    });
  }, [dispatch]);

  return (
    <Layout>
      <Box>
        <Title title="마이페이지"></Title>
        <UserSettingForm currentUser={currentUser} onSubmit={onSubmit} />
      </Box>

      <Modal
        content={'정보가 수정되었습니다.'}
        $visible={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </Layout>
  );
};

export default UserSettingPage;

const Box = styled.div`
  width: 400px;
  padding: 48px 0;
  margin: 0 auto;

  @media (max-width: 576px) {
    width: auto;
    margin: 0 auto;
    padding: 24px;
  }
`;
