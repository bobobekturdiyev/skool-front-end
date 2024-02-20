<template>
  <div class="grid grid-cols-3 gap-6 justify-between my-8 mt-[18px]">
    <div
      v-if="isLoading.isLoadingType('getClassrooms')"
      v-for="i in 10"
      class="w-full bg_loading animate-pulse h-[400px] r_16 overflow-hidden"
    >
      <div
        class="w-full card md:h-[180px] sm:h-[140px] h-[120px] object-cover bg-gray-600"
      ></div>
    </div>
    <div
      v-else
      v-for="i in useClassroom.store.classrooms"
      data-aos="zoom-in"
      class="w-full bg-white r_16 overflow-hidden"
    >
      <div>
        <img
          class="w-full card md:h-[180px] sm:h-[140px] h-[120px] object-cover"
          :src="i.image"
          alt=""
        />
      </div>
      <div class="p-4">
        <div class="flex items-center gap-4">
          <h1 class="font-semibold text-xl">{{ i.title }}</h1>
        </div>
        <p class="mt-4 mb-7 line-clamp-2">
          {{ i.description }}
        </p>
        <el-progress class="class_progress" :percentage="45" />
        <p class="text-xs mt-2">45% complete</p>
      </div>
      <router-link
        :to="`/${$router.currentRoute.value.params.community}/classroom/${i.slug}`"
      >
        <button
          class="full_flex w-full border-t class_btn duration-700 border-[#BCDEFF] h-[50px] _c59 font-medium uppercase"
        >
          open
        </button></router-link
      >
    </div>
    <div
      class="grid relative border-2 text-[#59ACFF] full_flex flex-col gap-[10px] font-semibold border_dashed r_16"
    >
      <svg
        class="absolute top-0 right-0 h-full min-w-full"
        viewBox="0 0 330 403"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          class="w-full "
          x="1"
          y="1"
          height="401"
          rx="15"
          stroke="#BCDEFF"
          stroke-width="2"
          stroke-dasharray="12 12"
        />
      </svg>
      <img src="@/assets/svg/add_course.svg" alt="" />
      <p>Add new cource</p>
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore, useClassroomStore } from "@/store";

const useClassroom = useClassroomStore();
const isLoading = useLoadingStore();

isLoading.addLoading("getClassrooms");

onBeforeMount(() => {
  useClassroom.get_classroom();
});
</script>

<style lang="scss" scoped></style>
