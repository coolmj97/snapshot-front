import { GetAllFeed } from '../feed/feedApi.types';

export interface GetUser {
  _id: string;
  email: string;
  password: string;
  username: string;
  feeds: UserFeed[];
  profileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  email: string;
  password: string;
  username: string;
}

export type UserFeed = GetAllFeed;
