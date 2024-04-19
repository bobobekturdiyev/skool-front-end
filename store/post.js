import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const usePostStore = defineStore("post", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    posts: [],
    categories: [],
    files_url: [],
    error: "",
    writingModal: false,
    filter: {
      category_id: "all",
      filter: "none",
      sort: "recent",
    },
  });

  const create = reactive({
    title: "",
    description: "",
    category_id: "",
    files: [],
    video_link: [],
    poll: {},
  });

  function get_posts() {
    const token = localStorage.getItem("token");
    const group_username = router.currentRoute.value.params.community;
    const filter = store.filter.filter;
    const sort = store.filter.sort;
    const category_id = store.filter.category_id;

    isLoading.addLoading("getPosts");
    axios
      .get(
        baseUrl +
          `get-post/${group_username}?page=${isLoading.store.pagination.current_page}&sort=${sort}&category_id=${category_id}&filter=${filter}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        store.posts = res.data?.data;
        for (let i in isLoading.store.pagination) {
          isLoading.store.pagination[i] = res.data?.meta[i];
        }
        isLoading.removeLoading("getPosts");
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("getPosts");
      });
  }

  function get_categories() {
    isLoading.addLoading("getPostCategories");
    axios
      .get(baseUrl + `categories`)
      .then((res) => {
        store.categories = res.data?.data;
        isLoading.removeLoading("getPostCategories");
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("getPostCategories");
      });
  }

  function write_post() {
    isLoading.addLoading("writePost");
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    if (!create.category_id) {
      isLoading.removeLoading("writePost");
      store.error = "You must select a category";
      return;
    }
    store.error = "";
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i]);
    }
    axios
      .post(baseUrl + `add-post/${group_username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        isLoading.removeLoading("writePost");
        store.writingModal = false;
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("writePost");
      });
  }

  return { store, create, get_posts, write_post, get_categories };
});
