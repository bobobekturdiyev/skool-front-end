<template>
  <main class="flex md:flex-row flex-col-reverse md:gap-6 mt-[18px]">
    <div class="overflow-hidden w-full md:space-y-8 space-y-6">
      <ModalWriteSomething class="md:block hidden" />

      <!-- category -->
      <section class="md:text-sm text-xs whitespace-nowrap">
        <div class="flex items-start justify-between gap-3">
          <div
            :class="store.is_show ? 'flex-wrap' : 'md:flex-nowrap'"
            class="relative flex md:flex-row flex-wrap gap-3 category_wrap w-full md:h-auto h-[80px] overflow-hidden"
          >
            <button
              @click="handleCategory('all')"
              :class="
                usePost.store.filter.category_id != 'all' ? 'bg-white' : 'b_cbc'
              "
              class="py-2 px-3 rounded-full md:h-9 h-8 hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
            >
              All
            </button>
            <LoadingDiv
              v-if="isLoading.isLoadingType('getPostCategories')"
              v-for="i in 10"
              class="flex items-center md:h-9 h-8 w-28 animate-pulse hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full bg-gray-900"
            />
            <button
              v-else-if="usePost.store.categories?.length"
              @click="handleCategory(i.id)"
              v-for="i in usePost.store.categories"
              :class="
                usePost.store.filter.category_id == i.id ? 'b_cbc' : 'bg-white'
              "
              class="flex md:flex-row flex-wrap items-center md:h-9 h-8 min-w-fit hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full"
            >
              <!-- <img
                class="w-[14px] h-[21px] object-contain"
                :src="i.icon"
                alt=""
              /> -->
              {{ i.name }}
            </button>
            <img
              v-if="!store.is_show && usePost.store.categories"
              class="absolute md:block hidden -right-[2px]"
              src="@/assets/svg/shadow_hidden.svg"
              alt=""
            />
            <button
              @click="store.is_show = false"
              v-if="store.is_show && usePost.store.categories?.length"
              class="py-2 px-3 md:h-9 h-8 md:block hidden rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
            >
              Less...
            </button>
          </div>
          <button
            v-if="!store.is_show && usePost.store.categories?.length"
            @click="store.is_show = true"
            class="py-2 px-3 md:h-9 h-8 md:block hidden rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
          >
            More...
          </button>
          <div class="min-w-fit text-end">
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
                    <h1 class="text-sm font-medium px-8 mb-2">Filter</h1>
                    <label
                      @click="handleCategory(i.type, 'filter')"
                      :for="i.type"
                      v-for="i in filter_filter"
                    >
                      <el-dropdown-item
                        class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                      >
                        <input
                          :id="i.type"
                          class="rounded-full"
                          type="radio"
                          name="filter"
                          :checked="
                            usePost.store.filter.filter == i.type ? true : false
                          "
                        />
                        {{ i.title }}
                      </el-dropdown-item>
                    </label>
                  </div>
                  <div class="w-[150px]">
                    <h1 class="text-sm font-medium px-8 mb-2">Sort</h1>
                    <label
                      @click="handleCategory(i.type, 'sort')"
                      :for="i.type"
                      v-for="i in filter_sort"
                    >
                      <el-dropdown-item
                        class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                      >
                        <input
                          :id="i.type"
                          class="rounded-full"
                          type="radio"
                          name="sort"
                          :checked="
                            usePost.store.filter.sort == i.type ? true : false
                          "
                        />
                        {{ i.title }}
                      </el-dropdown-item>
                    </label>
                  </div>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <button
              v-if="usePost.store.categories?.length"
              @click="store.drawer = true"
              class="py-2 px-3 md:h-9 h-8 mt-3 ml-auto md:hidden block rounded-full min-w-fit bg-white hover:bg-[#BCDEFF] hover:bg-opacity-30 duration-700"
            >
              More...
            </button>
          </div>
        </div>
      </section>

      <!-- posts -->
      <section class="md:space-y-5 space-y-4">
        <LoadingDiv
          v-if="isLoading.isLoadingType('getPosts')"
          v-for="i in 10"
          class="min-h-[250px] w-full r_16 overflow-hidden"
        />
        <div
          v-else-if="!usePost.store.posts.length"
          class="min-h-[30vh] full_flex col-span-4"
        >
          No data
        </div>
        <article
          v-else
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
                        <button
                          @click="openChatModal(i.user_id)"
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
                class="md:mb-2 mb-4 md:mt-4 mt-6 truncate md:text-xl text-[16px] font-semibold md:w-full w-[120%]"
              >
                {{ i.title }}
              </h2>
              <p
                v-html="i.description"
                class="md:text-sm text-xs line-clamp-2 md:w-full w-[120%]"
              ></p>
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
              <div class="flex items-center _c59 gap-4 md:text-[16px] text-sm">
                <p
                  @click="handleLikeModal('Likes')"
                  class="full_flex gap-1 cursor-pointer"
                >
                  <img src="@/assets/svg/community/like.svg" alt="" /> 355
                </p>
                <p
                  @click="() => showPostData(i.id)"
                  class="full_flex gap-1 cursor-pointer"
                >
                  <img src="@/assets/svg/community/message.svg" alt="" />
                  609
                </p>
                <div
                  @click="() => showPostData(i.id)"
                  class="flex -space-x-[5px] cursor-pointer"
                >
                  <img
                    v-for="(i, index) in 7"
                    class="h-[26px] w-[26px] xl:block md:hidden sm:block hidden object-cover"
                    src="@/assets/image/user.svg"
                    alt=""
                    :style="`z-index: ${7 - index}`"
                  />
                </div>
                <p
                  @click="() => showPostData(i.id)"
                  class="_c2a md:text-sm text-xs font-semibold cursor-pointer"
                >
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
    <div class="min-w-[280px] md:max-w-[280px]">
      <!-- info card -->
      <section>
        <div class="rounded-2xl overflow-hidden bg-white">
          <img
            class="w-full md:max-h-[150px] object-cover"
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
            <p class="text-sm">
              {{ useGroup.store.group_by_username.excerpt }}
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
                <p class="_c2a text-lg h-[24px]">
                  <!-- 226k -->
                  {{ useGroup.store.group_by_username.members_count }}
                </p>
                <p class="_ca1">Members</p>
              </div>
              <div>
                <p class="_c2a text-lg h-[24px]">
                  {{ useGroup.store.group_by_username.online }}
                </p>
                <p class="_ca1">Online</p>
              </div>
              <div>
                <p class="_c2a text-lg h-[24px]">
                  {{ useGroup.store.group_by_username.admin_count }}
                </p>
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
              @click="isLoading.store.inviteModal = true"
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

    <ModalWriteSomething class="md:hidden block mb-6" />

    <!-- card info -->
    <el-dialog
      v-model="usePost.store.card_info"
      width="780"
      align-center
      class="bg-opacity-50 !rounded-lg p-5 overflow-hidden"
    >
      <div
        v-if="
          usePost.modal.change_category
            ? true
            : usePost.modal.edit
            ? false
            : true
        "
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="relative max-w-fit">
              <img
                class="min-w-[40px] min-h-[40px] h-10 w-10 object-cover rounded-full"
                :src="usePost.store.postData.user?.image"
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
            <div class="space-y-[2px]">
              <h1 class="font-semibold">
                {{ usePost.store.postData.user?.name }}
                {{ usePost.store.postData.user?.surname }}
              </h1>
              <p class="text-xs">
                19d ago in <span class="_c59">Announcements</span>
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="border border-[#BCDEFF] r_8 px-3 h-9">
              Watch (134)
            </button>
            <el-dropdown
              placement="bottom-end"
              class="dropdown"
              trigger="click"
            >
              <button class="full_flex comment_menu r_8 w-9 h-9">
                <img src="@/assets/svg/three_dot.svg" alt="" />
              </button>
              <template #dropdown>
                <el-dropdown-menu class="min-w-[140px] dropdown_shadow">
                  <el-dropdown-item
                    @click="editPostData"
                    class="!text-xs font-medium h-10 px-3"
                    >Edit</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="editPostData('category')"
                    class="!text-xs font-medium h-10 px-3"
                    >Change category</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="deletePost"
                    class="!text-xs font-medium h-10 px-3"
                    >Delete</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="copyLink"
                    class="!text-xs font-medium h-10 px-3"
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
        <h2
          class="mb-4 md:mt-8 mt-6 md:text-2xl text-lg font-semibold md:w-full"
        >
          {{ usePost.store.postData.title }}
        </h2>
        <pre
          v-html="usePost.store.postData.description"
          class="text-sm line-clamp-[11] float-left w-full whitespace-pre-line"
        ></pre>
        <button class="text-sm _c2a h-4">See more</button>
        <div>
          <div class="mt-8 text-sm space-y-3">
            <div
              v-for="(poll, index) in usePost.store.postData.polls"
              class="flex items-center gap-3 h-10"
            >
              <label
                @click="() => changeVote(poll)"
                class="flex items-center gap-3"
                :for="`poll${index}`"
              >
                <input
                  disabled
                  :checked="poll.is_selected"
                  :id="`poll${index}`"
                  type="radio"
                  name="poll"
                />
                <p>{{ poll.option }}</p>
              </label>
              <div
                v-if="poll.users?.length && usePost.store.userIsVoted"
                @click="handleLikeModal('Votes', poll.users)"
                class="flex items-center gap-1 cursor-pointer"
              >
                <div class="flex -space-x-[5px]">
                  <img
                    v-for="(user, index) in poll.users"
                    v-show="index < 7"
                    class="h-[26px] w-[26px] min-w-[26px] rounded-full object-cover"
                    :src="user.image"
                    :title="`${user.name} ${user.surname}`"
                    alt=""
                  />
                </div>
                <p class="text-xs _ca1">{{ poll.users?.length }} votes</p>
              </div>
            </div>
          </div>
          <button
            v-if="!usePost.store.userIsVoted"
            class="flex justify-between mt-4 _ca1 text-sm font-bold w-full"
          >
            <p>View results</p>
            <p>63 votes</p>
          </button>
        </div>
        <div class="w-full mt-4 mb-5">
          <ul
            v-if="usePost.store.postData.media_files?.length"
            class="flex gap-5 min-w-fit w-full overflow-x-auto"
          >
            <li
              class="relative imagelabel min-w-fit"
              v-for="(i, index) in usePost.store.postData.media_files"
            >
              <img
                v-if="i.type == 'image'"
                class="max-h-[210px] min-h-[210px] rounded-[12px] object-cover"
                :src="i.url"
                alt=""
              />
              <iframe
                v-else-if="
                  i.type == 'youtube' ||
                  i.type == 'wistia' ||
                  i.type == 'vimeo' ||
                  i.type == 'loom'
                "
                class="max-h-[210px] min-h-[210px] rounded-[12px] object-cover text-[#0000]"
                :src="i.url"
              ></iframe>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="-mx-5 -mt-8"
        v-else-if="usePost.modal.edit && !usePost.modal.change_category"
      >
        <div
          @click="usePost.store.writingModal = true"
          class="flex items-center md:px-5 px-3 bg-white r_16 md:h-[72px] h-[52px] gap-[14px]"
        >
          <img
            class="md:h-10 md:w-10 h-7 w-7 object-cover"
            src="@/assets/image/user.svg"
            alt=""
          />
          <button class="!border-0 placeholder-black md:text-xl font-semibold">
            Write something...
          </button>
        </div>
        <form
          @submit.prevent="addVideo.handleSubmit"
          class="b_cf0f relative z-50 r_16 overflow-hidden overflow-y-auto -mt-[72px]"
        >
          <div
            class="flex md:items-center gap-3 b_cf0f md:h-[52px] h-[64px] px-5 py-3"
          >
            <img
              class="h-5 w-5 object-cover"
              src="@/assets/image/user.svg"
              alt=""
            />
            <p class="text-sm flex flex-wrap items-start gap-1 leading-4">
              <span class="font-semibold">Xayot Sharapov</span>
              <span class="_ca1">posting in</span>
              <span class="font-semibold _c2a md:w-auto w-full"
                >Skool community</span
              >
            </p>
          </div>
          <div class="md:p-5 p-3 space-y-5 bg-white">
            <input
              v-model="usePost.create.title"
              class="h-10 !rounded-none"
              type="text"
              placeholder="Title"
              required
            />
            <div class="community_editor border h-[120px] whitespace-pre-wrap">
              <Editor />
            </div>
            <div
              v-if="Object.keys(usePost.store.polls).length"
              class="border_ce0 rounded-lg p-4"
            >
              <div class="flex items-center justify-between">
                <p class="font-medium">Poll</p>
                <p
                  v-if="!usePost.store.userIsVoted"
                  @click="removePoll"
                  class="font-medium cursor-pointer hover:underline text-sm _ca1"
                >
                  Remove
                </p>
              </div>
              <ul class="space-y-2 mt-2">
                <li
                  v-for="(i, index) in Object.keys(usePost.store.polls)"
                  class="flex items-center gap-4"
                >
                  <input
                    :disabled="usePost.store.userIsVoted ? true : false"
                    :class="usePost.store.userIsVoted ? 'b_cf2' : ''"
                    v-model="usePost.store.polls[i]"
                    @input="addVideo.editPoll(index)"
                    type="text"
                    :placeholder="`Option ${index + 1}`"
                  />
                  <img
                    v-if="
                      Object.keys(usePost.store.polls).length > 2 &&
                      !usePost.store.userIsVoted
                    "
                    @click="addVideo.deletePoll(i, index)"
                    class="opacity-50 hover:bg-gray-300 cursor-pointer rounded-full p-2"
                    src="@/assets/svg/x.svg"
                    alt=""
                  />
                </li>
              </ul>
              <button
                v-if="!usePost.store.userIsVoted"
                @click="addVideo.addPoll"
                type="button"
                class="uppercase border_ce0 px-3 rounded-md mt-2"
                :class="
                  Object.keys(usePost.store.polls).length >= 10
                    ? 'b_ce0 _ca1'
                    : ''
                "
              >
                Add option
              </button>
              <p class="mt-2">
                You cannot edit or remove a poll that already has votes
              </p>
            </div>
            <ul
              v-if="addVideo.store.files.length"
              class="flex gap-5 overflow-x-auto"
            >
              <draggable
                :list="addVideo.store.files"
                group="grid"
                :animation="200"
                class="flex gap-4 z-20 overflow-hidden overflow-x-auto min-w-fit"
              >
                <li
                  class="relative imagelabel"
                  v-for="(i, index) in addVideo.store.files"
                >
                  <button
                    @click="deleteMedia(index)"
                    type="button"
                    class="absolute deleteimage z-20 bg-white !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2"
                  >
                    <img src="@/assets/svg/x.svg" alt="" />
                  </button>
                  <img
                    v-if="i.type == 'image'"
                    class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
                    :src="i.url"
                    alt=""
                  />
                  <div v-else-if="i.type == 'video'">
                    <video
                      class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
                      controls
                    >
                      <source :src="i.url" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div v-else-if="i.type == 'video'">
                    <video
                      class="w-40 h-40 min-w-[160px] border rounded-xl object-cover"
                      controls
                    >
                      <source :src="i.url" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <iframe
                    v-else-if="
                      i.type == 'youtube' ||
                      i.type == 'wistia' ||
                      i.type == 'vimeo' ||
                      i.type == 'loom'
                    "
                    class="w-40 h-40 min-w-[160px] border rounded-xl object-cover text-[#0000]"
                    :src="i.url"
                  ></iframe>
                </li>
              </draggable>
              <li>
                <label
                  for="add_image"
                  class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm w-40 h-40"
                >
                  <img class="w-1/3" src="@/assets/svg/add_photo.svg" alt="" />
                </label>
              </li>
            </ul>
            <input
              @change="addVideo.handleImage"
              type="file"
              id="add_image"
              class="h-0 w-0 overflow-hidden !p-0"
            />
            <p
              v-if="usePost.store.error"
              class="text-red-600 text-end text-sm pb-3"
            >
              {{ usePost.store.error }}
            </p>
          </div>
          <div
            class="2xl:flex items-center justify-between 2xl:space-y-0 space-y-5 p-5 pt-0 2xl:mt-0 -mt-10 bg-white"
          >
            <div class="textarea_icon flex items-center">
              <label for="add_image" class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/upload.svg" alt="" />
              </label>
              <div
                @click="isLoading.modal.add_link = true"
                class="icon full_flex h-10 w-10"
              >
                <img src="@/assets/svg/textarea/link.svg" alt="" />
              </div>
              <div
                @click="useClassroom.local_store.addVideoModal = true"
                class="icon full_flex h-10 w-10"
              >
                <img src="@/assets/svg/textarea/video.svg" alt="" />
              </div>
              <div
                @click="addVideo.openPoll"
                class="icon full_flex h-10 w-10 cursor-pointer"
              >
                <img src="@/assets/svg/textarea/poll.svg" alt="" />
              </div>
              <el-dropdown
                placement="bottom-end"
                class="dropdown"
                trigger="click"
              >
                <div id="emojidrop1" class="icon full_flex h-10 w-10 relative">
                  <img src="@/assets/svg/textarea/emoji.svg" alt="" />
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <div class="!overflow-hidden overflow-y-auto">
                      <EmojiPicker
                        :native="true"
                        theme="light"
                        @select="addVideo.onSelectEmoji"
                      />
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <div class="icon full_flex h-10 w-10">
                <img src="@/assets/svg/textarea/gif.svg" alt="" />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <el-dropdown
                @command="
                  (command) => {
                    usePost.store.category_id = command;
                  }
                "
                placement="bottom-end"
                class="dropdown"
                trigger="click"
              >
                <div class="flex items-center gap-1 mx-4 font-medium text-sm">
                  <p class="whitespace-nowrap max-w-[100px] truncate">
                    {{
                      usePost.store.category_id
                        ? usePost.store.category_id.name
                        : "Select category"
                    }}
                  </p>
                  <img src="@/assets/svg/textarea/select_arrow.svg" alt="" />
                </div>
                <template #dropdown>
                  <el-dropdown-menu
                    class="min-w-[200px] !mt-3 !-mr-0 dropdown_shadow"
                  >
                    <el-dropdown-item
                      v-for="(i, index) in usePost.store.categories"
                      :command="i"
                      class="flex flex-col !items-start px-5 hover:bg-[#F2F2F2] cursor-pointer space-y-1 h-[63px]"
                    >
                      <h1 class="font-semibold">{{ i.name }}</h1>
                      <p class="text-xs">{{ i.description }}</p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <div class="flex gap-3 font-semibold md:text-[16px] text-sm">
                <button
                  type="button"
                  @click="usePost.modal.edit = false"
                  class="uppercase h-10 px-6 rounded-lg _ca1"
                >
                  cancel
                </button>
                <button
                  v-loading="isLoading.isLoadingType('writePost')"
                  :type="
                    isLoading.isLoadingType('writePost') ? 'button' : 'submit'
                  "
                  class="uppercase h-10 px-6 rounded-lg"
                  :class="usePost.create.title ? 'b_cbc _c07' : 'b_ce0 _ca1'"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
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
          class="flex items-start gap-4 border-y border-[#F0F5FA] w-full py-5"
        >
          <div class="relative max-w-fit">
            <img
              class="h-10 w-10 min-w-[40px] object-cover"
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
                  class="h-6 w-6 min-w-[24px] object-cover"
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
                  <div
                    class="flex pt-1 md:gap-[14px] gap-[10px] md:ml-0 -ml-[92px]"
                  >
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
                          <div
                            class="icon sm:flex hidden items-center justify-center h-10 w-10"
                          >
                            <img
                              src="@/assets/svg/textarea/link_black.svg"
                              alt=""
                            />
                          </div>
                          <div
                            class="icon sm:flex hidden items-center justify-center h-10 w-10"
                          >
                            <img
                              src="@/assets/svg/textarea/video_black.svg"
                              alt=""
                            />
                          </div>
                          <div
                            class="icon sm:flex hidden items-center justify-center h-10 w-10"
                          >
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
                            @click="usePost.store.writingModal = false"
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
        <div class="flex items-start py-3 px-5 h-[112px] gap-[14px]">
          <img
            class="h-10 w-10 object-cover"
            src="@/assets/image/user.svg"
            alt=""
          />
          <div class="w-full">
            <input class="text-sm !border-0" placeholder="Your comment" />
            <div class="flex items-center justify-between py-5 mt-2 pt-0">
              <div class="textarea_icon flex items-center">
                <div class="icon full_flex h-10 w-10">
                  <img src="@/assets/svg/textarea/upload_black.svg" alt="" />
                </div>
                <div
                  class="icon sm:flex hidden items-center justify-center h-10 w-10"
                >
                  <img src="@/assets/svg/textarea/link_black.svg" alt="" />
                </div>
                <div
                  class="icon sm:flex hidden items-center justify-center h-10 w-10"
                >
                  <img src="@/assets/svg/textarea/video_black.svg" alt="" />
                </div>
                <div
                  class="icon sm:flex hidden items-center justify-center h-10 w-10"
                >
                  <img src="@/assets/svg/textarea/emoji_black.svg" alt="" />
                </div>
                <div class="icon full_flex h-10 w-10">
                  <img src="@/assets/svg/textarea/gif_black.svg" alt="" />
                </div>
              </div>
              <div class="flex gap-3 font-semibold">
                <button
                  @click="usePost.store.card_info = false"
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
          <button
            @click="reposrtToAdmins"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            yes
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- Delete post -->
    <el-dialog
      v-model="usePost.modal.delete"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">
          {{ usePost.store.changeVoteData.title }}
        </h1>
        <p class="text-lg">{{ usePost.store.changeVoteData.description }}</p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="usePost.modal.delete = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button
            v-if="usePost.store.modalType == 'delete'"
            @click="usePost.deletePost"
            v-loading="isLoading.isLoadingType('deletePost')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            delete
          </button>
          <button
            v-else-if="usePost.store.modalType == 'changeVote'"
            @click="usePost.setUserVote"
            v-loading="isLoading.isLoadingType('setUserVote')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            confirm
          </button>
          <button
            v-else-if="usePost.store.modalType == 'media'"
            @click="() => addVideo.deleteImage(store.media_index)"
            v-loading="isLoading.isLoadingType('deleteMedia')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            confirm
          </button>
          <button
            v-else-if="usePost.store.modalType == 'poll'"
            @click="() => usePost.removePoll()"
            v-loading="isLoading.isLoadingType('removePoll')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            confirm
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- Change category -->
    <el-dialog
      v-model="usePost.modal.change_category"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">Change category to</h1>
        <el-select
          class="block w-full mt-2"
          v-model="usePost.create.category_id"
          @change="handleChangeCategory"
          placeholder="Select"
        >
          <el-option
            v-for="item in usePost.store.categories"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          >
            <div class="flex items-center gap-2">
              {{ item.name }}
              <img
                v-if="usePost.store.category_id.name == item.name"
                src="@/assets/svg/checked.svg"
                alt=""
              />
            </div>
          </el-option>
        </el-select>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="usePost.modal.change_category = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button
            @click="addVideo.handleSubmit"
            v-loading="isLoading.isLoadingType('writePost')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            change
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- Like modal -->
    <el-dialog
      v-model="store.likeModal"
      width="500"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <div class="flex items-center justify-between border-b pb-4 -mx-4 px-4">
          <h1 class="font-semibold">
            {{ store.likeModalData.length }} {{ store.likeModalType }}
          </h1>
          <img
            @click="store.likeModal = false"
            class="cursor-pointer"
            src="@/assets/svg/x.svg"
            alt=""
          />
        </div>
        <ul>
          <li
            v-for="i in store.likeModalData.users"
            class="flex items-center gap-4 w-full"
          >
            <img
              class="h-10 w-10 rounded-full object-cover"
              :src="i.image"
              title="user"
            />
            <div class="space-y-1 w-[65%]">
              <h1 class="truncate font-semibold">
                {{ i.name }} {{ i.surname }}
              </h1>
              <p v-if="store.likeModalType == 'Votes'" class="truncate">
                {{ i.username }}
              </p>
              <p v-else class="truncate">
                💪 I want to work on building my self-confidence. Have you ever
                struggled with this? How did you develop a stronger sense of
                self-worth? 💪💖
              </p>
            </div>
            <button
              v-if="store.likeModalType != 'Votes'"
              class="full_flex gap-[10px] min-w-fit uppercase b_ce0 _ca1 r_8 px-3"
            >
              chat
              <img src="@/assets/svg/chat_x.svg" alt="" />
            </button>
          </li>
        </ul>
      </div>
    </el-dialog>

    <el-drawer
      v-model="store.drawer"
      height="400"
      direction="btt"
      class="!w-full !h-[400px] !rounded-t-[16px] overflow-hidden"
    >
      <div
        class="flex items-center justify-between sticky -top-[21px] bg-white z-20 pt-6 -mt-[21px] pb-6"
      >
        <h1 class="font-semibold">Choose category</h1>
        <img
          class="cursor-pointer"
          @click="store.drawer = false"
          src="@/assets/svg/close_drawer.svg"
          alt=""
        />
      </div>
      <div class="flex gap-3 whitespace-nowrap flex-wrap items-center">
        <button
          @click="handleCategory('all')"
          :class="
            usePost.store.filter.category_id != 'all' ? 'bg-[#F0F5FA]' : 'b_cbc'
          "
          class="px-3 rounded-full md:h-9 h-8 hover:bg-[#F0F5FA] hover:bg-opacity-30 duration-700"
        >
          All
        </button>
        <button
          @click="handleCategory(i.id)"
          store.drawer="false"
          v-for="i in usePost.store.categories"
          :class="
            usePost.store.filter.category_id == i.id ? 'b_cbc' : 'bg-[#F0F5FA]'
          "
          class="flex items-center md:h-9 h-8 hover:bg-opacity-30 duration-700 gap-1 py-2 px-3 rounded-full"
        >
          <img
            class="w-[14px] h-[21px] object-contain"
            :src="i.icon"
            alt=""
          />{{ i.name }}
        </button>
      </div>
    </el-drawer>

    <ModalAddVideo />
    <ModalAddLink />
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import {
  usePostStore,
  useLoadingStore,
  useChatStore,
  useGroupStore,
  useClassroomStore,
  useAddVideoStore,
} from "@/store";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import { useNotification } from "@/composables/notifications";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const usePost = usePostStore();
const useChat = useChatStore();
const useGroup = useGroupStore();
const isLoading = useLoadingStore();
const useClassroom = useClassroomStore();
const addVideo = useAddVideoStore();
const { showMessage } = useNotification();
const router = useRouter();
isLoading.addLoading("getPosts");
onBeforeMount(() => {
  usePost.get_categories();
  usePost.get_posts();
});
const store = reactive({
  is_show: false,
  writingModal: false,
  likeModal: false,
  likeModalType: "Likes",
  likeModalData: {
    length: 0,
    users: [],
  },
  card_info: false,
  reportAdmin: false,
  drawer: false,
  is_emoji: false,
  media_index: "",
});

