// src/components/Card.js
import React, { useState } from "react";
import styled from "styled-components";

const Card = ({ image, hoverImage, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardImage
      src={isHovered ? hoverImage : image}
      alt="Card Image"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default Card;

const CardImage = styled.img`
  width: 529.6px;
  height: 529.6px;
  border-bottom: 2px dashed black;
  border-right: 2px dashed black;
`;
