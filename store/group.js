import { defineStore } from "pinia";
import { useLoadingStore, useMemberStore } from "@/store";
import axios from "axios";
import { useApiRequest } from "@/composables";

export const useGroupStore = defineStore("group", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();
  const useMembers = useMemberStore();

  const store = reactive({
    groups: [],
    mygroups: [],
    group_pinned: [],
    group_by_username: {
      name: '',
    },
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
    description: "",
    description_modal: false,
    showLinksPublic: false,
  });

  const community = reactive({
    name: "",
  });

  const modal = reactive({
    pending: false,
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

  function getMyGroups() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getMyGroups");

    axios
      .get(baseUrl + "get-join-group", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.mygroups = res.data;
        isLoading.removeLoading("getMyGroups");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getMyGroups");
      });
  }

  function create_community() {
    const formData = new FormData();
    for (let i in community) {
      formData.append(i, community[i]);
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const token = localStorage.getItem("token");
    isLoading.addLoading("createCommunity");

    axios
      .post(baseUrl + `create-group`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        router.push(`/${res.data.username}`);
        isLoading.removeLoading("createCommunity");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage(err.response.data.message);
        isLoading.removeLoading("createCommunity");
      });
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

  function updateGroupDescription() {
    if (!store.description?.length) {
      return;
    }
    const token = localStorage.getItem("token");
    isLoading.addLoading("changeGroupDescription");
    const username = router.currentRoute.value.params.community;
    const formData = new FormData();
    formData.append("description", store.description);
    axios
      .post(baseUrl + `update-group-description/${username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.group_by_username = res.data;
        store.description_modal = false;
        store.description = "";
        isLoading.removeLoading("changeGroupDescription");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage(err.response.data.message.errors[0]);
        isLoading.removeLoading("changeGroupDescription");
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
    let url = `get-group?page=${isLoading.store.pagination.current_page}`;
    for (let i in store.filter) {
      if (store.filter[i]) {
        url += `&${i}=${store.filter[i]}`;
      }
    }
    axios
      .get(baseUrl + url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
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

  async function groupByUsername(type) {
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    if (type != "no_load") {
      isLoading.addLoading("getByUsername");
    }

    const data = await apiRequest.get(
      `get-group/` + username
    );
    isLoading.removeLoading("getByUsername");
    if (data.status == 200) {
      store.group_by_username = data.data;
        if (!store.group_by_username.links?.length) {
          store.showLinksPublic = false;
        }
        for (let i of store.group_by_username?.links) {
          if (i.is_public) {
            store.showLinksPublic = true;
          }
        }
        if (store.group_by_username.status == "active") {
          store.showLinksPublic = true;
        } else {
          store.showLinksPublic = false;
        }
        useMembers.setGeneralSettings(data.data);
    }
  }

  function pinGroupPinned(group) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getGroupPinned");
    const formData = new URLSearchParams();
    formData.append("system_pinned", group.pinned == 1 ? 0 : 1);
    axios
      .put(baseUrl + `update-group-pinned/${group.id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        getMyGroups();
        // store.group_pinned = res.data;
        isLoading.removeLoading("getGroupPinned");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getGroupPinned");
      });
  }

  function update_group_position() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("positionGroup");
    let ids = [];
    for (let i of store.mygroups) {
      ids.push(i.id);
    }
    axios
      .post(
        baseUrl + `update-group-position`,
        { ids },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res, 'data');
        store.mygroups = res.data;
        isLoading.removeLoading("positionGroup");
      })
      .catch((err) => {
        console.log(err);
        isLoading.showMessage(err.response.data.message[0]);
        isLoading.removeLoading("positionGroup");
      });
  }


  return {
    store,
    media,
    modal,
    community,
    create_community,
    create_media,
    delete_media,
    update_media_position,
    filterGroups,
    groupByUsername,
    updateGroupDescription,
    getMyGroups,
    pinGroupPinned,
    update_group_position,
  };
});