usePost.store.filter.filter = router.currentRoute.value.query.filter;
usePost.store.filter.sort = router.currentRoute.value.query.sort;
usePost.store.filter.category_id = router.currentRoute.value.query.category_id;

const changeVoteData = {
  title: "Change vote?",
  description: "Are you sure you want to change your vote?",
};

const deleteVoteData = {
  title: "Remove vote?",
  description: "Are you sure you want to remove your vote?",
};

const deleteMediaFile = {
  title: "Delete file?",
  description: "Are you sure you want to delete this file?",
};

const deletePostData = {
  title: "Delete post?",
  description: "Are you sure you want to delete?",
};

const deletePostPoll = {
  title: "Remove poll?",
  description: "Are you sure you want to remove this poll",
};

function deletePost() {
  usePost.store.modalType = "delete";
  usePost.store.changeVoteData = deletePostData;
  usePost.modal.delete = true;
}

function removePoll() {
  usePost.store.modalType = "poll";
  usePost.store.changeVoteData = deletePostPoll;
  usePost.modal.delete = true;
}

function deleteMedia(index) {
  store.media_index = index;
  usePost.store.modalType = "media";
  usePost.store.changeVoteData = deleteMediaFile;
  usePost.modal.delete = true;
}

function changeVote(poll) {
  usePost.store.poll_id = poll.id;
  if (usePost.store.userIsVoted) {
    if (poll.is_selected) {
      usePost.store.modalType = "changeVote";
      usePost.store.changeVoteData = deleteVoteData;
    } else {
      usePost.store.modalType = "changeVote";
      usePost.store.changeVoteData = changeVoteData;
    }
    usePost.modal.delete = true;
  } else {
    usePost.setUserVote();
  }
}

