<template>
  <nav class="fixed top-0 w-full z-50 bg-white navbar h-[64px]">
    <div
      class="flex justify-between items-center h-[64px] mx-auto xl:px-[200px] lg:px-[100px] md:px-[100px] sm:px-[50px] px-5 max-w-[1536px]">
      <div class="flex items-center sm:gap-5 gap-3 cursor-pointer">
        <router-link
          :to="$router.currentRoute.value.params.community ? `/${$router.currentRoute.value.params.community}` : '/'">
          <img v-if="$router.currentRoute.value.name == 'index'" src="/logo.svg" alt="" />
          <div class="flex" v-else-if="$router.currentRoute.value.name.indexOf('community') == 0
            ">
            <div class="full_flex gap-2" v-if="!isLoading.isLoadingType('getByUsername')">
              <div>
                <img class="sm:h-10 sm:w-10 h-7 w-7 min-w-[40px] min-h-[40px] object-cover rounded-full"
                v-if="useGroup.store.group_by_username.icon" :src="useGroup.store.group_by_username.icon" alt="" />
              <div v-else
                class="full_flex text-white uppercase md:h-10 md:min-w-[40px] h-5 min-w-[20px] md:text-[16px] text-[10px] rounded-full"
                :style="`background: ${useGroup.store.group_by_username.color}`">
                {{ useGroup.store.group_by_username.initials }}
              </div>
              </div>
              <p v-if="$router.currentRoute.value.name.indexOf('community') == 0"
            class="sm:text-lg tr text-sm font-semibold whitespace-nowrap max-w-[150px] truncate">
            {{ useGroup.store.group_by_username.name }}
          </p>
            </div>
            <div v-else class="full_flex gap-5">
              <LoadingDiv class="h-10 w-10 rounded-full" />
              <LoadingDiv class="w-[120px] h-5 rounded" />
            </div>
          </div>
          <img v-else src="/icon.svg" alt="" />
        </router-link>
        <router-link v-show="$router.currentRoute.value.name.indexOf('community') != 0 &&
            $router.currentRoute.value.name != 'index'
            " class="md:text-lg text-sm whitespace-nowrap font-semibold" to="/">Skool community</router-link>
        <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
          <p class="h-[26px] arrow w-[26px] rounded-[5px]"
            :class="$router.currentRoute.value.name == 'index' ? 'b_cf2' : ''">
            <img class="mx-auto" src="@/assets/svg/arrow.svg" alt="" />
          </p>
          <template #dropdown>
            <el-dropdown-menu class="community_dropdown min-w-[200px] !mt-3 !-mr-7 dropdown_shadow">
              <div class="flex items-center p-[6px] relative h-[44px]">
                <img class="absolute py-[8px] pl-[10px]" src="@/assets/svg/search.svg" alt="" />
                <input @input="searchGroups" class="bg-[#F0F5FA] h-8 !pl-10 text-xs !border-0" type="text" placeholder="Search" />
              </div>
              <el-dropdown-item @click="$router.push('/create_community')">
                <div class="flex items-center gap-3">
                  <img src="@/assets/svg/create_community.svg" alt="" />
                  <p>{{ $t("nav.create_community") }}</p>
                </div>
              </el-dropdown-item>
              <el-dropdown-item @click="$router.push('/')">
                <div class="flex items-center gap-3">
                  <img src="@/assets/svg/discover.svg" alt="" />
                  <p>{{ $t("nav.discover") }}</p>
                </div>
              </el-dropdown-item>
              <el-dropdown-item v-if="!store.is_search" v-for="i in useGroup.store.mygroups" @click="$router.push(`/${i.username}`)">
                <div class="flex items-center gap-3 max-w-[200px] my_groups">
                  <img class="!w-6 !h-6 min-w-[24px] rounded-lg object-cover r_8 !overflow-hidden" v-if="i.icon"
                    :src="i.icon" alt="" />
                  <div v-else class="full_flex text-white uppercase w-6 h-6 min-w-[24px] md:text-[10px] text-[10px] r_8"
                    :style="`background: ${i.color}`">
                    {{ i.initials }}
                  </div>
                  <p class="!truncate !max-w-[200px]">{{ i.name }}</p>
                </div>
              </el-dropdown-item>
              <el-dropdown-item v-else v-for="i in store.searched_data" @click="$router.push(`/${i.username}`)">
                <div class="flex items-center gap-3 max-w-[200px] my_groups">
                  <img class="!w-6 !h-6 min-w-[24px] rounded-lg object-cover r_8 !overflow-hidden" v-if="i.icon"
                    :src="i.icon" alt="" />
                  <div v-else class="full_flex text-white uppercase w-6 h-6 min-w-[24px] md:text-[10px] text-[10px] r_8"
                    :style="`background: ${i.color}`">
                    {{ i.initials }}
                  </div>
                  <p class="!truncate !max-w-[200px]">{{ i.name }}</p>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="relative lg:w-[40%] xl:w-[50%] mx-5 w-[40%] md:block hidden"
        v-if="!search_bar.includes($router.currentRoute.value.name)">
        <img class="md:my-[10px] my-[14px] w-5 h-5 left-5 absolute" src="@/assets/svg/blue_search.svg" alt="" />
        <input @input="handleSearch" v-model="useGroup.store.filter.search" autofocus
          class="md:h-[40px] h-12 !pl-[60px] b_none font-semibold w-full !rounded-lg bg-[#F0F5FA] placeholder-[#9CCDFE]"
          type="text" placeholder="Search all reports" />
      </div>
      <div class="flex items-center md:gap-10 gap-6">
        <el-dropdown v-if="store.is_mount" @command="(command) => {
            $i18n.locale = command;
            changedLang(command);
          }
            " placement="bottom-start">
          <div class="flex items-center _c07 font-semibold gap-2 cursor-pointer">
            <img :src="store.lang_icon[$i18n.locale]" alt="" />
            {{ store.lang[$i18n.locale]?.slice(0, 2) }}
            <img src="@/assets/svg/lang_arrow.svg" alt="" />
          </div>

          <template #dropdown>
            <el-dropdown-menu class="navigation_dropdown min-w-[200px] dropdown_shadow !-ml-3">
              <el-dropdown-item v-show="i != $i18n.locale" :class="i == $i18n.locale ? 'current_lang' : ''"
                v-for="(i, index) in store.lang_type" :command="i">
                <img :src="store.lang_icon[i]" alt="" />
                {{ store.lang[i] }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div v-show="isLoading.store.isLogin" class="sm:flex items-center hidden gap-7">
          <el-dropdown :hide-on-click="false" class="chat_dropdown" placement="bottom-end" trigger="click">
            <img class="min-w-[24px]" src="@/assets/svg/nav/message.svg" alt="" />

            <template #dropdown>
              <el-dropdown-menu
                class="!text-[16px] messages navigation_dropdown w-[500px] min-h-[80vh] dropdown_shadow !mt-3 !-mr-[120px]">
                <Chat />
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img src="@/assets/svg/nav/notification.svg" alt="" />
          <el-dropdown v-if="store.is_mount" placement="bottom-end">
            <img class="h-10 w-10 rounded-full min-w-[40px] object-cover" :src="isLoading.user.image" alt="" />
            <template #dropdown>
              <el-dropdown-menu class="navigation_dropdown min-w-[200px] dropdown_shadow !-ml-3">
                <p class="px-4 py-3 border-b border-[]">
                  {{ isLoading.user.email }}
                </p>
                <el-dropdown-item @click="$router.push('/profile')">Profile</el-dropdown-item>
                <el-dropdown-item @click="$router.push('/settings')">Settings</el-dropdown-item>
                <el-dropdown-item @click="logOut">Log out</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div v-show="!isLoading.store.isLogin" class="sm:flex gap-2 hidden">
          <button @click="useAuth.modal.register = true"
            class="border border-[#BCDEFF] _c2a font-semibold uppercase px-6 rounded-[6px]">
            {{ $t("nav.register") }}
          </button>
          <button @click="useAuth.modal.login = true"
            class="border border-[#BCDEFF] _c2a font-semibold uppercase px-6 rounded-[6px]">
            {{ $t("nav.login") }}
          </button>
        </div>
        <div class="sm:hidden block">
          <el-dropdown v-show="!isLoading.store.isLogin" placement="bottom-end" class="dropdown" trigger="click">
            <img src="@/assets/svg/menu.svg" alt="" />

            <template #dropdown>
              <el-dropdown-menu class="menu_dropdown sm:hidden block min-w-[200px] !mt-3 dropdown_shadow">
                <el-dropdown-item @click="useAuth.modal.register = true">
                  <p>Sign up</p>
                </el-dropdown-item>
                <el-dropdown-item @click="useAuth.modal.login = true">
                  <p>Log in</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown v-show="isLoading.store.isLogin" placement="bottom-end" class="dropdown" trigger="click">
            <img src="@/assets/svg/menu.svg" alt="" />

            <template #dropdown>
              <el-dropdown-menu class="logged_menu_dropdown sm:hidden block min-w-[200px] !mt-3 dropdown_shadow">
                <el-dropdown-item>
                  <img class="w-4 h-4 rounded-full object-cover" src="@/assets/image/user.svg" alt="" />
                  <p>{{ isLoading.user.email }}</p>
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push('/profile')">
                  <img src="@/assets/svg/menu/profile.svg" alt="" />
                  <p>My Profile</p>
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push('/settings')">
                  <img src="@/assets/svg/menu/settings.svg" alt="" />
                  <p>Settings</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <img src="@/assets/svg/menu/notifications.svg" alt="" />
                  <p>Notifications</p>
                </el-dropdown-item>
                <el-dropdown-item @click="isLoading.store.chatDialog = true">
                  <img src="@/assets/svg/menu/chats.svg" alt="" />
                  <p>Chats</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <img src="@/assets/svg/menu/logout.svg" alt="" />
                  <p class="text-[#EB5757]">Log out</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- register -->
    <el-dialog v-model="useAuth.modal.register" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <Register />
    </el-dialog>

    <!-- login -->
    <el-dialog v-model="useAuth.modal.login" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <Login />
    </el-dialog>

    <!-- Verification -->
    <el-dialog v-model="useAuth.modal.verification" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <section class="space-y-8 bg-white rounded-lg p-6 text-center _c07">
        <h1 class="_c07 text-2xl font-semibold">We sent you a code</h1>
        <p class="!mt-4">Enter it below to verify {{ useAuth.verification.email }}</p>
        <form @submit.prevent="useAuth.authVerify" class="space-y-5">
          <input v-model="useAuth.verification.verify_code" autofocus type="number" placeholder="Verification code"
            required />
          <button :type="isLoading.isLoadingType('activate') ? 'button' : 'submit'"
            v-loading="isLoading.isLoadingType('activate')" class="font-semibold w-full rounded-[4px]"
            :class="useAuth.verification.verify_code ? 'b_cbc _c07' : 'b_ce0 _ca1'">
            Verify
          </button>
          <!-- store.errorMessage -->
          <p class="text-start text-red-600 font-medium">{{ useAuth.store.errorMessage }}</p>
        </form>
        <div class="space-y-5">
          <p class="text-xs">
            Didn't get the email?
            <button type="button" @click="useAuth.authResend" class="_c2a font-medium hover:underline">
              Resend it
            </button>
            or
            <button type="button" @click="() => {
            useAuth.modal.verification = false;
            useAuth.modal.register = true;
          }" class="_c2a font-medium hover:underline">
              Use a different email
            </button>
          </p>
        </div>
      </section>
    </el-dialog>

    <!-- Forgot -->
    <el-dialog v-model="useAuth.modal.forgot_modal" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <router-link class="flex justify-center" to="/">
        <img src="/logo.svg" alt="" />
      </router-link>
      <section class="space-y-8 bg-white rounded-lg p-6 text-center _c07">
        <h1 class="_c07 text-2xl font-semibold">Forgot Password</h1>
        <p class="!mt-4">Enter your email address and we'll send you a link to reset your password.</p>
        <form @submit.prevent="useAuth.authForgotPass" class="space-y-5">
          <input v-model="useAuth.verification.email" autofocus type="email" placeholder="Email" required />
          <button :type="isLoading.isLoadingType('activate') ? 'button' : 'submit'"
            v-loading="isLoading.isLoadingType('activate')" class="font-semibold w-full rounded-[4px]"
            :class="useAuth.verification.email ? 'b_cbc _c07' : 'b_ce0 _ca1'">
            EMAIL ME
          </button>
        </form>
      </section>
    </el-dialog>

    <!-- Forgot -->
    <el-dialog v-model="useAuth.modal.sended" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <router-link class="flex justify-center" to="/">
        <img src="/logo.svg" alt="" />
      </router-link>
      <section class="space-y-8 bg-white rounded-lg p-6 text-center _c07">
        <h1 class="_c07 text-2xl font-semibold">Please check your email</h1>
        <p class="!mt-4">We sent you an email, which contains a link to reset your Skool password.</p>
        <button @click="() => { useAuth.modal.sended = false; useAuth.modal.login = true; }"
          v-loading="isLoading.isLoadingType('activate')" class="b_cbc _c07 font-semibold w-full rounded-[4px]">
          BACK TO LOGIN
        </button>
      </section>
    </el-dialog>

    <!-- complete -->
    <el-dialog v-model="useAuth.modal.complete" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <section class="space-y-8 bg-white rounded-lg p-6 text-center _c07">
        <h1 class="_c07 text-2xl font-semibold">Complete your profile</h1>
        <p class="!mt-4 text-[12.5px]">
          Communities feel weird without faces and names.
          Profiles build trust and spark connection with others.
        </p>
        <label v-if="!useAuth.store.userImage" for="add_photo"
          class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 font-medium text-sm h-[150px] w-[150px] mx-auto rounded-full">
          <img src="@/assets/svg/add_photo.svg" alt="" />
          <p>Add a photo</p>
        </label>
        <img v-else :src="useAuth.store.userImage" alt="" class="h-[150px] w-[150px] mx-auto rounded-full object-cover no-repeat" />
        <p class="text-xs flex gap-1">
          <span>Upload a photo or</span>
          <button type="button" @click="register" class="_c2a !h-4 font-medium hover:underline">
            use your Facebook profile pic.
          </button>
        </p>
        <el-input v-model="useAuth.store.bio" @input="handleInput" class="w-full"
          :autosize="{ minRows: 3, maxRows: 5 }" type="textarea" placeholder="Add your bio" />
        <button
        @click="useAuth.authComplete"
            v-loading="isLoading.isLoadingType('activate')" class="font-semibold w-full rounded-[4px]"
            :class="useAuth.store.userImage && useAuth.store.bio ? 'b_cbc _c07' : 'b_ce0 _ca1'">
            COMPLETE
          </button>
      </section>
    </el-dialog>

    <input @change="handleAddedPhoto" id="add_photo" type="file" class="w-0 h-0 overflow-hidden !p-0" />

    <!-- chat dialog -->
    <el-dialog v-model="isLoading.store.chatDialog" align-center
      class="!rounded-lg min-w-[90%] max-h-[70vh] overflow-hidden min-h-[70vh] !mx-auto !my-auto !p-0 !m-0">
      <div class="my-auto">
        <ChatMobile />
      </div>
    </el-dialog>

    <!-- chat -->
    <el-dialog v-model="isLoading.store.chatModal" v-if="isLoading.store.chatModal" align-center
      :class="store.isOpen ? 'h-full' : 'sm:h-[542px] h-full'"
      class="!rounded-xl overflow-hidden md:min-w-[632px] sm:min-w-[calc(100vw_-_40px)] min-w-full chatModal !relative">
      <div class="flex items-center justify-between h-16 border-b border-[#E0E0E0] px-5">
        <div class="flex items-center gap-4">
          <img class="h-10 w-10 object-cover rounded-full" :src="useChat.store.chat_user_data.image" alt="" />
          <div>
            <h1 class="font-semibold truncate max-w-[90%]">
              {{ useChat.store.chat_user_data.name }}
              {{ useChat.store.chat_user_data.surname }}
            </h1>
            <p class="text-xs truncate w-[90%]">
              active 15h ago (5:06am in Los Angeles)
            </p>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <img @click="store.isOpen = !store.isOpen" class="cursor-pointer sm:block hidden"
            src="@/assets/svg/chat/open.svg" alt="" />
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <img class="cursor-pointer min-w-[24px]" src="@/assets/svg/chat/three_dot.svg" alt="" />

            <template #dropdown>
              <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                <el-dropdown-item>View profile</el-dropdown-item>
                <el-dropdown-item>Block Get Clients Support Team</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img @click="isLoading.store.chatModal = false" class="cursor-pointer" src="@/assets/svg/chat/close.svg"
            alt="" />
        </div>
      </div>
      <div id="chatContainer" @scroll="chatScrollListener" class="overflow-y-auto overflow-hidden" :class="store.isOpen
            ? 'h-[calc(100vh_-_124px)]'
            : 'sm:h-[420px] h-[calc(100vh_-_124px)]'
            ">
        <div v-if="isLoading.store.pagination.current_page ==
            isLoading.store.pagination.last_page &&
            !isLoading.isLoadingType('getChatMessage')
            "
          class="flex sm:flex-row flex-col items-center gap-10 py-5 px-4 b_cf0f sm:mx-14 mx-4 mt-5 md:mb-10 mb-4 r_8">
          <div class="w-[158px] space-y-10 relative">
            <img title="Xayot Sharapov" class="h-10 w-10 object-cover cursor-pointer rounded-full mx-auto"
              :src="isLoading.user.image" alt="" />
            <div class="flex gap-[78px]">
              <img title="Xayot Sharapov" class="h-10 w-10 object-cover cursor-pointer rounded-full"
                :src="isLoading.user.image" alt="" />
              <img title="Xayot Sharapov" class="h-10 w-10 min-w-[40px] object-cover cursor-pointer rounded-full"
                :src="useChat.store.chat_user_data.image" alt="" />
            </div>
            <img class="mx-auto absolute top-[0px] left-[25px]" src="@/assets/svg/chat/arrows.svg" alt="" />
          </div>
          <div class="_c59">
            <p class="leading-4">
              You and Get Clients Support Team <br />
              know each other from <br />
              Get Clients University
            </p>
            <p class="leading-4 mt-4">
              Get Clients Support Team broke the ice!
            </p>
          </div>
        </div>
        <div v-show="isLoading.store.pagination.current_page !=
            isLoading.store.pagination.last_page ||
            isLoading.isLoadingType('getChatMessage')
            " id="chat_loading" class="my-2 text-center">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 mx-auto animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
        </div>
        <div id="chatContainerDiv">
          <article :id="`chat_messages${message.id}`" v-for="(message, index) of useChat.store.chat_messages"
            class="space-y-5 md:pb-6 pb-4 md:text-[16px] text-sm">
            <p v-if="useChat.store.chatTimeList[index]" class="md:mb-5 mb-4 text-center _ca1">
              {{ useChat.store.chatTimeList[index] }}
            </p>
            <div v-if="message.sender?.id != isLoading.user.id" class="sm:mx-5 mx-4 flex gap-4">
              <img title="Xayot Sharapov" class="h-8 w-8 min-w-[32px] object-cover cursor-pointer rounded-full"
                :src="message?.sender?.image" alt="" />
              <div class="b_cf2 r_8 p-3">
                <div class="flex items-center justify-between gap-3 mb-3">
                  <h1 class="_c07 font-semibold truncate max-w-[70%]">
                    {{ message.sender?.name }} {{ message.sender?.surname }}
                  </h1>
                  <p class="_ca1">
                    {{ useChat.formateDate(message?.created_at, "time") }}
                  </p>
                </div>
                <pre class="whitespace-pre-line leading-4">{{
            message?.text
          }}</pre>
              </div>
            </div>
            <div v-else class="mx-5 flex justify-end gap-4">
              <div class="b_cf0f r_8 p-3">
                <div class="flex items-center justify-between mb-3 gap-4">
                  <h1 class="_c07 font-semibold truncate max-w-[70%]">
                    {{ message.sender?.name }} {{ message.sender?.surname }}
                  </h1>
                  <p class="_c59">
                    {{ useChat.formateDate(message?.created_at, "time") }}
                  </p>
                </div>
                <pre class="whitespace-pre-line leading-4">{{
            message?.text
          }}</pre>
              </div>
              <img title="Xayot Sharapov" class="h-8 w-8 min-w-[32px] object-cover cursor-pointer rounded-full"
                :src="message?.sender?.image" alt="" />
            </div>
          </article>
        </div>
      </div>
      <div class="flex items-center h-[60px] px-4 border-t border-[#E0E0E0] bg-white">
        <input @change="useChat.sendMessage" v-model="useChat.message.text" class="sm:block hidden !border-0 w-full"
          type="text" placeholder="Message Get Clients Support Team" />
        <input @change="useChat.sendMessage" v-model="useChat.message.text" class="sm:hidden block !border-0 w-full"
          type="text" placeholder="Message here" />
        <div class="flex h-[14px] w-[120px] gap-[26px]">
          <label for="upload_image" class="min-w-[14px]">
            <img src="@/assets/svg/textarea/upload.svg" alt="" />
          </label>
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <img class="min-w-[14px]" src="@/assets/svg/textarea/emoji.svg" alt="" />

            <template #dropdown>
              <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                <el-dropdown-item>👍🤣😊🧨🎎🎆🎈🎁</el-dropdown-item>
                <el-dropdown-item>👍❎🚫🛴🏍😁✔👎</el-dropdown-item>
                <el-dropdown-item>🛵🚞🚃💙🤍😗😂😐</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img src="@/assets/svg/textarea/gif.svg" alt="" />
        </div>
      </div>
    </el-dialog>
    <input type="file" id="upload_image" class="h-0 w-0 overflow-hidden !p-0" />
  </nav>
