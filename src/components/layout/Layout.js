import React from "react";
import styled from "styled-components";
import blackBarGif from "../../assets/common/blackBarImage.gif"; // 검은 바 이미지 추가

const Layout = ({ children }) => {
  return (
    <Container>
      <BlackBar src={blackBarGif} alt="Top Black Bar" /> {/* 위 검은 바 */}
      <ContentContainer>{children}</ContentContainer>
      <BlackBar src={blackBarGif} alt="Bottom Black Bar" /> {/* 아래 검은 바 */}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: stretch;
  width: 100%;
`;

const BlackBar = styled.img`
  width: 100%;
  height: 52px;
`;
