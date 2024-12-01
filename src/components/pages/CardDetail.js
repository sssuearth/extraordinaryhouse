//AcutionDetail페이지
import React, { useState, useEffect, useCallback } from 'react';
import { useAddBid } from '../../hooks/useBids';
import { db } from '../../api/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styled from 'styled-components';
import backgroundImg from '../../assets/ActionDetail/auction_background.png';
import titleImg1 from '../../assets/ActionDetail/nuget_title.png';
import titleImg2 from '../../assets/ActionDetail/natali_title.png';
import titleImg3 from '../../assets/ActionDetail/cadibi_title.png';
import titleImg4 from '../../assets/ActionDetail/ian_title.png';
import titleImg5 from '../../assets/ActionDetail/tissue_title.png';
import detailImg1 from '../../assets/ActionDetail/nuget.png';
import detailImg2 from '../../assets/ActionDetail/natali.png';
import detailImg3 from '../../assets/ActionDetail/cadibi.png';
import detailImg4 from '../../assets/ActionDetail/ian.png';
import detailImg5 from '../../assets/ActionDetail/tissue.png';
import auctionButtonImg from '../../assets/ActionDetail/auction_button.png';
import closeIcon from '../../assets/common/close.png'; // 닫기 버튼 아이콘 경로 추가
import popupImage1 from '../../assets/Bid/nuget.png';
import popupImage2 from '../../assets/Bid/natali.png';
import popupImage3 from '../../assets/Bid/cadibi.png';
import popupImage4 from '../../assets/Bid/ian.png';
import popupImage5 from '../../assets/Bid/tissue.png';
import close from '../../assets/common/close.png';
import QRCode from 'qrcode.react';
import { QRCodeCanvas } from 'qrcode.react';

