import ReactQuill from 'react-quill';
import styled from 'styled-components';

export const StyledReactQuill = styled(ReactQuill)`
  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #ccc;
  }
  .ql-container.ql-snow {
    border: none;
  }

  .ql-editor {
    min-height: 300px;
  }

  width: 100%;
  border-radius: 10px;
  border: 1px solid #d4d5d2;
`;
