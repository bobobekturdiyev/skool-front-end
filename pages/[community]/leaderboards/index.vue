<template>
  <main class="mt-[10px]">
    <section class="bg-white rounded-xl p-5 pb-[60px]">
      <img class="mb-4" src="@/assets/svg/leaderboards/settings.svg" alt="">
      <div class="sm:flex lg:gap-20 gap-10">
        <div class="flex flex-col items-center relative min-w-[240px]">
          <el-progress :stroke-width="11" type="circle" :percentage="5" />
          <div class="absolute mx-auto top-[14.5px]">
            <div class="relative max-w-fit">
              <img class="h-[138px] w-[138px] rounded-full object-cover" :src="isLoading.user.image" alt="" />
              <div class="full_flex absolute -bottom-[2px] -right-[16px] z-10">
                <div class="relative">
                  <img class="h-10 w-10" src="@/assets/svg/community/user_messages.svg" alt="" />
                  <p class="absolute full_flex bottom-0 h-10 w-10 pb-1 text-[22px] text-white font-medium">
                    1
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h1 class="text-xl font-semibold mt-5 w-full text-center truncate">{{ isLoading.user?.name }} {{
            isLoading.user?.surname }}</h1>
          <button class="my-5 mb-3 _c2a font-semibold text-xs b_cd9 h-8 px-[10px] rounded-full">Level 1 -
            STARTER</button>
          <div class="flex items-center gap-1 text-xs">
            <p class="_c2a">40</p>
            <p class="_c07">points to level up</p>
            <img src="@/assets/svg/members/pending.svg" alt="">
          </div>
        </div>
        <div class="md:grid grid-cols-2 gap-5 w-full sm:mt-0 mt-8">
          <div>
            <div v-show="index < 5" class="max-w-[310px]" v-for="(i, index) in useMembers.store.levels">
              <div v-if="index != 0" class="h-6 w-[42px] overflow-hidden my-1">
                <img class="mx-auto" src="@/assets/svg/leaderboards/line.svg" alt="">
              </div>
              <div class="flex items-center gap-5">
                <p v-if="i.completed" class="full_flex font-medium min-w-[42px] h-[42px] r_8 b_cbc">{{ index + 1 }}</p>
                <p v-else class="full_flex font-medium min-w-[42px] h-[42px] r_8 b_cf2">
                  <img src="@/assets/svg/members/private.svg" alt="">
                </p>
                <div class="_c07 space-y-1">
                  <p class="font-semibold leading-[19px]">{{ i.level }} - {{i.custom_name}}</p>
                  <p class="text-xs leading-[14px]">{{i.points}}% of members </p>
                </div>
              </div>
            </div>
          </div>
          <div class="sm:hidden block h-6 w-[42px] overflow-hidden my-1">
                <img class="mx-auto" src="@/assets/svg/leaderboards/line.svg" alt="">
              </div>
          <div>
            <div v-show="index > 4" class="max-w-[310px]" v-for="(i, index) in useMembers.store.levels">
              <div v-if="index != 5" class="h-6 w-[42px] overflow-hidden my-1">
                <img class="mx-auto" src="@/assets/svg/leaderboards/line.svg" alt="">
              </div>
              <div class="flex items-center gap-5">
                <p v-if="i.completed" class="full_flex font-medium min-w-[42px] h-[42px] r_8 b_cbc">{{ index + 6 }}</p>
                <p v-else class="full_flex font-medium min-w-[42px] h-[42px] r_8 b_cf2">
                  <img src="@/assets/svg/members/private.svg" alt="">
                </p>
                <div class="_c07 space-y-1">
                  <p class="font-semibold leading-[19px]">{{ i.level }} - {{i.custom_name}}</p>
                  <p class="text-xs leading-[14px]">{{i.points}}% of members </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <p class="py-6 _c07">Leaderboards will be updated when there is more activity</p>
      <div class="grid md:grid-cols-3 gap-5">
        <div class="bg-white r_8 text-center">
          <h1 class="font-semibold py-5">Leaderboard (7-day)</h1>
          <hr class="border_ce0" />
          <div class="space-y-2 py-6 _ca1 text-xs">
            <img class="mx-auto" src="@/assets/svg/leaderboards/pending.svg" alt="">
            <p>No activity yet</p>
          </div>
        </div>
        <div class="bg-white r_8 text-center">
          <h1 class="font-semibold py-5">Leaderboard (30-day)</h1>
          <hr class="border_ce0" />
          <div class="space-y-2 py-6 _ca1 text-xs">
            <img class="mx-auto" src="@/assets/svg/leaderboards/pending.svg" alt="">
            <p>No activity yet</p>
          </div>
        </div>
        <div class="bg-white r_8 text-center">
          <h1 class="font-semibold py-5">Leaderboard (all-time)</h1>
          <hr class="border_ce0" />
          <div class="space-y-2 py-6 _ca1 text-xs">
            <img class="mx-auto" src="@/assets/svg/leaderboards/pending.svg" alt="">
            <p>No activity yet</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useAuthStore, useMemberStore, useLoadingStore } from '~/store';

const useAuth = useAuthStore();
const useMembers = useMemberStore();
const isLoading = useLoadingStore();

onBeforeMount(() => {
  useAuth.getUser();
  useMembers.getLevels();
})
</script>

<style lang="scss" scoped></style>
