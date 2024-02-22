<template>
  <main class="flex gap-6">
    <section class="min-w-[280px]">
      <div class="b_cd9 rounded-xl p-5">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold">Skool 101</h1>
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <img src="@/assets/svg/three_dot.svg" alt="" />
            <template #dropdown>
              <el-dropdown-menu
                @click="store.activeEdit = ''"
                class="community_dropdown min-w-[200px] dropdown_shadow"
              >
                <el-dropdown-item>Edit course</el-dropdown-item>
                <el-dropdown-item @click="store.setModal = true">Add set</el-dropdown-item>
                <el-dropdown-item>Add module</el-dropdown-item>
                <el-dropdown-item>Delete course</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="mt-10">
          <el-progress class="module_progress" :percentage="45" />
          <p class="text-xs mt-2">45% complete</p>
        </div>
      </div>

      <aside>
        <ul class="_c07 text-sm mt-5">
          <li v-for="i in useClassroom.store.modules[0]?.set">
            <div class="flex items-center h-[44px] r_8 cursor-pointer">
              <div
                @click="handleActive(i)"
                :class="
                  store.activeName == i
                    ? 'bg-transparent _c2a font-semibold'
                    : 'bg-white r_8'
                "
                class="flex items-center justify-between h-full pr-5 w-full"
              >
                <div class="flex items-center">
                  <p
                    :class="store.activeName == i ? 'b_c2a' : 'bg-transparent'"
                    class="mr-4 w-1 h-[44px]"
                  ></p>
                  {{ i.name }}
                </div>
                <div class="flex items-center gap-[10px]">
                  <el-dropdown placement="bottom-end" class="dropdown">
                    <img
                      class="rotate-90"
                      src="@/assets/svg/three_dot.svg"
                      alt=""
                    />
                    <template #dropdown>
                      <el-dropdown-menu
                        @click="store.activeEdit = ''"
                        class="community_dropdown min-w-[200px] dropdown_shadow"
                      >
                        <el-dropdown-item>Edit set</el-dropdown-item>
                        <el-dropdown-item>Delete set</el-dropdown-item>
                        <el-dropdown-item>Add module in set</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <img
                    :class="store.activeName == i ? 'rotate-180' : ''"
                    class="duration-500"
                    src="@/assets/svg/select_arrow.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <ul
              :class="store.activeName == i ? '' : 'h-0 overflow-hidden'"
              class="w-full duration-1000"
            >
              <li v-for="module in i.module" class="flex items-center text-xs px-9 h-8">{{ module.name }}</li>
              <li class="flex items-center text-xs px-9 h-8 b_cbc r_8">
                New module
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </section>
    <section class="w-full">
      <div
        v-if="!store.edit_card"
        class="flex items-center justify-between w-full h-16 px-5 bg-white r_16"
      >
        <h1 class="text-xl font-semibold">New module</h1>
        <div class="full_flex gap-4">
          <button
            class="full_flex gap-1 border border-[#BCDEFF] r_8 _c2a h-9 px-3"
          >
            <img src="@/assets/svg/mark_as_read.svg" alt="" />Mark as done
          </button>
          <button
            @click="store.edit_card = true"
            class="full_flex gap-1 border border-[#BCDEFF] r_8 _c2a h-9 px-3"
          >
            <img src="@/assets/svg/edit.svg" alt="" />Edit
          </button>
        </div>
      </div>

      <!-- edit card -->
      <form @submit.prevent="handleSubmit" v-else class="bg-white p-6 r_16">
        <div>
          <input
            @input="handleInput('input')"
            v-model="useClassroom.module.name"
            type="text"
            placeholder="Title"
            class="text-xl h-12 font-semibold"
            required
          />
          <p class="text-end mt-2 _ca1 text-sm">
            {{ useClassroom.module.name?.length }}/50
          </p>
        </div>
        <div
          v-if="!useClassroom.module.video"
          @click="store.addVideoModal = true"
          class="full_flex flex-col cursor-pointer gap-1 h-[400px] r_8 mt-5 b_cf2"
        >
          <img src="@/assets/svg/add_video.svg" alt="" />
          <p class="font-medium _c2a">Add video</p>
        </div>
        <div
          v-else
          class="full_flex flex-col cursor-pointer overflow-hidden gap-1 h-[400px] r_8 mt-5 b_cf2"
        >
          <iframe
            class="h-[400px] w-full object-contain object-center"
            src="https://www.youtube.com/embed/rOCy-_LDlR8?si=mGScF5aRTphGOYwB"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowfullscreen
          ></iframe>
        </div>
        <Editor />

        <div class="flex items-center justify-between">
          <div class="full_flex gap-6 _c07">
            <button
              type="button"
              class="full_flex gap-2 text-sm border border-[#E0E0E0] rounded-[4px] px-3"
            >
              Add <img src="@/assets/svg/select_arrow.svg" alt="" />
            </button>
            <div class="flex items-center gap-6">
              <p
                v-if="useClassroom.module.published"
                class="text-[16px] font-medium"
              >
                Published
              </p>
              <p v-else class="text-[16px] font-medium">Draft</p>
              <el-switch v-model="useClassroom.module.published" class="ml-2" />
            </div>
          </div>
          <div class="flex gap-3 text-sm font-semibold">
            <button
              @click="store.edit_card = false"
              type="button"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              cancel
            </button>
            <button
              :type="
                isLoading.isLoadingType('createModule') ? 'button' : 'submit'
              "
              :class="useClassroom.module.name ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('createModule')"
            >
              save
            </button>
          </div>
        </div>
      </form>
    </section>

    <!-- add Video link -->
    <el-dialog
      v-model="store.addVideoModal"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg py-7 px-6"
    >
      <form @submit.prevent="handleVideoLink">
        <h1 class="text-2xl font-semibold">Add a video</h1>
        <p class="mt-6 mb-4 font-medium">
          Add a YouTube, Vimeo, Loom, or Wistia video link.
        </p>
        <input
          v-model="store.videoLink"
          class="text-sm"
          type="text"
          placeholder="Link"
        />
        <p v-if="store.is_url" class="leading-4 text-red-600 -mb-6 mt-2">
          Invalid video link
        </p>
        <div class="flex justify-end gap-3 mt-7 text-sm font-semibold">
          <button
            @click="store.addVideoModal = false"
            type="button"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button
            :class="store.videoLink ? 'b_cbc _c07' : 'b_ce0 _ca1'"
            class="uppercase h-10 px-6 rounded-lg"
            v-loading="isLoading.isLoadingType('createModule')"
          >
            save
          </button>
        </div>
      </form>
    </el-dialog>

    <!-- add set -->
    <el-dialog
      v-model="store.setModal"
      width="440"
      align-center
      class="bg-opacity-50 !rounded-lg py-7 px-6"
    >
      <form @submit.prevent="handleVideoLink">
        <h1 class="text-2xl mb-7 font-semibold">Edit set</h1>
        <input
          v-model="useClassroom.set.name"
          class="text-sm"
          type="text"
          placeholder="Creating a group"
        />
        <p class="text-end mt-2 _ca1 text-sm">
          {{ useClassroom.set.name?.length }}/50
        </p>
        <div class="flex justify-between gap-3 mt-7 text-sm font-semibold">
          <div class="flex items-center gap-6">
            <p
              v-if="useClassroom.set.published"
              class="text-[16px] font-medium _c07"
            >
              Published
            </p>
            <p v-else class="text-[16px] font-medium">Draft</p>
            <el-switch v-model="useClassroom.set.published" class="ml-2" />
          </div>
          <div class="flex items-center gap-">
            <button
              @click="store.setModal = false"
              type="button"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              cancel
            </button>
            <button
              :class="store.videoLink ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('createModule')"
            >
              save
            </button>
          </div>
        </div>
      </form>
    </el-dialog>
  </main>
</template>

<script setup>
import { useLoadingStore, useClassroomStore } from "@/store";

const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();
const store = reactive({
  activeName: 1,
  edit_card: false,
  addVideoModal: false,
  is_url: false,
  videoLink: "",
  setModal: false,
});

function handleActive(id) {
  if (store.activeName == id) {
    store.activeName = "";
  } else {
    store.activeName = id;
  }
}

function handleVideoLink() {
  store.is_url = !isLoading.isURL(store.videoLink);
  if (!store.is_url) {
    useClassroom.module.video = store.videoLink;
    store.addVideoModal = false;
  } else {
    useClassroom.module.video = "";
  }
}

function handleInput(type) {
  useClassroom.module.name = useClassroom.module.name?.slice(0, 50);
}

function handleSubmit() {
  useClassroom.module.video_content =
    document.querySelector(".tiptap").innerHTML;
  useClassroom.create_module();
}

onBeforeMount(() => {
  useClassroom.get_module();
});
</script>

<style lang="scss" scoped></style>
