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
    add_event: false,
    recurring: false,
    cropperPreview: "",
    eventModal: false,
  });

  const create = reactive({
    title: "",
    date: "",
    time: "",
    duration: "",
    timezone: "",
    location: "",
    location_value: "",
    description: "",
    image: "",
    access: "all",
    access_value: "",
    repeat: "",
    repeat_number: "",
    repeat_on: "",
    repeat_end: "",
    remind: false,
  })

  function get_event() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getEvents");
    const start_date = new Date(store.start_date).getTime()
    const end_date = new Date(store.end_date).getTime()
    console.log(store.start_date, '---------------')
    console.log(store.end_date, '----------------')
    axios
      .get(
        baseUrl +
        `get-event/${group_username}/${start_date}/${end_date}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.events = res.data?.data?.data;
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

  function add_event() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("addEvents");
    create.date = new Date(create.date).setHours(0, 0, 0);
    create.date = new Date(create.date).getTime();
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      console.log(create[i])
      if (i == 'location') {
        formData.append('location', create.location.label)
      } else {
        formData.append(i, create[i]);
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .post(
        baseUrl +
        `add-event/${group_username}`, formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.add_event = false;
        isLoading.removeLoading("addEvents");
      })
      .catch((err) => {
        if (err.response?.data?.message == "Events not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("addEvents");
      });
  }



  return { store, create, get_event, add_event };
});
