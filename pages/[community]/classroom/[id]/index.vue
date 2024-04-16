<template>
  <main class="flex gap-6 mt-[18px]">
    <section
      class="md:min-w-[280px] md:w-[280px] w-full"
      :class="store.is_open ? 'md:block hidden' : ''"
    >
      <div class="b_cd9 rounded-xl p-5">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold">Skool 101</h1>
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <img src="@/assets/svg/three_dot.svg" alt="" />
            <template #dropdown>
              <el-dropdown-menu
                class="community_dropdown min-w-[200px] dropdown_shadow"
              >
                <el-dropdown-item>Edit course</el-dropdown-item>
                <el-dropdown-item @click="useClassroom.store.setModal = true"
                  >Add set</el-dropdown-item
                >
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
          <li v-for="(i, index) in useClassroom.store.modules[0]?.set">
            <div class="flex items-center h-[44px] r_8 cursor-pointer">
              <div
                @click="handleActive(i.id)"
                :class="
                  useClassroom.local_store.activeName == i.id
                    ? 'bg-transparent _c2a font-semibold'
                    : 'bg-white r_8'
                "
                class="flex items-center justify-between h-full pr-5 w-full"
              >
                <div class="flex items-center truncate max-w-[80%]">
                  <p
                    :class="
                      useClassroom.local_store.activeName == i.id
                        ? 'b_c2a'
                        : 'bg-transparent'
                    "
                    class="mr-4 w-1 h-[44px]"
                  ></p>
                  <span class="max-w-[90%] truncate">{{ i.name }}</span>
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
                        @click="useClassroom.local_store.activeEdit = ''"
                        class="community_dropdown min-w-[200px] dropdown_shadow"
                      >
                        <el-dropdown-item @click="editSet(i)"
                          >Edit set</el-dropdown-item
                        >
                        <el-dropdown-item @click="useClassroom.delete_set(i.id)"
                          >Delete set</el-dropdown-item
                        >
                        <el-dropdown-item @click="addModuleInSet(i.id)"
                          >Add module in set</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <img
                    :class="
                      useClassroom.local_store.activeName == i.id
                        ? 'rotate-180'
                        : ''
                    "
                    class="duration-500"
                    src="@/assets/svg/select_arrow.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <ul
              :class="
                useClassroom.local_store.activeName == i.id
                  ? ''
                  : 'h-0 overflow-hidden'
              "
              class="w-full duration-1000"
            >
              <li
                @click="activeModule(module.id, m_index, index)"
                v-for="(module, m_index) in i.module"
                :class="
                  useClassroom.local_store.moduleActiveId == module.id
                    ? 'b_cbc'
                    : ''
                "
                class="flex items-center justify-between module_name text-xs pl-9 pr-2 h-8 r_8 cursor-pointer"
              >
                <p class="truncate">{{ module.name }}</p>
                <el-dropdown
                  placement="bottom-end"
                  class="dropdown"
                  trigger="click"
                >
                  <img
                    class="rotate-90 three_dot hidden"
                    src="@/assets/svg/three_dot.svg"
                    alt=""
                  />
                  <template #dropdown>
                    <el-dropdown-menu
                      class="community_dropdown min-w-[200px] dropdown_shadow"
                    >
                      <el-dropdown-item
                        @click="useClassroom.local_store.edit_card = true"
                        >Edit module</el-dropdown-item
                      >
                      <el-dropdown-item @click="useClassroom.delete_module()"
                        >Delete module</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </section>
    <section class="w-full" :class="store.is_open ? '' : 'md:block hidden'">
      <div @click="store.is_open = false" class="md:hidden flex items-center mb-[45px] gap-3 cursor-pointer">
        <img src="@/assets/svg/icon/back.svg" alt="" />
        <p>Back to the course</p>
      </div>
      <div
        class="bg-white r_16 overflow-hidden whitespace-nowrap"
        v-if="!useClassroom.local_store.edit_card"
      >
        <div
          v-if="
            useClassroom.local_store.moduleIndex ||
            useClassroom.local_store.moduleIndex == 0
          "
        >
          <div
            class="flex items-center justify-between border-b border-[#E0E0E0] w-full h-16 px-5 bg-white"
          >
            <h1 class="text-xl font-semibold truncate max-w-[250px]">
              {{
                useClassroom.store.modules[0]?.set[
                  useClassroom.local_store.setIndex
                ]?.module[useClassroom.local_store.moduleIndex]?.name
              }}
            </h1>
            <div class="full_flex gap-4">
              <button
                class="full_flex gap-1 border border-[#BCDEFF] r_8 _c2a h-9 px-3"
              >
                <img src="@/assets/svg/mark_as_read.svg" alt="" />
                <p class="lg:block hidden">Mark as done</p>
              </button>
              <button
                @click="useClassroom.local_store.edit_card = true"
                class="full_flex gap-1 border border-[#BCDEFF] r_8 _c2a h-9 px-3"
              >
                <img src="@/assets/svg/edit.svg" alt="" />
                <p class="lg:block hidden">Edit</p>
              </button>
            </div>
          </div>
          <div class="space-y-5 p-5">
            <div
              v-if="useClassroom.local_store.moduleData?.video"
              class="h-[332px] rounded-xl bg-[#0000004D]"
            >
              <img
                class="h-[332px] w-full object-contain object-center"
                :src="useClassroom.local_store.moduleData?.video"
                alt=""
              />
            </div>
            <p
              v-if="useClassroom.local_store.moduleData?.video_content"
              v-html="useClassroom.local_store.moduleData?.video_content"
            ></p>
          </div>
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
          @click="useClassroom.local_store.addVideoModal = true"
          class="full_flex flex-col cursor-pointer gap-1 md:h-[400px] h-[184px] r_8 mt-5 b_cf2"
        >
          <img src="@/assets/svg/add_video.svg" alt="" />
          <p class="font-medium _c2a">Add video</p>
        </div>
        <div
          v-else
          class="relative full_flex imagelabel video_upload flex-col cursor-pointer overflow-hidden gap-1 md:h-[400px] h-[200px] r_8 mt-5 b_cf2"
        >
          <button
            @click="deleteImage"
            type="button"
            class="absolute deleteimage !hidden top-5 right-5 rounded-full w-10 h-10 full_flex border bg-white"
          >
            <img class="m-auto" src="@/assets/svg/x.svg" alt="" />
          </button>
          <iframe
            disabled
            class="md:h-[400px] h-[200px] w-full object-contain object-center pointer-events-none"
            src="https://www.youtube.com/embed/rOCy-_LDlR8?si=mGScF5aRTphGOYwB"
            title="YouTube video player"
            allow="clipboard-write;"
          ></iframe>
        </div>
        <Editor />

        <div
          class="lg:flex lg:items-center lg:justify-between lg:space-y-0 space-y-4"
        >
          <div
            class="flex items-center lg:justify-center justify-between gap-6 _c07"
          >
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
          <div
            class="flex lg:justify-start justify-end w-full gap-3 text-sm font-semibold"
          >
            <button
              @click="useClassroom.local_store.edit_card = false"
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
      v-model="useClassroom.local_store.addVideoModal"
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
          v-model="useClassroom.local_store.videoLink"
          class="text-sm"
          type="text"
          placeholder="Link"
        />
        <p
          v-if="useClassroom.local_store.is_url"
          class="leading-4 text-red-600 -mb-6 mt-2 vip"
        >
          Invalid video link
        </p>
        <div class="flex justify-end gap-3 mt-7 text-sm font-semibold">
          <button
            @click="useClassroom.local_store.addVideoModal = false"
            type="button"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button
            :class="
              useClassroom.local_store.videoLink ? 'b_cbc _c07' : 'b_ce0 _ca1'
            "
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
      v-model="useClassroom.store.setModal"
      align-center
      width="440"
      class="bg-opacity-50 !rounded-lg py-7 px-6"
    >
      <form @submit.prevent="useClassroom.create_set">
        <h1
          v-if="useClassroom.store.setEdit"
          class="text-2xl mb-7 font-semibold"
        >
          Edit set
        </h1>
        <h1 v-else class="text-2xl mb-7 font-semibold">Add set</h1>
        <input
          v-model="useClassroom.set.name"
          class="text-sm"
          type="text"
          placeholder="Creating a group"
          required
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
              @click="useClassroom.store.setModal = false"
              type="button"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              cancel
            </button>
            <button
              :class="useClassroom.set.name ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('createSet')"
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
definePageMeta({
  layout: "community",
});

