<template>
  <section>
    <div class="grid grid-cols-3 gap-6 justify-between my-8 mt-[18px]">
      <div
        v-if="isLoading.isLoadingType('getClassrooms')"
        v-for="i in 10"
        class="w-full bg_loading animate-pulse h-[400px] r_16 overflow-hidden"
      >
        <div
          class="w-full card md:h-[180px] sm:h-[140px] h-[120px] object-cover bg-gray-600"
        ></div>
      </div>
      <div
        v-else
        v-for="i in useClassroom.store.classrooms"
        data-aos="zoom-in"
        class="w-full course_card relative bg-white r_16 overflow-hidden"
      >
        <div
          :class="i.id == store.activeEdit ? 'edit_button_active' : ''"
          class="absolute right-4 top-4 bg-white w-6 h-6 r_8 p-1 edit_button cursor-pointer !hidden full_flex"
        >
          <el-dropdown placement="bottom-end" class="dropdown" trigger="click">
            <img
              @click="store.activeEdit = i.id"
              class="w-5 h-5"
              src="@/assets/svg/three_dot.svg"
              alt=""
            />
            <template #dropdown>
              <el-dropdown-menu
                @click="store.activeEdit = ''"
                class="community_dropdown min-w-[200px] dropdown_shadow"
              >
                <el-dropdown-item>Edit course</el-dropdown-item>
                <el-dropdown-item>Add set</el-dropdown-item>
                <el-dropdown-item>Add module</el-dropdown-item>
                <el-dropdown-item>Delete course</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div>
          <img
            v-if="i.image"
            class="w-full card md:h-[180px] sm:h-[140px] h-[120px] object-cover"
            :src="i.image"
            alt=""
          />
          <p
            v-else
            class="w-full card md:h-[180px] sm:h-[140px] h-[120px] b_cbc"
          ></p>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-4">
            <h1 class="font-semibold text-xl line-clamp-1">{{ i.title }}</h1>
          </div>
          <p class="mt-4 mb-7 h-12 line-clamp-2">
            {{ i.description }}
          </p>
          <el-progress class="class_progress" :percentage="45" />
          <p class="text-xs mt-2">45% complete</p>
        </div>
        <router-link
          :to="`/${$router.currentRoute.value.params.community}/classroom/${i.slug}`"
        >
          <button
            class="full_flex w-full border-t class_btn duration-700 border-[#BCDEFF] h-[50px] _c59 font-medium uppercase"
          >
            open
          </button></router-link
        >
      </div>
      <div
        @click="useClassroom.store.add_course = true"
        class="relative border-2 border-dashed h-[409px] border-[#BCDEFF] cursor-pointer text-[#59ACFF] full_flex flex-col gap-[10px] font-semibold overflow-hidden r_16"
      >
        <img src="@/assets/svg/add_course.svg" alt="" />
        <p>Add new cource</p>
      </div>
    </div>

    <!-- add course -->
    <el-dialog
      v-model="useClassroom.store.add_course"
      width="780"
      align-center
      class="bg-opacity-50 p-6 !rounded-lg"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <h1 class="text-2xl pb-2 font-semibold _c07">Add course</h1>
        <div>
          <input
            @input="handleInput('input')"
            v-model="useClassroom.create.title"
            type="text"
            class="text-sm"
            placeholder="Course name"
            required
          />
          <p class="text-end mt-2 _ca1 text-sm">
            {{ useClassroom.create.title?.length }}/50
          </p>
        </div>
        <div>
          <textarea
            @input="handleInput('textarea')"
            id="write_message"
            v-model="useClassroom.create.description"
            class="h-[90px] text-sm w-full rounded-[4px]"
            placeholder="Course description"
          ></textarea>
          <p class="text-end mt-2 _ca1 text-sm">
            {{ useClassroom.create.description?.length }}/150
          </p>
        </div>
        <div>
          <label class="_ca1 text-xs" for="access"
            >Who can access this course</label
          >
          <el-select
            class="block w-full mt-2"
            v-model="useClassroom.create.access"
            placeholder="Select"
          >
            <el-option
              v-for="item in access_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
              <div class="flex items-center gap-2">
                {{ item.label }}
                <img
                  v-if="useClassroom.create.access == item.value"
                  src="@/assets/svg/checked.svg"
                  alt=""
                />
              </div>
            </el-option>
          </el-select>
        </div>
        <div v-if="useClassroom.create.access == 'certain'">
          <label class="_ca1 text-xs" for="access"
            >Access starts at level</label
          >
          <el-select
            class="block w-full mt-2 el_select"
            v-model="useClassroom.create.level"
            placeholder="Select"
          >
            <el-option
              v-for="item in 9"
              :key="item"
              :label="item"
              :value="item"
            >
              <div class="flex items-center gap-2">
                {{ item }}
                <img
                  v-if="useClassroom.create.level == item"
                  src="@/assets/svg/checked.svg"
                  alt=""
                />
              </div>
            </el-option>
          </el-select>
        </div>
        <div class="flex gap-4">
          <label
            v-if="!useClassroom.store.cropperPreview"
            for="add_photo"
            class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm h-[188px] w-[366px]"
          >
            <img src="@/assets/svg/add_photo.svg" alt="" />
            <p>Add a photo</p>
          </label>
          <img
            v-else
            class="h-[188px] w-[366px] rounded-xl object-cover"
            :src="useClassroom.store.cropperPreview"
            alt=""
          />
          <div class="py-5">
            <p class="text-xl font-medium">Cover</p>
            <p class="_ca1 text-xs font-medium mt-1 mb-5">1460x752 px</p>
            <label
              for="add_photo"
              class="full_flex uppercase block h-10 px-6 text-sm font-semibold border border-[#E0E0E0] r_8"
            >
              change
            </label>
          </div>
          <input
            @change="handleAddedPhoto"
            id="add_photo"
            type="file"
            class="w-0 h-0 overflow-hidden !p-0"
          />
        </div>
        <div class="flex items-center justify-between pb-12">
          <div class="flex items-center gap-6">
            <p
              v-if="useClassroom.create.published"
              class="text-[16px] font-medium"
            >
              Published
            </p>
            <p v-else class="text-[16px] font-medium">Draft</p>
            <el-switch v-model="useClassroom.create.published" class="ml-2" />
          </div>
          <div class="flex gap-3 text-sm font-semibold">
            <button
              type="button"
              @click="useClassroom.store.add_course = false"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              cancel
            </button>
            <button
              :type="
                isLoading.isLoadingType('createCourse') ? 'button' : 'submit'
              "
              :class="useClassroom.create.title ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              @click="reposrtToAdmins"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('createCourse')"
            >
              add
            </button>
          </div>
        </div>
      </form>
    </el-dialog>

    <!-- cropper -->
    <!-- <el-dialog
      v-model="useClassroom.store.cropperPreview"
      width="400"
      align-center
      class="bg-opacity-50 !rounded-lg"
    >
      <img :src="useClassroom.store.cropperPreview" />
    </el-dialog> -->
  </section>
