import {
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from './firebase';
import { UserFormData } from '@/apis/user/userApi.types';

const provider = new GoogleAuthProvider();

//이메일로 회원가입 및 로그인
export const signUpByEmail = async (payload: UserFormData) => {
  const { email, password } = payload;
  await setPersistence(auth, browserSessionPersistence);
  const data = await createUserWithEmailAndPassword(auth, email, password);
  return data;
};

//이메일로 로그인
export const loginByEmail = async (payload: any) => {
  const { email, password } = payload;
  await setPersistence(auth, browserSessionPersistence);
  const data = await signInWithEmailAndPassword(auth, email, password);
  return data;
};

//구글로 로그인
export const loginByGoogle = async () => {
  await setPersistence(auth, browserSessionPersistence);
  // const data = await signInWithRedirect(auth, provider);
  const data = await signInWithPopup(auth, provider);
  return data;
};
