<template>
  <section class="space-y-8 bg-white rounded-lg p-6 text-center">
    <router-link class="flex justify-center" to="/">
      <img src="/logo.svg" alt="" />
    </router-link>
    <h1 class="_c07 text-2xl font-semibold">Create your Skool account</h1>
    <form class="space-y-5" @submit.prevent="useAuth.authRegister">
      <input v-model="useAuth.register.name" type="text" placeholder="First name" required />
      <input v-model="useAuth.register.surname" type="text" placeholder="Last name" required />
      <input v-model="useAuth.register.email" type="email" placeholder="Email" required />
      <input v-model="useAuth.register.password" type="password" placeholder="Password" required />
      <p class="text-start text-red-600 font-medium">{{ useAuth.store.errorMessage }}</p>
      <button v-loading="isLoading.isLoadingType('register')" @click="register"
        class="b_ce0 _ca1 font-semibold w-full rounded-[4px]">
        Sign up
      </button>
    </form>
    <div class="space-y-5">
      <p class="_c07 text-xs">
        By signing up, you accept our
        <span class="border-b border-[#070707]">terms</span> and
        <span class="border-b border-[#070707]">privacy policy</span>.
      </p>
      <p class="text-sm">
        Already have an account?
        <button @click="login" class="_c2a font-medium">Log in</button>
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
  localStorage.setItem("token", "token");
}

function login() {
  console.log("Register")
  if (router.currentRoute.value.name == "signup") {
    router.push("/login");
  } else {
    useAuth.modal.login = true;
    useAuth.modal.register = false;
  }
}
</script>

<style lang="scss" scoped></style>
