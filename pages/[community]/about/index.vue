<template>
  <main>
    <section v-if="isLoading.isLoadingType('getByUsername')"
      class="flex sm:flex-row flex-col-reverse gap-6 community_page">
      <div class="bg-gray-600 r_16 h-[700px] w-full"></div>
      <div class="bg-gray-600 r_16 h-[429px] min-w-[200px] md:min-w-[280px]"></div>
    </section>
    <div v-else
      class="flex sm:flex-row flex-col-reverse gap-6 community_page">
      <section class="w-full bg-white md:px-7 md:py-6 p-3 r_16 overflow-hidden">
        <h1 class="font-semibold md:text-2xl text-lg mb-6">{{ useGroup.store.group_by_username.name }}</h1>
        <div class="w-full overflow-hidden r_16">
          <div v-if="useGroup.store.group_by_username.medias.length" @click="() => {store.slideModal = true; useGroup.store.slideStep2 = useGroup.store.slideStep}"
            class="mainSlider cursor-pointer duration-500 lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] flex items-center w-full r_16">
            <div class="min-w-full" v-for="(post, index) in useGroup.store.group_by_username.medias">
              <div v-if="post.type == 'image'" class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] w-full min-w-[100%] object-cover">
                <img class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] w-full min-w-[100%] object-cover" @click="useGroup.store.slideStep = index" :src="post.link" />
              </div>
              <div v-else @click="useGroup.store.slideStep = index" class="relative">
                <iframe 
      class="lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] min-w-full" 
      :src="embedLink(post.link)" 
