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
    pagination_type: 15,
    pagination: {
      current_page: router.currentRoute.value.query.page
        ? router.currentRoute.value.query.page
        : 1,
      total: null,
      last_page: 1,
      per_page: 10,
      from: "",
      to: "",
    },
    pagination_two: {
      current_page: router.currentRoute.value.query.page
        ? router.currentRoute.value.query.page
        : 1,
      total: null,
      last_page: 1,
      from: "",
      to: "",
    },
    previewImage: "",
    croppedImage: "",
    croppedFile: "",
    cropModal: false,
    chatModal: false,
    chatDialog: false,
    slideStep: 0,
  });

  const user = reactive({
    id: "",
    name: "",
    surname: "",
    username: "",
    bio: "",
    location: "",
    image: null,
    email: "",
    myers_briggs: "",
    socials: {
      website: null,
      instagram: null,
      twitter: null,
      youtube: null,
      linkedin: null,
      facebook: null,
    },
    creator: [],
    member: [],
  });

  const modal = reactive({
    add_link: false,
    link: "",
  });

  const membersModal = {
    create: false,
    edit: false,
    delete: false,
    change_category: false,
    modalType: "",
  };

  const user_update_checker = reactive({
    id: "",
    name: "",
    surname: "",
    username: "",
    bio: "",
    location: "",
    image: null,
    myers_briggs: "",
    socials: {
      website: null,
      instagram: null,
      twitter: null,
      youtube: null,
      linkedin: null,
      facebook: null,
    },
    creator: [],
    member: [],
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
    currentQueries[type] = query;
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

  const showMessage = (message) => {
    ElNotification({
      title: "",
      message: h("i", { style: "color: #070707" }, message),
      position: "bottom-left",
    });
    // ElMessage({
    //   message,
    //   type,
    //   duration: 100000,
    // })
  };

  // function checkOverflow(id) {
  //   console.log("fdfdf");
  //   if (process.client) {
  //     let showMore;
  //     const buttonGroup = document.getElementById(id);
  //     const buttonGroupWrap = document.getElementById("community_categorywrap");
  //     if (!buttonGroup) return;
  //     console.log(buttonGroup.scrollWidth);
  //     console.log(buttonGroupWrap.scrollWidth);
  //     if (buttonGroup.scrollWidth >= buttonGroupWrap.scrollWidth - 200) {
  //       showMore = true;
  //     } else {
  //       showMore = false;
  //     }
  //     console.log(showMore);
  //     return showMore;
  //   }
  // }

  function formatDripDays(date) {
    let today = new Date().getTime();
    const day = new Date(date).getTime();
    console.log(today);
    console.log(day);
    today = day - today;
    console.log(today);
    if (Math.ceil(today / 86400000) > 0) {
      return Math.floor(today / 86400000)
    }
    return "Off";
  }

  return {
    user,
    store,
    modal,
    membersModal,
    user_update_checker,
    addLoading,
    removeLoading,
    isLoadingType,
    priceFormatter,
    changeQuery,
    isURL,
    showMessage,
    formatDripDays,
  };
});
