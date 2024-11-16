// App.js
import React, { useState } from "react";
import ImageClickFlow from "./components/ImageClickFlow";
import MainScreen from "./components/pages/MainScreen";
import Layout from "./components/layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  const [isMainScreen, setIsMainScreen] = useState(false);
  console.log("dev용 내용");
  const handleEnterClick = () => {
    setIsMainScreen(true); // 엔터를 눌렀을 때 메인 화면으로 이동
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          {isMainScreen ? (
            <MainScreen /> // 메인 화면으로 이동
          ) : (
            <ImageClickFlow onEnter={handleEnterClick} /> // 메인 화면 진입 전
          )}
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
