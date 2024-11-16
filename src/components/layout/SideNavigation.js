import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import navImg from "../../assets/navigation/sideNavigation/nav_vertical.png";
import refreshIcon from "../../assets/navigation/sideNavigation/randing.png";
import refreshIconHover from "../../assets/navigation/sideNavigation/randing_h.png";
import projectOverviewIcon from "../../assets/navigation/sideNavigation/projectoverview.png";
import projectOverviewIconHover from "../../assets/navigation/sideNavigation/projectoverview_h.png";
import projectMethodIcon from "../../assets/navigation/sideNavigation/projectmethod.png";
import projectMethodIconHover from "../../assets/navigation/sideNavigation/projectmethod_h.png";
import reason from "../../assets/common/how.png";
import how from "../../assets/common/reason.png";

const SideNavigation = () => {
  const location = useLocation();
  const [refreshSrc, setRefreshSrc] = useState(refreshIcon);
  const [overviewSrc, setOverviewSrc] = useState(projectOverviewIcon);
  const [methodSrc, setMethodSrc] = useState(projectMethodIcon);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);

  useEffect(() => {
    setRefreshSrc(refreshIcon);
    setOverviewSrc(projectOverviewIcon);
    setMethodSrc(projectMethodIcon);
  }, [location]);

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const handleOverviewClick = () => {
    setModalImageSrc(how);
    setIsModalOpen(true);
  };

  const handleMethodClick = () => {
    setModalImageSrc(reason);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <NavContainer>
      <ButtonContainer>
        <ReFreshButtonImage
          src={refreshSrc}
          alt="Refresh"
          onMouseEnter={() => setRefreshSrc(refreshIconHover)}
          onMouseLeave={() => setRefreshSrc(refreshIcon)}
          onClick={handleRefreshClick}
        />
        <PoButtonImage
          src={overviewSrc}
          alt="Project Overview"
          onMouseEnter={() => setOverviewSrc(projectOverviewIconHover)}
          onMouseLeave={() => setOverviewSrc(projectOverviewIcon)}
          onClick={handleOverviewClick}
        />
        <ButtonImage
          src={methodSrc}
          alt="Project Method"
          onMouseEnter={() => setMethodSrc(projectMethodIconHover)}
          onMouseLeave={() => setMethodSrc(projectMethodIcon)}
          onClick={handleMethodClick}
        />
      </ButtonContainer>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <img src={modalImageSrc} alt="Modal Content" />
          </ModalContent>
        </ModalOverlay>
      )}
    </NavContainer>
  );
};

export default SideNavigation;

const NavContainer = styled.div`
  width: 412px;
  height: calc(100vh - 104px);
  background-image: url(${navImg});
  background-size: 412px 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 5px solid black;
  border-top: 5px solid black;
  border-right: 5px solid black;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReFreshButtonImage = styled.img`
  display: flex;
  width: 235px;
  height: 62px;
  margin-top: 875px;
  margin-bottom: 85px;
`;

const PoButtonImage = styled.img`
  width: 277px;
  height: 93px;
  margin-bottom: 25px;
  cursor: pointer;
`;

const ButtonImage = styled.img`
  width: 277px;
  height: 93px;
  cursor: pointer;
  margin-bottom: 75px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
