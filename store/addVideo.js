import { defineStore } from "pinia";
import { useLoadingStore, usePostStore, useClassroomStore } from "@/store";
import axios from "axios";

export const useAddVideoStore = defineStore("addvideo", () => {
  const usePost = usePostStore();
  const useClassroom = useClassroomStore();

  const store = reactive({
    files: [],
    previews: [],
  });

  function handleImage(e) {
    const file = e.target.files[0];
    console.log(file);
    const url = URL.createObjectURL(file);
    let type = file.type.split("/")[0];
    store.files.push({ url, file, type, is_new: true });
    document.getElementById("add_image").value = "";
  }

  function deleteImage(index) {
    if (store.files[index]?.is_new) {
      store.files.splice(index, 1);
      usePost.modal.delete = false;
    } else {
      usePost.store.media_id = store.files[index].id;
      usePost.deleteMediaFile(index);
    }
    console.log(store.files[index]);
  }

  function onSelectEmoji(emoji) {
    useClassroom.module.video_content += emoji.i;
  }

  function deletePoll(poll_name, index) {
    console.log(usePost.store.postData.polls[index]);
    usePost.store.isNewPoll.splice(index, 1);
    if (usePost.store.postData.polls[index].id) {
      usePost.store.poll_deleted.push(usePost.store.postData.polls[index].id);
    }
    usePost.store.postData.polls.splice(index, 1);
    delete usePost.store.polls[poll_name];
  }

  function addPoll() {
    if (Object.keys(usePost.store.polls).length >= 10) {
      return;
    }
    usePost.store.isNewPoll.push(false);
    usePost.store.polls[
      "option" +
        (parseInt(Object.keys(usePost.store.polls).pop().match(/\d+$/)[0]) + 1)
    ] = "";
  }

  function editPoll(index) {
    usePost.store.isNewPoll[index] = "edited";
  }

  function openPoll() {
    try {
      if (Object.keys(usePost.store.polls).length) {
        usePost.store.polls = {};
        return;
      }
      usePost.store.polls = {
        option1: "",
        option2: "",
        option3: "",
      };
    } catch (e) {
      usePost.store.polls = {};
    }
  }

  function handleSubmit() {
    usePost.create.description = useClassroom.module.video_content;
    usePost.write_post();
  }

  return {
    store,
    handleImage,
    deleteImage,
    onSelectEmoji,
    deletePoll,
    addPoll,
    editPoll,
    openPoll,
    handleSubmit,
  };
});
