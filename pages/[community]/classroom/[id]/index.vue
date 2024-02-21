<template>
  <main class="flex gap-6">
    <section class="min-w-[280px]">
      <div class="b_cd9 rounded-xl p-5">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold">Skool 101</h1>
          <img src="@/assets/svg/three_dot.svg" alt="" />
        </div>
        <div class="mt-10">
          <el-progress class="module_progress" :percentage="45" />
          <p class="text-xs mt-2">45% complete</p>
        </div>
      </div>

      <aside>
        <ul class="_c07 text-sm mt-5">
          <li v-for="i in 5">
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
                <p
                  :class="store.activeName == i ? 'b_c2a' : 'bg-transparent'"
                  class="mr-4 w-1 h-[44px]"
                ></p>
                Creating a group
                <div class="flex items-center gap-[10px]">
                  <img
                    class="rotate-90"
                    src="@/assets/svg/three_dot.svg"
                    alt=""
                  />
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
              <li class="flex items-center text-xs px-9 h-8">Lesson 1</li>
              <li class="flex items-center text-xs px-9 h-8">Lesson 2</li>
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
          <p class="text-end mt-2 _ca1 text-sm">0/50</p>
        </div>
        <div class="full_flex flex-col gap-1 h-[400px] r_8 mt-5 b_cf2">
          <img src="@/assets/svg/add_video.svg" alt="" />
          <p class="font-medium _c2a">Add video</p>
        </div>
        <textarea
          v-model="useClassroom.module.video_content"
          id="write_message"
          class="h-[90px] text-sm w-full rounded-[4px] my-6"
          placeholder="Course description"
        ></textarea>

        <div class="flex items-center justify-between">
          <div class="full_flex gap-6 _c07">
            <button
              class="full_flex gap-2 text-sm border border-[#E0E0E0] rounded-[4px] px-3"
            >
              Add <img src="@/assets/svg/select_arrow.svg" alt="" />
            </button>
            <div class="flex items-center gap-6">
              <p class="text-[16px] font-medium">Published</p>
              <el-switch v-model="store.activeName" class="ml-2" />
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
              :class="false ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('createModule')"
            >
              save
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { useLoadingStore, useClassroomStore } from "@/store";

const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();
const store = reactive({
  activeName: 1,
  edit_card: false,
});

function handleActive(id) {
  if (store.activeName == id) {
    store.activeName = "";
  } else {
    store.activeName = id;
  }
}

function handleInput(type) {
  useClassroom.create.title = useClassroom.create.title?.slice(0, 50);
}

function handleSubmit() {
  useClassroom.create_module();
}
</script>

<style lang="scss" scoped></style>
