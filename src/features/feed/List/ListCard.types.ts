import { GetAllFeed } from '@/apis/feed/feedApi.types';

export type ListDataType = GetAllFeed;
export interface ListCardProps {
  data: ListDataType;
  onClick?: () => void;
  hasImg: boolean;
}
