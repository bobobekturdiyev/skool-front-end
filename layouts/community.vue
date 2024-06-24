<template>
  <header class="pb-[60px]">
    <NuxtLoadingIndicator />
    <div class="h-[64px] mb-10">
      <Navbar />
    </div>
    <div
      class="pb-[40px] mx-auto xl:px-[200px] lg:px-[100px] md:px-[50px] sm:px-[50px] px-5 max-w-[1536px]"
    >
      <div v-if="useGroup.store.group_by_username.status == 'active' && !isLoading.isLoadingType('getByUsername')">
        <Community_tabs />
      </div>
      <slot />
    </div>
    <Pagination v-if="$router.currentRoute.value.name == 'index'" />

    <!-- cropper image -->
    <el-dialog
      v-model="isLoading.store.inviteModal"
      width="1036px"
      align-center
      class="bg-opacity-50 !p-0 !rounded-lg members_dialog overflow-hidden"
    >
      <MembersModal />
    </el-dialog>
  </header>
</template>

<script setup>
import { useLoadingStore, useGroupStore } from "@/store";
const isLoading = useLoadingStore();
const useGroup = useGroupStore();
</script>

<style lang="scss" scoped></style>