import { useLoadingStore, useClassroomStore } from "@/store";

const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();

const store = reactive({
  is_open: false,
});

function activeModule(id, m_index, s_index) {
  useClassroom.local_store.moduleActiveId = id;
  useClassroom.local_store.moduleIndex = m_index;
  useClassroom.local_store.setIndex = s_index;
  useClassroom.local_store.moduleData =
    useClassroom.store.modules[0]?.set[s_index]?.module[m_index];
  for (let i in useClassroom.module) {
    useClassroom.module[i] = useClassroom.local_store.moduleData[i];
  }
  store.is_open = true;
}

function addModuleInSet(id) {
  useClassroom.module.set_id = id;
  useClassroom.local_store.edit_card = true;
  useClassroom.local_store.activeName = id;
  useClassroom.module.name = "New module";
  useClassroom.create_module("new_module");
}

function editSet(set) {
  useClassroom.store.set_id = set.id;
  useClassroom.set.name = set.name;
  useClassroom.store.setEdit = true;
  useClassroom.store.setModal = true;
}

function handleActive(id) {
  if (useClassroom.local_store.activeName == id) {
    useClassroom.local_store.activeName = "";
  } else {
    useClassroom.local_store.activeName = id;
  }
}

function handleVideoLink() {
  useClassroom.local_store.is_url = !isLoading.isURL(
    useClassroom.local_store.videoLink
  );
  if (!useClassroom.local_store.is_url) {
    useClassroom.module.video = useClassroom.local_store.videoLink;
    useClassroom.local_store.addVideoModal = false;
    const url = new URL(useClassroom.local_store.videoLink);
    console.log(url);
  } else {
    useClassroom.module.video = "";
  }
}

function deleteImage() {
  useClassroom.local_store.is_url = "";
  useClassroom.module.video = "";
  useClassroom.local_store.videoLink = "";
}

function handleInput(type) {
  useClassroom.module.name = useClassroom.module?.name?.slice(0, 50);
}

function handleSubmit() {
  useClassroom.module.video_content =
    // document.querySelector(".tiptap").innerHTML;
    useClassroom.update_module();
}

watch(
  () => useClassroom.store.setModal,
  () => {
    if (!useClassroom.store.setModal) {
      useClassroom.store.setEdit = false;
    }
  }
);

onBeforeMount(() => {
  useClassroom.get_module();
});
</script>

<style lang="scss" scoped>
.module_name:hover {
  .three_dot {
    display: block !important;
  }
}
</style>
