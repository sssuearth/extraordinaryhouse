// src/components/pages/MainScreen.js
import React from "react";
import styled from "styled-components";
import SideNavigation from "../layout/SideNavigation";
import HorizontalNavbar from "../layout/HorizontalNavbar";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./About";
import Auction from "./Auction";
import Collection from "./Collection";
import Value from "./Value";
import Fame from "./Fame";
import CardDetail from "./CardDetail"; // 추가

const MainScreen = () => {
  return (
    <Container>
      <SideNavigation />
      <Content>
        <HorizontalNavbar />
        <PageContent>
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/value" element={<Value />} />
            <Route path="/fame" element={<Fame />} />
            <Route path="/card/:cardId" element={<CardDetail />} />{" "}
            {/* 상세 페이지 라우트 추가 */}
          </Routes>
        </PageContent>
      </Content>
    </Container>
  );
};

export default MainScreen;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f0f0f0;
`;

const PageContent = styled.div`
  flex: 1;
`;
