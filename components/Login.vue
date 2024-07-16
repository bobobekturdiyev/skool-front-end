<template>
  <section class="space-y-8 bg-white rounded-lg p-6 text-center">
    <router-link class="flex justify-center" to="/">
      <img src="/logo.svg" alt="" />
    </router-link>
    <h1 class="_c07 text-2xl font-semibold">Log in to Skool</h1>
    <form @submit.prevent="useAuth.authLogin" class="space-y-5">
      <input v-model="useAuth.login.email" autofocus type="email" placeholder="Email" required />
      <input v-model="useAuth.login.password" type="password" placeholder="Password" required />
      <p class="_c2a text-start font-medium cursor-pointer hover:underline" @click="() => {
        useAuth.modal.login = false;
        useAuth.modal.forgot_modal = true;
      }">Forgot password?</p>
      <button :type="isLoading.isLoadingType('logging')?'button':'submit'" v-loading="isLoading.isLoadingType('logging')" class="b_ce0 _ca1 font-semibold w-full rounded-[4px]">
        LOG IN
      </button>
      <!-- store.errorMessage -->
      <p class="text-start text-red-600 font-medium">{{ useAuth.store.errorMessage }}</p>
    </form>
    <div class="space-y-5">
      <p class="text-sm">
        Don’t have an account?
        <button type="button" @click="register" class="_c2a font-medium hover:underline">
          Sign up for free
        </button>
      </p>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore, useLoadingStore } from "@/store";

const router = useRouter();
const useAuth = useAuthStore();
const isLoading = useLoadingStore();

function register() {
  if (router.currentRoute.value.name == "login") {
    router.push("/register");
  } else {
    useAuth.modal.login = false;
    useAuth.modal.register = true;
  }
}
</script>

<style lang="scss" scoped></style>
