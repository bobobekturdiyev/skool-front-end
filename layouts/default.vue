<template>
  <header class="md:pb-[60px] pb-2 relative">
    <NuxtLoadingIndicator />
    <Pinned class="absolute top-0 left-0" />
    <div class="h-[64px] mb-10">
      <Navbar />
    </div>
    <div
      class="md:pb-8 pb-6 mx-auto xl:px-[200px] lg:px-[100px] md:px-[100px] sm:px-[50px] px-5 max-w-[1536px]"
    >
      <slot />
    </div>
    <Pagination v-if="$router.currentRoute.value.name == 'index'" />
  </header>
</template>

<script setup></script>

<style lang="scss" scoped></style>
