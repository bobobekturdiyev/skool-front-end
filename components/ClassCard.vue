<template>
  <div v-for="i in 6" data-aos="zoom-in" class="w-full bg-white r_16 overflow-hidden">
    <div>
      <img
        class="w-full object-cover"
        src="@/assets/image/picture.png"
        alt=""
      />
    </div>
    <div class="p-4">
      <div class="flex items-center gap-4">
        <h1 class="font-semibold text-xl">Skool 101</h1>
      </div>
      <p class="mt-4 mb-7">
        A small course showing you how to use Skool and how to create your own
        group.
      </p>
      <el-progress class="class_progress" :percentage="45" />
      <p class="text-xs mt-2">45% complete</p>
    </div>
    <router-link to="/">
      <button
        class="full_flex w-full border-t class_btn duration-700 border-[#BCDEFF] h-[50px] _c59 font-medium uppercase"
      >
        open
      </button></router-link
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
