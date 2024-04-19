<template>
  <section>
    <div
      @click="usePost.store.writingModal = true"
      class="flex items-center md:px-5 px-3 bg-white r_16 md:h-[72px] h-[52px] gap-[14px]"
    >
      <img
        class="md:h-10 md:w-10 h-7 w-7 object-cover"
        src="@/assets/image/user.svg"
        alt=""
      />
      <button class="!border-0 placeholder-black md:text-xl font-semibold">
        Write something...
      </button>
    </div>

    <div
      v-if="usePost.store.writingModal"
      @click="usePost.store.writingModal = false"
      class="fixed top-0 bg-black bg-opacity-50 min-h-screen w-full z-50 left-0"
    ></div>
    <form
      @submit.prevent="handleSubmit"
      v-if="usePost.store.writingModal"
      class="b_cf0f relative z-50 r_16 overflow-hidden overflow-y-auto max-h-[calc(100vh_-_177px)] -mt-[72px]"
    >
      <div
        class="flex md:items-center gap-3 b_cf0f md:h-[52px] h-[64px] px-5 py-3"
      >
        <img
          class="h-5 w-5 object-cover"
          src="@/assets/image/user.svg"
          alt=""
        />
        <p class="text-sm flex flex-wrap items-start gap-1 leading-4">
          <span class="font-semibold">Xayot Sharapov</span>
          <span class="_ca1">posting in</span>
          <span class="font-semibold _c2a md:w-auto w-full"
            >Skool community</span
          >
        </p>
      </div>
      <div class="md:p-5 p-3 space-y-5 bg-white">
        <input
          v-model="usePost.create.title"
          class="h-10 !rounded-none"
          type="text"
          placeholder="Title"
          required
        />
        <div class="community_editor border h-[120px] whitespace-pre-wrap">
          <Editor />
        </div>
        <div
          v-if="Object.keys(usePost.create.poll).length"
          class="border_ce0 rounded-lg p-4"
        >
          <div class="flex items-center justify-between">
            <p class="font-medium">Poll</p>
            <p
              @click="usePost.create.poll = {}"
              class="font-medium cursor-pointer hover:underline text-sm _ca1"
            >
              Remove
            </p>
          </div>
          <ul class="space-y-2 mt-2">
            <li
              v-for="(i, index) in Object.keys(usePost.create.poll)"
              class="flex items-center gap-4"
            >
              <input
                v-model="usePost.create.poll[i]"
                type="text"
                :placeholder="`Option ${index + 1}`"
              />
              <img
                v-if="Object.keys(usePost.create.poll).length > 2"
                @click="deletePoll(i)"
                class="opacity-50 hover:bg-gray-300 cursor-pointer rounded-full p-2"
                src="@/assets/svg/x.svg"
                alt=""
              />
            </li>
          </ul>
          <button
            @click="addPoll"
            type="button"
            class="uppercase border_ce0 px-3 rounded-md mt-2"
            :class="
              Object.keys(usePost.create.poll).length >= 10 ? 'b_ce0 _ca1' : ''
            "
          >
            Add option
          </button>
        </div>
        <ul
          v-if="usePost.store.files_url.length"
          class="flex gap-5 overflow-x-auto"
        >
          <li
            class="relative imagelabel"
            v-for="(i, index) in usePost.store.files_url"
          >
            <button
              @click="deleteImage(index)"
              type="button"
              class="absolute deleteimage !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2"
            >
              <img src="@/assets/svg/x.svg" alt="" />
            </button>
            <img
              class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
              :src="i"
              alt=""
            />
          </li>
          <li>
            <label
              for="add_image"
              class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm w-40 h-40"
            >
              <img class="w-1/3" src="@/assets/svg/add_photo.svg" alt="" />
            </label>
          </li>
        </ul>
        <input
          @change="handlePhotoImage"
          type="file"
          id="add_image"
          class="h-0 w-0 overflow-hidden !p-0"
        />
        <p
          v-if="usePost.store.error"
          class="text-red-600 text-end text-sm pb-3"
        >
          {{ usePost.store.error }}
        </p>
      </div>
      <div
        class="2xl:flex items-center justify-between 2xl:space-y-0 space-y-5 p-5 pt-0 2xl:mt-0 -mt-10 bg-white"
      >
        <div class="textarea_icon flex items-center">
          <label for="add_image" class="icon full_flex h-10 w-10">
            <img src="@/assets/svg/textarea/upload.svg" alt="" />
          </label>
          <div
            @click="isLoading.modal.add_link = true"
            class="icon full_flex h-10 w-10"
          >
            <img src="@/assets/svg/textarea/link.svg" alt="" />
          </div>
          <div
            @click="useClassroom.local_store.addVideoModal = true"
            class="icon full_flex h-10 w-10"
          >
            <img src="@/assets/svg/textarea/video.svg" alt="" />
          </div>
          <div
            @click="openPoll"
            class="icon full_flex h-10 w-10 cursor-pointer"
          >
            <img src="@/assets/svg/textarea/poll.svg" alt="" />
          </div>
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <div id="emojidrop1" class="icon full_flex h-10 w-10 relative">
              <img src="@/assets/svg/textarea/emoji.svg" alt="" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="!overflow-hidden overflow-y-auto">
                  <EmojiPicker
                    :native="true"
                    theme="light"
                    @select="onSelectEmoji"
                  />
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="icon full_flex h-10 w-10">
            <img src="@/assets/svg/textarea/gif.svg" alt="" />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <el-dropdown
            @command="
              (command) => {
                usePost.create.category_id = command + 1;
              }
            "
            placement="bottom-end"
            class="dropdown"
            trigger="click"
          >
            <div class="flex items-center gap-1 mx-4 font-medium text-sm">
              <p class="whitespace-nowrap max-w-[100px] truncate">
                {{
                  usePost.create.category_id
                    ? text_dropdown[usePost.create.category_id - 1][0]
                    : "Select category"
                }}
              </p>
              <img src="@/assets/svg/textarea/select_arrow.svg" alt="" />
            </div>
            <template #dropdown>
              <el-dropdown-menu
                class="min-w-[200px] !mt-3 !-mr-0 dropdown_shadow"
              >
                <el-dropdown-item
                  v-for="(i, index) in text_dropdown"
                  :command="index"
                  class="flex flex-col !items-start px-5 hover:bg-[#F2F2F2] cursor-pointer space-y-1 h-[63px]"
                >
                  <h1 class="font-semibold">{{ i[0] }}</h1>
                  <p class="text-xs">{{ i[1] }}</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="flex gap-3 font-semibold md:text-[16px] text-sm">
            <button
              @click="usePost.store.writingModal = false"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              cancel
            </button>
            <button
              v-loading="isLoading.isLoadingType('writePost')"
              :type="isLoading.isLoadingType('writePost') ? 'button' : 'submit'"
              class="uppercase h-10 px-6 b_ce0 rounded-lg"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import "vue3-emoji-picker/css";