const CardDetail = () => {
  const { cardId } = useParams(); // useParams로 cardId 가져오기
  const [nickname, setNickname] = useState('');
  const [amount, setAmount] = useState('');
  const [bids, setBids] = useState([]); // 입찰 데이터 상태
  const addBidMutation = useAddBid(cardId);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부 상태
  const [popupImage, setPopupImage] = useState(''); // 팝업 이미지 상태
  const [bestBid, setBestBid] = useState(null);
  const [winningBidder, setWinningBidder] = useState('');

  // 카드 ID에 따른 이미지 매핑
  const imageMapping = {
    cardId1: {
      titleImage: titleImg1,
      detailImage: detailImg1,
      popupImage: popupImage1,
    },
    cardId2: {
      titleImage: titleImg2,
      detailImage: detailImg2,
      popupImage: popupImage2,
    },
    cardId3: {
      titleImage: titleImg3,
      detailImage: detailImg3,
      popupImage: popupImage3,
    },
    cardId4: {
      titleImage: titleImg4,
      detailImage: detailImg4,
      popupImage: popupImage4,
    },
    cardId5: {
      titleImage: titleImg5,
      detailImage: detailImg5,
      popupImage: popupImage5,
    },
  };

  const qrCodeMapping = {
    cardId1: `${window.location.origin}/public/QrCode/nuget.png`,
    cardId2: `https://postimg.cc/4HPfqnrV`,
    cardId3: `${window.location.origin}/public/QrCode/mic.png`,
    cardId4: `${window.location.origin}/public/QrCode/ian.png`,
    cardId5: `${window.location.origin}/public/QrCode/tissue.png`,
  };

  // Firestore에서 입찰 데이터 가져오기 함수
  const fetchBidData = useCallback(async () => {
    if (!cardId) {
      console.error('유효하지 않은 cardId:', cardId);
      return;
    }

    try {
      const docRef = doc(db, 'cards', cardId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('입찰 데이터:', data);
        setBids(data.bids || []); // 입찰 데이터 설정
      } else {
        console.log('입찰 데이터가 없습니다. 새 문서를 생성합니다.');
        await setDoc(docRef, { bids: [] });
        setBids([]); // 빈 입찰 데이터로 초기화
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }, [cardId]);

  // 컴포넌트가 처음 렌더링될 때 입찰 데이터 가져오기
  useEffect(() => {
    fetchBidData();
  }, [fetchBidData]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (!nickname || !amount) {
      alert('닉네임과 입찰 금액(숫자)을 모두 입력해주세요.');
      return;
    }

    const bid = {
      amount: Number(amount), // 숫자로 변환
      bidder: nickname,
    };

    // Firestore에 입찰 데이터 추가
    addBidMutation.mutate(bid, {
      onSuccess: async () => {
        setNickname('');
        setAmount('');
        await fetchBidData(); // 입찰 데이터를 다시 불러옴

        // 최고 입찰 확인 로직
        const currentMaxBid = Math.max(...bids.map((b) => Number(b.amount)), 0);
        if (Number(bid.amount) > currentMaxBid) {
          // 새로운 최고 입찰자라면 팝업 표시
          setPopupImage(imageMapping[cardId]?.popupImage || ''); // 팝업 이미지를 설정
          setShowPopup(true); // 팝업 표시
          setBestBid(bid.amount); // 최고 입찰 금액 업데이트
          setWinningBidder(bid.bidder); // 최고 입찰자 이름 업데이트
        }
      },
      onError: (error) => {
        console.error('입찰 등록 중 오류 발생:', error);
        alert('입찰 등록에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const sortedBids = bids.slice().sort((a, b) => b.amount - a.amount);

  // 원화 포맷팅 함수 추가
  const formatKRW = (amount) => {
    return (
      new Intl.NumberFormat('ko-KR', {
        maximumFractionDigits: 0,
      }).format(amount) + ' ₩'
    ); // '원' 으로 변경하거나 'won' 또는 '₩' 사용 가능
  };
  const handleClose = () => {
    navigate('/Auction'); // '/Auction' 경로로 이동
  };

  return (
    <Container>
      {showPopup && (
        <PopupOverlay>
          <PopupContainer>
            <PopupImage src={popupImage} alt="Popup" />
            <PopupDetails>
              <PopupText>
                <StyleP>Winning Bidder:</StyleP>
                <StyleP2> {winningBidder}</StyleP2>
              </PopupText>
              <PopupText>
                <StyleP>Best Bid:</StyleP>
                <StyleP2>
                  ₩{new Intl.NumberFormat('ko-KR').format(bestBid)}
                </StyleP2>
              </PopupText>
              <PopupText>
                <StyleP>ISSUED DATE:</StyleP>
                <StyleP2>2024.12.04</StyleP2>
              </PopupText>
              <QRCodeContainer>
                <QRCodeCanvas
                  value={qrCodeMapping[cardId] || `https://postimg.cc/4HPfqnrV`}
                  size={131} // QR 코드 크기
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </QRCodeContainer>
            </PopupDetails>

            {/* QR 코드 추가 */}

            <PopupCloseButton onClick={closePopup} />
          </PopupContainer>
        </PopupOverlay>
      )}
      <CloseButton onClick={handleClose} /> {/* 닫기 버튼 추가 */}
      {/* 카드 ID에 맞는 타이틀 이미지와 상세 이미지 렌더링 */}
      {imageMapping[cardId] && (
        <Contain>
          <TitleImage src={imageMapping[cardId].titleImage} alt="Title" />
          <DetailImage src={imageMapping[cardId].detailImage} alt="Detail" />
        </Contain>
      )}
      <ScrollableImageContainer>
        <Form onSubmit={handleBidSubmit}>
          <BidsContainer>
            <UserContain>
              <Name>입찰자 이름</Name>
              <NameInput
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임"
                required
              />
            </UserContain>
            <BidContainer>
              <Name>입찰가를 입력하세요</Name>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="금액(숫자 입력)"
                required
              />
            </BidContainer>
          </BidsContainer>
          <ButtonImg
            src={auctionButtonImg}
            alt="입찰하기"
            onClick={handleBidSubmit}
            style={{ cursor: 'pointer' }}
            disabled={addBidMutation.isLoading}
          />
        </Form>
        <BidderTitle>입찰자 리스트</BidderTitle>
        <BidderTitle3>
          ☆★ 최고금액 입찰시, 일회용 개런티가 발급됩니다 ★☆
        </BidderTitle3>
        <ListContain>
          <WhiteBackground>
            <HeaderRow>
              <HeaderTitle>입찰자</HeaderTitle>
              <HeaderTitle>입찰가</HeaderTitle>
            </HeaderRow>
            <CardGrid>
              {sortedBids.length === 0 ? (
                <EmptyMessage>아직 입찰 내역이 없습니다.</EmptyMessage>
              ) : (
                sortedBids.map((bid, index) => {
                  const formattedAmount = formatKRW(bid?.amount || 0);
                  return (
                    <BidCard key={index} rank={index}>
                      <CardContent>
                        <BidderName rank={index}>
                          {bid?.bidder || '알 수 없음'}
                        </BidderName>
                        <BidAmount rank={index}>{formattedAmount}</BidAmount>
                      </CardContent>
                    </BidCard>
                  );
                })
              )}
            </CardGrid>
          </WhiteBackground>
        </ListContain>
      </ScrollableImageContainer>
    </Container>
  );
};

export default CardDetail;
const QRCodeContainer = styled.div`
  margin-top: -520px;
  margin-left: -120px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
`;
const StyleP = styled.p`
  @font-face {
    font-family: 'Pretendard-Medium'; /* 폰트 이름 정의 */
    src: url('/fonts/Pretendard-Medium.otf') format('opentype'); /* OTF 파일 경로 및 형식 */
    font-weight: 300; /* Bold 폰트 */
    font-style: normal;
  }
  display: flex;
  font-family: 'Pretendard-Medium', sans-serif; /* 폰트 적용 */
  font-weight: 300;
  line-height: 92.7%; /* 30.591px */
  letter-spacing: -0.66px;
  margin: 0 auto;
  padding-left: 10px;
`;

const StyleP2 = styled.p`
  @font-face {
    font-family: 'Pretendard-Black'; /* 폰트 이름 정의 */
    src: url('/fonts/Pretendard-Black.otf') format('opentype'); /* OTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }
  max-width: 355px;
  overflow: hidden;
  font-family: 'Pretendard-Black', sans-serif; /* 폰트 적용 */
  display: flex;
  font-size: 33px; /* 폰트 크기 */
  font-weight: 700; /* Bold */
  padding-left: 10px;
  margin: 0 auto;
`;

const PopupText = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 0;
  margin-bottom: 22px;
  height: 31px;
`;
const PopupCloseButton = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 40px;
  height: 40px;
  background: url(${close}) no-repeat center center;
  background-size: cover;
  border: none;
  cursor: pointer;
  z-index: 1200; /* 팝업 이미지보다 위에 렌더링 */
`;
const PopupOverlay = styled.div`
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
  width: 700px;
  height: 1006px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 상대 위치 지정 */
  border: 4px solid #000;
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
`;

const PopupDetails = styled.div`
  position: absolute;
  width: 830px;
  height: 207px;
  top: 805px;
  left: 10%;

  font-size: 36px;
  z-index: 10;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
`;

const CloseButton = styled.button`
  position: absolute;
  margin-top: 62px;
  right: 60px;
  width: 80px;
  height: 80px;
  background: url(${closeIcon}) no-repeat center center;
  background-size: cover;
  border: none;
  cursor: pointer;
  z-index: 100;
`;

const Name = styled.div`
  width: 410px;
  height: 41.563px;
  color: #000;
  font-size: 42px;
  font-style: normal;
  font-weight: 800;
  line-height: 92.7%; /* 38.934px */
  letter-spacing: -2.52px;
  text-transform: uppercase;
  padding-bottom: 27px;
`;

const BidderTitle = styled.div`
  width: 410px;
  height: 41.563px;
  color: #000;
  font-size: 42px;
  font-style: normal;
  font-weight: 800;
  line-height: 92.7%; /* 38.934px */
  letter-spacing: -2.52px;
  text-transform: uppercase;
  padding-bottom: 25px;
`;

const BidderTitle3 = styled.div`
  width: 700px;
  height: 41.563px;
  color: #0000ff;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: 92.7%; /* 38.934px */
  letter-spacing: -2.52px;
  text-transform: uppercase;
  padding-bottom: 37px;
`;

const ListContain = styled.div`
  display: flex;
  width: 1125px;
  height: 786.67;
  text-align: center;
  flex-direction: column;
  border-radius: 13.333px;
  border: 4px solid #000;
  margin-bottom: 100px;
`;
const UserContain = styled.div`
  display: flex;
  flex-direction: column;
`;
const BidContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
`;

const BidsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 25px;
  width: 1071px;
  justify-content: space-between;
`;

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 80px;
  padding-top: 62px;
`;

const Container = styled.div`
  width: 100%; /* 네비게이션 바의 고정 너비 */
  height: 1204px; /* 부모 컨테이너 높이 전부 차지 */
  background-image: url(${backgroundImg}); /* 배경 이미지 설정 */
  background-size: 100%;
  background-repeat: no-repeat;
  object-fit: contain;
  display: flex;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
  }
`;
const ScrollableImageContainer = styled.div`
  padding-top: 225px;
  padding-left: 70px;
  width: 100%;
  max-height: 1795px; /* 이미지가 부모 높이를 넘어갈 때 세로 스크롤 활성화 */
  overflow-y: scroll; /* 세로 스크롤 활성화 */
  -ms-overflow-style: none; /* Internet Explorer와 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
  }
`;

const TitleImage = styled.img`
  width: 673px;
  height: 79px;
  margin-bottom: 53px;
  margin-top: 13px;
`;

const DetailImage = styled.img`
  width: 673px;
  height: 673px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 605px;
  padding: 0 15px; /* 좌우 padding 설정 */
  border-radius: 12px;
  border: 4px solid #000;
  background: #fff;
  height: 80px;
  font-size: 32px; /* 일반 텍스트 크기 */

  @font-face {
    font-family: 'BMDOHYEON'; /* 폰트 이름 정의 */
    src: url('/fonts/BMDOHYEON_otf.otf') format('opentype'); /* OTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }

  &::placeholder {
    font-family: 'BMDOHYEON', sans-serif; /* 폰트 적용 */
    color: #bcbcbc;
    font-size: 32px; /* placeholder 글자 크기 */
    font-weight: 400;
    line-height: 80px; /* input 높이에 맞춰 placeholder 텍스트 정렬 */
  }
`;

const NameInput = styled.input`
  width: 410px;
  padding: 0 15px; /* 좌우 padding 설정 */
  border-radius: 12px;
  border: 4px solid #000;
  background: #fff;
  height: 80px;
  font-size: 32px; /* 일반 텍스트 크기 */

  @font-face {
    font-family: 'BMDOHYEON'; /* 폰트 이름 정의 */
    src: url('/fonts/BMDOHYEON_otf.otf') format('opentype'); /* OTF 파일 경로 및 형식 */
    font-weight: 700; /* Bold 폰트 */
    font-style: normal;
  }

  &::placeholder {
    font-family: 'BMDOHYEON', sans-serif; /* 폰트 적용 */
    color: #bcbcbc;
    font-size: 32px; /* placeholder 글자 크기 */
    font-weight: 400;
    line-height: 80px; /* input 높이에 맞춰 placeholder 텍스트 정렬 */
  }
`;

const ButtonImg = styled.img`
  width: 1170px;
  height: auto;
  color: white;
  border: none;
  margin-left: -20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 60px;

  &:disabled {
    background-color: #ccc;
  }
`;

const WhiteBackground = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 12px;
  padding-bottom: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid black;
`;

const HeaderTitle = styled.div`
  height: 60px;
  font-size: 32px;
  font-weight: bold;
  color: #646464;
  display: flex;
  text-align: left;
  align-items: center;
  font-weight: 800;
`;

const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const BidCard = styled.div``;

const CardContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 35px;
`;

//입찰자 리스트 색상
const BidderName = styled.div`
  width: 500px;
  font-weight: bold;
  font-size: 32px;
  ${({ rank }) => {
    if (rank === 0)
      return 'color: #F00; text-align: center; font-size: 40px; font-style: normal; font-weight: bold;';
    if (rank === 1) return 'font-size: 37px; color: #3B82F6;';
    if (rank === 2) return 'font-size: 34px; color: #22C55E;';
    return 'font-size: 32px; color: #000000;';
  }}
`;

const BidAmount = styled.div`
  width: 500px;
  font-weight: bold;
  font-size: 32px;
  max-width: 500px; /* 최대 너비를 설정 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'으로 표시 */
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */

  ${({ rank }) => {
    if (rank === 0)
      return 'color: #F00; text-align: center; font-size: 40px; font-style: normal; font-weight: bold;';
    if (rank === 1) return 'font-size: 37px; color: #3B82F6;';
    if (rank === 2) return 'font-size: 34px; color: #22C55E;';
    return 'font-size: 32px; color: #000000;';
  }}
`;

const EmptyMessage = styled.div`
  font-size: 32px;
  color: #6b7280;
  text-align: center;
  padding: 24px;
`;
