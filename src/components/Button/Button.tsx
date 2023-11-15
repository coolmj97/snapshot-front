import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children?: ReactNode;
  $width?: string;
  $height?: string;
  $padding?: string;
  $border?: string;
  $borderRadius?: string;
  $color?: string;
  $background?: string;
  $size?: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
  $marginTop?: string;
  $marginRight?: string;
  $marginBottom?: string;
  $marginLeft?: string;
  $margin?: string;
  $justifyContent?: string;
}

const colorStyles = css<ButtonProps>`
  ${({ $color, $background }) => {
    return css<ButtonProps>`
      background: ${$background || '#fff'};
      color: ${$color};
    `;
  }}
`;

const sizes = {
  large: {
    padding: '1.5rem 2rem',
    fontSize: '1.5rem',
  },
  medium: {
    padding: '1rem 1.5rem',
    fontSize: '1.25rem',
  },
  small: {
    padding: '0.7rem 1rem',
    fontSize: '1rem',
  },
};

const sizeStyles = css<ButtonProps>`
  ${({ $size }) => css`
    padding: ${sizes[$size || 'small'].padding};
    font-size: ${sizes[$size || 'small'].fontSize};
  `}
`;

const fullWidthStyle = css<ButtonProps>`
  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;

const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  display: inline-flex;
  justify-content: ${(props) => props.$justifyContent};
  align-items: center;
  outline: none;
  border: ${(props) => props.$border || 'none'};
  border-radius: ${(props) => props.$borderRadius || '4px'};
  padding: ${(props) => props.$padding};
  margin-top: ${(props) => props.$marginTop};
  margin-right: ${(props) => props.$marginRight};
  margin-bottom: ${(props) => props.$marginBottom};
  margin-left: ${(props) => props.$marginLeft};
  margin: ${(props) => props.$margin};
  cursor: pointer;

  &:hover {
    border-color: #f0133a;
    color: ${(props) => (props.$background === '#f0133a' ? props.color : '#f0133a')};
    transition: all 0.3s ease-in-out;
  }
  &:active {
    border-color: #f0133a;
    color: ${(props) => (props.$background === '#f0133a' ? props.color : '#f0133a')};
    transition: all 0.3s ease-in-out;
  }

  ${sizeStyles}

  ${colorStyles}

  ${fullWidthStyle}
`;

const Button: React.FC<ButtonProps> = ({ children, $color, $size, $fullWidth, ...rest }) => {
  return (
    <StyledButton $color={$color} $size={$size} $fullWidth={$fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