</template>

<script setup>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { useLoadingStore, useClassroomStore } from "@/store";

const useClassroom = useClassroomStore();
const isLoading = useLoadingStore();

isLoading.addLoading("getClassrooms");

const store = reactive({
  activeEdit: "",
});

const access_list = [
  {
    label: "All members have access",
    value: "all",
  },
  {
    label: "Only some members have access",
    value: "some",
  },
  {
    label: "Members of a certain level",
    value: "certain",
  },
];

watch(
  () => useClassroom.create.access,
  () => {
    if (useClassroom.create.access == "certain") {
      useClassroom.create.level = 1;
    } else {
      useClassroom.create.level = "";
    }
  }
);

function handleInput(type) {
  if (type == "input") {
    useClassroom.create.title = useClassroom.create.title?.slice(0, 50);
  } else {
    useClassroom.create.description = useClassroom.create.description?.slice(
      0,
      150
    );
  }
}

function handleAddedPhoto(e) {
  const file = e.target.files[0];
  useClassroom.create.image = file;
  useClassroom.store.cropperPreview = URL.createObjectURL(file);
  document.getElementById("add_photo").value = "";
}

function handleSubmit() {
  useClassroom.create_course();
}

onBeforeMount(() => {
  useClassroom.get_classroom();
});
</script>

<style lang="scss" scoped>
.course_card {
  &:hover {
    .edit_button {
      display: flex !important;
    }
  }
}
.edit_button_active {
  display: flex !important;
}
</style>