>
    </iframe>
                <div class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div v-else
          @click="useGroup.store.add_media = true"
          class="full_flex bg-[#F2F2F2] cursor-pointer duration-500 lg:h-[290px] md:h-[240px] sm:h-[200px] h-[180px] flex items-center w-full r_16">
          
            <p>Upload images / videos</p>
          </div>
        </div>
        <div v-loading="isLoading.isLoadingType('positionMedia')" class="flex gap-4 mt-4 md:mb-6 mb-4 overflow-hidden overflow-x-auto">
          <draggable
                @change="useGroup.update_media_position"
                :list="useGroup.store.group_by_username.medias"
                group="grid"
                :animation="200"
                class="flex gap-4 overflow-hidden overflow-x-auto min-w-fit"
            >
                <template v-for="(post, index) in useGroup.store.group_by_username.medias" :key="post.id">
                  <div class="relative" :class="useGroup.store.slideStep == index ? 'border p-[1px] rounded-xl' : ''">
            <button
            @click="() => deleteMedia(post.id)"
            type="button"
            class="absolute deleteimage top-1 right-1 z-20 rounded-full w-6 h-6 full_flex border bg-white"
          >
            <img class="m-auto" src="@/assets/svg/x.svg" alt="" />
          </button>
            <div v-if="post.type == 'image'">
              <img @click="useGroup.store.slideStep = index"
                class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px] h-[56px] cursor-pointer object-cover rounded-xl"
                :src="post.link" />
            </div>
            <div v-else @click="useGroup.store.slideStep = index" class="relative">
                <iframe 
                class="md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px] cursor-pointer object-cover rounded-xl"
      :src="embedLink(post.link)" >
    </iframe>
                <div class="absolute top-0 min-w-full h-full cursor-pointer bg-black bg-opacity-30 rounded-xl full_flex">
                  <img src="@/assets/svg/video_btn.svg" alt="" />
                </div>
              </div>
          </div>
                </template>
  </draggable>
            <div v-if="useGroup.store.group_by_username.medias.length < 6 && useGroup.store.group_by_username.medias.length > 0" @click="useGroup.store.add_media = true"
              class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm md:min-w-[90px] md:h-[90px] min-w-[56px] max-w-[56px]  h-[56px]"
            >
              <img class="w-1/3" src="@/assets/svg/add_photo.svg" alt="" />
            </div>
        </div>
        <div class="flex flex-wrap gap-4 text-sm font-medium whitespace-nowrap">
          <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
            <img src="@/assets/svg/community/private.svg" alt="" />
            {{ useGroup.store.group_by_username.group_type == "private" ? "Private group" : "Public group" }}
          </p>
          <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
            <img src="@/assets/svg/community/members.svg" alt="" />
            226k members
          </p>
          <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
            <img src="@/assets/svg/community/paid.svg" alt="" />
            {{ useGroup.store.group_by_username.group_price == "free" ? "Free" : "Paid" }}
          </p>
          <p class="full_flex h-9 px-3 gap-1 rounded-lg bg-[#F2F2F2]">
            <img v-if="useGroup.store.group_by_username.user?.image" class="h-5 w-5 rounded-full bg_loading object-cover" :src="useGroup.store.group_by_username.user?.image"
              alt="" />
          <p v-else class="h-5 w-5 rounded-full bg_loading"></p>
          By {{ useGroup.store.group_by_username.user.name }} {{ useGroup.store.group_by_username.user.surname }}
          </p>
        </div>
        <pre class="md:mt-8 mt-4 text-sm leading-[21px] whitespace-pre-line">{{
          useGroup.store.group_by_username.description
        }}</pre>
      </section>
      <!-- info card -->
      <GroupInfoCard class="md:max-w-[280px] sm:max-w-[200px]" />
    </div>

    <!-- about info modal -->
    <el-dialog v-model="store.slideModal" class="!p-0 !bg-transparent w-full fixed top-0 !shadow-none bg-black bg-opacity-10 full_flex" style="width: 100%;"
      align-center>
      <div class="min-w-[80vw] md:min-h-[80vh] full_flex overflow-hidden md:max-h-[80vh] md:max-w-[80vw]">
        <div class="mainSlider2 bg-black bg-opacity-10 max-w-[80vw] duration-500 flex items-center w-full">
          <div class="full_flex min-w-[100%] min-h-full" v-for="(post, index) in useGroup.store.group_by_username.medias">
              <div v-if="post.type == 'image'" class="full_flex">
                <img :src="post.link" />
              </div>
              <div v-else class="relative h-full w-full">
                <iframe 
                ref="videoIframe"
                id="video_control"
      class="md:max-h-[80vh] max-w-[80vw] min-w-full md:min-h-[80vh] min-h-[50vh]" 
      :src="embedLink(post.link)">
    </iframe>
              </div>
            </div>
        </div>
      </div>

      <!-- buttons -->
      <button @click="() => handleSlideChange('right')"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 top-0 bottom-0 my-auto full_flex rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button @click="() => handleSlideChange('left')"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:left-5 left-3 top-0 bottom-0 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_arrow.svg" alt="" />
      </button>
      <button @click="store.slideModal = false"
        class="bg-black z-50 bg-opacity-20 backdrop-blur-lg absolute sm:right-5 right-3 sm:top-5 top-3 my-auto full_flex rotate-180 rounded-full w-12 h-12 border border-white">
        <img src="@/assets/svg/slide_x.svg" alt="" />
      </button>
    </el-dialog>

    <!-- join to group -->
    <el-dialog v-model="usePayment.store.joinToGroupModal" width="400" align-center class="bg-opacity-50 !rounded-lg">
      <div class="text-center mb-4 space-y-2">
        <img class="w-14 h-14 mx-auto object-cover rounded-full" :src="useGroup.store.group_by_username?.image" alt="">
        <p>{{ useGroup.store.group_by_username?.name }}</p>
      </div>
            <h1 class="text-black text-sm text-center">${{ useGroup.store.group_by_username?.price }} /month membership. Cancel anytime.</h1>
            <form v-if="usePayment.store.join_step == 1" @submit.prevent="usePayment.paymentData">
                <label for="name" class="_ca1 mb-2 block mt-5">Card number</label>
                <div class="flex items-center justify-between">
                    <input @input="usePayment.getCardType" v-model="usePayment.card.cardNumber" class="placeholder-[#A1A1A1] w-full" type="text" name="credit-number"
                        placeholder="0000 0000 0000 0000" required>
                    <div class="flex items-center gap-2 -ml-[108px] pr-3">
                        <img v-if="usePayment.store.cardType.type == 'visa'" src="@/assets/svg/billing/electron.svg" alt="">
                        <img v-else-if="usePayment.store.cardType.type == 'maestro'" src="@/assets/svg/billing/maestro.svg" alt="">
                        <img v-else-if="usePayment.store.cardType.type == 'mastercard'" src="@/assets/svg/billing/mastercard.svg" alt="">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-5 mt-4">
                    <div>
                        <label for="name" class="_ca1 mb-2 block">Exp. date</label>
                        <input v-model="usePayment.card.expiryDate" class="w-full placeholder-[#A1A1A1]" type="text" name="credit-expires"
                            placeholder="MM/YY" required>
                    </div>
                    <div>
                        <label for="name" class="_ca1 mb-2 block">CVV</label>
                        <input class="w-full placeholder-[#A1A1A1]" type="number" name="credit-cvc" placeholder="123">
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button type="button" @click="usePayment.store.joinToGroupModal = false"
                        class="_ca1 font-semibold px-6 r_8 uppercase">cancel</button>
                    <button class="_ca1 font-semibold b_ce0 px-6 r_8 uppercase">ADD</button>
                </div>
            </form>
            <form v-else-if="usePayment.store.join_step == 2" @submit.prevent="usePayment.paymentConfirmData">
              <p class="mt-4">SMS code was sent to ******9898</p>
                <div class="grid grid-cols-2 gap-5 mt-2">
                    <div>
                        <label for="name" class="_ca1 mb-2 block">Code</label>
                        <input v-model="usePayment.store.code" class="w-full placeholder-[#A1A1A1]" type="text" name="credit-expires"
                            placeholder="000000" required>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button type="button" @click="usePayment.store.joinToGroupModal = false"
                        class="_ca1 font-semibold px-6 r_8 uppercase">cancel</button>
                    <button class="_ca1 font-semibold b_ce0 px-6 r_8 uppercase">ADD</button>
                </div>
            </form>
        </el-dialog>

        <!-- delete media -->
    <el-dialog
      v-model="useGroup.store.delete_media"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">Delete media?</h1>
        <p class="text-lg">
          Are you sure you want to delete? You can't undo this.
        </p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="useGroup.store.delete_media = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button
            @click="useGroup.delete_media"
            v-loading="isLoading.isLoadingType('deleteMedia')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            delete
          </button>
        </div>
      </div>
    </el-dialog>

        <!-- add media -->
   <el-dialog
      v-model="useGroup.store.add_media"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg py-7 px-6"
    >
      <form @submit.prevent="useGroup.create_media">
        <h1 class="text-2xl font-semibold">Add media</h1>
        <p class="mt-6 font-medium">
          Upload an image (1400 x 790 recommended).
        </p>
        <label for="add_image" class="_ca1 font-semibold border_ce0 h-10 inline-block full_flex max-w-fit px-6 r_8 mt-4 uppercase">
          UPLOAD IMAGE
        </label>
        <input @change="handleMediaUpload" type="file" id="add_image" accept="image/*" class="h-0 w-0 overflow-hidden !p-0" />
        <p class="mt-6 mb-4 font-medium">
          Or, add a YouTube, Vimeo, Loom, or Wistia video link.
        </p>
        <input
          v-model="useGroup.media.link"
          class="text-sm"
          type="url"
          placeholder="Link"
        />
        <p
          v-if="useGroup.store.is_url"
          class="leading-4 text-red-600 -mb-6 mt-2 vip"
        >
          Invalid video link
        </p>
        <div class="flex justify-end gap-3 mt-7 text-sm font-semibold">
          <button
            @click="useGroup.store.add_media = false"
            type="button"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button
            :class="
              useGroup.media.link ? 'b_cbc _c07' : 'b_ce0 _ca1'
            "
            class="uppercase h-10 px-6 rounded-lg"
            v-loading="isLoading.isLoadingType('createMedia')"
          >
            add
          </button>
        </div>
      </form>
    </el-dialog>
  </main>
