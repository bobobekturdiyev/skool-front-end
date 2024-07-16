<template>
  <main class="md:flex gap-6">
    <div class="w-full">
      <nav class="flex items-center xl:flex-row flex-col-reverse xl:gap-0 gap-6 whitespace-nowrap justify-between mt-5">
        <div class="flex gap-3 mr-auto">
          <button v-if="user_roles.includes(useMembers.store.members.type)" v-for="i in categories" :class="$router.currentRoute.value.query?.type == i[0]
            ? 'b_cbc'
            : 'bg-white'
            " @click="isLoading.changeQuery('type', i[0])"
            class="py-2 px-3 space-x-1 rounded-full hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">
            <span class="capitalize">{{ i[0] }}</span>
            <span>{{ useMembers.store.members[i[1]] }}</span>
          </button>
          <button v-else v-for="i in categories_members" :class="$router.currentRoute.value.query?.type == i[0]
            ? 'b_cbc'
            : 'bg-white'
            " @click="isLoading.changeQuery('type', i[0])"
            class="py-2 px-3 rounded-full hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">
            <soan class="capitalize">{{ i[0] }}</soan>
            <span>{{ useMembers.store.members[i[1]] }}</span>
          </button>
        </div>
        <div class="flex gap-3 ml-auto">
          <el-dropdown placement="bottom-start" trigger="click" :hide-on-click="false" class="filter_btn">
            <button class="flex items-center gap-1 py-2 px-3 rounded-full bg-white">
              <img src="@/assets/svg/filter.svg" alt="" /> <span>Filter</span>
            </button>
            <template #dropdown>
              <el-dropdown-menu class="min-w-[328px] filter_dropdown dropdown_shadow 2xl:!-ml-[60px]">
                <div class="flex items-center mb-6 justify-between">
                  <h1 class="text-2xl font-semibold">Filters</h1>
                  <button class="uppercase font-semibold text-sm _c07 b_cbc h-10 px-6 r_8">
                    apply
                  </button>
                </div>
                <div class="flex">
                  <div class="w-[150px] border-r border-[#E0E0E0]">
                    <h1 class="text-sm font-medium px-8 mb-2">Status</h1>
                    <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                      <el-checkbox class="members_checkbox" label="Admins" />
                    </el-dropdown-item>
                    <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                      <el-checkbox class="members_checkbox" label="Online" />
                    </el-dropdown-item>
                  </div>
                  <div class="w-[150px]">
                    <h1 class="text-sm font-medium px-8 mb-2">Price</h1>
                    <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                      <el-checkbox class="members_checkbox" label="Free" />
                    </el-dropdown-item>
                  </div>
                  <div class="w-[150px]">
                    <h1 class="text-sm font-medium px-8 mb-2">Courses</h1>
                    <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                      <el-checkbox class="members_checkbox" label="Copywriting" />
                    </el-dropdown-item>
                  </div>
                  <div class="w-[150px]">
                    <h1 class="text-sm font-medium px-8 mb-2">Sort</h1>
                    <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                      <input id="price_all" class="rounded-full" type="radio" name="price" />
                      <label for="price_all">Newest</label>
                    </el-dropdown-item>
                    <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                      <input id="price_public" class="rounded-full" type="radio" name="price" />
                      <label for="price_public">Last active</label>
                    </el-dropdown-item>
                    <el-dropdown-item class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs">
                      <input id="price_private" class="rounded-full" type="radio" name="price" />
                      <label for="price_private">Most points</label>
                    </el-dropdown-item>
                  </div>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <button
            class="full_flex gap-1 py-2 px-3 rounded-full bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">
            <img src="@/assets/svg/export.svg" alt="" />
            <span>Export</span>
          </button>
          <button @click="isLoading.store.inviteModal = true"
            class="gap-1 uppercase py-2 px-6 r_8 b_cbc _c07 bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">
            invite
          </button>
        </div>
      </nav>

      <section v-if="isLoading.isLoadingType('groupMembes')" class="space-y-3 mt-5">
        <LoadingDiv v-for="i in 5" class="h-[200px] w-full bg-gray-700 animate-pulse rounded-xl"></LoadingDiv>
      </section>
      <section v-else-if="!useMembers.store.members.data?.length" class="min-h-[30vh] full_flex col-span-4">
        No data
      </section>
      <section class="space-y-3 mt-5 w-full" v-else>
        <article v-for="member in useMembers.store.members.data" data-aos="zoom-in"
          class="relative md:flex r_16 overflow-hidden p-4 bg-white">
          <div class="w-full">
            <div class="flex items-start justify-between w-full">
              <div class="flex items-start gap-4">
                <el-dropdown placement="top-start" class="dropdown">
                  <div class="relative max-w-fit min-w-[40px]">
                    <img class="h-10 w-10 object-cover rounded-full" :src="member.user?.image" alt="" />
                    <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                      <div class="relative">
                        <img src="@/assets/svg/community/user_messages.svg" alt="" />
                        <p class="absolute full_flex bottom-0 w-5 h-5 pb-0.5 text-[10px] text-white font-medium">
                          1
                        </p>
                      </div>
                    </div>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu class="!static min-w-[440px] max-w-[440px] !-ml-1 dropdown_shadow">
                      <div class="flex">
                        <div class="border-r border-[#F2F2F2] min-w-[192px] p-4 space-y-3">
                          <div class="relative user_img max-w-fit">
                            <img class="h-[160px] w-[160px] object-cover rounded-full" src="@/assets/image/user.svg"
                              alt="" />
                            <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                              <div class="relative">
                                <img class="h-10 w-10" src="@/assets/svg/community/user_messages.svg" alt="" />
                                <p
                                  class="absolute full_flex bottom-0 w-10 h-10 pb-2 text-[22px] text-white font-medium">
                                  1
                                </p>
                              </div>
                            </div>
                          </div>
                          <p
                            class="full_flex max-w-fit mx-auto text-xs font-semibold h-8 px-[10px] bg-[#D9ECFF] _c2a rounded-full">
                            Level 2 - Contributer
                          </p>
                          <div class="full_flex gap-1 text-xs">
                            <span class="_c2a font-semibold">40</span> points to
                            level up
                            <img src="@/assets/svg/level_up.svg" alt="" />
                          </div>
                        </div>
                        <div>
                          <div class="space-y-4 px-5 py-5 v border-b border-[#F2F2F2]">
                            <h1 class="font-semibold text-xl leading-6">
                              Gerry Gonzalez
                            </h1>
                            <ul class="space-y-2">
                              <li class="flex items-center gap-2 leading-[14px] _ca1">
                                <img src="@/assets/svg/clock.svg" alt="" />
                                <p>Active 19d ago</p>
                              </li>
                              <li class="flex items-center gap-2 _ca1">
                                <img src="@/assets/svg/location.svg" alt="" />
                                <p>San Jose, Costa Rica</p>
                              </li>
                            </ul>
                            <p class="line-clamp-3 overflow_hidden leading-[18px] text-[16px]">
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
                      <div class="grid grid-cols-3 gap-3 border-t border-[#F2F2F2] p-4 font-semibold text-sm w-full">
                        <button class="uppercase border border-[#BCDEFF] r_8">
                          profile
                        </button>
                        <!-- <button class="uppercase border border-[#BCDEFF] r_8">
                          follow
                        </button>
                        <button class="full_flex gap-[10px] uppercase b_ce0 _ca1 r_8">
                          chat
                          <img src="@/assets/svg/chat_x.svg" alt="" />
                        </button> -->
                      </div>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <div class="space-y-[26px]">
                  <div class="space-y-[2px]">
                    <h1 class="font-semibold">
                      {{ member.user?.name }}
                      {{ member.user?.surname }}
                      <span v-show="member.type != 'Member'" class="_c59 font-medium text-xs">({{ member.type }})</span>
                    </h1>
                    <p class="text-xs">
                      @{{ member.user?.username }}
                    </p>
                  </div>
                  <div>
                    <h1 class="text-sm">
                      {{ member.user?.bio }}
                    </h1>
                    <div class="grid md:grid-cols-4 gap-3 whitespace-nowrap mt-3 text-sm">
                        <!-- <button class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8">
                          <img class="h-3 w-3" src="@/assets/svg/online.svg" alt="" />
                          Online now
                        </button> -->
                        <button class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8">
                          <img class="h-4 w-4" src="@/assets/svg/calendar_black.svg" alt="" />
                          <span class="max-w-[80%]">Joined {{ formatDate(member.created_at) }}</span>
                        </button>
                        <button v-if="member.user.address" class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8">
                          <img class="h-4 w-4" src="@/assets/svg/location_black.svg" alt="" />
                          <span class="max-w-[95%] truncate">{{ member.user.address }}</span>
                        </button>
                        <button class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8">
                          <img class="h-4 w-4" src="@/assets/svg/free.svg" alt="" />
                          {{ member.group_price == "free" ? "Free" : "Paid" }}
                        </button>
                        <button class="full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8">
                          <img class="h-4 w-4" src="@/assets/svg/access.svg" alt="" />
                          Lifetime access
                        </button>
                        <button v-if="member.status == 'churned'" class="_ceb full_flex col-span-2 truncate max-w-fit gap-1 b_cf2 h-7 px-2 r_8">
                          <img class="h-4 w-4 border border-[#eb5757] rounded-full p-[4px]" src="@/assets/svg/red_x.svg" alt="" />
                          Churned {{formatDate(member.churned_date)}}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="full_flex gap-2">
                <!-- <button v-if="isLoading.user.id != member.user?.id" class="full_flex gap-3 h-10 b_ce0 _ca1 px-4 r_8">
                  Chat
                  <img src="@/assets/svg/chat_cross.svg" alt="" />
                </button> -->
                <button @click="userManageRole(member)" v-if="isLoading.user.id != member.user?.id"
                  class="full_flex gap-[10px] border border_cbc r_8 _c2a px-4 h-10 uppercase whitespace-nowrap font-semibold">
                  MEMBERSHIP
                  <img src="@/assets/svg/settings/settings.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </article>
        <Pagination_card class="pt-2" />
      </section>
    </div>

    <GroupInfoCard class="lg:block hidden lg:max-w-[280px]" />
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useMemberStore, useLoadingStore, useGroupStore } from "@/store";
import { useFormatDate } from "@/composables";
const { start, finish } = useLoadingIndicator();

