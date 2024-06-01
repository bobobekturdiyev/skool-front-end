import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import creditCardType from "credit-card-type";
import axios from "axios";

export const usePaymentStore = defineStore("payment", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    join_step: 1,
    code: "",
    payment_check: "",
    joinToGroupModal: false,
    cardType: {
      type: "",
    },
  });

  const card = reactive({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    group_username: null,
  });

  function getCardType() {
    if (isNaN(card.cardNumber.slice(-1))) {
      card.cardNumber = card.cardNumber.slice(0, -1);
    }
    let visaCards = creditCardType(card.cardNumber);
    store.cardType.type = visaCards[0].type;
    card.cardNumber = prettyCardNumber(card.cardNumber, visaCards[0]);
    
    // const gaps = [4, 8, 12];
    const cardTypes = {
      UzCard: /^8600/,
      Humo: /^9860/,
      Visa: /^4/,
      Mastercard: /^5[1-5]/,
    };

    for (const [type, pattern] of Object.entries(cardTypes)) {
      if (pattern.test(card.cardNumber)) {
        return type;
      }
    }

    return "Unknown";
  }

  function prettyCardNumber(cardNumber, card) {
    cardNumber = cardNumber.replace(/\s+/g, "");
    cardNumber = cardNumber.slice(0, card.lengths.slice(-1));
    let newCard = "";
    let t = 0;

    for (let i = 0; i < cardNumber.length; i++) {
      if (card.gaps[t] === i && t < card.gaps.length) {
        newCard += " ";
        t++;
      }
      newCard += cardNumber[i];
    }

    return newCard;
  }

  getCardType("4112");

  function paymentData() {
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("payment");
    card.group_username = username;

    axios
      .post(baseUrl + `pay`, card, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.data.cardToken) {
          store.join_step = 2;
          localStorage.setItem("payment_token", res.data.data.cardToken);
        }
        isLoading.removeLoading("payment");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("payment");
      });
  }

  function paymentConfirmData() {
    const group_username = router.currentRoute.value.params.community;
    const cardToken = localStorage.getItem("payment_token");
    const token = localStorage.getItem("token");
    isLoading.addLoading("payment");

    axios
      .post(
        baseUrl + `pay-confirm`,
        {
          group_username,
          cardToken,
          code: store.code,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.gnkFields.qrcodeUrl);
        // navigateTo(res.data.data.gnkFields.qrcodeUrl,)
        // navigateTo(res.data.data.gnkFields.qrcodeUrl) {
        store.joinToGroupModal = false;

        window.open(res.data.data.gnkFields.qrcodeUrl, "_blank");
        // };
        isLoading.removeLoading("payment");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("payment");
      });
  }

  return { store, card, paymentData, paymentConfirmData, getCardType };
});
