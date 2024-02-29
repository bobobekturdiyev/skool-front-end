import { defineStore } from "pinia";
import axios from "axios";

export const useLoadingStore = defineStore("loading", () => {
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    loadingTypes: [],
    page: 1,
    isLogin: false,
    email: "",
    page_name: "",
    pagination: {
      current_page: router.currentRoute.value.query.page
        ? router.currentRoute.value.query.page
        : 1,
      total: "",
      last_page: 1,
      from: "",
      to: "",
    },
    previewImage: "",
    croppedImage: "",
    croppedFile: "",
    cropModal: false,
  });

  function addLoading(type) {
    if (!store.loadingTypes?.includes(type)) {
      store.loadingTypes.push(type);
    }
  }

  function removeLoading(type) {
    if (store.loadingTypes?.includes(type)) {
      store.loadingTypes = store.loadingTypes?.filter(
        (loading) => loading !== type
      );
    }
  }

  function isLoadingType(type) {
    return store.loadingTypes?.includes(type);
  }

  function priceFormatter(price) {
    price = String(price);
    let unformattedValue = price.replace(/\s/g, "");
    return unformattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function isURL(str) {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }

  function changeQuery(type, query) {
    if (store.page_name == "group" && type != "page") {
      router.currentRoute.value.query.page = 1;
    }

    const currentQueries = { ...router.currentRoute.value.query };
    console.log(currentQueries);
    currentQueries[type] = query;
    console.log(currentQueries);
    let url = "?";
    let t = 0;
    for (let i in currentQueries) {
      if (currentQueries[i]) {
        if (t) {
          url += "&";
        }
        url += `${i}=${currentQueries[i]}`;
        t++;
      }
    }
    router.push(url);
  }

  return {
    store,
    addLoading,
    removeLoading,
    isLoadingType,
    priceFormatter,
    changeQuery,
    isURL,
  };
});
