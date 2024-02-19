<template>
  <main class="flex md:flex-row flex-col-reverse md:gap-6 mt-[18px]">
    <div class="overflow-hidden w-full md:space-y-8 space-y-6">
      <section class="md:block hidden">
        <div class="flex items-center px-5 bg-white r_16 h-[72px] gap-[14px]">
          <img
            class="h-10 w-10 object-cover"
            src="@/assets/image/user.svg"
            alt=""
          />
          <input
            @focus="store.writingModal = true"
            class="!border-0 placeholder-black text-xl font-semibold"
            placeholder="Write something..."
          />
        </div>

        <div
          v-if="store.writingModal"
          @click="store.writingModal = false"
          class="fixed top-0 bg-black bg-opacity-50 min-h-screen w-full z-50 left-0"
        ></div>
        <div
          v-if="store.writingModal"
          class="b_cf0f relative z-50 r_16 overflow-hidden md:-mt-[72px]"
        >
          <div class="flex items-center gap-3 b_cf0f h-[52px] px-5">
            <img
              class="h-5 w-5 object-cover"
              src="@/assets/image/user.svg"
              alt=""
            />
            <p class="text-sm flex gap-1">
              <span class="font-semibold">Xayot Sharapov</span>
              <span class="_ca1">posting in</span>
              <span class="font-semibold _c2a">Skool community</span>
            </p>
          </div>
          <form class="p-5 space-y-5 bg-white">
            <input class="h-10 !rounded-none" type="text" placeholder="Title" />
            <textarea
              id="write_message"
              class="h-[120px] w-full !rounded-none"
              placeholder="Write something..."
            ></textarea>
          </form>
          <div class="flex items-center justify-between p-5 pt-0 bg-white">
            <div class="textarea_icon flex items-center">
              <div class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/upload.svg" alt="" />
              </div>
              <div class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/link.svg" alt="" />
              </div>
              <div class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/video.svg" alt="" />
              </div>
              <div class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/poll.svg" alt="" />
              </div>
              <div class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/emoji.svg" alt="" />
              </div>
              <div class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/gif.svg" alt="" />
              </div>
              <el-dropdown
                placement="bottom-end"
                class="dropdown"
                trigger="click"
              >
                <div class="flex items-center gap-1 mx-4 font-medium text-sm">
                  <p>Select category</p>
                  <img src="@/assets/svg/textarea/select_arrow.svg" alt="" />
                </div>
                <template #dropdown>
                  <el-dropdown-menu
                    class="min-w-[200px] !mt-3 !-mr-7 dropdown_shadow"
                  >
                    <div
                      v-for="i in text_dropdown"
                      class="flex flex-col justify-center px-5 hover:bg-[#F2F2F2] cursor-pointer space-y-1 h-[63px]"
                    >
                      <h1 class="font-semibold">{{ i[0] }}</h1>
                      <p class="text-xs">{{ i[1] }}</p>
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="flex gap-3 font-semibold">
              <button
                @click="store.writingModal = false"
                class="uppercase h-10 px-6 rounded-lg _ca1"
              >
                cancel
              </button>
              <button class="uppercase h-10 px-6 b_ce0 rounded-lg">Post</button>
            </div>
          </div>
        </div>
      </section>
      <!-- category -->
      <section class="text-sm whitespace-nowrap">
        <div class="flex items-start gap-3">
          <div
            :class="store.is_show ? 'flex-wrap' : ''"
            class="relative flex gap-3 overflow-hidden items-center"
          >
            <button
              class="py-2 px-3 rounded-full b_cbc hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
            >
              All
            </button>
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
              <el-dropdown-menu
                class="flex min-w-[328px] filter_dropdown dropdown_shadow 2xl:!-ml-[60px]"
              >
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
      <section class="md:space-y-5 space-y-4">
        <article
          v-for="i in 4"
          data-aos="zoom-in"
          class="relative md:flex r_16 overflow-hidden bg-white"
        >
          <!-- hide -->
          <div
            class="md:!flex !hidden full_flex gap-1 _c2a absolute right-0 top-0 h-9 w-[88px] border-l border-b border-[#BCDEFF] hide_show rounded-bl-2xl"
          >
            <img class="show_blue" src="@/assets/svg/show.svg" alt="" />
            <img
              class="show_black hidden"
              src="@/assets/svg/show_black.svg"
              alt=""
            />
            <p class="pb-0.5">Hide</p>
          </div>
          <div
            class="md:!flex !hidden full_flex flex-col b_cbc gap-1 min-w-[30px]"
          >
            <img class="h-[42px]" src="@/assets/svg/pinned_text.svg" alt="" />
            <img
              class="w-4 h-4"
              src="@/assets/svg/community/pinned.svg"
              alt=""
            />
          </div>
          <div
            class="md:hidden flex justify-between items-center pl-4 h-[35px] border-b border-[#F0F5FA] w-full"
          >
            <img class="show_blue" src="@/assets/svg/pinned_blue.svg" alt="" />
            <div class="full_flex gap-1 _c2a h-9 w-[88px] hide_show">
              <img class="show_blue" src="@/assets/svg/show.svg" alt="" />
              <img
                class="show_black hidden"
                src="@/assets/svg/show_black.svg"
                alt=""
              />
              <p class="pb-0.5">Hide</p>
            </div>
          </div>
          <div class="flex items-end md:gap-14 gap-3 p-4">
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
              <h2
                class="md:mb-2 mb-4 md:mt-4 mt-6 md:text-xl text-md font-semibold md:w-full w-[120%]"
              >
                Introducing "The Skool Games"
              </h2>
              <p class="md:text-sm text-xs line-clamp-2 md:w-full w-[120%]">
                There's two sides to building a business online: Tools and
                Training on how to use those tools. The problem with training is
                opinions. There are so many opinions, they
              </p>
              <div class="flex items-center mt-4 md:mb-3 mb-4 gap-4">
                <div
                  class="b_cbc px-2 h-[26px] rounded-[4px] full_flex gap-1 text-xs"
                >
                  <img
                    class="md:block hidden"
                    src="@/assets/svg/poll.svg"
                    alt=""
                  />
                  <img
                    class="md:hidden block"
                    src="@/assets/svg/poll_md.svg"
                    alt=""
                  />
                  <p class="">Poll</p>
                </div>
                <p class="text-xs font-semibold md:_c2a _c07">
                  9 members have voted
                </p>
              </div>
              <div class="flex items-center _c59 gap-4 md:text-md text-sm">
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
                    class="h-[26px] w-[26px] md:block hidden object-cover"
                    src="@/assets/image/user.svg"
                    alt=""
                    :style="`z-index: ${7 - index}`"
                  />
                </div>
                <p class="_c2a md:text-sm text-xs font-semibold">
                  New comment 10h ago
                </p>
              </div>
            </div>
            <div
              class="rounded-tl-xl -mr-4 -mb-4 min-w-fit max-w-[400px] overflow-hidden"
            >
              <img
                class="md:max-w-[400px] max-h-[75px] max-w-fit object-contain"
                src="@/assets/image/photo.svg"
                alt=""
              />
            </div>
          </div>
        </article>
        <Pagination_card class="pt-3" />
      </section>
    </div>
    <div class="lg:min-w-[280px]">
      <!-- info card -->
      <section>
        <div class="rounded-2xl overflow-hidden bg-white">
          <img
            class="w-full md:max-h-[150px] object-cover"
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
        <div class="full_flex md:mt-8 mt-4 gap-2 leading-[18px]">
          <p>Powered by</p>
          <img class="h-3 mt-0.5" src="/logo.svg" alt="" />
        </div>
      </section>
    </div>
    <section class="md:hidden block mb-6">
      <div class="flex items-center px-5 bg-white r_16 h-[52px] gap-[14px]">
        <img
          class="h-7 w-7 object-cover"
          src="@/assets/image/user.svg"
          alt=""
        />
        <input
          class="!border-0 placeholder-black font-semibold"
          placeholder="Write something..."
        />
      </div>
    </section>

    <!-- card info -->
    <el-dialog
      v-model="store.card_info"
      width="780"
      align-center
      class="bg-opacity-50 !rounded-lg p-5"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="relative max-w-fit">
            <img src="@/assets/image/user.svg" alt="" />
            <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
              <div class="relative">
                <img src="@/assets/svg/community/user_messages.svg" alt="" />
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
        <div class="flex gap-2">
          <button class="border border-[#BCDEFF] r_8 px-3 h-9">
            Watch (134)
          </button>
          <button class="full_flex border border-[#BCDEFF] r_8 w-9 h-9">
            <img src="@/assets/svg/three_dot.svg" alt="" />
          </button>
        </div>
      </div>
      <h2 class="mb-4 md:mt-8 mt-6 md:text-2xl text-lg font-semibold md:w-full">
        Introducing "The Skool Games"
      </h2>
      <pre
        class="text-sm line-clamp-[11] float-left w-full whitespace-pre-line"
      >
There's two sides to building a business online: Tools and Training on how to use those tools.

The problem with training is opinions. There are so many opinions, they contradict each-other, and it's hard 
to know what to do. If only there was a way to see what's working now in realtime...

Introducing The Skool Games — a fun way to build your own business with other people — where the training comes 
from the winners fresh every month. 

Here's how it works: 

Skool group owners that want to play can join
Skool group owners that want to play can join
Skool group owners that want to play can join
      </pre>
      <button class="text-sm _c2a float-left">See more</button>
    </el-dialog>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

const store = reactive({
  is_show: false,
  writingModal: false,
  card_info: true,
});

const text_dropdown = [
  ["Product Feedback", "Share your general feedback about Skool here"],
  ["Product Question", "Ask a question about the product, or search above"],
  [
    "Feature Requests",
    "Want a feature Skool doesn't have? Ask for it, or search above",
  ],
  ["Bug Reports", "Found a bug? Report it here and we'll fix it"],
];

watch(
  () => store.writingModal,
  () => {
    if (store.writingModal) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
);
</script>

<style lang="scss" scoped>
.textarea_icon {
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
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
