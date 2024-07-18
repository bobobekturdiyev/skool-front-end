<template>
  <div class="min-h-screen overflow-y-auto !max-h-[100vh]">
    <main class="full_flex gap-10 min-h-screen p-5">
      <section class="md:block hidden w-[500px]">
        <router-link to="/">
          <img src="/logo.svg" alt="" />
        </router-link>
        <p class="text-lg font-semibold my-8">Everything you need to build community and make money online.</p>
        <ul class="space-y-6">
          <li class="flex gap-1"><span class="w-6 full_flex">📈</span> Highly engaged</li>
          <li class="flex gap-1"><span class="w-6 full_flex">💖</span> Simple to setup</li>
          <li class="flex gap-1"><span class="w-6 full_flex">🙂</span> Fun to use</li>
          <li class="flex gap-1"><span class="w-6 full_flex">💰</span> Charge for membership</li>
          <li class="flex gap-1"><span class="w-6 full_flex">📱</span> iOS + Android apps</li>
          <li class="flex gap-1"><span class="w-6 full_flex">🌎</span> Millions of users daily</li>
        </ul>
        <a target="_blank" rel="noopener noreferrer" href="mailto:help@skool.com"
          class="_ca1 text-sm mt-9 block hover:underline">help@skool.com</a>
      </section>
      <section class="w-[500px] bg-white p-8 rounded-xl">
        <p class="text-lg font-semibold text-center">Create your community</p>
        <p class="text-center mt-4 mb-9">Free for 14 days, then $99/month. Cancel anytime. <br />
          All features. Unlimited everything. No hidden fees.</p>
        <form @submit.prevent="useGroup.create_community">
          <label for="name" class="_ca1 mb-2 block">Group name</label>
          <input id="group_name" type="text" v-model="useGroup.community.name" placeholder="Group name" />
          <p class="flex justify-between text-end mt-2 _ca1 text-xs">
            <span>You can change this later</span>
            <span>{{ useGroup.community.name?.length }} / 30</span>
          </p>
          <div>
            <label for="name" class="_ca1 mb-2 block mt-5">Card number</label>
            <div class="flex items-center justify-between">
              <input @input="usePayment.getCardType" v-model="usePayment.card.cardNumber"
                class="placeholder-[#A1A1A1] w-full" type="text" name="credit-number" placeholder="0000 0000 0000 0000"
                required>
              <div class="flex items-center gap-2 -ml-[108px] pr-3">
                <img v-if="usePayment.store.cardType.type == 'visa'" src="@/assets/svg/billing/electron.svg" alt="">
                <img v-else-if="usePayment.store.cardType.type == 'maestro'" src="@/assets/svg/billing/maestro.svg"
                  alt="">
                <img v-else-if="usePayment.store.cardType.type == 'mastercard'"
                  src="@/assets/svg/billing/mastercard.svg" alt="">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-5 mt-4">
              <div>
                <label for="name" class="_ca1 mb-2 block">Exp. date</label>
                <input v-model="usePayment.card.expiryDate" class="w-full placeholder-[#A1A1A1]" type="text"
                  name="credit-expires" placeholder="MM/YY" required>
              </div>
              <div>
                <label for="name" class="_ca1 mb-2 block">CVV</label>
                <input class="w-full placeholder-[#A1A1A1]" type="number" name="credit-cvc" placeholder="123">
              </div>
            </div>
          </div>
          <p class="text-xs mt-7 mb-6">
            Your first charge will be on July 30th, 2024 for $99. Cancel anytime with 1-click. By clicking below, you
            accept our <a href="#" target="_blank" class="underline">terms</a>.
          </p>
          <button class="w-full font-semibold uppercase px-6 rounded-[6px]"
            v-loading="isLoading.isLoadingType('createCommunity')"
            :class="useGroup.community.name ? 'b_cbc _c07' : 'b_ce0 _ca1'">
            START FREE TRIAL
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});
import { useGroupStore, usePaymentStore, useLoadingStore } from "@/store"
const isLoading = useLoadingStore();
const usePayment = usePaymentStore();
const useGroup = useGroupStore();
</script>

<style lang="scss" scoped></style>
