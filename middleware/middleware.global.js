import { defineNuxtRouteMiddleware } from "#app";
import { useLoadingStore } from "@/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLoading = useLoadingStore();
  try {
    if (process.client) {
      const token = localStorage.getItem("token");
      if (token) {
        isLoading.store.isLogin = true;

        const parts = token.split(".");
        const exp = parts[1];
        const decodedPayload = JSON.parse(atob(exp));
        console.log(decodedPayload);
        isLoading.store.salesman_id = decodedPayload.id;
        // useAuth.getUser();
        const experition = decodedPayload.exp;
        const now = +Date.now().toString().slice(0, 10);
        console.log(experition);
        console.log(now);
        if (now >= experition) {
          isLoading.store.isLogin = false;
          localStorage.removeItem("token");
        } else {
          isLoading.store.isLogin = true;
        }
      } else {
        isLoading.store.isLogin = false;
      }
    }
  } catch (error) {
    isLoading.store.isLogin = false;
  }
});
