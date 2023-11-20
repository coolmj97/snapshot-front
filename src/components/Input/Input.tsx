import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  fullWidth?: boolean;
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

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Input: React.FC<InputProps> = ({ children, fullWidth, ...rest }) => {
  return (
    <>
      <StyledInput fullWidth={fullWidth} {...rest}>
        {children}
      </StyledInput>
    </>
  );
};

export default Input;
