import { defineStore } from "pinia";
import { useLoadingStore } from "@/store";
import axios from "axios";

export const useClassroomStore = defineStore("classroom", () => {
  const isLoading = useLoadingStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const local_store = reactive({
    activeName: 1,
    edit_card: false,
    addVideoModal: false,
    is_url: false,
    videoLink: "",
    moduleActiveId: "",
    moduleIndex: "",
    setIndex: "",
  });

  const store = reactive({
    classrooms: [],
    modules: [],
    add_course: false,
    cropperPreview: false,
    setModal: false,
    setEdit: false,
    set_id: "",
  });

  const create = reactive({
    title: "",
    description: "",
    image: "",
    access: "all",
    level: "",
    published: true,
  });

  
  const module = reactive({
    name: "",
    video: "",
    video_content: "",
    published: true,
    set_id: "",
  });

  const set = reactive({
    name: "",
    position: "",
    published: true,
  });

  function clearSet() {
    set.name = "";
    set.position = "";
    set.published = true;
    store.setModal = false;
  }

  function clearCreate() {
    for (let i of Object.keys(create)) {
      create[i] = "";
    }
    create.access = "all";
    create.published = true;
    store.cropperPreview = false;
    store.add_course = false;
  }

  function clearModule() {
    for (let i of Object.keys(module)) {
      module[i] = "";
    }
    module.published = true;
  }

  function create_course() {
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      console.log(i);
      formData.append(i, create[i]);
    }
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createCourse");
    console.log(group_username);

    axios
      .post(baseUrl + `add-course/${group_username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const slug = res.data?.data?.slug;
        router.push(`/${group_username}/classroom/${slug}`);
        console.log(res);
        clearCreate();
        isLoading.removeLoading("createCourse");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createCourse");
      });
  }

  function create_set() {
    if (store.setEdit) {
      return update_set();
    }
    const slug = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createSet");

    axios
      .post(baseUrl + `add-set/${slug}`, set, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        clearSet();
        get_module();
        isLoading.removeLoading("createSet");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createSet");
      });
  }

  function update_set() {
    const slug = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createSet");

    axios
      .put(baseUrl + `update-set/${slug}`, {...set, set_id: store.set_id}, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        clearSet();
        get_module();
        isLoading.removeLoading("createSet");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createSet");
      });
  }

  function create_module(type) {
    const formData = new FormData();
    for (let i of Object.keys(module)) {
      console.log(i);
      formData.append(i, module[i]);
    }
    const course_name = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createModule");

    axios
      .post(baseUrl + `add-module/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        clearModule();
        get_module();
        isLoading.removeLoading("createModule");
        if (type == 'new_module'){
          local_store.moduleActiveId = res.data.data.id
          module.name = res.data.data?.name;
        }
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createModule");
      });
  }

  function get_module() {
    const module_slug = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getModules");

    axios
      .get(
        baseUrl +
          `get-course/${module_slug}?page=${isLoading.store.pagination.current_page}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.modules = res.data?.data;
        isLoading.removeLoading("getModules");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getModules");
      });
  }

  function get_classroom() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getClassrooms");
    console.log(group_username);

    axios
      .get(
        baseUrl +
          `classroom/${group_username}?page=${isLoading.store.pagination.current_page}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.classrooms = res.data?.data;
        for (let i in isLoading.store.pagination) {
          isLoading.store.pagination[i] = res.data.meta[i];
        }
        isLoading.removeLoading("getClassrooms");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getClassrooms");
      });
  }

  return {
    local_store,
    store,
    create,
    module,
    set,
    get_classroom,
    create_course,
    create_module,
    get_module,
    create_set,
  };
});
