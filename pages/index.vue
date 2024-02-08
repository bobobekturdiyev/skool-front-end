<template>
  <main>
    <section>
      <div class="space-y-5 text-center mt-[72px] font-semibold text-xl">
        <h1 class="text-[45px]">Discover communities</h1>
        <p>
          or
          <span class="_c2a cursor-pointer hover:opacity-70"
            >create your own</span
          >
        </p>
      </div>
      <div class="relative w-[616px] mx-auto mt-8 mb-[52px]">
        <img
          class="my-[18px] w-5 h-5 left-5 absolute"
          src="@/assets/svg/search.svg"
          alt=""
        />
        <input
          autofocus
          class="h-[56px] !pl-[60px] b_none font-medium w-full !rounded-lg"
          type="text"
          placeholder="Search all reports"
        />
      </div>
    </section>

    <!-- category -->
    <section class="text-sm whitespace-nowrap">
      <div class="flex items-start gap-3">
        <div
          :class="store.is_show ? 'flex-wrap' : ''"
          class="relative flex gap-3 overflow-hidden items-center"
        >
          <button class="py-2 px-3 rounded-full b_cbc">All</button>
          <button
            v-for="i in 16"
            class="flex items-center gap-1 py-2 px-3 rounded-full bg-white"
          >
            <span>🍎</span> Health & Fitness
          </button>
          <img
            v-if="!store.is_show"
            class="absolute right-0"
            src="@/assets/svg/shadow_hidden.svg"
            alt=""
          />
          <button
            @click="store.is_show = false"
            v-if="store.is_show"
            class="py-2 px-3 rounded-full min-w-fit bg-white"
          >
            Less...
          </button>
        </div>
        <button
          @click="store.is_show = true"
          v-if="!store.is_show"
          class="py-2 px-3 rounded-full min-w-fit bg-white"
        >
          More...
        </button>
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
            Filter
          </button>
          <template #dropdown>
            <el-dropdown-menu class="flex min-w-[328px] filter_dropdown">
              <div class="w-[150px] border-r border-[#E0E0E0]">
                <h1 class="text-sm font-medium px-8 mb-2">Type</h1>
                <el-dropdown-item
                  class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                >
                  <input
                    id="type_all"
                    class="rounded-full"
                    type="radio"
                    name="type"
                  />
                  <label for="type_all">All</label>
                </el-dropdown-item>
                <el-dropdown-item
                  class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                >
                  <input
                    id="type_public"
                    class="rounded-full"
                    type="radio"
                    name="type"
                  />
                  <label for="type_public">Public</label>
                </el-dropdown-item>
                <el-dropdown-item
                  class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                >
                  <input
                    id="type_private"
                    class="rounded-full"
                    type="radio"
                    name="type"
                  />
                  <label for="type_private">Private</label>
                </el-dropdown-item>
              </div>
              <div class="w-[150px]">
                <h1 class="text-sm font-medium px-8 mb-2">Price</h1>
                <el-dropdown-item
                  class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                >
                  <input
                    id="price_all"
                    class="rounded-full"
                    type="radio"
                    name="price"
                  />
                  <label for="price_all">All</label>
                </el-dropdown-item>
                <el-dropdown-item
                  class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                >
                  <input
                    id="price_public"
                    class="rounded-full"
                    type="radio"
                    name="price"
                  />
                  <label for="price_public">Public</label>
                </el-dropdown-item>
                <el-dropdown-item
                  class="flex items-center _c07 !px-8 font-medium gap-3 h-[44px] !text-xs"
                >
                  <input
                    id="price_private"
                    class="rounded-full"
                    type="radio"
                    name="price"
                  />
                  <label for="price_private">Private</label>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </section>

    <!-- cards -->
    <section class="grid grid-cols-3 gap-6 justify-between mt-7">
      <Card />
    </section>
  </main>
</template>

<script setup>
const store = reactive({
  is_show: false,
});
</script>

<style lang="scss" scoped></style>
