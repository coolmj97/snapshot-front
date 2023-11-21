import {
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';
import { authService } from './firebase';

const provider = new GoogleAuthProvider();
const auth = getAuth();

//이메일로 회원가입 및 로그인
export const signUpByEmail = async (payload: any) => {
  const { email, password } = payload;
  const data = await createUserWithEmailAndPassword(authService, email, password);
  return data;
};

//이메일로 로그인
export const loginByEmail = async (payload: any) => {
  const { email, password } = payload;
  await setPersistence(authService, browserSessionPersistence);
  const data = await signInWithEmailAndPassword(authService, email, password);
  return data;
};

//구글로 로그인
export const loginByGoogle = async () => {
  await setPersistence(authService, browserSessionPersistence);
  const data = await signInWithRedirect(auth, provider);
  return data;
};
