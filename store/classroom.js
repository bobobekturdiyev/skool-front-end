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
    moduleData: "",
  });

  const store = reactive({
    classrooms: [],
    modules: [],
    add_course: false,
    edit_course: false,
    cropperPreview: false,
    setModal: false,
    setEdit: false,
    set_id: "",
  });

  const create = reactive({
    slug: "",
    title: "",
    description: "",
    image: "",
    access: "public",
    level: null,
    published: true,
  });

  const module = reactive({
    title: "",
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
    create.access = "public";
    create.published = true;
    store.cropperPreview = false;
    store.add_course = false;
  }

  function clearModule() {
    for (let i of Object.keys(module)) {
      // module[i] = "";
    }
    module.published = true;
  }

  function create_course() {
    if (store.edit_course) {
      return update_course();
    }
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i]);
    }
    formData.delete("published");
    if (create.access != "level_lock") {
      formData.delete("level");
    }
    formData.append("published", create.published ? 1 : 0);
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createCourse");
    console.log(create.image);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .post(baseUrl + `add-course/${group_username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const slug = res.data?.slug;
        router.push(`/${group_username}/classroom/${slug}`);
        clearCreate();
        isLoading.removeLoading("createCourse");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createCourse");
      });
  }

  function update_course() {
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i]);
    }
    console.log(create.image)
    if (!create.image || isLoading.isURL(create.image)) {
      formData.delete("image");
      formData.append("is_deleted", "deleted");
    }
    formData.delete("published");
    if (create.access != "level_lock") {
      formData.delete("level");
    }
    formData.append("published", create.published ? 1 : 0);
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createCourse");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post(baseUrl + `${username}/update-course/${create.slug}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const slug = res.data?.slug;
        router.push(`/${username}/classroom/${slug}`);
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
    console.log(set);
    axios
      .post(baseUrl + `${slug}/add-set`, set, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
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
      .put(
        baseUrl + `${slug}/update-set/${store.set_id}`,
        set,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
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
      formData.append(i, module[i]);
    }
    formData.delete("published");
    formData.append("published", create.published ? 1 : 0);
    const token = localStorage.getItem("token");
    isLoading.addLoading("createModule");
    axios
      .post(baseUrl + `set/${module.set_id}/add-lesson`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        clearModule();
        get_module();
        isLoading.removeLoading("createModule");
        if (type == "new_module") {
          local_store.moduleActiveId = res.data.id;
          module.title = res.data.name;
        } else {
          local_store.edit_card = false;
        }
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createModule");
      });
  }

  function update_module(type) {
    const formData = new FormData();
    for (let i of Object.keys(module)) {
      formData.append(i, module[i]);
    }
    formData.delete("published");
    formData.append("published", create.published ? 1 : 0);
    const course_name = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createModule");

    axios
      .post(baseUrl + `set/${module.set_id}/update-lesson/${local_store.moduleActiveId}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        clearModule();
        get_module();
        isLoading.removeLoading("createModule");
        if (type == "new_module") {
          local_store.moduleActiveId = res.data.data.id;
          module.title = res.data.data?.name;
        } else {
          local_store.edit_card = false;
        }
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createModule");
      });
  }

  function update_set_position(type) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("createModule");
    const slug = router.currentRoute.value.params.id;
    const ids = [];
    for (let i of store.modules?.set) {
      ids.push(i.id);
    }
    axios
      .post(baseUrl + `${slug}/set-position`, {
        ids
      }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        clearModule();
        get_module();
        isLoading.removeLoading("createModule");
        if (type == "new_module") {
          local_store.moduleActiveId = res.data.data.id;
          module.title = res.data.data?.name;
        } else {
          local_store.edit_card = false;
        }
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createModule");
      });
  }

  function get_module() {
    const slug = router.currentRoute.value.params.id;
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getModules");

    axios
      .get(
        baseUrl +
          `${username}/get-course/${slug}?page=${isLoading.store.pagination.current_page}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res, "slug");
        store.modules = res.data;
        isLoading.removeLoading("getModules");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getModules");
      });
  }

  function delete_module() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteModule");
    axios
      .delete(baseUrl + `delete-lesson/${local_store.moduleActiveId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        local_store.moduleActiveId = "";
        get_module();
        isLoading.removeLoading("deleteModule");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteModule");
      });
  }

  function delete_set(id) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteSet");
    const slug = router.currentRoute.value.params.id;
    axios
      .delete(baseUrl + `${slug}/delete-set/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        get_module();
        isLoading.removeLoading("deleteSet");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteSet");
      });
  }

  function delete_course(group_username) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteCourse");
    const username = router.currentRoute.value.params.community;

    axios
      .delete(baseUrl + `${username}/delete-course/${group_username}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        get_classroom();
        isLoading.removeLoading("deleteCourse");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteCourse");
      });
  }

  function get_classroom() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getClassrooms");

    axios
      .get(
        baseUrl +
          `${group_username}/classroom?page=${isLoading.store.pagination.current_page}`,
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
    update_course,
    create_module,
    update_module,
    get_module,
    create_set,
    delete_course,
    delete_module,
    delete_set,
    update_set_position,
  };
});
