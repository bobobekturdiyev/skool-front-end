import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import { useApiRequest } from "@/composables";

export const useCategoryStore = defineStore("category", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;

  const store = reactive({
    categories: [],
  });

  async function getCategories() {
    isLoading.addLoading("groupCategories");
    const data = await apiRequest.get("get-group-categories");
    isLoading.removeLoading("groupCategories");
    console.log(data, '================================================');
    if (data.status == 200) {
      store.categories = data.data;
    }
  }

  return { store, getCategories };
});
