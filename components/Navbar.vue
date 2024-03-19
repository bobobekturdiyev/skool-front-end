<template>
  <nav class="fixed top-0 w-full z-50 bg-white navbar">
    <div
      class="flex justify-between items-center h-[64px] mx-auto xl:px-[200px] lg:px-[100px] md:px-[50px] sm:px-[50px] px-5 max-w-[1536px]">
      <div class="flex items-center gap-5 cursor-pointer">
        <router-link to="/">
          <img v-if="$router.currentRoute.value.name == 'index'" src="/logo.svg" alt="" />
          <div v-else-if="$router.currentRoute.value.name == 'community-about'">
            <img class="h-10 w-10 object-cover rounded-full" v-if="useGroup.store.group_by_username[0]?.user_id?.image"
              :src="useGroup.store.group_by_username[0]?.user_id?.image" alt="" />
            <div v-else class="full_flex gap-5">
              <p class="bg-gray-600 h-10 w-10 rounded-full"></p>
              <p class="bg-gray-600 w-[120px] h-5 rounded"></p>
            </div>
          </div>
          <img v-else src="/icon.svg" alt="" />
        </router-link>
        <router-link v-if="$router.currentRoute.value.name == 'community-about'" class="text-lg font-semibold" to="/">{{
            useGroup.store.group_by_username[0]?.user_id?.name }}
          {{
            useGroup.store.group_by_username[0]?.user_id?.surname
          }}</router-link>
        <router-link v-else-if="$router.currentRoute.value.name != 'index'" class="text-lg font-semibold" to="/">Skool
          community</router-link>
        <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
          <p class="h-[26px] arrow w-[26px] rounded-[5px]"
            :class="$router.currentRoute.value.name == 'index' ? 'b_cf2' : ''">
            <img class="mx-auto" src="@/assets/svg/arrow.svg" alt="" />
          </p>
          <template #dropdown>
            <el-dropdown-menu class="community_dropdown min-w-[200px] !mt-3 !-mr-7 dropdown_shadow">
              <div class="flex items-center p-[6px] relative h-[44px]">
                <img class="absolute py-[8px] pl-[10px]" src="@/assets/svg/search.svg" alt="" />
                <input class="bg-[#F0F5FA] h-8 !pl-10 text-xs !border-0" type="text" placeholder="Search" />
              </div>
              <el-dropdown-item>
                <div class="flex items-center gap-3">
                  <img src="@/assets/svg/create_community.svg" alt="" />
                  <p>{{ $t("nav.create_community") }}</p>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="flex items-center gap-3">
                  <img src="@/assets/svg/discover.svg" alt="" />
                  <p>{{ $t("nav.discover") }}</p>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
          <el-dropdown class="chat_dropdown" placement="bottom-end" trigger="click">
            <img class="drop" src="@/assets/svg/nav/message.svg" alt="" />

            <template #dropdown>
              <el-dropdown-menu
                class="!text-[16px] messages navigation_dropdown w-[500px] min-h-[80vh] dropdown_shadow !mt-3 !-mr-[120px]">
                <div class="flex items-center justify-between sticky z-20 top-0 bg-white pt-4 pb-5 px-4">
                  <h1 class="font-semibold">Chat</h1>
                  <el-dropdown placement="bottom-end" class="dropdown">
                    <div class="full_flex gap-1 _c2a text-xs font-semibold">
                      <p class="text-xs">All</p>
                      <img src="@/assets/svg/chat/select_arrow.svg" alt="">
                    </div>
                    <template #dropdown>
                      <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                        <el-dropdown-item @click="handleChatType('all')">All</el-dropdown-item>
                        <el-dropdown-item @click="handleChatType('unread')">Unread</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div class="flex pb-5 px-4">
                  <img class="-mr-10 z-10 ml-5" src="@/assets/svg/chat/search.svg" alt="">
                  <input class="placeholder-[#9CCDFE] !pl-[60px] b_cf0f r_8 !border-none" type="text"
                    placeholder="Search all reports">
                </div>
                <div v-if="useChat.store.users?.length">
                  <el-dropdown-item @click="openChatModal(i)" :id="`tooltip${index}`" class="chat_item"
                    v-for="(i, index) in useChat.store.users">
                    <img class="h-10 w-10 rounded-full object-cover" :src="i.image"
                      :title="i.user_id?.name + ' ' + i.surname">
                    <div class="space-y-1 max-w-[390px]">
                      <h1 class="font-semibold">{{ i.name }} {{ i.surname }} <span class="_c59 font-[400] text-xs">19d
                          ago</span>
                      </h1>
                      <p class="truncate max-w-[390px]">💪 I want to work on building my self-confidence. Have you ever
                        struggled with
                        this? How did you develop a stronger sense of self-worth? 💪💖</p>
                    </div>
                    <el-tooltip content="Mark unread" placement="top">
                      <div class="unread_tooltip cursor-pointer" @mouseover="handleMouseOver(index)"
                        @mouseleave="handleMouseLeave(index)">
                        <p class="h-[10px] z-10 w-[10px] m-[6px] rounded-full b_c2a unreadbtn"></p>
                      </div>
                    </el-tooltip>
                  </el-dropdown-item>
                </div>
                <el-dropdown-item v-else id="nochatyet" class="flex items-center justify-center">
                  No chat yet
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img src="@/assets/svg/nav/notification.svg" alt="" />
          <!-- <router-link to="/">
            <img class="h-10 w-10 object-cover" src="@/assets/image/user.svg" alt="" />
          </router-link> -->
          <el-dropdown v-if="store.is_mount" placement="bottom-end">
            <img class="h-10 w-10 object-cover" src="@/assets/image/user.svg" alt="" />
            <template #dropdown>
              <el-dropdown-menu class="navigation_dropdown min-w-[200px] dropdown_shadow !-ml-3">
                <p class="px-4 py-3 border-b border-[]">xayotwork@gmail.com</p>
                <el-dropdown-item>Profile</el-dropdown-item>
                <el-dropdown-item @click="$router.push('/settings')">Settings</el-dropdown-item>
                <el-dropdown-item>Log out</el-dropdown-item>
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
                  <p>{{ isLoading.store.email }}</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <img src="@/assets/svg/menu/profile.svg" alt="" />
                  <p>My Profile</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <img src="@/assets/svg/menu/settings.svg" alt="" />
                  <p>Settings</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <img src="@/assets/svg/menu/notifications.svg" alt="" />
                  <p>Notifications</p>
                </el-dropdown-item>
                <el-dropdown-item>
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

    <!-- chat -->
    <el-dialog v-model="isLoading.store.chatModal" align-center :class="store.isOpen ? 'h-full' : 'h-[542px]'"
      class="!rounded-xl overflow-hidden min-w-[632px] chatModal !relative">
      <div class="flex items-center justify-between h-16 border-b border-[#E0E0E0] px-5">
        <div class="flex items-center gap-4">
          <img class="h-10 w-10 object-cover rounded-full" :src="useChat.store.chat_user_data.image" alt="">
          <div>
            <h1 class="font-semibold truncate max-w-[90%]">{{ useChat.store.chat_user_data.name }} {{
            useChat.store.chat_user_data.surname }}</h1>
            <p class="text-xs">active 15h ago (5:06am in Los Angeles)</p>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <img @click="store.isOpen = !store.isOpen" class="cursor-pointer" src="@/assets/svg/chat/open.svg" alt="">
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <img class="cursor-pointer" src="@/assets/svg/chat/three_dot.svg" alt="">

            <template #dropdown>
              <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                <el-dropdown-item>View profile</el-dropdown-item>
                <el-dropdown-item>Block Get Clients Support Team</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img @click="isLoading.store.chatModal = false" class="cursor-pointer" src="@/assets/svg/chat/close.svg"
            alt="">
        </div>
      </div>
      <div id="chatContainer" @scroll="chatScrollListener" class="overflow-y-auto overflow-hidden"
        :class="store.isOpen ? 'h-[calc(100vh_-_124px)]' : 'h-[420px]'">
        <div v-if="isLoading.store.pagination.current_page == isLoading.store.pagination.last_page" class="flex items-center gap-10 py-5 px-4 b_cf0f mx-14 mt-5 mb-10 r_8">
          <div class="w-[158px] space-y-10 relative">
            <img title="Xayot Sharapov" class="h-10 w-10 object-cover cursor-pointer rounded-full mx-auto"
              src="@/assets/image/user.svg" alt="">
            <div class="flex gap-[78px]">
              <img title="Xayot Sharapov" class="h-10 w-10 object-cover cursor-pointer rounded-full"
                src="@/assets/image/user.svg" alt="">
              <img title="Xayot Sharapov" class="h-10 w-10 object-cover cursor-pointer rounded-full"
                :src="useChat.store.chat_user_data.image" alt="">
            </div>
            <img class="mx-auto absolute top-[0px] left-[25px]" src="@/assets/svg/chat/arrows.svg" alt="">
          </div>
          <div class="_c59">
            <p class="leading-4">You and Get Clients Support Team <br /> know each other from <br /> Get Clients
              University
            </p>
            <p class="leading-4 mt-4">Get Clients Support Team broke the ice!</p>
          </div>
        </div>
        <article :id="`chat_messages${message.id}`" v-for="(message, index) of useChat.store.chat_messages"
          class="space-y-5 pb-6">
          <p v-if="useChat.store.chatTimeList[index]" class="mb-5 text-center _ca1">
            {{ useChat.store.chatTimeList[index] }}
          </p>
          <div v-if="message.sender?.id != isLoading.user.id" class="mx-5 flex gap-4">
            <img title="Xayot Sharapov" class="h-8 w-8 min-w-[32px] object-cover cursor-pointer rounded-full"
              :src="message?.sender?.image" alt="">
            <div class="b_cf2 r_8 p-3">
              <div class="flex items-center justify-between gap-3 mb-3">
                <h1 class="_c07 font-semibold truncate max-w-[70%]">{{ message.sender?.name }} {{
            message.sender?.surname
          }}
                </h1>
                <p class="_ca1">{{ formateDate(message?.created_at, 'time') }}</p>
              </div>
              <pre class="whitespace-pre-line leading-4">{{ message?.text }}</pre>
            </div>
          </div>
          <div v-else class="mx-5 flex justify-end gap-4">
            <div class="b_cf0f r_8 p-3">
              <div class="flex items-center justify-between mb-3">
                <h1 class="_c07 font-semibold truncate max-w-[70%]">{{ message.sender?.name }} {{
            message.sender?.surname
          }}
                </h1>
                <p class="_c59">{{ formateDate(message?.created_at, 'time') }}</p>
              </div>
              <pre class="whitespace-pre-line leading-4">{{ message?.text }}</pre>
            </div>
            <img title="Xayot Sharapov" class="h-8 w-8 min-w-[32px] object-cover cursor-pointer rounded-full"
              :src="message?.sender?.image" alt="">
          </div>
        </article>
      </div>
      <div class="flex items-center h-[60px] px-4 border-t border-[#E0E0E0] bg-white">
        <input @change="useChat.sendMessage" v-model="useChat.message.text" class="!border-0 w-full" type="text"
          placeholder="Message Get Clients Support Team">
        <div class="flex h-[14px] w-[120px] gap-[26px]">
          <label for="upload_image">
            <img src="@/assets/svg/textarea/upload.svg" alt="">
          </label>
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <img src="@/assets/svg/textarea/emoji.svg" alt="">

            <template #dropdown>
              <el-dropdown-menu class="community_dropdown min-w-[200px] dropdown_shadow">
                <el-dropdown-item>👍🤣😊🧨🎎🎆🎈🎁</el-dropdown-item>
                <el-dropdown-item>👍❎🚫🛴🏍😁✔👎</el-dropdown-item>
                <el-dropdown-item>🛵🚞🚃💙🤍😗😂😐</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img src="@/assets/svg/textarea/gif.svg" alt="">
        </div>
      </div>
    </el-dialog>
    <input type="file" id="upload_image" class="h-0 w-0 overflow-hidden !p-0">
  </nav>
