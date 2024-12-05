// src/components/pages/Auction.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../assets/Action/Join_an_Auction_background.png';
import cardImg1 from '../../assets/Action/nugget.png';
import cardImg2 from '../../assets/Action/virgin.png';
import cardImg3 from '../../assets/Action/mic.png';
import cardImg4 from '../../assets/Action/life.png';
import cardImg5 from '../../assets/Action/tissue.png';
import hoverCard1 from '../../assets/Action/nugget_h.png';
import hoverCard2 from '../../assets/Action/virgin_h.png';
import hoverCard3 from '../../assets/Action/mic_h.png';
import hoverCard4 from '../../assets/Action/life_h.png';
import hoverCard5 from '../../assets/Action/tissue_h.png';

const Auction = () => {
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    navigate(`/card/${cardId}`); // 클릭 시 카드 ID를 사용해 상세 페이지로 이동
  };

  return (
    <Container>
      <ScrollableImageContainer>
        <BackgroundImage src={backgroundImg} alt="Background" />
        <CardGrid>
          <Card
            src={cardImg1}
            hoverSrc={hoverCard1}
            alt="Card 1"
            onClick={() => handleCardClick('cardId1')}
          />
          <Card
            src={cardImg2}
            hoverSrc={hoverCard2}
            alt="Card 2"
            onClick={() => handleCardClick('cardId2')}
          />
          <Card
            src={cardImg3}
            hoverSrc={hoverCard3}
            alt="Card 3"
            onClick={() => handleCardClick('cardId3')}
          />
          <Card
            src={cardImg4}
            hoverSrc={hoverCard4}
            alt="Card 4"
            onClick={() => handleCardClick('cardId4')}
          />
          <Card
            src={cardImg5}
            hoverSrc={hoverCard5}
            alt="Card 5"
            onClick={() => handleCardClick('cardId5')}
          />
        </CardGrid>
      </ScrollableImageContainer>
    </Container>
  );
};

export default Auction;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 1204px;
  display: flex;
  flex-direction: column;
  align-items: left;
  flex-shrink: 0;
`;

const ScrollableImageContainer = styled.div`
  width: 100%;
  max-height: 1886px;
  overflow-y: scroll;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background-image: url(${backgroundImg});
  background-size: 100% auto;
  background-repeat: no-repeat;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardGrid = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 60px;
  margin-top: 420px;
`;

const Card = styled.img.attrs((props) => ({
  onMouseEnter: (e) => (e.currentTarget.src = props.hoverSrc),
  onMouseLeave: (e) => (e.currentTarget.src = props.src),
}))`
  width: 550px;
  height: 660px;
  object-fit: cover;
  transition: transform 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
