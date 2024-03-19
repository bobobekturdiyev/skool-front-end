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

      <!-- posts -->
      <section class="md:space-y-5 space-y-4">
        <article
          v-for="i in usePost.store.posts"
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
            v-if="i.group_pinned"
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
            v-if="i.group_pinned"
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
                <el-dropdown placement="top-start" class="dropdown">
                  <div class="relative max-w-fit">
                    <img
                      class="h-10 w-10 object-cover rounded-full"
                      :src="i.user_id?.image"
                      alt=""
                    />
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
                              :src="i.user_id?.image"
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
                          <div
                            class="space-y-2 leading-[14px] p-4 font-semibold"
                          >
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
                        <button @click="openChatModal(i.user_id)"
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
                    {{ i.user_id?.name }} {{ i.user_id?.surname }}
                  </h1>
                  <p class="text-xs">
                    19d ago in <span class="_c59">Announcements</span>
                  </p>
                </div>
              </div>
              <h2
                class="md:mb-2 mb-4 md:mt-4 mt-6 truncate md:text-xl text-md font-semibold md:w-full w-[120%]"
              >
                {{ i.title }}
              </h2>
              <p class="md:text-sm text-xs line-clamp-2 md:w-full w-[120%]">
                {{ i.description }}
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
                <p @click="store.card_info = true" class="full_flex gap-1 cursor-pointer">
                  <img src="@/assets/svg/community/message.svg" alt="" />
                  609
                </p>
                <div @click="store.card_info = true" class="flex -space-x-[5px] cursor-pointer">
                  <img
                    v-for="(i, index) in 7"
                    class="h-[26px] w-[26px] md:block hidden object-cover"
                    src="@/assets/image/user.svg"
                    alt=""
                    :style="`z-index: ${7 - index}`"
                  />
                </div>
                <p @click="store.card_info = true" class="_c2a md:text-sm text-xs font-semibold cursor-pointer">
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
      class="bg-opacity-50 !rounded-lg p-5 overflow-hidden"
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
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <button class="full_flex comment_menu r_8 w-9 h-9">
              <img src="@/assets/svg/three_dot.svg" alt="" />
            </button>
            <template #dropdown>
              <el-dropdown-menu class="min-w-[140px] dropdown_shadow">
                <el-dropdown-item @click="copyLink" class="!text-xs font-medium h-10 px-3"
                  >Copy link</el-dropdown-item
                >
                <el-dropdown-item
                  @click="store.reportAdmin = true"
                  class="!text-xs font-medium h-10 px-3"
                  >Report to admins</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
      <button class="text-sm _c2a h-4">See more</button>
      <div class="w-full mt-4 mb-5">
        <img
          class="max-h-[210px] rounded-[12px]"
          src="@/assets/image/picture.png"
          alt=""
        />
      </div>
      <div class="flex items-center _c59 gap-4 text-sm">
        <p
          class="full_flex border border-[#F0F5FA] r_8 p-[6px] leading-[21px] h-8 gap-1"
        >
          <img src="@/assets/svg/community/like.svg" alt="" /> Like
          <span class="_cf0f pb-0.5">|</span> 355
        </p>
        <p class="full_flex h-8 gap-1">
          <img src="@/assets/svg/community/message.svg" alt="" />
          609 comments
        </p>
      </div>
      <!-- comment -->
      <section class="mt-4">
        <div
          class="flex items-start gap-4 border-y border-[#F0F5FA] w-full -mx-5 p-5"
        >
          <div class="relative max-w-fit">
            <img
              class="h-10 w-10 object-cover"
              src="@/assets/image/user.svg"
              alt=""
            />
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
          <div class="w-full">
            <div class="space-y-[2px] h-10">
              <h1 class="font-semibold text-[16px]">Cameron Williamson</h1>
              <p class="text-xs _ca1">19d ago</p>
            </div>
            <div class="space-y-3 mt-3">
              <div class="space-y-3">
                <p class="text-sm leading-4 text-black">Nice🔥🔥</p>
                <div class="relative max-w-fit">
                  <img
                    class="max-h-20 r_8"
                    src="@/assets/image/photo.svg"
                    alt=""
                  />
                  <img
                    class="absolute z-10 tblr m-auto"
                    src="@/assets/svg/gif.svg"
                    alt=""
                  />
                </div>
              </div>
              <div class="flex items-center gap-3 h-[18px] text-xs">
                <p class="full_flex gap-1 _c2a">
                  <img src="@/assets/svg/like_active.svg" alt="" />14
                </p>
                <button class="_ca1 font-semibold">Reply</button>
              </div>
            </div>
            <div class="flex items-start w-full gap-4 mt-5">
              <div class="relative max-w-fit">
                <img
                  class="h-6 w-6 object-cover"
                  src="@/assets/image/user.svg"
                  alt=""
                />
                <div class="full_flex absolute -bottom-[2px] -right-[5px] z-10">
                  <div class="relative">
                    <img
                      class="h-3 w-3"
                      src="@/assets/svg/community/user_messages.svg"
                      alt=""
                    />
                    <p
                      class="absolute full_flex bottom-0 h-3 w-3 pb-0.5 text-[8px] text-white font-medium"
                    >
                      1
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-full">
                <div class="space-y-[1px] h-10">
                  <h1 class="font-semibold text-[16px] leading-4">
                    Cameron Williamson
                  </h1>
                  <p class="text-xs _ca1 leading-[14px]">19d ago</p>
                </div>
                <div class="space-y-3 mt-4">
                  <p class="text-sm leading-4 text-black">
                    <a
                      class="_c2a border-b border-[#2A85FF]"
                      href="/@gerry_gonzalez"
                      >@Gerry Gonzalez</a
                    >
                    Continue making progress
                  </p>
                  <div class="flex items-center gap-3 h-[18px] text-xs">
                    <p class="full_flex gap-1 _ca1">
                      <img src="@/assets/svg/like_grey.svg" alt="" />14
                    </p>
                    <button class="_ca1 font-semibold">Reply</button>
                  </div>
                  <div class="flex pt-1 gap-[14px]">
                    <img
                      class="h-6 w-6 mt-1 object-cover"
                      src="@/assets/image/user.svg"
                      alt=""
                    />
                    <div class="w-full">
                      <input
                        class="text-sm h-10 r_8"
                        placeholder="@Andrew Kirby"
                      />
                      <div class="flex items-center justify-between py-3">
                        <div class="textarea_icon flex items-center">
                          <div class="icon full_flex h-10 w-10">
                            <img
                              src="@/assets/svg/textarea/upload_black.svg"
                              alt=""
                            />
                          </div>
                          <div class="icon full_flex h-10 w-10">
                            <img
                              src="@/assets/svg/textarea/link_black.svg"
                              alt=""
                            />
                          </div>
                          <div class="icon full_flex h-10 w-10">
                            <img
                              src="@/assets/svg/textarea/video_black.svg"
                              alt=""
                            />
                          </div>
                          <div class="icon full_flex h-10 w-10">
                            <img
                              src="@/assets/svg/textarea/emoji_black.svg"
                              alt=""
                            />
                          </div>
                          <div class="icon full_flex h-10 w-10">
                            <img
                              src="@/assets/svg/textarea/gif_black.svg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div class="flex gap-3 font-semibold">
                          <button
                            @click="store.writingModal = false"
                            class="uppercase h-10 px-6 rounded-lg _ca1"
                          >
                            cancel
                          </button>
                          <button class="uppercase h-10 px-6 b_ce0 rounded-lg">
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- writing input -->
      <div class="b_cf0f relative z-50 -mx-5 -mb-7 overflow-hidden">
        <div class="flex items-center px-5 h-[72px] gap-[14px]">
          <img
            class="h-10 w-10 object-cover"
            src="@/assets/image/user.svg"
            alt=""
          />
          <input class="text-sm !border-0" placeholder="Your comment" />
        </div>
        <div class="flex items-center justify-between p-5 pt-0">
          <div class="textarea_icon flex items-center">
            <div class="icon full_flex h-10 w-10">
              <img src="@/assets/svg/textarea/upload_black.svg" alt="" />
            </div>
            <div class="icon full_flex h-10 w-10">
              <img src="@/assets/svg/textarea/link_black.svg" alt="" />
            </div>
            <div class="icon full_flex h-10 w-10">
              <img src="@/assets/svg/textarea/video_black.svg" alt="" />
            </div>
            <div class="icon full_flex h-10 w-10">
              <img src="@/assets/svg/textarea/emoji_black.svg" alt="" />
            </div>
            <div class="icon full_flex h-10 w-10">
              <img src="@/assets/svg/textarea/gif_black.svg" alt="" />
            </div>
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
    </el-dialog>

    <!-- Report to group admins -->
    <el-dialog
      v-model="store.reportAdmin"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">Report to group admins</h1>
        <p class="text-lg">
          Are you sure you want to report this to group admins?
        </p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="store.reportAdmin = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button @click="reposrtToAdmins" class="uppercase h-10 px-6 b_cbc _c07 rounded-lg">yes</button>
        </div>
      </div>
    </el-dialog>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { usePostStore, useLoadingStore, useChatStore } from "@/store";
import { useNotification } from "@/composables/notifications";

const usePost = usePostStore();
const useChat = useChatStore();
const isLoading = useLoadingStore();
const { showMessage } = useNotification();
usePost.get_posts();
const store = reactive({
  is_show: false,
  writingModal: false,
  card_info: false,
  reportAdmin: false,
});

function copyLink() {
  var copyText = "http://localhost:4000/allan55";

  navigator.clipboard.writeText(copyText);
  showMessage("Link copied to clipboard");
  store.reportAdmin = false;
}

function reposrtToAdmins() {
  showMessage("Reported to group admins.");
  store.reportAdmin = false;
}

const text_dropdown = [
  ["Product Feedback", "Share your general feedback about Skool here"],
  ["Product Question", "Ask a question about the product, or search above"],
  [
    "Feature Requests",
    "Want a feature Skool doesn't have? Ask for it, or search above",
  ],
  ["Bug Reports", "Found a bug? Report it here and we'll fix it"],
];

function openChatModal(data) {
  isLoading.store.chatModal = true
  useChat.store.chat_user_data = data;
  isLoading.store.chatModal = true;
  useChat.getChatMessages()
}

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
