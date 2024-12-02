import React from 'react';
import styled from 'styled-components';
import backgroundImg from '../../assets/5Value/5p_background.png';
import valueImage from '../../assets/5Value/5p_script.png'; // 위에 추가할 이미지 파일 import
import rainbowHorse from '../../assets/5Value/rainbow horse.gif'; // GIF 파일 import
import twinkle from '../../assets/5Value/twinkle.gif';
import fine from '../../assets/5Value/fine.gif';
import nacho from '../../assets/5Value/nacho.gif';
import love from '../../assets/5Value/fellinlove.png';
import dog from '../../assets/5Value/dogwink.gif';
import dance from '../../assets/5Value/dance.gif';
import mouse from '../../assets/5Value/mouse.png';

const Value = () => {
  return (
    <Container>
      <RightRainbowHorse src={rainbowHorse} alt="rainbowHorse" />
      <RightTwinkle src={twinkle} alt="twinkle" />
      <Nacho src={nacho} alt="nacho" />
      <Fine src={fine} alt="fine" />
      <Love src={love} alt="love" />
      <Dog src={dog} alt="dog" />
      <Dance src={dance} alt="dance" />
      <Mouse src={mouse} alt="mouse" />{' '}
      <LeftRainbowHorse src={rainbowHorse} alt="rainbowHorse" />
      <LeftTwinkle src={twinkle} alt="twinkle" />
      {/* Firework 컴포넌트 추가 */}
      <ScrollableImageContainer>
        <ValueImage src={valueImage} alt="AboutImage" />
      </ScrollableImageContainer>
    </Container>
  );
};

export default Value;

const RightRainbowHorse = styled.img`
  width: 312px; /* GIF의 크기 설정 */
  height: 483px;
  position: absolute; /* 원하는 위치로 배치 */
  top: 750px; /* 컨테이너의 위쪽에서 50px 떨어짐 */
  right: 85px; /* 컨테이너의 오른쪽에서 50px 떨어짐 */
  z-index: 10; /* 다른 요소 위에 표시되도록 z-index 설정 */
`;
const RightTwinkle = styled.img`
  width: 390px;
  height: 430px;
  position: absolute;
  top: 912px;
  right: 99px;
  z-index: 10;
`;
const LeftRainbowHorse = styled.img`
  width: 250px; /* GIF의 크기 설정 */
  height: 383px;
  position: absolute; /* 원하는 위치로 배치 */
  top: 475px; /* 컨테이너의 위쪽에서 50px 떨어짐 */
  right: 1770px; /* 컨테이너의 오른쪽에서 50px 떨어짐 */
  z-index: 10; /* 다른 요소 위에 표시되도록 z-index 설정 */
`;
const LeftTwinkle = styled.img`
  width: 290px;
  height: 330px;
  position: absolute;
  top: 214px;
  right: 1660px;
  z-index: 10;
`;
const Fine = styled.img`
  width: 105px;
  height: 191px;
  position: absolute;
  top: 605px;
  right: 121px;
  z-index: 10;
`;
const Nacho = styled.img`
  width: 327px;
  height: 231px;
  position: absolute;
  top: 469px;
  right: 75px;
  z-index: 10;
`;
const Love = styled.img`
  width: 500px;
  height: auto;
  position: absolute;
  top: 207px;
  right: 75px;
  z-index: 10;
`;
const Dog = styled.img`
  width: 230px;
  height: 217px;
  position: absolute;
  top: 1057px;
  right: 1863px;
  z-index: 10;
`;
const Dance = styled.img`
  width: 266px;
  height: 297px;
  position: absolute;
  top: 962px;
  right: 1714px;
  z-index: 9;
`;
const Mouse = styled.img`
  width: 415px;
  height: 248px;
  position: absolute;
  top: 241px;
  right: 1556px;
  z-index: 10;
`;
const Container = styled.div`
  width: 100%; /* 네비게이션 바의 고정 너비 */
  height: 1204px; /* 부모 컨테이너 높이 전부 차지 */
  background-image: url(${backgroundImg}); /* 배경 이미지 설정 */
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const ScrollableImageContainer = styled.div`
  max-height: 100vh; /* 이미지가 부모 높이를 넘어갈 때 세로 스크롤 활성화 */
  overflow-y: scroll; /* 세로 스크롤 활성화 */
  -ms-overflow-style: none; /* Internet Explorer와 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
  }
`;
const ValueImage = styled.img`
  width: 1625px;
  height: 1582px; /* 이미지의 높이 자동으로 설정 */
  padding-top: 100px;
  object-fit: contain; /* 이미지 비율 유지 */
`;
