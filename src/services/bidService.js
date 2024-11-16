// src/services/bidService.js
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../api/firebase";

// 카드의 상세 정보를 가져오는 함수
export const getCardDetail = async (cardId) => {
  const docRef = doc(db, "cards", cardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Card not found");
  }
};

// 입찰을 추가하는 함수
export const addBidToCard = async (cardId, bid) => {
  const cardRef = doc(db, "cards", cardId);
  await updateDoc(cardRef, {
    bids: arrayUnion(bid), // bids 배열에 새 입찰 항목 추가
  });
};
