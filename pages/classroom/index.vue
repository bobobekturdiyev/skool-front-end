<template>
  <main>
    <el-tabs
      v-model="store.activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane class="flex gap-6 mt-[18px]" label="Community" name="first">
        <div class="overflow-hidden min-w-[70%] space-y-8">
          <section>
            <div
              class="flex items-center px-5 bg-white r_16 h-[72px] gap-[14px]"
            >
              <img
                class="h-10 w-10 object-cover"
                src="@/assets/image/user.svg"
                alt=""
              />
              <input
                class="!border-0 placeholder-black text-xl font-semibold"
                placeholder="Write something..."
              />
            </div>
          </section>
          <!-- category -->
          <section class="text-sm whitespace-nowrap">
            <div class="flex items-start gap-3">
              <div
                :class="store.is_show ? 'flex-wrap' : ''"
                class="relative flex gap-3 overflow-hidden items-center"
              >
                <button class="py-2 px-3 rounded-full b_cbc hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700">All</button>
                <button
                  v-for="i in 16"
                  class="flex items-center hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full bg-white"
                >
                  How I use Skool
                </button>
                <img
                  v-if="!store.is_show"
                  class="absolute right-0"
                  src="@/assets/svg/shadow_hidden.svg"
                  alt=""
                />
                <button
                  @click="store.is_show = false"
                  v-if="store.is_show"
                  class="py-2 px-3 hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 rounded-full min-w-fit bg-white"
                >
                  Less...
                </button>
              </div>
              <button
                @click="store.is_show = true"
                v-if="!store.is_show"
                class="py-2 px-3 hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 rounded-full min-w-fit bg-white"
              >
                More...
              </button>
              <el-dropdown
                placement="bottom-start"
                trigger="click"
                :hide-on-click="false"
                class="min-w-fit filter_btn"
              >
                <button
                  class="flex items-center gap-1 py-2 px-3 rounded-full bg-white"
                >
                  <img src="@/assets/svg/filter.svg" alt="" />
                </button>
                <template #dropdown>
                  <el-dropdown-menu class="flex min-w-[328px] filter_dropdown">
                    <div class="w-[150px] border-r border-[#E0E0E0]">
                      <h1 class="text-sm font-medium px-8 mb-2">Type</h1>
                      <el-dropdown-item
                        class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                      >
                        <input
                          id="type_all"
                          class="rounded-full"
                          type="radio"
                          name="type"
                        />
                        <label for="type_all">All</label>
                      </el-dropdown-item>
                      <el-dropdown-item
                        class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                      >
                        <input
                          id="type_public"
                          class="rounded-full"
                          type="radio"
                          name="type"
                        />
                        <label for="type_public">Public</label>
                      </el-dropdown-item>
                      <el-dropdown-item
                        class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                      >
                        <input
                          id="type_private"
                          class="rounded-full"
                          type="radio"
                          name="type"
                        />
                        <label for="type_private">Private</label>
                      </el-dropdown-item>
                    </div>
                    <div class="w-[150px]">
                      <h1 class="text-sm font-medium px-8 mb-2">Price</h1>
                      <el-dropdown-item
                        class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                      >
                        <input
                          id="price_all"
                          class="rounded-full"
                          type="radio"
                          name="price"
                        />
                        <label for="price_all">All</label>
                      </el-dropdown-item>
                      <el-dropdown-item
                        class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                      >
                        <input
                          id="price_public"
                          class="rounded-full"
                          type="radio"
                          name="price"
                        />
                        <label for="price_public">Public</label>
                      </el-dropdown-item>
                      <el-dropdown-item
                        class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                      >
                        <input
                          id="price_private"
                          class="rounded-full"
                          type="radio"
                          name="price"
                        />
                        <label for="price_private">Private</label>
                      </el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </section>

          <!-- cards -->
          <section class="space-y-5">
            <article
              v-for="i in 4"
              data-aos="zoom-in"
              class="relative flex r_16 overflow-hidden bg-white"
            >
              <!-- hide -->
              <div
                class="full_flex gap-1 _c2a absolute right-0 top-0 h-9 w-[88px] border-l border-b border-[#BCDEFF] hide_show rounded-bl-2xl"
              >
                <img class="show_blue" src="@/assets/svg/show.svg" alt="" />
                <img
                  class="show_black hidden"
                  src="@/assets/svg/show_black.svg"
                  alt=""
                />
                <p class="pb-0.5">Hide</p>
              </div>
              <div class="full_flex flex-col b_cbc gap-1 min-w-[30px]">
                <img
                  class="h-[42px]"
                  src="@/assets/svg/pinned_text.svg"
                  alt=""
                />
                <img
                  class="w-4 h-4"
                  src="@/assets/svg/community/pinned.svg"
                  alt=""
                />
              </div>
              <div class="flex items-end gap-14 p-4">
                <div>
                  <div class="flex items-center gap-4">
                    <div class="relative max-w-fit">
                      <img src="@/assets/image/user.svg" alt="" />
                      <div
                        class="full_flex absolute -bottom-[2px] -right-[5px] z-10"
                      >
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
                    <div class="space-y-[2px]">
                      <h1 class="font-semibold">Cameron Williamson</h1>
                      <p class="text-xs">
                        19d ago in <span class="_c59">Announcements</span>
                      </p>
                    </div>
                  </div>
                  <h2 class="mb-2 mt-4 text-xl font-semibold">
                    Introducing "The Skool Games"
                  </h2>
                  <p class="text-sm line-clamp-2">
                    There's two sides to building a business online: Tools and
                    Training on how to use those tools. The problem with
                    training is opinions. There are so many opinions, they
                  </p>
                  <div class="flex items-center mt-4 mb-3 gap-4">
                    <div
                      class="b_cbc px-2 h-[26px] rounded-[4px] full_flex gap-1 text-xs"
                    >
                      <img src="@/assets/svg/poll.svg" alt="" />
                      <p class="pb-0.5">Poll</p>
                    </div>
                    <p class="text-xs font-semibold _c2a">
                      9 members have voted
                    </p>
                  </div>
                  <div class="flex items-center _c59 gap-4">
                    <p class="full_flex gap-1">
                      <img src="@/assets/svg/community/like.svg" alt="" /> 355
                    </p>
                    <p class="full_flex gap-1">
                      <img src="@/assets/svg/community/message.svg" alt="" />
                      609
                    </p>
                    <div class="flex -space-x-[5px]">
                      <img
                        v-for="(i, index) in 7"
                        class="h-[26px] w-[26px] object-cover"
                        src="@/assets/image/user.svg"
                        alt=""
                        :style="`z-index: ${7 - index}`"
                      />
                    </div>
                    <p class="_c2a text-sm font-semibold">
                      New comment 10h ago
                    </p>
                  </div>
                </div>
                <div
                  class="rounded-tl-xl -mr-4 -mb-4 h-[134px] border min-w-fit max-w-[400px] overflow-hidden"
                >
                  <img
                    class="min-h-[138px] max-w-[400px] object-contain"
                    src="@/assets/image/photo.svg"
                    alt=""
                  />
                </div>
              </div>
            </article>
            <Pagination_card class="pt-3" />
          </section>
        </div>
        <div class="w-full">
          <!-- info card -->
          <section>
            <div class="rounded-2xl overflow-hidden bg-white">
              <img
                class="w-full h-[150px] object-cover"
                src="@/assets/image/picture.png"
                alt=""
              />
              <div class="p-4 space-y-4">
                <h1 class="font-medium text-lg">Skool Community</h1>
                <p class="flex items-center _ca1 gap-1">
                  <img src="@/assets/svg/community/grey_private.svg" alt="" />
                  Private group
                </p>
                <p class="text-sm">
                  Let's collaborate to make Skool better. Share your feedback!
                </p>
                <div class="py-1 text-sm border-y border-[#E0E0E0]">
                  <p class="flex items-center gap-1 h-7 px-3 _c59">
                    <img src="@/assets/svg/href.svg" alt="" />
                    Want your own group?
                  </p>
                  <p class="flex items-center gap-1 h-7 px-3 _c59">
                    <img src="@/assets/svg/href.svg" alt="" />
                    Product announcements
                  </p>
                  <p class="flex items-center gap-1 h-7 px-3 _c59">
                    <img src="@/assets/svg/href.svg" alt="" />
                    We're hiring!
                  </p>
                </div>
                <div
                  class="flex items-center justify-between text-xs text-center"
                >
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
                <div class="flex -space-x-[5px]">
                  <img
                    v-for="(i, index) in 7"
                    class="h-[26px] w-[26px] object-cover"
                    src="@/assets/image/user.svg"
                    alt=""
                    :style="`z-index: ${7 - index}`"
                  />
                </div>
                <button
                  class="border border-[#BCDEFF] _c2a rounded-lg w-full font-semibold text-sm uppercase"
                >
                  settings
                </button>
              </div>
            </div>
            <div class="bg-white mt-5 r_16 px-4 py-5">
              <h1 class="font-semibold">Leaderboard (30-day)</h1>
              <div class="text-sm border-t borer-[#E0E0E0] py-4 mt-4">
                <div
                  v-for="(i, index) in 5"
                  class="flex items-center h-[44px] justify-between"
                >
                  <div class="flex items-center gap-2">
                    <p
                      :class="
                        index == 0
                          ? 'b_c2a !text-white'
                          : index == 1
                          ? 'b_c59 !text-white'
                          : index == 2
                          ? 'b_cbc'
                          : ''
                      "
                      class="full_flex _c07 font-medium rounded-full w-7 h-7"
                    >
                      {{ index + 1 }}
                    </p>
                    <img
                      class="h-5 w-5 object-cover"
                      src="@/assets/image/user.svg"
                      alt=""
                    />
                    <h1 class="_c07">Xayot Sharapov</h1>
                  </div>
                  <p class="_c2a font-medium text-xs">+1904</p>
                </div>
              </div>
              <router-link class="_c2a text-sm font-semibold" to="/"
                >See all leaderboards</router-link
              >
            </div>
            <div class="full_flex mt-8 gap-2 leading-[18px]">
              <p>Powered by</p>
              <img class="h-3 mt-0.5" src="/logo.svg" alt="" />
            </div>
          </section>
        </div>
      </el-tab-pane>
      <el-tab-pane class="mt-[18px]" label="Classroom" name="second">
        <!-- cards -->
        <section class="grid grid-cols-3 gap-6 justify-between my-8 mt-[18px]">
          <ClassCard />
        </section>
        <Pagination_card />
      </el-tab-pane>
      <el-tab-pane label="Calendar" name="third">Calendar</el-tab-pane>
      <el-tab-pane label="Members" name="fourth">Members</el-tab-pane>
      <el-tab-pane label="Leaderboards" name="fifth">Leaderboards</el-tab-pane>
      <el-tab-pane label="About" name="sixth">About</el-tab-pane>
    </el-tabs>
  </main>
</template>

<script setup>
const store = reactive({
  activeName: "first",
  is_show: false,
});

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped></style>
