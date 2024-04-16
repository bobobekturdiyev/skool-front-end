<template>
  <!-- info card -->
  <section class="min-w-[200px] md:max-w-[280px]">
    <div class="rounded-2xl overflow-hidden bg-white">
      <img
        class="w-full h-[150px] object-cover"
        :src="useGroup.store.group_by_username[0]?.image"
        alt=""
      />
      <div class="p-4 space-y-4">
        <h1 class="font-medium text-lg">
          {{ useGroup.store.group_by_username[0]?.name }}
        </h1>
        <p class="flex items-center _ca1 gap-1">
          <img src="@/assets/svg/community/grey_private.svg" alt="" />
          {{
            useGroup.store.group_by_username[0]?.group_type == "private"
              ? "Private group"
              : "Public group"
          }}
        </p>
        <pre class="text-sm leading-[21px] whitespace-pre-line">{{
          useGroup.store.group_by_username[0]?.description
        }}</pre>
        <div class="flex items-center justify-between text-xs text-center">
          <div>
            <p class="_c2a text-lg">226k</p>
            <p class="_ca1">Members</p>
          </div>
          <div>
            <p class="_c2a text-lg">15k</p>
            <p class="_ca1">Online</p>
          </div>
          <div>
            <p class="_c2a text-lg">100</p>
            <p class="_ca1">Admins</p>
          </div>
        </div>
        <button
          @click="
            $router.push(`/${$router.currentRoute.value.params.community}`)
          "
          class="b_cbc rounded-lg w-full font-semibold text-sm uppercase"
        >
          join group
        </button>
      </div>
    </div>
    <div
      v-if="$router.currentRoute.value.name == 'community-about'"
      class="full_flex mt-8 gap-2 leading-[18px]"
    >
      <p>Powered by</p>
      <img class="h-3 mt-0.5" src="/logo.svg" alt="" />
    </div>
  </section>
</template>

<script setup>
import { useLoadingStore, useGroupStore } from "@/store";

const isLoading = useLoadingStore();
const useGroup = useGroupStore();
</script>

<style lang="scss" scoped></style>
