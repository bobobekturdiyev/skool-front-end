<template>
  <div>
    <div class="w-full">
      <div class="community_editor h-10 border whitespace-pre-wrap">
        <EditorInlineComment />
      </div>
      <ul
        v-if="usePost.inline_comment.files.length"
        class="flex gap-5 py-5 overflow-x-auto"
      >
        <draggable
          :list="usePost.inline_comment.files"
          group="grid"
          :animation="200"
          class="flex gap-4 overflow-hidden overflow-x-auto min-w-fit"
        >
          <li
            class="relative imagelabel"
            v-for="(i, index) in usePost.inline_comment.files"
          >
            <button
              @click="addVideo.deleteImage(index)"
              type="button"
              class="absolute deleteimage z-10 bg-white !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2"
            >
              <img src="@/assets/svg/x.svg" alt="" />
            </button>
            <img
              v-if="i.type == 'image'"
              class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
              :src="i.url"
              alt=""
            />
            <div v-else-if="i.type == 'video'">
              <video
                class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
                controls
              >
                <source :src="i.url" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <iframe
              v-else-if="
                i.type == 'youtube' ||
                i.type == 'wistia' ||
                i.type == 'vimeo' ||
                i.type == 'loom'
              "
              class="w-40 h-40 min-w-[160px] border rounded-xl object-cover text-[#0000]"
              :src="i.url"
            ></iframe>
          </li>
          <li>
            <label
              for="add_image"
              class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm w-40 h-40"
            >
              <img class="w-1/3" src="@/assets/svg/add_photo.svg" alt="" />
            </label>
          </li>
        </draggable>
      </ul>
      <div class="flex items-center justify-between py-3">
        <div
          @click="usePost.store.writecomment_type = 'inline'"
          class="textarea_icon flex items-center"
        >
          <div class="icon full_flex h-10 w-10">
            <label for="add_inline_image" class="icon full_flex h-10 w-10">
              <img src="@/assets/svg/textarea/upload_black.svg" alt="" />
            </label>
          </div>
          <div
            @click="isLoading.modal.add_link = true"
            class="icon sm:flex hidden items-center justify-center h-10 w-10"
          >
            <img src="@/assets/svg/textarea/link_black.svg" alt="" />
          </div>
          <div
            @click="useClassroom.local_store.addVideoModal = true"
            class="icon sm:flex hidden items-center justify-center h-10 w-10"
          >
            <img src="@/assets/svg/textarea/video_black.svg" alt="" />
          </div>
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <div id="emojidrop1" class="icon full_flex h-10 w-10 relative">
              <img src="@/assets/svg/textarea/emoji_black.svg" alt="" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="!overflow-hidden overflow-y-auto">
                  <EmojiPicker
                    :native="true"
                    theme="light"
                    @select="addVideo.onSelectEmoji"
                  />
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="icon full_flex h-10 w-10">
            <img src="@/assets/svg/textarea/gif_black.svg" alt="" />
          </div>
        </div>
        <div class="flex gap-3 font-semibold">
          <button
            @click="usePost.store.writingModal = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button
            v-loading="isLoading.isLoadingType('writeComment') && usePost.store.writecomment_type == 'inline'"
            @click="
              () => {
                usePost.store.writecomment_type = 'inline';
                usePost.write_comment();
              }
            "
            :class="
              usePost.inline_comment.comment ? 'b_cbc _c07' : 'b_ce0 _ca1'
            "
            class="uppercase h-10 px-6 b_ce0 rounded-lg"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore, useAddVideoStore, useLoadingStore } from "~/store";

const usePost = usePostStore();
const addVideo = useAddVideoStore();
const isLoading = useLoadingStore();
</script>

<style lang="scss" scoped></style>
