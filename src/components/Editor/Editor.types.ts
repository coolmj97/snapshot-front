import { Dispatch, SetStateAction } from 'react';

export interface EditorPropsType {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}
