import { defineStore } from "pinia";
import { useLoadingStore, useGroupStore, usePostStore } from "@/store";
import axios from "axios";
import { useApiRequest } from "@/composables";

export const useMemberStore = defineStore("members", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  const usePost = usePostStore();
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
      type: "ban",
    },
    activities: "",
    activities30: "",
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

  async function getMembers() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembes");
    let url = "";
    if (router.currentRoute.value.query?.type) {
      url = `?t=${router.currentRoute.value.query?.type}`;
    }
    const data = await apiRequest.get(
      `get-group-members/${group_username}${url}`
    );
    console.log(data);
    isLoading.removeLoading("groupMembes");
    if (data.status == 200) {
      store.members = data.data;
      for (let i in isLoading.store.pagination) {
        isLoading.store.pagination[i] = data.data.meta[i];
      }
    } else {
      console.log(data);
    }
  }

  function editLevel() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("editLevels");
    axios
      .put(
        baseUrl + `level/${store.levelId}`,
        { name: level.custom_name },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
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

  async function getActivity() {
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getActivity");
    const data = await apiRequest.get(`get-leaderboard/${username}`);
    console.log(data);
    isLoading.removeLoading("getActivity");
    if (data.status == 200) {
      store.activities = data.data[0];
    }
  }

  async function getActivity30() {
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getActivity");
    const data = await apiRequest.get(`get-leaderboard-30-day/${username}`);
    isLoading.removeLoading("getActivity");
    if (data.status == 200) {
      store.activities30 = data.data;
    }
  }

  async function getLevels() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getLevels");
    const data = await apiRequest.get(`level/${group_username}`);
    console.log(data);
    isLoading.removeLoading("getLevels");
    if (data.status == 200) {
      store.levels = data.data;
    }
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
    if (!data.image) {
      usePost.store.setupgroup.is_image = false;
    } else {
      usePost.store.setupgroup.is_image = true;
    }
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
        useGroup.getMyGroups();
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

  async function getMemberRequests() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembesRequest");
    let url = "";
    if (store.request_types) {
      url = `?t=${store.request_types}`;
    }
    const data = await apiRequest.get(
      `get-member-pending/${group_username}${url}`
    );
    isLoading.removeLoading("groupMembesRequest");
    if (data.status == 200) {
      store.member_requests = data.data;
    }
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
        store.banchurned.status = false;
        isLoading.store.inviteModal = false;
        isLoading.removeLoading("groupMembesRequest");
        getMemberRequests();
        getMembers();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupMembesRequest");
      });
  }

  function updateUserRole(type) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("updateRole");
    console.log(store.member_data)
    const username = router.currentRoute.value.params.community;
    axios
      .put(
        baseUrl + `update-member-type/${username}`,
        {
          type,
          user_id: store.member_data.user.id,
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
    getActivity,
    getActivity30,
  };
});
