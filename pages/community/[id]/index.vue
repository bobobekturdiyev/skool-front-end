<template>
  <main class="flex gap-6">
    <section
      class="min-w-[70%] bg-white px-7 py-6 r_16 overflow-hidden"
    >
      <h1 class="font-semibold text-2xl mb-6">Xayot Sharapov</h1>
      <img
        class="h-[290px] w-full object-cover r_16"
        src="@/assets/image/picture.png"
        alt=""
      />
      <div class="flex gap-4 mt-4 mb-6">
        <img
          class="w-[90px] cursor-pointer h-[90px] object-cover rounded-xl"
          src="@/assets/image/picture.png"
          alt=""
        />
        <img
          class="w-[90px] cursor-pointer h-[90px] object-cover rounded-xl"
          src="@/assets/image/picture.png"
          alt=""
        />
      </div>
      <div class="flex gap-4 text-sm font-medium h-9">
        <p class="full_flex px-3 gap-1 h-full rounded-lg bg-[#F2F2F2]">
          <img src="@/assets/svg/community/private.svg" alt="" />
          Private group
        </p>
        <p class="full_flex px-3 gap-1 h-full rounded-lg bg-[#F2F2F2]">
          <img src="@/assets/svg/community/members.svg" alt="" />
          226k members
        </p>
        <p class="full_flex px-3 gap-1 h-full rounded-lg bg-[#F2F2F2]">
          <img src="@/assets/svg/community/paid.svg" alt="" />
          Paid
        </p>
        <p class="full_flex px-3 gap-1 h-full rounded-lg bg-[#F2F2F2]">
          <img
            class="h-5 w-5 object-cover"
            src="@/assets/image/user.svg"
            alt=""
          />
          By Xayot Sharapov
        </p>
      </div>
      <div class="mt-8 text-sm leading-[21px]">
        <h1>
          To ensure we can accept your request into the High Achiever Society,
          please make sure your request has the following:
        </h1>
        <ol class="list-decimal ml-5">
          <li>A profile picture of yourself</li>
          <li>
            Your name MUST appear as it does when you purchased the
            program/applied for your FREE trial.
          </li>
          <li>
            If you haven't signed up for your FREE trial yet, please do it here
            -->
            <a
              class="border-b border-black"
              href="https://join.highachieversociety.com/incredible-free-gift?utm_campaign=highachieversociety&utm_content=variable-date&utm_medium=social&utm_source=skool&utm_term=skool"
              target="_blank"
              >join.highachieversociety.com/skool</a
            >
          </li>
        </ol>
        <p>For Technical Support please contact support@philip-johansen.com</p>
      </div>
    </section>
    <!-- info card -->
    <section>
      <div class="rounded-2xl overflow-hidden bg-white">
        <img
          class="w-full h-[150px] object-cover"
          src="@/assets/image/picture.png"
          alt=""
        />
        <div class="p-4 space-y-4">
          <h1 class="font-medium text-lg">Xayot Sharapov</h1>
          <p class="flex items-center _ca1 gap-1">
            <img src="@/assets/svg/community/grey_private.svg" alt="" />
            Private group
          </p>
          <p class="text-sm">
            Millionlab pullar ishlab topmoqchi bo’lsangiz millionlab insonlarni
            hayotini o’zgartiring.
          </p>
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
          <button @click="$router.push('/classroom')"
            class="b_cbc rounded-lg w-full font-semibold text-sm uppercase"
          >
            join group
          </button>
        </div>
      </div>
      <div class="full_flex mt-8 gap-2 leading-[18px]"><p>Powered by</p> <img class="h-3 mt-0.5" src="/logo.svg" alt="" /></div>
    </section>
  </main>
</template>

<script setup></script>

<style lang="scss" scoped></style>