function editPostData(type) {
  if (type == "category") {
    usePost.modal.change_category = true;
    usePost.modal.edit = true;
  } else {
    usePost.modal.edit = true;
  }
  for (let i in usePost.create) {
    usePost.create[i] = usePost.store.postData[i];
  }
  let t = 0;
  usePost.store.polls = {};
  for (let i of usePost.store.postData.polls) {
    usePost.store.polls[`option${t}`] = i.option;
    t++;
  }
  if (!usePost.store.postData.polls?.length) {
    usePost.store.polls = {};
    usePost.store.isPollSaved = false;
  } else {
    usePost.store.isPollSaved = true;
  }
  for (let category of usePost.store.categories) {
    console.log(category);
    if (usePost.store.postData.category_id == category.id) {
      usePost.store.category_id = category;
    }
  }
  if (!usePost.store.polls) {
    usePost.store.polls = {};
  }
  addVideo.store.files = [];
  for (let i of usePost.store.postData.media_files) {
    addVideo.store.files.push({
      id: i.id,
      url: i.url,
      file: i.url,
      type: i.type,
      is_new: false,
    });
  }
}

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

const filter_sort = [
  {
    type: "recent",
    title: "Recent activity",
  },
  {
    type: "newest",
    title: "Newest post",
  },
  {
    type: "best",
    title: "Best (this week)",
  },
];

