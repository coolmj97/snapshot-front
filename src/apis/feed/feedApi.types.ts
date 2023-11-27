export interface GetAllFeed {
  _id: string;
  photos: string[];
  content: string;
  // thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FeedDataPayload {
  user: {
    username: string;
    uid: string;
    email: string;
    profileImgUrl: string;
  };
  photos?: { url: string; id: string }[];
  content?: string;
}
