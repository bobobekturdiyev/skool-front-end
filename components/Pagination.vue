<template>
  <footer
    class="flex lg:flex-row flex-col gap-5 items-center justify-between mx-auto xl:px-[200px] lg::px-[100px] md:px-[50px] sm:px-[50px] px-5 max-w-[1536px]"
  >
    <div class="flex items-center gap-[14px]">
      <p
        @click="changePage('dec')"
        :class="
          isLoading.store.pagination.current_page == 1
            ? 'pointer-events-none opacity-40'
            : ''
        "
        class="flex items-center c_pointer text-sm gap-2"
      >
        <img src="@/assets/svg/page_arrow.svg" alt="" />
        Prev
      </p>
      <el-pagination
        v-model:current-page="isLoading.store.pagination.current_page"
        :page-size="isLoading.store.pagination.per_page"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next"
        :total="isLoading.store.pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="el-pagination"
      />
      <p
        @click="changePage('inc')"
        :class="
          isLoading.store.pagination.current_page ==
          isLoading.store.pagination.last_page
            ? 'pointer-events-none opacity-40'
            : ''
        "
        class="flex items-center c_pointer text-sm gap-2"
      >
        Next
        <img class="rotate-180" src="@/assets/svg/page_arrow.svg" alt="" />
      </p>
    </div>
    <ul class="flex items-center ul md:gap-6 gap-5 text-sm">
      <li>Community</li>
      <li>Affiliates</li>
      <li>Careers</li>
      <li>Privacy</li>
      <li class="full_flex min-w-[40px] h-10">
        <el-dropdown placement="top-start">
          <img src="@/assets/svg/footer_dot.svg" alt="" />
          <template #dropdown>
            <el-dropdown-menu
              class="pagination_dropdown min-w-[140px] dropdown_shadow !mb-2 sm:!-ml-3 !-ml-28"
            >
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

<script setup>
import { useLoadingStore } from "@/store";

const isLoading = useLoadingStore();

function changePage(type) {
  if (type == "dec") {
    if (isLoading.store.pagination.current_page == 1) {
      return;
    }
    isLoading.store.pagination.current_page -= 1;
  } else if (type == "inc") {
    if (
      isLoading.store.pagination.current_page ==
      isLoading.store.pagination.last_page
    ) {
      return;
    } else {
      isLoading.store.pagination.current_page += 1;
    }
  } else {
    isLoading.store.pagination.current_page = type;
  }

  isLoading.changeQuery("page", isLoading.store.pagination.current_page);
  if (isLoading.store.page_name == "group") {}
}

const handleCurrentChange = (val) => {
  changePage(val)
}
</script>

<style lang="scss" scoped>
.ul li {
  cursor: pointer;
}
</style>
