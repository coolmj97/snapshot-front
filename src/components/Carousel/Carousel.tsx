import { useCallback, useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { PrevArrow } from '@/assets/icons/PrevArrow';
import { NextArrow } from '@/assets/icons/NextArrow';

interface CarouselProps {
  data: string[];
}

const Carousel = () => {
  const slickRef = useRef<any>(null);

  const onClickPrev = useCallback(() => slickRef.current.slickPrev(), []);
  const onClickNext = useCallback(() => slickRef.current.slickNext(), []);

  const Prev = () => {
    return (
      <PrevArrowBox onClick={onClickPrev}>
        <PrevArrow />
      </PrevArrowBox>
    );
  };

  const Next = () => {
    return (
      <NextArrowBox onClick={onClickNext}>
        <NextArrow />
      </NextArrowBox>
    );
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <Prev />,
    nextArrow: <Next />,
  };

  return (
    <CustomSlider {...settings} ref={slickRef}>
      <Img src="https://kmj-test-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2023-11-13-15-25-47.jpeg" />
      <Img src="https://kmj-test-bucket.s3.ap-northeast-2.amazonaws.com/test-image.jpeg" />
      <Img src="https://kmj-test-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2023-11-13-15-25-47.jpeg" />
      <Img src="https://kmj-test-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2023-11-13-15-25-47.jpeg" />
      <Img src="https://kmj-test-bucket.s3.ap-northeast-2.amazonaws.com/test-image.jpeg" />
      <Img src="https://kmj-test-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2023-11-13-15-25-47.jpeg" />
    </CustomSlider>
  );
};

export default Carousel;

const CustomSlider = styled(Slider)`
  width: 500px;
  position: relative;
  border-radius: 20px;

  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }
`;

const Img = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;
  object-position: center;
`;

const PrevArrowBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 10;

  cursor: pointer;
`;

const NextArrowBox = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 10;

  cursor: pointer;
`;
