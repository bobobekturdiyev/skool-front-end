import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useMemberStore = defineStore("members", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    members: [],
    levels: [],
    inviteModal: false,
    levelId: '',
    editGamification: false,
  });

  const general = reactive({
    name: "",
    url: "",
    description: "",
    Initials: "",
    color: "",
    type: "",
  })

  const level = reactive({
    name: "",
    custom_name: "",
    completed: "",
  })

  function getMembers() {
      const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("groupMembes");
    axios
      .get(baseUrl + `get-member/${group_username}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        store.members = res.data?.data;
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
        getLevels()
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
        store.levels = res.data?.data;
        isLoading.removeLoading("getLevels");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getLevels");
      });
  }

  return { store, level, general, getMembers, getLevels, editLevel };
});
