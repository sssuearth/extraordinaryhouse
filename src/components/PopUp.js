import React from 'react';
import styled from 'styled-components';
import background from '../assets/collection/detail/detail_background.png';
import close from '../assets/common/close.png';

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
            <BildDiv>
              <BestCost>{card.bestCost}</BestCost>
              {/* <StyleP>(최고입찰가)</StyleP> */}
            </BildDiv>

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
                {/* <Label>가격 변동</Label> */}
                {/* <RedValue>{card.changeCost}</RedValue> */}
              </DetailItem>{' '}
              {/* <DetailItem></DetailItem> */}
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
  border: 4px solid #000;
  position: relative;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 230px;
  right: 870px;
  margin: 20px;
  width: 44px;
  height: 44px;

  border: none;
  background: url(${close}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;

const CardContent = styled.div`
  margin: 0 auto;
`;

const Title = styled.p`
  @font-face {
    font-family: 'Helvetica-Condensed'; /* 폰트 이름 정의 */
    src: url('/fonts/Helvetica-Condensed-Bold.otf') format('opentype'); /* TTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }
  height: 42px;
  color: #000;
  font-family: 'Helvetica-Condensed', sans-serif; /* 폰트 적용 */
  font-size: 45px;
  padding-left: 52px;
  padding-top: 52px;
  font-style: normal;
  margin: 0 auto;
  font-weight: 700; /* Bold 폰트 */
  line-height: 92.7%; /* 41.715px */
  letter-spacing: -2.7px; /* 자간 조정 */
  text-transform: uppercase; /* 대문자 변환 */
`;

const SubTitle = styled.p`
  @font-face {
    font-family: 'Esamanru-Light'; /* 폰트 이름 정의 */
    src: url('/fonts/esamanru-OTF-Light.otf') format('opentype'); /* 폰트 파일 경로 및 형식 */
    font-weight: 300; /* Light 폰트는 일반적으로 300 */
    font-style: normal;
  }
  width: 100%;
  font-family: 'Esamanru-Light', sans-serif; /* 위에서 정의한 폰트 이름 사용 */
  font-size: 34px;
  font-style: normal;
  font-weight: 300; /* Light 폰트 스타일 */
  //padding-bottom: 35px;
  padding-left: 52px;
  margin-top: 21px;
  line-height: 92.7%;
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
  padding-bottom: 19px;
  width: auto;
  height: 650px;
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
    font-family: 'Helvetica-Condensed'; /* 폰트 이름 정의 */
    src: url('/fonts/Helvetica-Condensed-Bold.otf') format('opentype'); /* TTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }
  padding-right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  font-family: 'Helvetica-Condensed', sans-serif; /* 폰트 적용 */
  padding-left: 36px;
  color: #000;
  text-align: right;
  font-size: 41px;
  font-style: normal;
  font-weight: 700;
  line-height: 92.7%; /* 38.007px */
  letter-spacing: -2.46px;
`;

const BildDiv = styled.div`
  display: flex;
  width: 700px;
  margin: 0 auto;
`;

const StyleP = styled.p`
  @font-face {
    font-family: 'Pretendard-Bold'; /* 폰트 이름 정의 */
    src: url('/fonts/Pretendard-Bold.otf') format('opentype'); /* OTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }
  font-family: 'Pretendard-Bold', sans-serif; /* 폰트 적용 */
  font-size: 56px; /* 폰트 크기 */
  font-weight: 700; /* Bold */
  line-height: 1.2; /* 원하는 비율에 맞게 조정 (ex: 1.2는 67.2px) */
  letter-spacing: -6px; /* 자간 조정 */
  color: #000; /* 색상 */
  margin: 0 auto; /* 중앙 정렬 */
  margin-left: -23px;
  text-shadow: 0px 0px 19.8px #fffb00;
`;

const BestCost = styled.p`
  @font-face {
    font-family: 'Helvetica-Condensed'; /* 폰트 이름 정의 */
    src: url('/fonts/Helvetica-Condensed-Bold.otf') format('opentype'); /* TTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }
  padding-bottom: 74px;
  margin: 0 auto;
  color: #000;
  font-family: 'Helvetica-Condensed', sans-serif; /* 폰트 적용 */
  text-shadow: 0px 0px 19.8px #fffb00;
  font-size: 90px;
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
    font-family: 'Pretendard-Bold'; /* 폰트 이름 정의 */
    src: url('/fonts/Pretendard-Bold.otf') format('opentype'); /* OTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
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
  font-size: 29px;
  font-style: normal;
  font-weight: 700;
  font-family: 'Pretendard-Bold', sans-serif; /* 폰트 적용 */
  line-height: 92.7%;
`;

const Value = styled.span`
  @font-face {
    font-family: 'Helvetica-Condensed'; /* 폰트 이름 정의 */
    src: url('/fonts/Helvetica-Condensed-Bold.otf') format('opentype'); /* TTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }
  padding-right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: red;
  padding-left: 36px;
  color: red;
  text-align: right;
  font-size: 41px;
  font-family: 'Helvetica-Condensed', sans-serif; /* 폰트 적용 */
  font-style: normal;
  font-weight: 700;
  line-height: 121.7%; /* 38.007px */
  letter-spacing: -2.46px;
`;
const RedValue = styled.span`
  @font-face {
    font-family: 'Helvetica-Condensed'; /* 폰트 이름 정의 */
    src: url('/fonts/Helvetica-Condensed-Bold.otf') format('opentype'); /* TTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }
  padding-right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: red;
  padding-left: 36px;
  text-align: right;
  font-size: 41px;
  font-family: 'Helvetica-Condensed', sans-serif; /* 폰트 적용 */
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
  margin-top: -25px;
`;

const Description = styled.p`
  @font-face {
    font-family: 'Esamanru-Light'; /* 폰트 이름 정의 */
    src: url('/fonts/esamanru-OTF-Light.otf') format('opentype'); /* 폰트 파일 경로 및 형식 */
    font-weight: 300; /* Light 폰트는 일반적으로 300 */
    font-style: normal;
  }
  width: 486px;
  margin-top: 3px;
  color: #000;
  font-family: 'Esamanru-Light', sans-serif; /* 위에서 정의한 폰트 이름 사용 */
  font-size: 24px;
  font-style: normal;
  line-height: 166%;
  padding-left: 36px;
`;

const Image2 = styled.img`
  padding-bottom: 80px;
  width: 486px;
  height: auto;
  margin: 0 auto;
  padding-left: 142px;
`;
