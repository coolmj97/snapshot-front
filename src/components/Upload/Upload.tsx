import { AddIcon } from '@/assets/icons/AddIcon';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface UploadProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  mutiple?: boolean;
}

const Upload = (props: UploadProps) => {
  const { onChange, mutiple } = props;

  return (
    <>
      <Label htmlFor="file">
        <AddIcon />
      </Label>
      <UploadInput type="file" id="file" accept="image/*" onChange={onChange} multiple={mutiple} />
    </>
  );
};

export default Upload;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid #d3d3d3;
  border-radius: 20px;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }
`;

const UploadInput = styled.input`
  display: none;
`;
