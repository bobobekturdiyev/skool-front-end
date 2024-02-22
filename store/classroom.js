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
    modules: [],
    add_course: false,
    cropperPreview: false,
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
  });

  const set = reactive({
    name: "",
    position: 1,
    published: true,
  });

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

  function create_module() {
    const formData = new FormData();
    for (let i of Object.keys(module)) {
      console.log(i);
      formData.append(i, module[i]);
    }
    const course_name = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createModule");

    axios
      .post(baseUrl + `add-module/${course_name}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        clearModule();
        isLoading.removeLoading("createModule");
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
    store,
    create,
    module,
    set,
    get_classroom,
    create_course,
    create_module,
    get_module,
  };
});