</template>

<script setup>
import { useAuthStore, useLoadingStore, useGroupStore, useChatStore } from "@/store";
import uz from "@/assets/svg/uz.svg";
import ru from "@/assets/svg/ru.svg";
import uz_ru from "@/assets/svg/uz.svg";
import en from "@/assets/svg/en.svg";
import { useI18n } from "vue-i18n";

// const { locale } = useI18n();

const useAuth = useAuthStore();
const useGroup = useGroupStore();
const useChat = useChatStore();
const isLoading = useLoadingStore();

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
  chatTime: "",
  chatTimeList: [],
  chatUserId: "",
});

function changedLang(lang) {
  console.log(lang);
  localStorage.setItem("lang", lang);
}

function handleMouseOver(index) {
  const chat_item = document.querySelector(`#tooltip${index}`);
  chat_item?.classList.remove("el-dropdown-menu__item");
  chat_item?.classList.add("el-dropdown-menu__item2");
}

function handleMouseLeave(index) {
  const chat_item = document.querySelector(`#tooltip${index}`);
  chat_item?.classList.remove("el-dropdown-menu__item2");
  chat_item?.classList.add("el-dropdown-menu__item");
}

function handleChatType(type) {
  const dropdown = document.querySelector(".chat_dropdown img");
  dropdown.click();
  console.log(dropdown)
}

