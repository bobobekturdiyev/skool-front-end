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
    inviteModal: false,
  });

  const general = reactive({
    name: "",
    url: "",
    description: "",
    Initials: "",
    color: "",
    type: "",
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
        console.log(res);
        store.members = res.data?.data;
        isLoading.removeLoading("groupMembes");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("groupMembes");
      });
  }

  return { store, general, getMembers };
});
