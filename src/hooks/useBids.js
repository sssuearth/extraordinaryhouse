// src/hooks/useBids.js
import { useMutation, useQueryClient } from "react-query";
import { addBidToCard } from "../services/bidService"; // addBidToCard import

export const useAddBid = (cardId) => {
  const queryClient = useQueryClient();

  return useMutation((bid) => addBidToCard(cardId, bid), {
    onSuccess: () => {
      // 캐시를 무효화하여 데이터가 최신 상태로 유지되도록 함
      queryClient.invalidateQueries(["card", cardId]);
    },
  });
};
