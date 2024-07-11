import { defineStore } from "pinia";
import { useLoadingStore, useAddVideoStore } from "@/store";
import axios from "axios";
import { useApiRequest } from "@/composables";

export const useClassroomStore = defineStore("classroom", () => {
  const apiRequest = useApiRequest();
  const isLoading = useLoadingStore();
  const addVideo = useAddVideoStore();
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
    classroomReyting: 0,
    activeTab: "",
  });

  const store = reactive({
    classrooms: [],
    modules: [],
    old_modules: [],
    add_course: false,
    edit_course: false,
    cropperPreview: false,
    setModal: false,
    setEdit: false,
    set_id: "",
    add_file: false,
    file_type: "",
    file: {
      file: "",
      name: "",
      type: "",
      is_new: "",
      data: "",
    },
    files: [],
    module_id: "",
    current_category: null,
    change_category: false,
    dripModal: false,
    is_drip: false,
    drip_day: "",
    is_active: false,
    delete: false,
    username: "",
  });

  const file_edit = {
    create: false,
    edit: false,
    delete: false,
  };

  const create = reactive({
    slug: "",
    title: "",
    description: "",
    image: "",
    published: true,
  });

  const module = reactive({
    title: "",
    video: "",
    description: "",
    published: true,
    set_id: "",
    video_content: "",
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
      .post(baseUrl + `${group_username}/add-course`, formData, {
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
    console.log(create.image);
    if (!create.image || isLoading.isURL(create.image)) {
      if (!isLoading.isURL(create.image)) {
        formData.delete("image");
        formData.append("is_deleted", "deleted");
      } else {
        formData.delete("image");
      }
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
        if (router.currentRoute.value.params.id) {
          get_module();
        }
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

  function update_completed() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("markAsCompleted");
    axios
      .post(
        baseUrl + `lesson-completed/${local_store.moduleData.id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        local_store.moduleData.completed = !local_store.moduleData.completed;
        let data;
        for (let i = 0; i < store.modules?.set?.length; i++) {
          data = store.modules?.set[i];
          if (data.type == "set") {
            for (let lesson = 0; lesson < data.lesson?.length; lesson++) {
              if (data.lesson[lesson].id == local_store.activeName) {
                store.modules.set[i].lesson[lesson].completed =
                  !store.modules?.set[i].lesson[lesson].completed;
                break;
              }
            }
          } else {
            if (store.modules.set[i].id == local_store.activeName) {
              if (res.data.message == "Lesson completed successfully") {
                store.modules.set[i].completed = true;
              } else {
                store.modules.set[i].completed = false;
              }
              break;
            }
          }
        }
        store.old_modules = JSON.parse(JSON.stringify(store.modules));
        setCourseReyting();
        isLoading.removeLoading("markAsCompleted");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("markAsCompleted");
      });
  }

  function setCourseReyting() {
    let reyting = 0;
    let lesson_count = 0;
    for (let i of store.modules.set) {
      if (i.type == "set" && i.lesson?.length) {
        for (let lesson of i.lesson) {
          if (lesson.completed) {
            reyting++;
          }
          lesson_count++;
        }
      } else if (i.type == "lesson") {
        if (i.completed) {
          reyting++;
        }
        lesson_count++;
      }
    }
    store.classroomReyting = Math.floor((reyting * 100) / lesson_count) | 0;
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
      .put(baseUrl + `${slug}/update-set/${store.set_id}`, set, {
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

  function create_module(type) {
    if (!module.set_id) {
      add_coursemodule();
      return;
    }
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

  function add_coursemodule(type) {
    const course_name = router.currentRoute.value.params.id;
    const formData = new FormData();
    for (let i of Object.keys(module)) {
      formData.append(i, module[i]);
    }
    formData.delete("published");
    formData.append("published", create.published ? 1 : 0);
    const token = localStorage.getItem("token");
    isLoading.addLoading("createModule");
    axios
      .post(baseUrl + `course/${course_name}/add-lesson`, formData, {
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
    formData.append("description", module.video_content);
    formData.delete("published");
    formData.append("published", module.published ? 1 : 0);
    const positions = [];
    const deleted = [];
    let l_step = 1;
    let f_step = 1;
    let name;
    for (let i of store.files) {
      console.log(i);
      if (i.is_new == "deleted") {
        deleted.push(i.id);
        continue;
      }
      if (i.type == "link") {
        name = `link${l_step++}`;
        if (i.is_new !== false) {
          formData.append(name, i.file);
        }
      } else {
        name = `file${f_step++}`;
        if (i.is_new !== false) {
          formData.append(name, i.file);
        }
      }
      positions.push([i.is_new === false ? i.id : name, i.name, i.type, i.url]);
    }
    formData.append("positions", JSON.stringify(positions));
    formData.append("deleted", JSON.stringify(deleted));
    if (addVideo.store.files?.length) {
      formData.append("link", addVideo.store.files[0]?.file);
      formData.append("link_type", addVideo.store.files[0]?.type);
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const course_name = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createModule");

    axios
      .post(
        baseUrl +
          `course/${course_name}/update-lesson/${local_store.moduleActiveId}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        clearModule();
        setModuleData(res.data);
        isLoading.removeLoading("createModule");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createModule");
      });
  }

  function update_set_position(type) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("updatePosition");
    const slug = router.currentRoute.value.params.id;
    const ids = [];
    let data;
    let lesson_id = [];
    let module_id = null;
    for (let i of store.modules?.set) {
      lesson_id = [];
      module_id = null;
      if (i.type == "set") {
        module_id = i.id;
        for (let lesson of i.lesson) {
          if (lesson.type == "set") {
            isLoading.removeLoading("updatePosition");
            store.modules = store.old_modules;
            return;
          }
          lesson_id.push(lesson.id);
        }
        data = {
          module_id,
          lesson_id,
          course_id: store.modules.id,
        };
      } else {
        data = {
          module_id,
          lesson_id: [i.id],
          course_id: store.modules.id,
        };
      }
      ids.push(data);
    }
    console.log(ids);
    axios
      .post(
        baseUrl + `lesson-position`,
        {
          ids,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        clearModule();
        get_module();
        isLoading.removeLoading("updatePosition");
        if (type == "new_module") {
          local_store.moduleActiveId = res.data.data.id;
          module.title = res.data.data?.name;
        } else {
          local_store.edit_card = false;
        }
      })
      .catch((err) => {
        console.log(err);
        store.modules = store.old_modules;
        isLoading.removeLoading("updatePosition");
      });
  }

  function setModuleData(data) {
    const id = +router.currentRoute.value.query.module;
    store.modules = data;
    store.old_modules = JSON.parse(JSON.stringify(data));
    store.activeTab = "set";

    if (id) {
      for (let i of store.modules.set) {
        local_store.activeName = i.id;
        local_store.moduleActiveId = id;
        if (i.type == "set" && i.lesson?.length) {
          for (let lesson of i.lesson) {
            if (lesson.id == id) {
              local_store.moduleData = lesson;
              break;
            }
          }
        } else if (i.type == "lesson") {
          if (i.id == id) {
            local_store.moduleData = i;
            break;
          }
        }
      }
    } else {
      for (let i of store.modules.set) {
        local_store.activeName = i.id;
        if (i.type == "set" && i.lesson?.length) {
          local_store.moduleData = i.lesson[0];
          break;
        } else if (i.type == "lesson") {
          local_store.moduleData = i;
          break;
        }
      }
    }
    store.files = local_store.moduleData.set;
    local_store.edit_card = false;
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
        setModuleData(res.data);
        setCourseReyting();
        isLoading.removeLoading("getModules");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getModules");
      });
  }

  function publish_module(module_id) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getModules");
    const slug = router.currentRoute.value.params.id;
    axios
      .post(
        baseUrl + `${slug}/lesson-published/${module_id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res, "slug");
        setModuleData(res.data);
        setCourseReyting();
        isLoading.removeLoading("getModules");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getModules");
      });
  }

  function update_drip() {
    // const slug = router.currentRoute.value.params.id;
    const token = localStorage.getItem("token");
    isLoading.addLoading("updateDrip");
    axios
      .post(
        baseUrl + `lesson-drip/${store.module_id}`,
        {
          days: store.is_drip ? store.drip_day : null,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        get_module();
        store.dripModal = false;
        store.drip_day = "";
        isLoading.removeLoading("updateDrip");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("updateDrip");
      });
  }

  function change_folder() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("changeFolder");
    axios
      .post(
        baseUrl + `lesson/set-or-course`,
        {
          lesson_id: store.module_id,
          course_id: store.modules.id,
          set_id: store.current_category,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res, "slug");
        setModuleData(res.data);
        setCourseReyting();
        store.change_category = false;
        isLoading.removeLoading("changeFolder");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("changeFolder");
      });
  }

  function duplicate_module(module_id) {
    const token = localStorage.getItem("token");
    isLoading.addLoading("changeFolder");
    axios
      .post(
        baseUrl + `${store.modules.id}/duplicate-lesson/${module_id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res, "slug");
        setModuleData(res.data);
        setCourseReyting();
        store.change_category = false;
        isLoading.removeLoading("changeFolder");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("changeFolder");
      });
  }

  function update_course_position(id, position) {
    const username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getClassrooms");
    axios
      .post(
        baseUrl + `${username}/course-position`,
        {
          id,
          position,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res, "slug");
        get_classroom();
        isLoading.removeLoading("getClassrooms");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("getClassrooms");
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
        file_edit.delete = false;
        isLoading.removeLoading("deleteModule");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteModule");
      });
  }

  function delete_set() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteSet");
    const slug = router.currentRoute.value.params.id;
    axios
      .delete(baseUrl + `${slug}/delete-set/${store.set_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        get_module();
        file_edit.delete = false;
        isLoading.removeLoading("deleteSet");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteSet");
      });
  }

  function delete_course() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("deleteCourse");
    const username = router.currentRoute.value.params.community;
    axios
      .delete(baseUrl + `${username}/delete-course/${store.username}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        router.push(`/${username}/classroom`);
        store.delete = false;
        isLoading.removeLoading("deleteCourse");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("deleteCourse");
      });
  }

  async function get_classroom() {
    console.log("data", '=========')
    const group_username = router.currentRoute.value.params.community;
    isLoading.addLoading("getClassrooms");
    const data = await apiRequest.get(
      `${group_username}/classroom?page=${isLoading.store.pagination.current_page}`
    );
    console.log(data.data, '=========')
    isLoading.removeLoading("getClassrooms");
    if (data.status == 200) {
      store.classrooms = data.data?.data;
      for (let i in isLoading.store.pagination) {
        isLoading.store.pagination[i] = data.data.meta[i];
      }
    }
  }

  return {
    local_store,
    store,
    create,
    module,
    set,
    file_edit,
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
    update_completed,
    publish_module,
    change_folder,
    duplicate_module,
    update_course_position,
    update_drip,
  };
});
