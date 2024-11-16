import React from "react";
import styled from "styled-components";
import backgroundImg from "../../assets/fame/5fame_background_full.png";
import crown from "../../assets/fame/moving crown.gif";

const Fame = () => {
  return (
    <Container>
      <RightCrown src={crown} alt="crown" />
      <LeftCrown src={crown} alt="crown" />
    </Container>
  );
};

export default Fame;

const Container = styled.div`
  width: 100%; /* 네비게이션 바의 고정 너비 */
  height: 1204px; /* 부모 컨테이너 높이 전부 차지 */
  background-image: url(${backgroundImg}); /* 배경 이미지 설정 */
  background-size: 100%;
  object-fit: contain;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const RightCrown = styled.img`
  width: 272px;
  height: 272px;
  position: absolute;
  top: 135px;
  right: 500px;
  z-index: 10;
`;
const LeftCrown = styled.img`
  width: 272px;
  height: 272px;
  position: absolute;
  top: 130px;
  right: 1360px;
  z-index: 10;
`;
