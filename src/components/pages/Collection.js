import React, { useState } from "react";
import styled from "styled-components";
import backgroundImg from "../../assets/collection/starbackground.png";
import Card from "./Card";
import { useQuery } from "react-query";
import cardData from "../../data/data";
import Popup from "../PopUp";
import collectionDetailData from "../../data/collectionDetailData";

const Collection = () => {
  const { data: cards = [], isLoading } = useQuery("cards", () => cardData);
  const [selectedCard, setSelectedCard] = useState(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleCardClick = (card) => {
    // collectionDetailData에서 클릭한 카드의 id와 일치하는 데이터를 찾음
    const matchedCard = collectionDetailData.find(
      (item) => item.id === card.id
    );
    if (matchedCard) {
      setSelectedCard(matchedCard); // 매칭된 데이터를 팝업에 표시하기 위해 설정
    }
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  return (
    <Container>
      <ScrollableImageContainer>
        <CardContainer>
          {cards.map((card) => (
            <Card
              key={card.id}
              image={card.image}
              hoverImage={card.hoverImage}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </CardContainer>
      </ScrollableImageContainer>
      {selectedCard && <Popup card={selectedCard} onClose={handleClosePopup} />}
    </Container>
  );
};

export default Collection;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 1204px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  position: relative;
`;

const ScrollableImageContainer = styled.div`
  width: 100%;
  max-height: 100vh;
  overflow-y: scroll;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  & > img:nth-child(4n) {
    border-right: none;
  }
`;
