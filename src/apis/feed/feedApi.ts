import createAxios from '@/utils/createAxios';

//피드 목록 조회
export const findAllFeed = () => {
  return createAxios().get('/feeds');
};

//피드 생성
export const createFeed = () => {
  return createAxios().post('/feeds');
};

//피드 수정
export const updateFeed = (id: string) => {
  return createAxios().patch(`/feeds/${id}`);
};

//피드 삭제
export const deleteFeed = (id: string) => {
  return createAxios().delete(`/feeds/${id}`);
};
