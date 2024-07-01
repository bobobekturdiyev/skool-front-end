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
    editEventModal: false,
    eventId: "",
    calendar: "",
    data_events: [],
    table_events: [],
    month: "",
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
    repeat_number: '',
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
    store.data_events = [];
    store.table_events = [];
    let t;
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
        let is_true;
        let dates;
        store.events = res.data?.data?.data;
        store.table_events = []
        isLoading.removeLoading("getEvents");
        for (let month of store.calendar) {
          for (let date of month) {
            is_true = false
            t = 0;
            for (let event of store.events) {
              const newDate = new Date(+event.date);
              if (newDate.getMonth() == date[0] && newDate.getDate() == date[1]) {
                for (let dates of event.data) {
                  if (t == 0) {
                    store.data_events.push([dates]);
                  } else {
                    store.data_events[store.data_events.length - 1].push(dates);
                  }
                  t++;
                }
                is_true = true;
              }
              if (newDate.getMonth() == store.month && newDate.getDate() == date[1]) {
                for (let dates of event.data) {
                  store.table_events.push(dates);
                }
              }
            }
            if (!is_true) {
              store.data_events.push([]);
            }
          }
        }
        store.table_events = store.table_events.splice(store.table_events.length/2)
        setPagination();
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
    if (store.editEventModal) {
      return edit_event();
    }
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("addEvents");
    create.date = new Date(new Date(create.date)?.setHours(0, 0, 0))?.getTime();
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      if (i == 'location') {
        formData.append('location', create.location.label)
      } else {
        if (i == 'repeat_number') {
          if (create.repeat_number) {
            formData.append(i, create[i]);
          }
        }
        else {
          formData.append(i, create[i]);
        }
      }
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
        get_event();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("addEvents");
      });
  }

  function edit_event() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("addEvents");
    create.date = new Date(create.date)?.setHours(0, 0, 0);
    create.date = new Date(create.date)?.getTime();
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      if (i == 'location') {
        formData.append('location', create.location.label)
      } else {
        if (i == 'repeat_number') {
          if (create.repeat_number) {
            formData.append(i, create[i]);
          }
        } else {
          formData.append(i, create[i]);
        }
      }
    }
    
    axios
      .post(
        baseUrl +
        `update-event/${store.eventId}`, formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        store.add_event = false;
        isLoading.removeLoading("addEvents");
        get_event();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("addEvents");
      });
  }

  function delete_event() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteEvent");
    axios
      .delete(
        baseUrl +
        `delete-event/${store.eventId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        store.add_event = false;
        isLoading.removeLoading("deleteEvent");
        get_event();
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteEvent");
      });
  }

  function setPagination() {
    isLoading.store.pagination_type = 4
    isLoading.store.pagination.current_page = 1;
    isLoading.store.pagination.from = (isLoading.store.pagination.current_page - 1) * 4 + 1;
    isLoading.store.pagination.to = isLoading.store.pagination.current_page * 4;
    isLoading.store.pagination.total = store.table_events?.length;
    isLoading.store.pagination.last_page = Math.ceil(isLoading.store.pagination.total / 4);
  }

  return { store, create, get_event, add_event, edit_event, delete_event, setPagination };
});
