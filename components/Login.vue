<template>
  <section class="space-y-8 bg-white rounded-lg p-6 w-[400px] text-center">
    <router-link class="flex justify-center" to="/">
      <img src="/logo.svg" alt="" />
    </router-link>
    <h1 class="_c07 text-2xl font-semibold">Log in to Skool</h1>
    <form class="space-y-5">
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <p class="_c2a text-start font-medium">Forgot password?</p>
      <button class="b_ce0 _ca1 font-semibold w-full rounded-[4px]">
        LOG IN
      </button>
    </form>
    <div class="space-y-5">
      <p class="text-sm">
        Don’t have an account?
        <button @click="register" class="_c2a font-medium">
          Sign up for free
        </button>
      </p>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "@/store";

const router = useRouter();
const useAuth = useAuthStore();

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
