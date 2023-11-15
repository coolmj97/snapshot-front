import { Button } from '@/components/common';
import Editor from '@/components/common/Editor/Editor';
import Upload from '@/components/common/Upload/Upload';
import { useState } from 'react';
import styled from 'styled-components';

const FeedForm = () => {
  const [content, setContent] = useState<string>('');

  return (
    <FormContainer>
      <form>
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
    </FormContainer>
  );
};

export default FeedForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Box = styled.div`
  margin-bottom: 48px;

  &:not(:first-child) {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  margin-bottom: 16px;
  font-size: 20px;
`;
