import createAxios from '@/utils/createAxios';
import { GetUser, UserFormData } from './userApi.types';

//회원가입
export const postNewUser = (payload: UserFormData) => {
  return createAxios().post('/users/sign-up', payload);
};

//특정 유저 정보
export const findOneByUserId = (id: string) => {
  return createAxios().get<GetUser>(`/users/${id}`);
};

//유저 정보 수정
export const updateUser = (id: string, payload: UserFormData) => {
  return createAxios().patch(`/users/${id}`, payload);
};

//유저 정보 삭제
export const deleteUser = (id: string) => {
  return createAxios().delete(`/users/${id}`);
};
