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
    group_by_username: {},
    add_media: false,
    delete_media: false,
    media_id: "",
    filter: {
      type: "all",
      price: "all",
      category_id: null,
      search: null,
    },
    joinToGroupModal: false,
    slideStep: 0,
    slideStep2: 0,
    media_ids: [],
  });

  const media = reactive({
    image: "",
    link: "",
    group_id: "",
  });

  function clearModule() {
    for (let i of Object.keys(media)) {
      media[i] = "";
    }
  }

  function create_media() {
    const formData = new FormData();
    if (!media.image) {
      if (!isLoading.isURL(media.link)) {
        isLoading.showMessage("Please enter a valid video link");
        return;
      }
    }
    media.group_id = store.group_by_username.id;
    for (let i of Object.keys(media)) {
      formData.append(i, media[i]);
    }
    const token = localStorage.getItem("token");
    isLoading.addLoading("createMedia");

    axios
      .post(baseUrl + `media-link`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        groupByUsername("no_load");
        clearModule();
        store.add_media = false;
        isLoading.removeLoading("createMedia");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage(err.response.data.message.errors[0]);
        isLoading.removeLoading("createMedia");
      });
  }

  function update_media_position() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("positionMedia");
    store.media_ids = [];
    for (let i of store.group_by_username.medias) {
      store.media_ids.push(i.id);
    }
    axios
      .post(
        baseUrl + `media-link-position`,
        { media_ids: store.media_ids },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        isLoading.removeLoading("positionMedia");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage(err.response.data.message.errors[0]);
        isLoading.removeLoading("positionMedia");
      });
  }

  function delete_media() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteMedia");

    axios
      .delete(baseUrl + `media-link/${store.media_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.delete_media = false;
        store.slideStep = 0;
        store.slideStep2 = 0;
        groupByUsername("no_load");
        isLoading.removeLoading("deleteMedia");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteMedia");
      });
  }

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

  function groupByUsername(type) {
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    if (type != "no_load") {
      isLoading.addLoading("getByUsername");
    }

    axios
      .get(baseUrl + `get-group/` + username, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.group_by_username = res.data;
        isLoading.removeLoading("getByUsername");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getByUsername");
      });
  }

  return {
    store,
    media,
    create_media,
    delete_media,
    update_media_position,
    filterGroups,
    groupById,
    groupByUsername,
  };
});
