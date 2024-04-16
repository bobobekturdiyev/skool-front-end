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
  });

  const create = reactive({
    title: "",
    description: "",
    category_id: "",
    files: [],
  });

  function get_posts() {
    const group_username = router.currentRoute.value.params.community;
    isLoading.addLoading("getPosts");
    axios
      .get(baseUrl + `get-post/${group_username}?page=${isLoading.store.pagination.current_page}`)
      .then((res) => {
        console.log(res);
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
    const group_username = router.currentRoute.value.params.community;
    isLoading.addLoading("getPostCategories");
    // .get(baseUrl + `categories/${group_username}`)
    axios
      .get(baseUrl + `categories`)
      .then((res) => {
        console.log(res, '--------------------------------');
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
      console.log(i);
      formData.append(i, create[i]);
    }
    axios
      .post(baseUrl + `add-post/${group_username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
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
