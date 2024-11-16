import React from "react";
import styled from "styled-components";
import background from "../assets/collection/detail/detail_background.png";
import close from "../assets/common/close.png";

const Popup = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <Overlay>
      <PopupContainer>
        <CloseButton onClick={onClose}></CloseButton>
        <CardContent>
          <Title>{card.title}</Title>
          <SubTitle>{card.subTitle}</SubTitle>
          <Content>
            <ImageWrapper>
              <Image src={card.image} alt={card.title} />
            </ImageWrapper>
            <BestCost>{card.bestCost}</BestCost>

            <Details>
              <BidderWrapper>
                <Label>낙찰자</Label>
                <BidderName>{card.bidderName}</BidderName>
                <BidderImage src={card.bidder} alt={card.bidderName} />
              </BidderWrapper>
              <DetailItem>
                <Label>원가</Label>
                <Value>{card.defaultCost}</Value>
              </DetailItem>
              <DetailItem>
                <Label>가격 변동</Label>
                <RedValue>{card.changeCost}</RedValue>
              </DetailItem>{" "}
              <DetailItem></DetailItem>
              <HistoryBox>
                <Label>히스토리</Label>
                <Description>{card.description}</Description>
              </HistoryBox>
            </Details>
            <Image2 src={card.image2} alt={card.title} />
          </Content>
        </CardContent>
      </PopupContainer>
    </Overlay>
  );
};

export default Popup;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: url(${background}) no-repeat center center;
  background-size: contain;
  width: 860px;
  height: 1006px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  position: relative;
  border: 5px solid #000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  margin-top: 20px;
  margin-right: 20px;

  width: 44px;
  height: 44px;
  border: none;
  background: url(${close}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;

const CardContent = styled.div``;

const Title = styled.p`
  @font-face {
    font-family: "Helvetica-Condensed";
    src: url("/fonts/Helvetica-Condensed.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
  }
  padding-right: 90px;
  width: 100%;
  max-width: 660px;
  height: 42px;
  font-family: "Helvetica-Condensed", sans-serif;
  font-size: 35px;
  font-weight: bold;
  margin: 0 auto;
  color: #000;
  padding-top: 48px;
  padding-bottom: 25px;
  text-transform: uppercase;
`;

const SubTitle = styled.p`
  @font-face {
    font-family: "Helvetica-Condensed";
    src: url("/fonts/esamanru OTF Light");
    font-weight: Light;
    font-style: normal;
  }
  padding-right: 90px;
  width: 100%;
  max-width: 660px;
  height: auto;
  margin: 0 auto;
  font-family: "esamanru OTF";
  font-size: 34px;
  font-style: normal;
  font-weight: 300;
  padding-bottom: 66px;
  line-height: 92.7%; /* 31.518px */
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  padding-bottom: 31px;
  width: 700px;
  height: 631px;
  margin: 0 auto;
`;

const BidderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  margin: 0 auto;
`;

const BidderImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-right: 10px;
`;

const BidderName = styled.p`
  @font-face {
    font-family: "Helvetica-Condensed";
    src: url("/fonts/Helvetica-Condensed.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
  }
  padding-right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding-left: 36px;
  color: #000;
  text-align: right;
  font-size: 41px;
  font-style: normal;
  font-weight: 700;
  line-height: 92.7%; /* 38.007px */
  letter-spacing: -2.46px;
`;

const BestCost = styled.p`
  @font-face {
    font-family: "Helvetica-Condensed";
    src: url("/fonts/Helvetica-Condensed.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
  }
  padding-bottom: 74px;
  width: 700px;
  margin: 0 auto;
  color: #000;
  text-shadow: 0px 0px 19.8px #fffb00;
  font-size: 74px;
  font-style: normal;
  font-weight: 700;
  line-height: 92.7%; /* 68.598px */
  letter-spacing: -4.44px;
`;

const Details = styled.div`
  width: 80%;
  text-align: left;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 26px;
`;

const Label = styled.span`
  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/Pretendard-Bold");
    font-weight: bold;
    font-style: normal;
  }
  display: flex;
  width: 142px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 41.826px;
  background: #fff;
  box-shadow: 0px 0px 4.647px 0px #000;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 29px;
  font-style: normal;
  font-weight: 700;
  line-height: 92.7%;
`;

const Value = styled.span`
  @font-face {
    font-family: "Helvetica-Condensed";
    src: url("/fonts/Helvetica-Condensed.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
  }
  padding-right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding-left: 36px;
  color: #000;
  text-align: right;
  font-size: 41px;
  font-style: normal;
  font-weight: 700;
  line-height: 121.7%; /* 38.007px */
  letter-spacing: -2.46px;
`;
const RedValue = styled.span`
  @font-face {
    font-family: "Helvetica-Condensed";
    src: url("/fonts/Helvetica-Condensed.woff2") format("woff2");
    font-weight: bold;
    font-style: normal;
  }
  padding-right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: red;
  padding-left: 36px;
  text-align: right;
  font-size: 41px;
  font-style: normal;
  font-weight: 700;
  line-height: 121.7%; /* 38.007px */
  letter-spacing: -2.46px;
`;
const HistoryBox = styled.p`
  display: flex;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-top: 20px;
`;

const Description = styled.p`
  @font-face {
    font-family: "esamanrud";
    src: url("/fonts/esamanru OTF Light");
    font-weight: Light;
    font-style: normal;
  }
  width: 486px;
  margin-top: 3px;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 166%;
  padding-left: 36px;
`;

const Image2 = styled.img`
  padding-bottom: 31px;
  width: 486px;
  height: 298px;
  margin: 0 auto;
  padding-left: 142px;
`;
