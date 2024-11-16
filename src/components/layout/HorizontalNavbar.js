import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// 버튼에 사용할 이미지 파일 import
import aboutIcon from "../../assets/navigation/horizontalNavigation/about_1.png";
import aboutIconHover from "../../assets/navigation/horizontalNavigation/about_h.png";
import aboutIconActive from "../../assets/navigation/horizontalNavigation/about_2.png";
import collectionIcon from "../../assets/navigation/horizontalNavigation/collection_1.png";
import collectionIconHover from "../../assets/navigation/horizontalNavigation/collection_h.png";
import collectionIconActive from "../../assets/navigation/horizontalNavigation/collection_2.png";
import auctionIcon from "../../assets/navigation/horizontalNavigation/auction_1.png";
import auctionIconHover from "../../assets/navigation/horizontalNavigation/auction_h.png";
import auctionIconActive from "../../assets/navigation/horizontalNavigation/auction_2.png";
import valueIcon from "../../assets/navigation/horizontalNavigation/5value_1.png";
import valueIconHover from "../../assets/navigation/horizontalNavigation/5value_h.png";
import valueIconActive from "../../assets/navigation/horizontalNavigation/5value_2.png";
import flameIcon from "../../assets/navigation/horizontalNavigation/5fame_1.png";
import flameHover from "../../assets/navigation/horizontalNavigation/5fame_h.png";
import flameActive from "../../assets/navigation/horizontalNavigation/5fame_2.png";
import manImage from "../../assets/navigation/horizontalNavigation/pr.png";
import square_background from "../../assets/navigation/horizontalNavigation/square_background.png";

const HorizontalNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (page) => location.pathname === page;

  const [aboutSrc, setAboutSrc] = useState(aboutIcon);
  const [collectionSrc, setCollectionSrc] = useState(collectionIcon);
  const [auctionSrc, setAuctionSrc] = useState(auctionIcon);
  const [valueSrc, setValueSrc] = useState(valueIcon);
  const [flameSrc, setFlameSrc] = useState(flameIcon);

  return (
    <NavContainer>
      <Container>
        <AboutButtonImage
          src={isActive("/about") ? aboutIconActive : aboutSrc}
          alt="About"
          onMouseEnter={() => setAboutSrc(aboutIconHover)}
          onMouseLeave={() => setAboutSrc(aboutIcon)}
          onClick={() => navigate("/about")}
        />
        <CollectionButtonImage
          src={isActive("/collection") ? collectionIconActive : collectionSrc}
          alt="Collection"
          onMouseEnter={() => setCollectionSrc(collectionIconHover)}
          onMouseLeave={() => setCollectionSrc(collectionIcon)}
          onClick={() => navigate("/collection")}
        />
        <AuctionButtonImage
          src={isActive("/auction") ? auctionIconActive : auctionSrc}
          alt="Join an Auction"
          onMouseEnter={() => setAuctionSrc(auctionIconHover)}
          onMouseLeave={() => setAuctionSrc(auctionIcon)}
          onClick={() => navigate("/auction")}
        />
      </Container>
      <ValueButtonImage
        src={isActive("/value") ? valueIconActive : valueSrc}
        alt="Value"
        onMouseEnter={() => setValueSrc(valueIconHover)}
        onMouseLeave={() => setValueSrc(valueIcon)}
        onClick={() => navigate("/value")}
      />
      <FlameButtonImage
        src={isActive("/fame") ? flameActive : flameSrc}
        alt="Fame"
        onMouseEnter={() => setFlameSrc(flameHover)}
        onMouseLeave={() => setFlameSrc(flameIcon)}
        onClick={() => navigate("/fame")}
      />
      <ManImage src={manImage} alt="Man" />
    </NavContainer>
  );
};

export default HorizontalNavbar;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  height: 132px;
  width: 100%;
  background-color: #222;
  color: #fff;
  background-image: url(${square_background});
  background-size: cover;
  background-repeat: no-repeat;
  border-bottom: 5px solid black;
  border-top: 5px solid black;
`;

const AboutButtonImage = styled.img`
  width: 163px;
  height: 76px;
  cursor: pointer;
  padding-left: 40px;
`;

const CollectionButtonImage = styled.img`
  width: 222px;
  height: 76px;
  cursor: pointer;
  padding-left: 40px;
`;

const AuctionButtonImage = styled.img`
  width: 343px;
  height: 76px;
  cursor: pointer;
  margin-left: 40px; /* 30px의 간격을 두어 오른쪽 라인이 밀려나도록 설정 */
  padding-left: 0; /* padding-left를 제거하여 여백 조정 */
  padding-right: 40px;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  border-right: 5px solid black; /* 오른쪽에 2px 흰색 라인 추가 */
  align-items: center;
  justify-content: center;
`;

const ValueButtonImage = styled.img`
  width: 764px;
  height: 76px;
  cursor: pointer;
  padding-left: 40px;
`;

const FlameButtonImage = styled.img`
  width: 163px;
  height: 76px;
  cursor: pointer;
  padding-left: 40px;
`;

const ManImage = styled.img`
  width: 218px; /* 이미지 크기 조정 */
  height: 133px;
  margin-left: auto;
  cursor: pointer;
`;