const { formatDate } = useFormatDate();
const useMembers = useMemberStore();
const isLoading = useLoadingStore();
const useGroup = useGroupStore();
isLoading.addLoading("groupMembes");
const router = useRouter();

useSeoMeta({
  title: computed(() => `Group · ${useGroup.store.group_by_username.name}`),
  ogTitle: computed(() => `Group · ${useGroup.store.group_by_username.name}`),
  description: computed(() => `Group · ${useGroup.store.group_by_username.description}`),
  ogDescription: computed(() => `Group · ${useGroup.store.group_by_username.description}`),
  ogImage: computed(() => `${useGroup.store.group_by_username.image}`),
  twitterCard: computed(() => `${useGroup.store.group_by_username.icon}`),
})

start();
await useAsyncData("members", async () => {
  await useMembers.getMembers();
  finish();
}, { server: false })

const user_roles = ["Creator", "Admin", "Moderator"];

const categories = [
  ["active", "active_count"],
  ["cancelling", "cancelling_count"],
  ["churned", "churned_count"],
  ["banned", "banned_count"],
];

const categories_members = [
  ["member", "member_count"],
  ["admin", "admin_count"],
  ["online", "online"],
];

function userManageRole(user) {
  useMembers.store.member_data = user;
  useMembers.store.member_type = user.type;
  isLoading.store.inviteModal = true;
  useMembers.store.manageUserRole = true;
}

watch(
  () => isLoading.store.pagination.current_page,
  () => {
    window.scrollTo(0, 0);
    useMembers.getMembers();
  }
);

watch(
  () => router.currentRoute.value.query?.type,
  () => {
    useMembers.getMembers();
  }
);
</script>

<style lang="scss" scoped></style>
