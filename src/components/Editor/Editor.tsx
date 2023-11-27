import { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { EditorPropsType } from './Editor.types';
import { StyledReactQuill } from './Editor.styles';

const Editor = (props: EditorPropsType) => {
  const { content, onChange } = props;
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['link'],
        ['clean'],
      ],
    },
  };

  const formats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'align',
    'list',
    'indent',
    'link',
    'clean',
  ];

  //TODO:이미지 처리

  return (
    <StyledReactQuill
      ref={quillRef}
      placeholder={'내용을 입력해주세요.'}
      value={content || ''}
      modules={modules}
      formats={formats}
      onChange={onChange}
    />
  );
};

export default Editor;
