//AcutionDetail페이지
import React, { useState, useEffect, useCallback } from "react";
import { useAddBid } from "../../hooks/useBids";
import { db } from "../../api/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import styled from "styled-components";
import backgroundImg from "../../assets/ActionDetail/auction_background.png";
import titleImg1 from "../../assets/ActionDetail/nuget_title.png";
import titleImg2 from "../../assets/ActionDetail/natali_title.png";
import titleImg3 from "../../assets/ActionDetail/cadibi_title.png";
import titleImg4 from "../../assets/ActionDetail/ian_title.png";
import titleImg5 from "../../assets/ActionDetail/tissue_title.png";
import detailImg1 from "../../assets/ActionDetail/nuget.png";
import detailImg2 from "../../assets/ActionDetail/natali.png";
import detailImg3 from "../../assets/ActionDetail/cadibi.png";
import detailImg4 from "../../assets/ActionDetail/ian.png";
import detailImg5 from "../../assets/ActionDetail/tissue.png";
import auctionButtonImg from "../../assets/ActionDetail/auction_button.png";
import closeIcon from "../../assets/common/close.png"; // 닫기 버튼 아이콘 경로 추가
const CardDetail = () => {
  const { cardId } = useParams(); // useParams로 cardId 가져오기
  const [nickname, setNickname] = useState("");
  const [amount, setAmount] = useState("");
  const [bids, setBids] = useState([]); // 입찰 데이터 상태
  const addBidMutation = useAddBid(cardId);
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 카드 ID에 따른 이미지 매핑
  const imageMapping = {
    cardId1: { titleImage: titleImg1, detailImage: detailImg1 },
    cardId2: { titleImage: titleImg2, detailImage: detailImg2 },
    cardId3: { titleImage: titleImg3, detailImage: detailImg3 },
    cardId4: { titleImage: titleImg4, detailImage: detailImg4 },
    cardId5: { titleImage: titleImg5, detailImage: detailImg5 },
  };

  // Firestore에서 입찰 데이터 가져오기 함수
  const fetchBidData = useCallback(async () => {
    if (!cardId) {
      console.error("유효하지 않은 cardId:", cardId);
      return;
    }

    try {
      const docRef = doc(db, "cards", cardId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("입찰 데이터:", data);
        setBids(data.bids || []); // 입찰 데이터 설정
      } else {
        console.log("입찰 데이터가 없습니다. 새 문서를 생성합니다.");
        await setDoc(docRef, { bids: [] });
        setBids([]); // 빈 입찰 데이터로 초기화
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  }, [cardId]);

  // 컴포넌트가 처음 렌더링될 때 입찰 데이터 가져오기
  useEffect(() => {
    fetchBidData();
  }, [fetchBidData]);

  const handleBidSubmit = (e) => {
    e.preventDefault();

    // 필드 값 유효성 검사
    if (!nickname || !amount) {
      alert("닉네임과 입찰 금액을 모두 입력해주세요.");
      return;
    }

    // Firestore에 추가할 입찰 데이터 구성
    const bid = {
      amount: amount, // 금액을 숫자로 변환
      bidder: nickname,
    };

    // Firestore에 입찰 데이터 추가
    addBidMutation.mutate(bid, {
      onSuccess: () => {
        setNickname("");
        setAmount("");
        fetchBidData(); // 입찰 등록 후 입찰 데이터 다시 가져오기
      },
      onError: (error) => {
        console.error("입찰 등록 중 오류 발생:", error);
        alert("입찰 등록에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };
  const sortedBids = bids.slice().sort((a, b) => b.amount - a.amount);

  // 원화 포맷팅 함수 추가
  const formatKRW = (amount) => {
    return (
      new Intl.NumberFormat("ko-KR", {
        maximumFractionDigits: 0,
      }).format(amount) + " ₩"
    ); // '원' 으로 변경하거나 'won' 또는 '₩' 사용 가능
  };
  const handleClose = () => {
    navigate("/Auction"); // '/Auction' 경로로 이동
  };
  return (
    <Container>
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
                placeholder="입찰 금액"
                required
              />
            </BidContainer>
          </BidsContainer>
          <ButtonImg
            src={auctionButtonImg}
            alt="입찰하기"
            onClick={handleBidSubmit}
            style={{ cursor: "pointer" }}
            disabled={addBidMutation.isLoading}
          />
        </Form>

        <BidderTitle>입찰자 리스트</BidderTitle>
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
                          {bid?.bidder || "알 수 없음"}
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
  padding-bottom: 37px;
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
  width: 2148px; /* 네비게이션 바의 고정 너비 */
  height: 1204px; /* 부모 컨테이너 높이 전부 차지 */
  background-image: url(${backgroundImg}); /* 배경 이미지 설정 */
  background-size: 100%;
  background-repeat: no-repeat;
  object-fit: contain;
  display: flex;
  flex-shrink: 0;
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
  margin-bottom: 70px;
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

  &::placeholder {
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

  &::placeholder {
    color: #bcbcbc;
    font-size: 32px; /* placeholder 글자 크기 */
    font-weight: 400;
    line-height: 80px; /* input 높이에 맞춰 placeholder 텍스트 정렬 */
  }
`;

const ButtonImg = styled.img`
  width: 1170px;
  height: 135px;
  color: white;
  border: none;
  margin-left: -20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 55px;

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
      return "color: #F00; text-align: center; font-size: 40px; font-style: normal; font-weight: bold;";
    if (rank === 1) return "font-size: 37px; color: #3B82F6;";
    if (rank === 2) return "font-size: 34px; color: #22C55E;";
    return "font-size: 32px; color: #000000;";
  }}
`;

const BidAmount = styled.div`
  width: 500px;
  font-weight: bold;
  font-size: 32px;
  ${({ rank }) => {
    if (rank === 0)
      return "color: #F00; text-align: center; font-size: 40px; font-style: normal; font-weight: bold;";
    if (rank === 1) return "font-size: 37px; color: #3B82F6;";
    if (rank === 2) return "font-size: 34px; color: #22C55E;";
    return "font-size: 32px; color: #000000;";
  }}
`;

const EmptyMessage = styled.div`
  font-size: 32px;
  color: #6b7280;
  text-align: center;
  padding: 24px;
`;
