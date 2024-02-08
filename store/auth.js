import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;

  const store = reactive({});
  const modal = reactive({
    login: false,
    register: false,
  });

//   function priceFormatter(price) {
//     price = String(price);
//     let unformattedValue = price.replace(/\s/g, "");
//     return unformattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//   }

  return { store, modal };
});