</template>

<script setup>
import {
  useAuthStore,
  useLoadingStore,
  useGroupStore,
  useChatStore,
} from "@/store";
import uz from "@/assets/svg/uz.svg";
import ru from "@/assets/svg/ru.svg";
import uz_ru from "@/assets/svg/uz.svg";
import en from "@/assets/svg/en.svg";
import { useI18n } from "vue-i18n";

// const { locale } = useI18n();
const router = useRouter();
const useAuth = useAuthStore();
const useGroup = useGroupStore();
const isLoading = useLoadingStore();
const useChat = useChatStore();
isLoading.addLoading("getByUsername");
const search_bar = ["index", "settings", "community-about"];

const store = reactive({
  lang: {
    en: "EN - English",
    ru: "РУ - Русский",
    uz: "UZ - O’zbek (lotin)",
    uz_ru: "УЗ - Ўзбек (кирилл)",
  },
  lang_type: ["en", "ru", "uz", "uz_ru"],
  lang_icon: { en, ru, uz, uz_ru },
  is_mount: false,
  isOpen: false,
  searched_data: [],
  is_search: false,
});

function searchGroups(e) {
  store.searched_data = [];
  let val;
  try{
    val = e.target.value?.toLowerCase()?.trim();
    for (let i of useGroup.store.mygroups) {
      console.log(i.name.toLowerCase());
    if (i.name.toLowerCase().includes(val)) {
      store.searched_data.push(i);
    }
  }
  }catch(_) {}
  console.log(store.searched_data)
  if (!val) {
    store.is_search = false;
  } else {
  store.is_search = true;
  }
}

