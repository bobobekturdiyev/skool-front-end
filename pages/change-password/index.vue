<template>
  <main
    class="flex items-center justify-center overflow-hidden overflow-y-auto min-h-screen max-h-screen"
  >
    <NuxtLoadingIndicator height="4" color="#2a85ff" />
    <section
      class="space-y-8 bg-white rounded-lg p-6 text-center max-w-[450px]"
    >
      <router-link class="flex justify-center" to="/">
        <img src="/logo.svg" alt="" />
      </router-link>
      <h1 class="_c07 text-2xl font-semibold">Create a new password</h1>
      <form
        class="space-y-5 text-start"
        @submit.prevent="useAuth.authChangePassword"
      >
        <FloatingInput
          id="new_password"
          type="password"
          v-model="useAuth.changepassword.new_password"
          @input="useAuth.authChangePassword"
          label="New password"
          required
        />

        <p
          v-if="
            useAuth.store.passwordError?.length &&
            useAuth.store.passwordError[0] == 0
          "
          class="_ceb !mt-1 !-mb-3 text-xs"
        >
          {{ useAuth.store.passwordError[1] }}
        </p>
        <FloatingInput
          id="confirm_password"
          type="password"
          v-model="useAuth.changepassword.confirm_password"
          @input="useAuth.authChangePassword"
          label="Repeat new password"
          required
        />
        <p
          v-if="
            useAuth.store.passwordError?.length &&
            useAuth.store.passwordError[0] == 1
          "
          class="_ceb !mt-1 !-mb-3 text-xs"
        >
          {{ useAuth.store.passwordError[1] }}
        </p>
        <p class="text-start text-red-600 font-medium">
          {{ useAuth.store.errorMessage }}
        </p>
        <button
          v-loading="isLoading.isLoadingType('changePass')"
          @click="register"
          class="font-semibold w-full rounded-[4px]"
          :class="useAuth.store.is_matched ? 'b_cbc _c07' : 'b_ce0 _ca1'"
        >
          Sign up
        </button>
      </form>
    </section>

    <Verification v-if="useAuth.modal.verification" />
  </main>
</template>

<script setup>
definePageMeta({
  layout: false,
});
import { useAuthStore, useLoadingStore } from "@/store";

const router = useRouter();
const useAuth = useAuthStore();
const isLoading = useLoadingStore();

function register() {
  localStorage.setItem("token", "token");
}

function login() {
  console.log("Register");
  if (router.currentRoute.value.name == "signup") {
    router.push("/login");
  } else {
    useAuth.modal.login = true;
    useAuth.modal.register = false;
  }
}
</script>

<style lang="scss" scoped></style>
