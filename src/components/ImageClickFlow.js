import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import introImage from '../assets/intro/introImage2.png';
import gifAnimation from '../assets/intro/gifAnimation.gif';
// import enterImage from "../assets/intro/background_title.png";
import enterImage from '../assets/intro/randingfinal.png';
import enterButton from '../assets/intro/button_ENTER.png';
import hoverEnterButton from '../assets/intro/button_ENTER_hover.png';

const ImageClickFlow = ({ onEnter }) => {
  const [isGifPlaying, setIsGifPlaying] = useState(false);
  const [showEnterScreen, setShowEnterScreen] = useState(false);

  const handleImageClick = () => {
    setIsGifPlaying(true);
    setTimeout(() => {
      setIsGifPlaying(false); // GIF가 끝나고 introImage가 바로 나타나도록 설정
      setShowEnterScreen(true);
    }, 4000); // GIF 재생 시간에 맞게 조절
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && showEnterScreen) {
        onEnter(); // Enter 키를 눌렀을 때 메인 화면으로 이동
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up 이벤트 리스너
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showEnterScreen, onEnter]);

  return (
    <Container $isGifPlaying={isGifPlaying}>
      {showEnterScreen ? (
        <>
          <StyledImage src={enterImage} alt="Enter" />
          <ButtonImage src={enterButton} alt="Enter Button" onClick={onEnter} />
        </>
      ) : isGifPlaying ? (
        <StyledImage src={gifAnimation} alt="Animation" />
      ) : (
        <StyledImage src={introImage} alt="Intro" onClick={handleImageClick} />
      )}
    </Container>
  );
};

export default ImageClickFlow;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 104px);
  background-image: ${({ $isGifPlaying }) =>
    $isGifPlaying ? `url(${enterImage})` : 'none'};
  background-size: 100% calc(100vh - 104px);
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ButtonImage = styled.img`
  position: absolute;
  left: 50%;
  margin-top: 690px;
  transform: translateX(-50%);
  width: 350px;
  height: auto;
  cursor: pointer;

  &:hover {
    content: url(${hoverEnterButton});
  }
`;
