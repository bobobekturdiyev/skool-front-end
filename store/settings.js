import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useSettingsStore = defineStore("settings", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    timezone: "",
    follow_email: false,
    earn_email: true,
    addCartModal: false,
  });

//   function get_posts() {
//     const group_username = router.currentRoute.value.params.community;
//     isLoading.addLoading("getPosts");
//     axios
//       .get(baseUrl + `get-post/${group_username}`)
//       .then((res) => {
//         console.log(res);
//         store.posts = res.data?.data;
//         isLoading.removeLoading("getPosts");
//       })
//       .catch((err) => {
//         if (err.response?.data?.message == "Posts not found") {
//           store.events = [];
//         }
//         console.log(err);
//         isLoading.removeLoading("getPosts");
//       });
//   }

  return { store };
});
