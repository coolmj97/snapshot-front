export interface GetAllFeed {
  _id: string;
  photos: string[];
  content: string;
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostFeedData {
  photos?: string[];
  content?: string;
}
