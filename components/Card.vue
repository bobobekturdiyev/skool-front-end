<template>
  <div v-for="i in 6" class="w-full bg-white r_16 overflow-hidden">
    <div class="relative">
      <p
        class="full_flex text-xs pb-0.5 font-medium absolute w-[30px] h-[30px] bg-white rounded-lg m-3"
      >
        #{{i}}
      </p>
      <img class="w-full object-cover" src="@/assets/image/picture.png" alt="" />
    </div>
    <div class="p-4">
      <div class="flex items-center gap-4">
        <img src="@/assets/image/user.svg" alt="" />
        <h1 class="font-semibold text-lg">Xayot Sharapov</h1>
      </div>
      <p class="mt-4 mb-7">
        Millionlab pullar ishlab topmoqchi bo’lsangiz millionlab insonlarni
        hayotini o’zgartiring.
      </p>
      <div class="flex items-center gap-2 _c07 font-bold text-sm">
        <p class="px-2 py-1 r_8 bg-[#F2F2F2]">Private</p>
        <p class="px-2 py-1 r_8 bg-[#F2F2F2]">226k Members</p>
        <p class="px-2 py-1 r_8 bg-[#F2F2F2]">Paid</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