function changedLang(lang) {
  localStorage.setItem("lang", lang);
}

function logOut() {
  localStorage.removeItem("token");
  isLoading.store.isLogin = false;
}

function handleAddedPhoto(e) {
  const file = e.target.files[0];
  useAuth.store.userImage = URL.createObjectURL(file);
}

watch(
  () => useChat.store.chat_messages?.length,
  () => {
    if (useChat.store.scrollToBottom) {
      setTimeout(() => {
        const chatContainer = document.getElementById("chatContainer");
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 200);
      useChat.store.scrollToBottom = false;
    }
  }
);

onBeforeMount(() => {
  store.is_mount = true;
  useGroup.groupByUsername();
  useGroup.getMyGroups();
});

onBeforeMount(() => {
  useAuth.getUser();
});

watch(() => router.currentRoute.value.params.community, () => {
  useGroup.groupByUsername();
})

watch(() => useAuth.modal.forgot_modal, () => {
  if (useAuth.modal.forgot_modal) {
    useAuth.verification.email = "";
  }
});
</script>

<style lang="scss" scoped>
.dropdown:hover {
  .arrow {
    background: transparent;
    transition-duration: 1s;
  }
}

.chat_item:hover {
  .unreadbtn {
    background: transparent !important;
    border: 1px solid #a1a1a1 !important;
  }
}

.unread_tooltip {
  width: 24px !important;
  height: 24px !important;
  border-radius: 4px;

  &:hover {
    background: #f2f2f2 !important;
  }
}
</style>