</template>

<script setup>
import { useGroupStore, useLoadingStore, usePaymentStore } from "@/store";
import { VueDraggableNext as draggable } from 'vue-draggable-next';
const isLoading = useLoadingStore();
const useGroup = useGroupStore();
const usePayment = usePaymentStore();
isLoading.addLoading("getByUsername");
const videoIframe = ref("");
const store = reactive({
  slideModal: false,
});

function deleteMedia(id) {
  useGroup.store.media_id = id;
  useGroup.store.delete_media = true
}

function handleMediaUpload(e) {
  console.log("Hi");
  useGroup.media.image = e.target.files[0];
  useGroup.create_media();
  document.querySelector('#add_image').value = "";
}

function handleSlideChange(type) {
  if (type == "right") {
        if (useGroup.store.slideStep2 < useGroup.store.group_by_username.medias.length - 1) {
          useGroup.store.slideStep2 += 1;
        }
      } else if (type == "left") {
        if (useGroup.store.slideStep2 > 0) {
          useGroup.store.slideStep2 -= 1;
        }
      }
}

function embedLink(link) {
  const url = new URL(link);
      let videoId = '';
      if (url.hostname === 'youtu.be') {
        videoId = url.pathname.split('/')[1];
      } else if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
        videoId = url.searchParams.get('v');
      }

      return `https://www.youtube.com/embed/${videoId}`;
    }

watch(
  () => store.slideModal,
  () => {
    useGroup.store.slideStep2 = useGroup.store.slideStep;

    const video = document.getElementById("math_video");
    try {
      video.pause();
    } catch (error) { }
  }
);

watch(
  () => useGroup.store.slideStep,
  () => {
    try {
      useGroup.store.slideStep2 = useGroup.store.slideStep;
      const image = document.querySelector(".mainSlider");
      image.style.transform = `translateX(-${useGroup.store.slideStep * 100}%)`;
    } catch (error) { }
  }
);

watch(
  () => useGroup.store.slideStep2,
  () => {
    const video = document.querySelector("video");
    try {
      video.pause();
    } catch (error) { }
    try {
      const image = document.querySelector(".mainSlider2");
      image.style.transform = `translateX(-${useGroup.store.slideStep2 * 100}%)`;
    } catch (error) { }
  }
);

onBeforeMount(() => {
  useGroup.groupByUsername();
  document.addEventListener("keydown", function (event) {
    // Check if Ctrl key is pressed and the key pressed along with it
    if (!store.slideModal) {
      if (event.key == "ArrowRight") {
        if (useGroup.store.slideStep < useGroup.store.group_by_username.medias.length - 1) {
          useGroup.store.slideStep += 1;
        }
      } else if (event.key == "ArrowLeft") {
        if (useGroup.store.slideStep > 0) {
          useGroup.store.slideStep -= 1;
        }
      }
    } else {
      if (event.key == "ArrowRight") {
        if (useGroup.store.slideStep2 < useGroup.store.group_by_username.medias.length - 1) {
          useGroup.store.slideStep2 += 1;
        }
      } else if (event.key == "ArrowLeft") {
        if (useGroup.store.slideStep2 > 0) {
          useGroup.store.slideStep2 -= 1;
        }
      }
    }
  });
});
</script>

<style lang="scss" scoped></style>
