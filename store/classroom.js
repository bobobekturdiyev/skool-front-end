import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useClassroomStore = defineStore("classroom", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    classrooms: [],
  });

  function get_classroom() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getClassrooms");
    console.log(group_username);

    

    axios
      .get(baseUrl + `classroom/${group_username}?page=${isLoading.store.pagination.current_page}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.classrooms = res.data?.data;
        for (let i in isLoading.store.pagination){
          isLoading.store.pagination[i] = res.data.meta[i];
        }
        isLoading.removeLoading("getClassrooms");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getClassrooms");
      });
  }

  return { store, get_classroom };
});
