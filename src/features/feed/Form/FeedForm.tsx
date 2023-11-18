import { PostFeedData } from '@/apis/feed/feedApi.types';
import { Button } from '@/components';
import Editor from '@/components/Editor/Editor';
import Upload from '@/components/Upload/Upload';
import { useState } from 'react';
import styled from 'styled-components';

interface FeedFormProps {
  onSubmit: () => void;
}

const FeedForm = (props: FeedFormProps) => {
  const { onSubmit } = props;
  const [content, setContent] = useState<string>('');

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Box>
          <Label>사진 (최대 5장)</Label>
          <Upload />
        </Box>

        <Box>
          <Label>글</Label>
          <Editor content={content} setContent={setContent} />
        </Box>
      </form>

      <Button $background="#f0133a" $color="#fff" $marginTop="48px" $fullWidth>
        등록
      </Button>
    </div>
  );
};

export default FeedForm;

const Box = styled.div`
  margin-bottom: 48px;

  &:not(:first-child) {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  margin-bottom: 16px;
  font-size: 1.2rem;
`;
