<template>
  <main>
    <section>
      <ClassCard />
    </section>
    <Pagination_card />
  </main>
</template>

<script setup>
import {useLoadingStore} from "@/store"
definePageMeta({
  layout: "community",
});

const isLoading = useLoadingStore();
isLoading.store.page_name = "classroom";
</script>

<style lang="scss" scoped></style>