function openChatModal(data) {
  console.log(data)
  isLoading.store.pagination.current_page = 1;
  useChat.store.chat_user_data = data;
  isLoading.store.chatModal = true;
  useChat.getChatMessages()
}

function formateDate(date, type) {
  try {
    const nowDate = new Date(date);
    if (type == 'time') {
      return nowDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })?.toLowerCase();
    }
  } catch (_) { }
}

onBeforeMount(() => {
  console.log(window.location.hostname)
  store.is_mount = true;
  useChat.getChatUsers();
  // window.Echo.channel("chat_" + 1).listen(
  //   "MessageSent",
  //   (e) => {
  //     if (
  //       e.message.sender_type === "user" &&
  //       e.message.chat_id === 1
  //     ) {
  //       let index = this.managers.findIndex(
  //         (manager) => manager.chat_id === chat_id
  //       );
  //       if (index !== -1) {
  //         if (!this.counter[index]) {
  //           this.counter[index] = 0;
  //         }
  //         this.counter[index]++;
  //         this.notificationSound.play();
  //       };
  //     };
  //   },
  // );
});

function chatScrollListener() {
  const chatContainer = document.getElementById('chatContainer')
  if (chatContainer.scrollTop < 100) {
    if (!isLoading.isLoadingType("getChatMessage")) {
      if (isLoading.store.pagination.current_page < isLoading.store.pagination.last_page) {
        isLoading.store.pagination.current_page += 1;
        useChat.getChatMessages();
      }
    }
  }
}

watch(() => useChat.store.chat_messages?.length, () => {
  console.log(useChat.store.scrollToBottom)
  if (useChat.store.scrollToBottom) {
    setTimeout(() => {
      const chatContainer = document.getElementById("chatContainer")
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 200)
    useChat.store.scrollToBottom = false;
  }
})

watch(() => isLoading.store.chatModal, () => {
  if (!isLoading.store.chatModal) {
    window.Echo.leave("chat_" + useChat.store.currentChatId);
  }
})
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
    border: 1px solid #A1A1A1 !important;
  }
}

.unread_tooltip {
  width: 24px !important;
  height: 24px !important;
  border-radius: 4px;

  &:hover {
    background: #F2F2F2 !important;
  }
}
</style>
