import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useEventStore = defineStore("event", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    events: [],
    start_date: "",
    end_date: "",
  });

  function get_event() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getEvents");
    console.log(store.start_date);
    console.log(store.end_date);

    // store.start_date = "1992-12-18";
    // store.end_date = "2020-12-18";
    axios
      .get(
        baseUrl +
          `get-event/${group_username}/${store.start_date}/${store.end_date}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.events = res.data?.data?.data;
        console.log(
          store.events,
          "--------------------event --------------------"
        );
        isLoading.removeLoading("getEvents");
      })
      .catch((err) => {
        if (err.response?.data?.message == "Events not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("getEvents");
      });
  }

  return { store, get_event };
});
