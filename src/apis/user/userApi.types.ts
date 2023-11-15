export interface GetUser {
  _id: string;
  email: string;
  password: string;
  username: string;
  feeds: [];
  profileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  email: string;
  password: string;
  username: string;
}
