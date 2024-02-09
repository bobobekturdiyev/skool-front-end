<template>
  <main class="flex gap-6 community_page">
    <section class="min-w-[70%] bg-white px-7 py-6 r_16 overflow-hidden">
      <h1 class="font-semibold text-2xl mb-6">Xayot Sharapov</h1>
      <div class="w-full overflow-hidden r_16">
        <div
          @click="store.slideModal = true"
          class="mainSlider cursor-pointer duration-500 h-[290px] flex items-center w-full r_16"
        >
          <img
            class="h-full w-full min-w-[100%] object-cover"
            src="@/assets/image/picture.png"
            alt=""
          />
          <div class="relative h-full border min-w-[100%]">
            <video
              class="w-full h-full cursor-pointer object-cover rounded-xl"
              src="@/assets/image/math.mp4"
            ></video>
            <div
              class="absolute top-0 w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex"
            >
              <img src="@/assets/svg/video_btn.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 mt-4 mb-6">
        <img
          @click="store.slideStep = 0"
          class="w-[90px] cursor-pointer h-[90px] object-cover rounded-xl"
          src="@/assets/image/picture.png"
          alt=""
        />
        <div @click="store.slideStep = 1" class="relative">
          <video
            class="w-[90px] h-[90px] cursor-pointer object-cover rounded-xl"
            src="@/assets/image/math.mp4"
          ></video>
          <div
            class="absolute top-0 w-[90px] h-[90px] cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex"
          >
            <img src="@/assets/svg/video_btn.svg" alt="" />
          </div>
        </div>
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
          <button
            @click="$router.push('/classroom')"
            class="b_cbc rounded-lg w-full font-semibold text-sm uppercase"
          >
            join group
          </button>
        </div>
      </div>
      <div class="full_flex mt-8 gap-2 leading-[18px]">
        <p>Powered by</p>
        <img class="h-3 mt-0.5" src="/logo.svg" alt="" />
      </div>
    </section>

    <el-dialog
      v-model="store.slideModal"
      class="!p-0 !bg-transparent w-full !shadow-none bg-black bg-opacity-10"
      align-center
    >
      <div
        class="min-w-[80vw] md:min-h-[80vh] full_flex overflow-hidden md:max-h-[80vh] md:max-w-[80vw]"
      >
        <div
          class="mainSlider2 bg-black bg-opacity-10 duration-500 flex items-center w-full"
        >
          <div class="full_flex min-w-[100%]">
            <img
              class="h-full w-full object-contain md:max-h-[80vh] md:max-w-[80vw]"
              src="@/assets/image/picture.png"
              alt=""
            />
          </div>
          <div class="full_flex min-w-[100%]">
            <div class="h-full w-full">
              <video
                id="math_video"
                controls
                class="cursor-pointer r_16 w-full h-full object-contain md:max-h-[80vh] md:max-w-[80vw]"
                src="@/assets/image/math.mp4"
              ></video>
            </div>
          </div>
        </div>
      </div>

      <!-- buttons -->
      <button
        @click="store.slideStep2 = 1"
        class="bg-black bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 top-0 bottom-0 my-auto full_flex rounded-full w-12 h-12 border border-white"
      >
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button
        @click="store.slideStep2 = 0"
        class="bg-black bg-opacity-20 backdrop-blur-lg absolute sm:left-5 left-3 top-0 bottom-0 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white"
      >
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button
        @click="store.slideModal = false"
        class="bg-black bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 sm:top-5 top-3 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white"
      >
        <img src="@/assets/svg/slide_x.svg" alt="" />
      </button>
    </el-dialog>
  </main>
</template>

<script setup>
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
    } catch (error) {}
  }
);

watch(
  () => store.slideStep,
  () => {
    try {
      store.slideStep2 = store.slideStep;
      const image = document.querySelector(".mainSlider");
      image.style.transform = `translateX(-${store.slideStep * 100}%)`;
    } catch (error) {}
  }
);

watch(
  () => store.slideStep2,
  () => {
    const video = document.getElementById("math_video");
    try {
      video.pause();
    } catch (error) {}
    try {
      const image = document.querySelector(".mainSlider2");
      image.style.transform = `translateX(-${store.slideStep2 * 100}%)`;
    } catch (error) {}
  }
);

onMounted(() => {
  document.addEventListener("keydown", function (event) {
    // Check if Ctrl key is pressed and the key pressed along with it
    console.log(event.key);
    if (!store.slideModal) {
      if (event.key == "ArrowRight") {
        store.slideStep = 1;
      } else if (event.key == "ArrowLeft") {
        store.slideStep = 0;
      }
    }else {
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
