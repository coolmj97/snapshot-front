import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface InputProps {
  id: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  children?: ReactNode;
  width?: string;
  fullWidth?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  margin?: string;
}

const fullWidthStyle = css<InputProps>`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;

const StyledInput = styled.input<InputProps>`
  width: ${(props) => props.width};
  height: 26px;
  display: inline-flex;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  padding: 4px;
  margin-top: ${(props) => props.marginTop};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin: ${(props) => props.margin};
  outline: none;
  font-size: 1rem;

  ${fullWidthStyle}

  &::placeholder {
    font-size: 0.8rem;
  }
`;

const Input: React.FC<InputProps> = ({
  children,
  fullWidth,
  onChange,
  id,
  name,
  ...rest
}) => {
  return (
    <StyledInput
      id={id}
      name={name}
      onChange={onChange}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledInput>
  );
};

export default Input;
