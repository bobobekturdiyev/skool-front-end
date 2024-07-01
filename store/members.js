import { defineStore } from "pinia";
import { useLoadingStore, useGroupStore } from "@/store";
import axios from "axios";

export const useMemberStore = defineStore("members", () => {
  const isLoading = useLoadingStore();
  const useGroup = useGroupStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    members: [],
    member_requests: [],
    levels: [],
    inviteModal: false,
    levelId: "",
    editGamification: false,
    generalSettings: {},
    user_id: "",
    status: "",
    request_types: "",
    member_data: {},
    member_type: "",
    banchurned: {
      status: false,
      data: [],
      type: 'ban',
    },
  });

  const general = reactive({
    icon: {
      file: "",
      url: "",
    },
    image: {
      file: "",
      url: "",
    },
    name: "",
    excerpt: "",
    initials: "",
    color: "#000000",
    group_type: "private",
  });

  const level = reactive({
    name: "",
    custom_name: "",
    completed: "",
  });

  function getMembers() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembes");
    let url = ''
    if (router.currentRoute.value.query?.type) {
      url = `?t=${router.currentRoute.value.query?.type}`
    }
    axios
      .get(
        baseUrl +
          `get-group-members/${group_username}${url}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.members = res.data;
        for (let i in isLoading.store.pagination) {
          isLoading.store.pagination[i] = res.data.meta[i];
        }
        isLoading.removeLoading("groupMembes");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupMembes");
      });
  }

  function editLevel() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("editLevels");
    axios
      .put(baseUrl + `update-leaderboard/${store.levelId}`, level, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        store.editGamification = false;
        getLevels();
        isLoading.removeLoading("editLevels");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("editLevels");
      });
  }

  function getLevels() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getLevels");
    axios
      .get(baseUrl + `get-leaderboard/${group_username}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.levels = res.data?.data;
        isLoading.removeLoading("getLevels");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getLevels");
      });
  }

  // general settings
  function setGeneralSettings(data) {
    for (let i in general) {
      if (i != "icon" && i != "image") {
        general[i] = data[i];
      }
    }
    general.icon.url = data.icon;
    general.image.url = data.image;
  }

  function gereralSettings() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("updateSettings");
    const username = router.currentRoute.value.params.community;
    const formData = new FormData();
    for (let i in general) {
      if (i != "image" && i != "icon") {
        formData.append(i, general[i]);
      }
    }
    formData.append("icon", general.icon.file);
    formData.append("image", general.image.file);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post(baseUrl + `update-group/${username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setGeneralSettings(res.data);
        useGroup.store.group_by_username = res.data;
        isLoading.removeLoading("updateSettings");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateSettings");
      });
  }

  function joinToGroup() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("joinGroup");
    const username = router.currentRoute.value.params.community;

    axios
      .post(
        baseUrl + `join-group`,
        {
          username,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data?.message == "User Join Group Pending") {
          useGroup.store.group_by_username.status = "pending";
          useGroup.modal.pending = true;
        } else {
          useGroup.store.group_by_username.status = null;
        }
        isLoading.removeLoading("joinGroup");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("joinGroup");
      });
  }

  function getMemberRequests() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembesRequest");
    let url = ''
    if (store.request_types) {
      url = `?t=${store.request_types}`
    }
    axios
      .get(
        baseUrl +
          `get-member-pending/${group_username}${url}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.member_requests = res.data;
        isLoading.removeLoading("groupMembesRequest");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupMembesRequest");
      });
  }

  function setMemberJoinType() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembesRequest");
    axios
      .put(
        baseUrl + `join-group-type/${group_username}`,
        {
          status: store.status,
          user_id: store.user_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.member_requests = res.data;
        isLoading.removeLoading("groupMembesRequest");
        getMemberRequests();
        if (store.status == "churned") {
          isLoading.store.inviteModal = false;
          store.banchurned.status = false;
          getMembers();
        }
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupMembesRequest");
      });
  }

  function updateUserRole(type) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("updateRole");
    const username = router.currentRoute.value.params.community;
    axios
      .put(
        baseUrl + `update-member-type/${username}`,
        {
          type,
          user_id: store.member_data.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        store.member_type = type;
        store.editGamification = false;
        getLevels();
        isLoading.removeLoading("updateRole");
        getMembers();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateRole");
      });
  }

  return {
    store,
    level,
    general,
    getMembers,
    getLevels,
    editLevel,
    setGeneralSettings,
    gereralSettings,
    joinToGroup,
    getMemberRequests,
    setMemberJoinType,
    updateUserRole,
  };
});
