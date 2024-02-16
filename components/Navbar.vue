<template>
  <nav class="fixed top-0 w-full z-50 bg-white">
    <div
      class="flex justify-between items-center h-[64px] mx-auto xl:px-[200px] lg::px-[100px] md:px-[50px] sm:px-[50px] px-5 max-w-[1536px]"
    >
      <div class="flex items-center gap-5 cursor-pointer">
        <router-link to="/">
          <img
            v-if="$router.currentRoute.value.name == 'index'"
            src="/logo.svg"
            alt=""
          />
          <div v-else-if="$router.currentRoute.value.name == 'community-about'">
            <img
              class="h-10 w-10 object-cover rounded-full"
              v-if="useGroup.store.group_by_username[0]?.user_id?.image"
              :src="useGroup.store.group_by_username[0]?.user_id?.image"
              alt=""
            />
            <div v-else class="full_flex gap-5">
              <p class="bg-gray-600 h-10 w-10 rounded-full"></p>
              <p class="bg-gray-600 w-[120px] h-5 rounded"></p>
            </div>
          </div>
          <img v-else src="/icon.svg" alt="" />
        </router-link>
        <router-link
          v-if="$router.currentRoute.value.name == 'community-about'"
          class="text-lg font-semibold"
          to="/"
          >{{ useGroup.store.group_by_username[0]?.user_id?.name }}
          {{
            useGroup.store.group_by_username[0]?.user_id?.surname
          }}</router-link
        >
        <router-link
          v-else-if="$router.currentRoute.value.name != 'index'"
          class="text-lg font-semibold"
          to="/"
          >Skool community</router-link
        >
        <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
          <p
            class="h-[26px] arrow w-[26px] rounded-[5px]"
            :class="$router.currentRoute.value.name == 'index' ? 'b_cf2' : ''"
          >
            <img class="mx-auto" src="@/assets/svg/arrow.svg" alt="" />
          </p>
          <template #dropdown>
            <el-dropdown-menu
              class="community_dropdown min-w-[200px] !mt-3 !-mr-7 dropdown_shadow"
            >
              <div class="flex items-center p-[6px] relative h-[44px]">
                <img
                  class="absolute py-[8px] pl-[10px]"
                  src="@/assets/svg/search.svg"
                  alt=""
                />
                <input
                  class="bg-[#F0F5FA] h-8 !pl-10 text-xs !border-0"
                  type="text"
                  placeholder="Search"
                />
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
        <el-dropdown
          v-if="store.is_mount"
          @command="
            (command) => {
              $i18n.locale = command;
              changedLang(command);
            }
          "
          placement="bottom-start"
        >
          <div
            class="flex items-center _c07 font-semibold gap-2 cursor-pointer"
          >
            <img :src="store.lang_icon[$i18n.locale]" alt="" />
            {{ store.lang[$i18n.locale]?.slice(0, 2) }}
            <img src="@/assets/svg/lang_arrow.svg" alt="" />
          </div>
          <template #dropdown>
            <el-dropdown-menu
              class="navigation_dropdown min-w-[200px] dropdown_shadow !-ml-3"
            >
              <el-dropdown-item
                v-show="i != $i18n.locale"
                :class="i == $i18n.locale ? 'current_lang' : ''"
                v-for="(i, index) in store.lang_type"
                :command="i"
              >
                <img :src="store.lang_icon[i]" alt="" />
                {{ store.lang[i] }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div
          v-show="isLoading.store.isLogin"
          class="sm:flex items-center hidden gap-7"
        >
          <img src="@/assets/svg/nav/message.svg" alt="" />
          <img src="@/assets/svg/nav/notification.svg" alt="" />
          <router-link to="/">
            <img
              class="h-10 w-10 object-cover"
              src="@/assets/image/user.svg"
              alt=""
            />
          </router-link>
        </div>
        <div v-show="!isLoading.store.isLogin" class="sm:flex gap-2 hidden">
          <button
            @click="useAuth.modal.register = true"
            class="border border-[#BCDEFF] _c2a font-semibold uppercase px-6 rounded-[6px]"
          >
            {{ $t("nav.register") }}
          </button>
          <button
            @click="useAuth.modal.login = true"
            class="border border-[#BCDEFF] _c2a font-semibold uppercase px-6 rounded-[6px]"
          >
            {{ $t("nav.login") }}
          </button>
        </div>
        <div class="sm:hidden block">
          <el-dropdown
            v-show="!isLoading.store.isLogin"
            placement="bottom-end"
            class="dropdown"
            trigger="click"
          >
            <img src="@/assets/svg/menu.svg" alt="" />

            <template #dropdown>
              <el-dropdown-menu
                class="menu_dropdown sm:hidden block min-w-[200px] !mt-3 dropdown_shadow"
              >
                <el-dropdown-item @click="useAuth.modal.register = true"
                  ><p>Sign up</p></el-dropdown-item
                >
                <el-dropdown-item @click="useAuth.modal.login = true"
                  ><p>Log in</p></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown
            v-show="isLoading.store.isLogin"
            placement="bottom-end"
            class="dropdown"
            trigger="click"
          >
            <img src="@/assets/svg/menu.svg" alt="" />

            <template #dropdown>
              <el-dropdown-menu
                class="logged_menu_dropdown sm:hidden block min-w-[200px] !mt-3 dropdown_shadow"
              >
                <el-dropdown-item>
                  <img
                    class="w-4 h-4 rounded-full object-cover"
                    src="@/assets/image/user.svg"
                    alt=""
                  />
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
    <el-dialog
      v-model="useAuth.modal.register"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg"
    >
      <Register />
    </el-dialog>

    <!-- login -->
    <el-dialog
      v-model="useAuth.modal.login"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg"
    >
      <Login />
    </el-dialog>
  </nav>
</template>

<script setup>
import { useAuthStore, useLoadingStore, useGroupStore } from "@/store";
import uz from "@/assets/svg/uz.svg";
import ru from "@/assets/svg/ru.svg";
import uz_ru from "@/assets/svg/uz.svg";
import en from "@/assets/svg/en.svg";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const useAuth = useAuthStore();
const useGroup = useGroupStore();
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
});

function changedLang(lang) {
  console.log(lang);
  localStorage.setItem("lang", lang);
}

onBeforeMount(() => {
  store.is_mount = true;
});
</script>

<style lang="scss" scoped>
.dropdown:hover {
  .arrow {
    background: transparent;
    transition-duration: 1s;
  }
}
</style>
