<template>
  <footer
    class="flex items-center justify-between mx-auto lg:px-[200px] md:px-[100px] sm:px-[50px] px-[10px] max-w-[1536px]"
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
    <ul class="flex items-center ul gap-6 text-sm">
      <li>Community</li>
      <li>Affiliates</li>
      <li>Careers</li>
      <li>Privacy</li>
      <li class="flex items-center">
        <el-dropdown placement="top-start">
          <img src="@/assets/svg/footer_dot.svg" alt="" />
          <template #dropdown>
            <el-dropdown-menu class="pagination_dropdown min-w-[140px]">
              <el-dropdown-item>Pricing</el-dropdown-item>
              <el-dropdown-item>Merch</el-dropdown-item>
              <el-dropdown-item>Help</el-dropdown-item>
              <el-dropdown-item>help@skool.com</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.ul li {
  cursor: pointer;
}
</style>
