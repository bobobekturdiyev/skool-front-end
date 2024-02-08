<template>
  <nav class="fixed top-0 w-full z-50 bg-white">
    <div
      class="flex justify-between items-center h-[64px] mx-auto lg:px-[200px] md:px-[100px] sm:px-[50px] px-[10px] max-w-[1536px]"
    >
      <el-dropdown class="dropdown">
        <div class="flex items-center gap-5 cursor-pointer">
          <router-link to="/">
            <img src="/logo.svg" alt="" />
          </router-link>
          <p class="h-[26px] arrow w-[26px] b_cf2 rounded-[5px]">
            <img class="mx-auto" src="@/assets/svg/arrow.svg" alt="" />
          </p>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="community_dropdown min-w-[200px]">
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
              <img src="@/assets/svg/create_community.svg" alt="" />
              Create a community
            </el-dropdown-item>
            <el-dropdown-item>
              <img src="@/assets/svg/discover.svg" alt="" />
              Discover communities
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="flex items-center gap-10">
        <el-dropdown>
          <div
            class="flex items-center _c07 font-semibold gap-2 cursor-pointer"
          >
            <img src="@/assets/svg/en.svg" alt="" />
            EN
            <img src="@/assets/svg/lang_arrow.svg" alt="" />
          </div>
          <template #dropdown>
            <el-dropdown-menu class="navigation_dropdown min-w-[200px]">
              <el-dropdown-item>
                <img src="@/assets/svg/ru.svg" alt="" />
                РУ - Русский
              </el-dropdown-item>
              <el-dropdown-item>
                <img src="@/assets/svg/uz.svg" alt="" />
                UZ - O’zbek (lotin)
              </el-dropdown-item>
              <el-dropdown-item>
                <img src="@/assets/svg/uz.svg" alt="" />
                УЗ - Ўзбек (кирилл)
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="flex gap-2">
          <button
            @click="useAuth.modal.register = true"
            class="border border-[#BCDEFF] _c2a font-semibold px-6 rounded-[6px]"
          >
            SIGN UP
          </button>
          <button
            @click="useAuth.modal.login = true"
            class="border border-[#BCDEFF] _c2a font-semibold px-6 rounded-[6px]"
          >
            LOG IN
          </button>
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
import { useAuthStore } from "@/store";

const useAuth = useAuthStore();
</script>

<style lang="scss" scoped>
.dropdown:hover {
  .arrow {
    background: transparent;
    transition-duration: 1s;
  }
}
</style>
