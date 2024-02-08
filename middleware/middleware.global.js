import { defineNuxtRouteMiddleware } from "#app";
import { useLoadingStore } from "@/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoading = useLoadingStore();
  try {
    if (process.client) {
      const token = localStorage.getItem("token");
      if (token) {
        const parts = token.split(".");
        const exp = parts[1];
        const decodedPayload = JSON.parse(atob(exp));
        console.log(decodedPayload);
        isLoading.store.salesman_id = decodedPayload.id;
        useAuth.getUser();
        const experition = decodedPayload.exp;
        const now = +Date.now().toString().slice(0, 10);
        if (now >= experition) {
          isLoading.store.isLogin = false;
          localStorage.removeItem("token");
        } else {
          isLoading.store.isLogin = true;
        }
      } else if (localStorage.hasOwnProperty("user_id")) {
        // useAuth.store.loginModal = true;
        isLoading.store.isLogin = false;
      }
    }
  } catch (error) {
    if (
      localStorage.hasOwnProperty("user_id") ||
      localStorage.hasOwnProperty("token")
    ) {
      // useAuth.store.loginModal = true;
      isLoading.store.isLogin = false;
    }
    console.log(error);
  }
});
