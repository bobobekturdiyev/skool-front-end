import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;

  const store = reactive({
    errorMessage: "",
    userData: [],
  });
  const modal = reactive({
    login: false,
    register: false,
  });

  const login = reactive({
    email: "",
    password: "",
  });

  function authLogin() {
    isLoading.addLoading("logging");
    axios
      .post(baseUrl + "login", login)
      .then((res) => {
        console.log(res);
        if (res.data?.code == 200) {
          localStorage.setItem("token", res.data?.data?.authorization?.token);
          isLoading.store.email = res.data?.data?.email;
          isLoading.store.isLogin = true; 
          modal.login = false;
          store.errorMessage = "";
        } else {
          store.errorMessage = res.data.message;
        }
        isLoading.removeLoading("logging");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("logging");
      });
  }

  function getUser() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getUser");
    axios
      .get(baseUrl + "users/1", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.userData = res.data?.data;
        isLoading.removeLoading("getUser");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getUser");
      });
  }

  //   function priceFormatter(price) {
  //     price = String(price);
  //     let unformattedValue = price.replace(/\s/g, "");
  //     return unformattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  //   }

  return { store, modal, login, authLogin, getUser };
});
