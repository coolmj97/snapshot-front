import createAxios from '@/utils/createAxios';
import { FeedDataPayload, FeedParams, GetAllFeed, GetFeedById } from './feedApi.types';

//피드 목록 조회
export const findAllFeed = (params: FeedParams) => {
  return createAxios().get<GetAllFeed[]>('/feeds', { params });
};

//피드 생성
export const createFeed = (payload: FeedDataPayload) => {
  return createAxios().post('/feeds', payload);
};

//피드 상세
export const findOneByFeedId = (id: string) => {
  return createAxios().get<GetFeedById>(`/feeds/${id}`);
};

//피드 수정
export const updateFeed = (id: string, payload: FeedDataPayload) => {
  return createAxios().patch(`/feeds/${id}`, payload);
};

//피드 삭제
export const deleteFeed = (id: string) => {
  return createAxios().delete(`/feeds/${id}`);
};

//이미지 업로드
export const uploadImage = (payload: FormData) => {
  return createAxios().post('/upload', { file: payload });
};