const filter_filter = [
  {
    type: "none",
    title: "None",
  },
  {
    type: "pinned",
    title: "Pinned (3)",
  },
  {
    type: "watching",
    title: "Watching",
  },
  {
    type: "unread",
    title: "Unread",
  },
  {
    type: "no_comments",
    title: "No comments",
  },
];

function handleChangeCategory(item) {
  console.log(usePost.create.category_id);
  for (let i of usePost.store.categories) {
    if (i.id == usePost.create.category_id) {
      console.log(usePost.store.category_id);
      usePost.store.category_id = i;
    }
  }
  console.log(item);
}

function showPostData(id) {
  usePost.store.card_info = true;
  usePost.store.post_id = id;
  usePost.getPostById();
}

function handleLikeModal(type, data) {
  store.likeModalType = type;
  store.likeModal = true;
  store.likeModalData = {
    length: data.length,
    users: data,
  };
}

function openChatModal(data) {
  isLoading.store.chatModal = true;
  useChat.store.chat_user_data = data;
  isLoading.store.chatModal = true;
  useChat.getChatMessages();
}

function onSelectEmoji(emoji) {
  useClassroom.module.video_content += emoji.i;
}

function handleCategory(id, type) {
  store.drawer = false;
  if (type == "sort") {
    usePost.store.filter.sort = id;
    isLoading.changeQuery("sort", id);
  } else if (type == "filter") {
    usePost.store.filter.filter = id;
    isLoading.changeQuery("filter", id);
  } else {
    usePost.store.filter.category_id = id;
    isLoading.changeQuery("category_id", id);
  }
  usePost.get_posts();
}

function handlePhotoImage(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  document.getElementById("add_image").value = "";
  usePost.store.files_url.push(url);
  usePost.create.files.push(file);
}

function deleteImage(index) {
  usePost.store.files_url.splice(index, 1);
  usePost.create.files.splice(index, 1);
}

watch(
  () => isLoading.store.pagination.current_page,
  () => {
    window.scrollTo(0, 0);
    usePost.get_posts();
  }
);

watch(
  () => usePost.modal.change_category,
  () => {
    if (!usePost.modal.change_category) {
      usePost.modal.edit = false;
    }
  }
);

watch(
  () => useClassroom.local_store.addVideoModal,
  () => {
    if (
      !useClassroom.local_store.addVideoModal &&
      useClassroom.local_store.videoLink
    ) {
      usePost.create.video_link.push(useClassroom.local_store.videoLink);
      usePost.store.files_url.push(useClassroom.local_store.videoLink);
    }
  }
);
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
