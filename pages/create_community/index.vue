<template>
  <form @submit.prevent="useGroup.create_community">
    <label for="group_name" class="_ca1 mb-2 block">Group name</label>
    <input
      id="group_name"
      type="text"
      v-model="useGroup.community.name"
      name="credit-cvc"
      placeholder="Group name"
    />
    <button
      class="border w-full border-[#BCDEFF] _c2a font-semibold uppercase px-6 rounded-[6px]"
    >
      START FREE TRIAL
    </button>
  </form>
</template>

<script setup>
definePageMeta({
  layout: false,
});
import {useGroupStore } from "@/store"

const useGroup = useGroupStore();
function handleSubmit(e) {
  console.log(e);
}
</script>

<style lang="scss" scoped></style>
