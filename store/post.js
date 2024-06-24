import { defineStore } from "pinia";
import { useLoadingStore, useAddVideoStore } from "@/store";
import axios from "axios";

export const usePostStore = defineStore("post", () => {
  const isLoading = useLoadingStore();
  const addVideo = useAddVideoStore();
  const runtime = useRuntimeConfig();
  const baseUrl = runtime.public.baseURL;
  const router = useRouter();

  const store = reactive({
    posts: [],
    postData: [],
    categories: [],
    files_url: [],
    error: "",
    writingModal: false,
    filter: {
      category_id: "all",
      filter: "none",
      sort: "recent",
    },
    category_id: "",
    post_id: "",
    card_info: false,
    polls: {},
    poll_id: "",
    modalType: "",
    changeVoteData: {
      title: "",
      description: "",
    },
    userIsVoted: false,
    isPollSaved: false,
    poll_deleted: [],
    isNewPoll: [],
    media_id: "",
  });

  const create = reactive({
    title: "",
    description: "",
    category_id: "",
    files: [],
    video_link: [],
    polls: [],
  });

  const create_category = reactive({
    title: "",
    description: "",
    permission: "",
    username: "",
  });

  const modal = reactive({
    create: false,
    edit: false,
    delete: false,
  });

  function clearData() {
    modal.create = false;
    modal.edit = false;
  }

  function get_posts() {
    const token = localStorage.getItem("token");
    const group_username = router.currentRoute.value.params.community;
    const filter = store.filter.filter;
    const sort = store.filter.sort;
    const category_id = store.filter.category_id;

    isLoading.addLoading("getPosts");
    axios
      .get(
        baseUrl +
          `get-post/${group_username}?page=${isLoading.store.pagination.current_page}&sort=${sort}&category_id=${category_id}&filter=${filter}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res, "kfdlfkd");
        store.posts = res.data?.data;
        for (let i in isLoading.store.pagination) {
          isLoading.store.pagination[i] = res.data?.meta[i];
        }
        isLoading.removeLoading("getPosts");
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("getPosts");
      });
  }

  function getPostById() {
    const token = localStorage.getItem("token");
    isLoading.addLoading("getPostById");
    axios
      .get(baseUrl + `post/${store.post_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res, "kfdlfkd");
        store.postData = res.data;
        store.userIsVoted = false;
        store.poll_deleted = [];
        for (let i of store.postData.polls) {
          store.isNewPoll.push(true);
          for (let user of i.users) {
            if (user.username == isLoading.user.username) {
              store.userIsVoted = true;
            }
          }
        }
        isLoading.removeLoading("getPostById");
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("getPostById");
      });
  }

  function createPostCategory() {
    const group_username = router.currentRoute.value.params.community;
    create_category.username = group_username;
    const token = localStorage.getItem("token");
    isLoading.addLoading("createPostCategory");

    axios
      .post(baseUrl + `post/categories`, create_category, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        // const slug = res.data?.data?.slug;
        // router.push(`/${group_username}/classroom/${slug}`);
        // clearCreate();
        isLoading.removeLoading("createPostCategory");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("createPostCategory");
      });
  }

  function get_categories() {
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    isLoading.addLoading("getPostCategories");
    axios
      .get(baseUrl + `group/${group_username}/post/categories`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.categories = res.data;
        isLoading.removeLoading("getPostCategories");
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.categories = [];
        }
        console.log(err);
        isLoading.removeLoading("getPostCategories");
      });
  }

  function write_post() {
    console.log(modal.edit);
    create.category_id = store.category_id.id;
    create.polls = [];
    for (let i in store.polls) {
      create.polls.push(store.polls[i]);
    }
    isLoading.addLoading("writePost");
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    if (!create.category_id) {
      isLoading.removeLoading("writePost");
      store.error = "You must select a category";
      return;
    }
    store.error = "";
    if (modal.edit) {
      return update_post();
    }
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i]);
    }
    let t = 1;
    const types = [];
    for (let i of addVideo.store.files) {
      formData.append(`file${t}`, i.file);
      types.push(i.type);
      t++;
    }
    formData.append("file_number", t - 1);
    formData.append("polls", JSON.stringify(create.polls));
    formData.append("types", JSON.stringify(types));
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .post(baseUrl + `add-post/${group_username}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        store.postData = res.data;
        store.card_info = true;
        isLoading.removeLoading("writePost");
        store.writingModal = false;
        store.category_id = "";
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("writePost");
      });
  }

  function update_post() {
    console.log("update_post");
    isLoading.addLoading("writePost");
    // for (let i = 0; i < store.isNewPoll?.length; i++) {
    //   if (store.isNewPoll[i]) {
    //     delete store.polls[i];
    //   }
    // }
    let l = create.polls.length;
    const polls = [];
    const poll_edited = [];
    const poll_ids = [];
    store.postData.polls
    for (let i = 0; i < l; i++) {
      if (store.isNewPoll[i] == "edited" && store.postData.polls[i]?.id) {
        poll_edited.push({
          id: store.postData.polls[i].id, 
          option: create.polls[i],
        });        
      } else if (store.isNewPoll[i] != true) {
        polls.push(create.polls[i]);
      }
    }

    create.polls = polls;
    console.log(JSON.stringify(create.polls));
    console.log(create.polls.length);
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (let i of Object.keys(create)) {
      formData.append(i, create[i]);
    }
    let t = 1;
    const types = [];
    const is_uploaded = [];
    console.log(addVideo.store.files);
    for (let i of addVideo.store.files) {
      formData.append(`file${t}`, i.file);
      types.push(i.type);
      is_uploaded.push(i.is_new == true ? true : false);
      t++;
    }
    formData.delete("polls");
    formData.append("poll_edited", JSON.stringify(poll_edited));
    // formData.append("poll_ids", JSON.stringify(poll_ids));
    formData.append("poll_deleted", JSON.stringify(store.poll_deleted));
    formData.append("polls", JSON.stringify(create.polls));
    formData.append("file_number", t - 1);
    formData.append("types", JSON.stringify(types));
    formData.append("is_uploaded", JSON.stringify(is_uploaded));
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .post(
        baseUrl + `edit-post/${group_username}/${store.post_id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.postData = res.data;
        modal.edit = false;
        modal.change_category = false;
        store.card_info = true;
        isLoading.removeLoading("writePost");
        store.writingModal = false;
        store.category_id = "";
        store.poll_deleted = [];
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("writePost");
      });
  }

  function setUserVote() {
    isLoading.addLoading("setUserVote");
    const group_username = router.currentRoute.value.params.community;
    const token = localStorage.getItem("token");

    axios
      .post(
        baseUrl + `poll`,
        {
          poll_id: store.poll_id,
          post_id: store.post_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        store.postData = res.data;
        store.userIsVoted = false;
        for (let i of store.postData.polls) {
          for (let user of i.users) {
            if (user.username == isLoading.user.username) {
              store.userIsVoted = true;
            }
          }
        }
        modal.delete = false;
        get_posts();
        isLoading.removeLoading("setUserVote");
      })
      .catch((err) => {
        console.log(err);
        isLoading.removeLoading("setUserVote");
      });
  }

  function deletePost() {
    isLoading.addLoading("deletePost");
    const token = localStorage.getItem("token");

    axios
      .delete(baseUrl + `post/${store.post_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        modal.delete = false;
        store.card_info = false;
        isLoading.removeLoading("deletePost");
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("deletePost");
      });
  }

  function removePoll() {
    if (!store.isPollSaved) {
      modal.delete = false;
      store.polls = {};
    }
    isLoading.addLoading("removePoll");
    const token = localStorage.getItem("token");

    axios
      .delete(baseUrl + `poll/${store.post_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        modal.delete = false;
        isLoading.removeLoading("removePoll");
        store.polls = {};
        create.polls = {};
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("removePoll");
      });
  }

  function deleteMediaFile(index) {
    isLoading.addLoading("deleteMedia");
    const token = localStorage.getItem("token");

    axios
      .delete(baseUrl + `media-file/${store.media_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        addVideo.store.files.splice(index, 1);
        modal.delete = false;
        isLoading.removeLoading("deleteMedia");
        get_posts();
      })
      .catch((err) => {
        if (err.response?.data?.message == "Posts not found") {
          store.events = [];
        }
        console.log(err);
        isLoading.removeLoading("deleteMedia");
      });
  }

  return {
    store,
    modal,
    create,
    clearData,
    get_posts,
    getPostById,
    create_category,
    write_post,
    get_categories,
    createPostCategory,
    deletePost,
    removePoll,
    deleteMediaFile,
    setUserVote,
  };
});