import EmojiPicker from "vue3-emoji-picker";

import {
  usePostStore,
  useLoadingStore,
  useChatStore,
  useGroupStore,
  useClassroomStore,
} from "@/store";

const usePost = usePostStore();
const useChat = useChatStore();
const useGroup = useGroupStore();
const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();
const { showMessage } = useNotification();

const store = reactive({
  is_show: false,
  writingModal: false,
  card_info: false,
  reportAdmin: false,
  drawer: false,
  is_emoji: false,
  poll_step: 3,
});

function handleSubmit() {
  usePost.create.description = useClassroom.module.video_content;
  usePost.write_post();
}

function reposrtToAdmins() {
  showMessage("Reported to group admins.");
  store.reportAdmin = false;
}

const text_dropdown = [
  ["Product Feedback", "Share your general feedback about Skool here"],
  ["Product Question", "Ask a question about the product, or search above"],
  [
    "Feature Requests",
    "Want a feature Skool doesn't have? Ask for it, or search above",
  ],
  ["Bug Reports", "Found a bug? Report it here and we'll fix it"],
];

function handlePhotoImage(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  document.getElementById("add_image").value = "";
  usePost.store.files_url.push(url);
  usePost.create.files.push(file);
}

function deleteImage(index) {
  usePost.store.files_url.splice(index, 1);
  usePost.create.files.splice(index, 1);
}

function onSelectEmoji(emoji) {
  useClassroom.module.video_content += emoji.i;
}

function deletePoll(index) {
  delete usePost.create.poll[index];
}

function addPoll() {
  if (Object.keys(usePost.create.poll).length >= 10) {
    return;
  }
  usePost.create.poll[
    "option" +
      (parseInt(Object.keys(usePost.create.poll).pop().match(/\d+$/)[0]) + 1)
  ] = "";
}

function openPoll() {
  usePost.create.poll = {
    option1: "",
    option2: "",
    option3: "",
  };
}

watch(
  () => usePost.store.writingModal,
  () => {
    if (usePost.store.writingModal) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
);

watch(
  () => isLoading.modal.add_link,
  () => {
    if (!isLoading.modal.add_link) {
      useClassroom.module.video_content += `<a href="${isLoading.modal.link}" target="_blank">${isLoading.modal.link}</a>`;
    }
  }
);
</script>

<style lang="scss" scoped></style>
