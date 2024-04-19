import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useGroupStore = defineStore("group", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    groups: [],
    group_by_id: [],
    group_by_username: [],
    filter: {
      type: "all",
      price: "all",
      category_id: null,
      search: null,
    },
  });

  function filterGroups() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupGroups");
    let url = `search?page=${isLoading.store.pagination.current_page}`;
    for (let i in store.filter) {
        url += `&${i}=${store.filter[i]}`;
    }
    axios
      .get(baseUrl + url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        store.groups = res.data?.data;
        for (let i in isLoading.store.pagination) {
          isLoading.store.pagination[i] = res.data.meta[i];
        }
        isLoading.removeLoading("groupGroups");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupGroups");
      });
  }

  function groupById() {
    const id = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getById");

    axios
      .get(baseUrl + `get-group-by-categories/` + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        store.group_by_id = res.data?.data;
        isLoading.removeLoading("getById");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getById");
      });
  }

  function groupByUsername() {
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getByUsername");

    axios
      .get(baseUrl + `get-group/` + username, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        store.group_by_username = res.data?.data;
        isLoading.removeLoading("getByUsername");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getByUsername");
      });
  }

  return { store, filterGroups, groupById, groupByUsername };
});
