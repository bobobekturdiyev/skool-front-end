<template>
  <main>
    <section v-if="isLoading.isLoadingType('getByUsername')"
      class="flex sm:flex-row flex-col-reverse gap-6 community_page">
      <div class="bg-gray-600 r_16 h-[700px] w-full"></div>
      <div class="bg-gray-600 r_16 h-[429px] min-w-[200px] md:min-w-[280px]"></div>
    </section>
    <div v-else v-for="i in useGroup.store.group_by_username"
      class="flex sm:flex-row flex-col-reverse gap-6 community_page">
      <section class="w-full bg-white md:px-7 md:py-6 p-3 r_16 overflow-hidden">
        <h1 class="font-semibold md:text-2xl text-lg mb-6">{{ i.name }}</h1>
        <div class="w-full overflow-hidden r_16">
          <div @click="store.slideModal = true"
            class="mainSlider cursor-pointer duration-500 lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] flex items-center w-full r_16">
            <div class="min-w-full" v-for="(post, index) in i.posts">
              <div v-if="post.media_files[0]?.type == 'image'" class="h-full w-full min-w-[100%] object-cover">
                <img @click="store.slideStep = index" :src="post?.media_files[0]?.url" />
              </div>
              <div v-else @click="store.slideStep = index" class="relative">
                <iframe class="min-w-full h-full cursor-pointer object-cover rounded-xl"
                  :src="post?.media_files[0]?.url"></iframe>
                <div class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-4 mt-4 md:mb-6 mb-4 overflow-hidden overflow-x-auto">
          <div v-for="(post, index) in i.posts">
            <div v-if="post.media_files[0]?.type == 'image'">
              <img @click="store.slideStep = index"
                class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px] h-[56px] cursor-pointer object-cover rounded-xl"
                :src="post?.media_files[0]?.url" />
            </div>
            <div v-else @click="store.slideStep = index" class="relative">
              <iframe
                class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px] cursor-pointer object-cover rounded-xl"
                :src="post?.media_files[0]?.url"></iframe>
              <div
                class="absolute top-0 md:w-[90px] md:h-[90px] w-[56px] h-[56px] cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                <img src="@/assets/svg/video_btn.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-4 text-sm font-medium whitespace-nowrap">
          <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
            <img src="@/assets/svg/community/private.svg" alt="" />
            {{ i.group_type == "private" ? "Private group" : "Public group" }}
          </p>
          <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
            <img src="@/assets/svg/community/members.svg" alt="" />
            226k members
          </p>
          <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
            <img src="@/assets/svg/community/paid.svg" alt="" />
            {{ i.group_price == "free" ? "Free" : "Paid" }}
          </p>
          <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
            <img v-if="i.user_id?.image" class="h-5 w-5 rounded-full bg_loading object-cover" :src="i.user_id?.image"
              alt="" />
          <p v-else class="h-5 w-5 rounded-full bg_loading"></p>
          By {{ i.user_id.name }} {{ i.user_id.surname }}
          </p>
        </div>
        <pre class="md:mt-8 mt-4 text-sm leading-[21px] whitespace-pre-line">{{
          i.description
        }}</pre>
      </section>
      <!-- info card -->
      <section class="min-w-[200px] md:max-w-[280px]">
        <div class="rounded-2xl overflow-hidden bg-white">
          <img class="w-full h-[150px] object-cover" :src="i.image" alt="" />
          <div class="p-4 space-y-4">
            <h1 class="font-medium text-lg">{{ i.name }}</h1>
            <p class="flex items-center _ca1 gap-1">
              <img src="@/assets/svg/community/grey_private.svg" alt="" />
              {{ i.group_type == "private" ? "Private group" : "Public group" }}
            </p>
            <pre class="text-sm leading-[21px] whitespace-pre-line">{{
              i.description
            }}</pre>
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
            <button @click="$router.push(`/${$router.currentRoute.value.params.community}/classroom`)"
              class="b_cbc rounded-lg w-full font-semibold text-sm uppercase">
              join group
            </button>
          </div>
        </div>
        <div class="full_flex mt-8 gap-2 leading-[18px]">
          <p>Powered by</p>
          <img class="h-3 mt-0.5" src="/logo.svg" alt="" />
        </div>
      </section>
    </div>

    <el-dialog v-model="store.slideModal" class="!p-0 !bg-transparent w-full !shadow-none bg-black bg-opacity-10"
      align-center>
      <div class="min-w-[80vw] md:min-h-[80vh] full_flex overflow-hidden md:max-h-[80vh] md:max-w-[80vw]">
        <div class="mainSlider2 bg-black bg-opacity-10 duration-500 flex items-center w-full">
          <div class="full_flex min-w-[100%]">
            <img class="h-full w-full object-contain md:max-h-[80vh] md:max-w-[80vw]" src="@/assets/image/picture.png"
              alt="" />
          </div>
          <div class="full_flex min-w-[100%]">
            <div class="h-full w-full">
              <video id="math_video" controls
                class="cursor-pointer r_16 w-full h-full object-contain md:max-h-[80vh] md:max-w-[80vw]"
                src="@/assets/image/math.mp4"></video>
            </div>
          </div>
        </div>
      </div>

      <!-- buttons -->
      <button @click="store.slideStep2 = 1"
        class="bg-black bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 top-0 bottom-0 my-auto full_flex rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button @click="store.slideStep2 = 0"
        class="bg-black bg-opacity-20 backdrop-blur-lg absolute sm:left-5 left-3 top-0 bottom-0 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button @click="store.slideModal = false"
        class="bg-black bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 sm:top-5 top-3 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_x.svg" alt="" />
      </button>
    </el-dialog>
  </main>
</template>

<script setup>
import { useGroupStore, useLoadingStore } from "@/store";

const isLoading = useLoadingStore();
const useGroup = useGroupStore();
isLoading.addLoading("getByUsername");

const store = reactive({
  slideStep: 0,
  slideStep2: 0,
  slideModal: false,
});

watch(
  () => store.slideModal,
  () => {
    store.slideStep2 = store.slideStep;

    const video = document.getElementById("math_video");
    try {
      video.pause();
    } catch (error) { }
  }
);

watch(
  () => store.slideStep,
  () => {
    try {
      store.slideStep2 = store.slideStep;
      const image = document.querySelector(".mainSlider");
      image.style.transform = `translateX(-${store.slideStep * 100}%)`;
    } catch (error) { }
  }
);

watch(
  () => store.slideStep2,
  () => {
    const video = document.getElementById("math_video");
    try {
      video.pause();
    } catch (error) { }
    try {
      const image = document.querySelector(".mainSlider2");
      image.style.transform = `translateX(-${store.slideStep2 * 100}%)`;
    } catch (error) { }
  }
);

onBeforeMount(() => {
  useGroup.groupByUsername();
  document.addEventListener("keydown", function (event) {
    // Check if Ctrl key is pressed and the key pressed along with it
    console.log(event.key);
    if (!store.slideModal) {
      if (event.key == "ArrowRight") {
        store.slideStep = 1;
      } else if (event.key == "ArrowLeft") {
        store.slideStep = 0;
      }
    } else {
      if (event.key == "ArrowRight") {
        store.slideStep2 = 1;
      } else if (event.key == "ArrowLeft") {
        store.slideStep2 = 0;
      }
    }
  });
});
</script>

<style lang="scss" scoped></style>
