import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useProfileStore = defineStore("profile", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();
  const store = reactive({
    profile: [],
  });
  function get_profile() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getProfile");
    axios
      .get(baseUrl + `profile`, {
        headers: {
            Authorization: "Bearer " + token,
        }
      })
      .then((res) => {
        console.log(res);
        store.profile = res.data?.message?.reverse();
        isLoading.removeLoading("getProfile");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getProfile");
      });
  }

  return { store, get_profile };
});
