import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useCategoryStore = defineStore("category", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;

  const store = reactive({
    categories: [],
  });
  function getCategories() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupCategories");
    axios
      .get(baseUrl + "get-group-categories", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        store.categories = res.data?.data;
        isLoading.removeLoading("groupCategories");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupCategories");
      });
  }

  return { store, getCategories };
});
