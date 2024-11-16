import React from "react";
import styled from "styled-components";
import backgroundImg from "../../assets/main/about_background.png";
import aboutImage from "../../assets/main/about_latter_974_980_have.png";
import fireWork from "../../assets/main/firework.gif"; // GIF 파일 import

const About = () => {
  return (
    <Container>
      <Firework1 src={fireWork} alt="Firework" /> {/* Firework 컴포넌트 추가 */}{" "}
      <Firework2 src={fireWork} alt="Firework" /> {/* Firework 컴포넌트 추가 */}
      <ScrollableImageContainer>
        <AboutImage src={aboutImage} alt="AboutImage" />
      </ScrollableImageContainer>
    </Container>
  );
};

export default About;

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
  position: relative; /* Firework의 위치 설정을 위해 relative 사용 */
`;

const Firework1 = styled.img`
  width: 582px; /* GIF의 크기 설정 */
  height: 702px;
  position: absolute; /* 원하는 위치로 배치 */
  top: 266px; /* 컨테이너의 위쪽에서 50px 떨어짐 */
  right: 160px; /* 컨테이너의 오른쪽에서 50px 떨어짐 */
  z-index: 10; /* 다른 요소 위에 표시되도록 z-index 설정 */
`;
const Firework2 = styled.img`
  width: 520px; /* GIF의 크기 설정 */
  height: 624px;
  position: absolute; /* 원하는 위치로 배치 */
  top: 586px; /* 컨테이너의 위쪽에서 50px 떨어짐 */
  right: 1575px; /* 컨테이너의 오른쪽에서 50px 떨어짐 */
  z-index: 10; /* 다른 요소 위에 표시되도록 z-index 설정 */
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

const AboutImage = styled.img`
  width: 1300px;
  height: 1300px; /* 이미지의 높이 자동으로 설정 */
  padding-top: 100px;
  object-fit: contain; /* 이미지 비율 유지 */
  margin-bottom: 60px;
`;
