<template>
  <main class="flex md:flex-row flex-col-reverse md:gap-6 mt-[18px]">
    <div class="overflow-hidden w-full md:space-y-8 space-y-6">
      <p class="font-semibold">
        {{ useMembers.store.member_requests.length }} membership requests
      </p>

      <!-- posts -->
      <section class="md:space-y-5 space-y-4">
        <LoadingDiv
          v-if="isLoading.isLoadingType('groupMembesRequest')"
          v-for="i in 10"
          class="min-h-[200px] w-full r_16 overflow-hidden"
        />
        <div
          v-else-if="!useMembers.store.member_requests.length"
          class="min-h-[30vh] full_flex col-span-4"
        >
          No data
        </div>
        <article
          v-else
          v-for="i in useMembers.store.member_requests"
          data-aos="zoom-in"
          class="relative md:flex items-start r_16 p-4 overflow-hidden bg-white"
        >
          <div class="flex items-start gap-4 w-full">
            <el-dropdown placement="top-start" class="dropdown">
              <div class="relative max-w-fit">
                <img
                  class="h-10 w-10 object-cover rounded-full"
                  :src="i.user?.image"
                  alt=""
                />
                <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                  <div class="relative">
                    <img
                      src="@/assets/svg/community/user_messages.svg"
                      alt=""
                    />
                    <p
                      class="absolute full_flex bottom-0 w-5 h-5 pb-0.5 text-[10px] text-white font-medium"
                    >
                      1
                    </p>
                  </div>
                </div>
              </div>
              <template #dropdown>
                <el-dropdown-menu
                  class="!static min-w-[440px] max-w-[440px] !-ml-1 dropdown_shadow"
                >
                  <div class="flex">
                    <div
                      class="border-r border-[#F2F2F2] min-w-[192px] p-4 space-y-3"
                    >
                      <div class="relative user_img max-w-fit">
                        <img
                          class="h-[160px] w-[160px] object-cover rounded-full"
                          :src="i.user?.image"
                          alt=""
                        />
                        <div
                          class="full_flex absolute -bottom-[2px] -right-[5px] z-10"
                        >
                          <div class="relative">
                            <img
                              class="h-10 w-10"
                              src="@/assets/svg/community/user_messages.svg"
                              alt=""
                            />
                            <p
                              class="absolute full_flex bottom-0 w-10 h-10 pb-2 text-[22px] text-white font-medium"
                            >
                              1
                            </p>
                          </div>
                        </div>
                      </div>
                      <p
                        class="full_flex max-w-fit mx-auto text-xs font-semibold h-8 px-[10px] bg-[#D9ECFF] _c2a rounded-full"
                      >
                        Level 2 - Contributer
                      </p>
                      <div class="full_flex gap-1 text-xs">
                        <span class="_c2a font-semibold">40</span> points to
                        level up
                        <img src="@/assets/svg/level_up.svg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div
                        class="space-y-4 px-5 py-5 v border-b border-[#F2F2F2]"
                      >
                        <h1 class="font-semibold text-xl leading-6">
                          Gerry Gonzalez
                        </h1>
                        <ul class="space-y-2">
                          <li
                            class="flex items-center gap-2 leading-[14px] _ca1"
                          >
                            <img src="@/assets/svg/clock.svg" alt="" />
                            <p>Active 19d ago</p>
                          </li>
                          <li class="flex items-center gap-2 _ca1">
                            <img src="@/assets/svg/location.svg" alt="" />
                            <p>San Jose, Costa Rica</p>
                          </li>
                        </ul>
                        <p
                          class="line-clamp-3 overflow_hidden leading-[18px] text-[16px]"
                        >
                          We the descendants of old, chained up and confined
                          within bars, are free spirited and apple apple
                        </p>
                      </div>
                      <div class="space-y-2 leading-[14px] p-4 font-semibold">
                        <p>2 Memberships</p>
                        <p>Creator of 2 groups</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="grid grid-cols-3 gap-3 border-t border-[#F2F2F2] p-4 font-semibold text-sm w-full"
                  >
                    <button class="uppercase border border-[#BCDEFF] r_8">
                      profile
                    </button>
                    <button class="uppercase border border-[#BCDEFF] r_8">
                      follow
                    </button>
                    <button
                      @click="openChatModal(i.user)"
                      class="full_flex gap-[10px] uppercase b_ce0 _ca1 r_8"
                    >
                      chat
                      <img src="@/assets/svg/chat_x.svg" alt="" />
                    </button>
                  </div>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div class="space-y-[2px]">
              <h1 class="font-semibold">
                {{ i.user?.name }} {{ i.user?.surname }}
              </h1>
              <p class="text-xs">
                {{ i.user?.address }}
              </p>
              <p class="text-xs">Requested {{ formatDate(i.created_at) }}</p>
              <p><span class="font-bold">Bio: </span>{{ i.user?.bio }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleRequest('active', i.user?.id)"
              class="uppercase border border_ce0 r_8 px-4"
            >
              Approve
            </button>
            <button
              @click="handleRequest('cancel', i.user?.id)"
              class="uppercase border border_ce0 r_8 px-4"
            >
              Decline
            </button>
            <el-dropdown
              placement="bottom-end"
              class="border_ce0 dropdown r_8"
              trigger="click"
            >
              <div class="h-10 full_flex w-10">
                <img class="w-5 h-5" src="@/assets/svg/three_dot.svg" alt="" />
              </div>
              <template #dropdown>
                <el-dropdown-menu
                  class="community_dropdown min-w-[200px] dropdown_shadow"
                >
                  <el-dropdown-item>Chat</el-dropdown-item>
                  <el-dropdown-item>View profile</el-dropdown-item>
                  <el-dropdown-item>Ban from group</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </article>
        <!-- <Pagination_card class="pt-3" /> -->
      </section>
    </div>
    <GroupInfoCard />
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useMemberStore, useLoadingStore, useGroupStore } from "@/store";
import { useFormatDate } from "@/composables";

const { formatDate } = useFormatDate();
const useMembers = useMemberStore();
const useGroup = useGroupStore();
const isLoading = useLoadingStore();
const router = useRouter();
isLoading.addLoading("groupMembesRequest");

function handleRequest(type, id) {
  useMembers.store.user_id = id;
  useMembers.store.status = type;
  useMembers.setMemberJoinType();
}

onBeforeMount(() => {
  useMembers.getMemberRequests();
});
</script>

<style lang="scss" scoped>
.textarea_icon {
  .icon {
    height: 40px;
    width: 40px;
    cursor: pointer;
    &:hover {
      background: #f2f2f2;
      border-radius: 8px;
    }
  }
}
</style>
