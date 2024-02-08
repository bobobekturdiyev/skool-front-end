<template>
  <footer
    class="flex items-center justify-between"
  >
    <div class="flex items-center gap-[14px]">
      <p class="flex items-center c_pointer text-sm gap-2">
        <img src="@/assets/svg/page_arrow.svg" alt="" />
        Prev
      </p>
      <div class="flex text-xs font-medium">
        <p
          v-for="i in 4"
          class="full_flex cursor-pointer b_cbc rounded-xl h-12 w-12"
        >
          {{ i }}
        </p>
        <p class="full_flex h-12 w-12">...</p>
        <p class="full_flex h-12 w-12 cursor-pointer">25</p>
      </div>
      <p class="flex items-center c_pointer text-sm gap-2">
        Next
        <img class="rotate-180" src="@/assets/svg/page_arrow.svg" alt="" />
      </p>
    </div>
    <div>
      <p>1-15 of 25</p>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.ul li {
  cursor: pointer;
}
</style>
