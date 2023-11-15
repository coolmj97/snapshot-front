import styled from 'styled-components';

interface TitleProps {
  title: string;
}

const Title = (props: TitleProps) => {
  return <StyledTitle>{props.title}</StyledTitle>;
};

export default Title;

const StyledTitle = styled.div`
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 24px;
`;
