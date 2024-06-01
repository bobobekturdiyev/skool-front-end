<template>
  <!-- info card -->
  <section class="min-w-[200px] md:max-w-[280px]">
    <div class="rounded-2xl overflow-hidden bg-white">
      <img
        class="w-full h-[150px] object-cover"
        :src="useGroup.store.group_by_username?.image"
        alt=""
      />
      <div class="p-4 space-y-4">
        <h1 class="font-medium text-lg">
          {{ useGroup.store.group_by_username?.name }}
        </h1>
        <p class="flex items-center _ca1 gap-1">
          <img src="@/assets/svg/community/grey_private.svg" alt="" />
          {{
            useGroup.store.group_by_username?.group_type == "private"
              ? "Private group"
              : "Public group"
          }}
        </p>
        <pre class="text-sm leading-[21px] whitespace-pre-line">{{
          useGroup.store.group_by_username?.excerpt
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
          @click="joinToGroup"
          class="b_cbc rounded-lg w-full font-semibold text-sm"
        >
          {{
            useGroup.store.group_by_username.group_price == "free"
              ? "JOIN GROUP"
              : `JOIN $${useGroup.store.group_by_username.price} /month`
          }}
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
import { useLoadingStore, useGroupStore, usePaymentStore } from "@/store";

const router = useRouter();
const isLoading = useLoadingStore();
const useGroup = useGroupStore();
const usePayment = usePaymentStore();

function joinToGroup() {
  console.log(useGroup.store.group_by_username);
  if (useGroup.store.group_by_username.group_price == "paid") {
    usePayment.store.joinToGroupModal = true;
  } else {
    router.push(`/${router.currentRoute.value.params.community}`);
  }
}
</script>

<style lang="scss" scoped></style>
