<template>
  <header class="pb-[60px]">
    <div class="h-[64px] mb-10">
      <Navbar />
    </div>
    <div
      class="pb-[40px] mx-auto lg:px-[200px] md:px-[100px] sm:px-[50px] px-[10px] max-w-[1536px]"
    >
      <div>
        <Community_tabs />
      </div>
      <slot />
    </div>
    <Pagination v-if="$router.currentRoute.value.name == 'index'" />
  </header>
</template>

<script setup></script>

<style lang="scss" scoped></style>
