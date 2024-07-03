<template>
  <section>
    <div
      class="grid md:grid-cols-3 grid-cols-2 gap-6 justify-between my-8 mt-[18px]"
    >
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
        class="w-full course_card relative bg-white md:r_16 r_12 overflow-hidden"
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
                <el-dropdown-item @click="handleEditCourse(i)"
                  >Edit course</el-dropdown-item
                >
                <el-dropdown-item>Add set</el-dropdown-item>
                <el-dropdown-item>Add module</el-dropdown-item>
                <el-dropdown-item @click="useClassroom.delete_course(i.title)"
                  >Delete course</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div>
          <div>
            <img
              v-if="i.image"
              class="w-full card md:h-[180px] sm:h-[140px] h-[88px] object-cover"
              :src="i.image"
              alt=""
            />
            <p
              v-else
              class="w-full card md:h-[180px] sm:h-[140px] h-[120px] b_cbc"
            ></p>
          </div>
          <div v-if="i.access == 'private'"
            class="absolute text-white gap-2 bg-black bg-opacity-30 top-0 full_flex flex-col w-full card md:h-[180px] sm:h-[140px] h-[88px] object-cover"
          >
            <img class="w-6 h-8" src="@/assets/svg/icon/lock.svg" alt="" />
            <p>Private Course</p>
          </div>
        </div>
        <div class="p-4">
          <div class="flex items-center gap-4">
            <h1 class="font-semibold sm:text-xl text-sm line-clamp-1">
              {{ i.title }}
            </h1>
          </div>
          <p
            class="md:text-[16px] text-[10px] mt-4 md:mb-7 mb-4 h-12 line-clamp-2"
          >
            {{ i.description }}
          </p>
          <el-progress class="class_progress" :percentage="45" />
          <p class="sm:text-xs text-[10px] mt-2">45% complete</p>
        </div>
        <router-link
          :to="`/${$router.currentRoute.value.params.community}/classroom/${i.slug}`"
        >
          <button
            class="sm:text-[16px] text-sm full_flex w-full border-t class_btn duration-700 border-[#BCDEFF] sm:h-[50px] h-[31px] _c59 font-medium uppercase"
          >
            open
          </button></router-link
        >
      </div>
      <div
        @click="useClassroom.store.add_course = true"
        class="relative border-2 border-dashed md:h-[409px] h-[300px] border-[#BCDEFF] cursor-pointer text-[#59ACFF] full_flex flex-col gap-[10px] font-semibold overflow-hidden r_16"
      >
        <img src="@/assets/svg/add_course.svg" alt="" />
        <p class="md:text-[16px] text-[10px]">Add new cource</p>
      </div>
    </div>

    <!-- add course -->
    <el-dialog
      v-model="useClassroom.store.add_course"
      align-center
      class="lg:min-w-[780px] min-w-[calc(100vw_-_40px)] bg-opacity-50 p-6 !rounded-lg"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <h1 class="md:text-2xl text-lg pb-2 font-semibold _c07">
          <span v-if="useClassroom.store.edit_course">Edit</span
          ><span v-else>Add</span> course
        </h1>
        <div>
          <input
            @input="handleInput('input')"
            v-model="useClassroom.create.title"
            type="text"
            class="text-sm"
            placeholder="Course name"
            required
          />
          <p class="text-end mt-2 _ca1 md:text-sm text-xs">
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
          <p class="text-end mt-2 _ca1 md:text-sm text-xs">
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
        <div v-if="useClassroom.create.access == 'level_lock'">
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
        <div class="sm:flex gap-4">
          <label
            v-if="!isLoading.store.croppedImage"
            for="add_photo"
            class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm sm:h-[188px] h-[164px] sm:w-[366px] w-full"
          >
            <img src="@/assets/svg/add_photo.svg" alt="" />
            <p>Add a photo</p>
          </label>
          <label class="relative imagelabel" v-else for="add_photo">
            <button
              @click="deleteImage"
              type="button"
              class="absolute deleteimage !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2"
            >
              <img src="@/assets/svg/x.svg" alt="" />
            </button>
            <img
              class="sm:h-[188px] h-[164px] sm:w-[366px] w-full overflow-hidden rounded-xl object-cover"
              :src="isLoading.store.croppedImage"
              alt=""
            />
          </label>
          <div class="sm:block flex items-center justify-between py-5">
            <div class="sm:mb-5">
              <p class="text-xl font-medium _c07">Cover</p>
              <p class="_ca1 text-xs font-medium mt-1">1460x752 px</p>
            </div>
            <label
              for="add_photo"
              class="_ca1 full_flex uppercase block h-10 px-6 text-sm font-semibold border border-[#E0E0E0] r_8"
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
        <div
          class="flex items-center justify-between !sm:mt-6 !mt-1"
          :class="useClassroom.store.add_course ? '' : 'pb-12'"
        >
          <div class="flex items-center gap-6">
            <p
              v-if="useClassroom.create.published"
              class="text-[16px] _c07 font-medium"
            >
              Published
            </p>
            <p v-else class="text-[16px] font-medium">Draft</p>
            <el-switch v-model="useClassroom.create.published" class="ml-2" />
          </div>
          <div
            v-if="!useClassroom.store.edit_course"
            class="flex gap-3 text-sm font-semibold"
          >
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
        <div
          v-if="useClassroom.store.edit_course"
          class="flex items-center justify-between text-sm font-semibold whitespace-nowrap"
        >
          <button
            v-loading="isLoading.isLoadingType('deleteEvent')"
            type="button"
            class="uppercase h-10 rounded-lg _ceb"
          >
            Delete event
          </button>
          <div class="flex justify-end w-full gap-3">
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
              :class="store.is_active ? 'b_cbc _c07' : 'b_ce0 _ca1'"
              @click="reposrtToAdmins"
              class="uppercase h-10 px-6 rounded-lg"
              v-loading="isLoading.isLoadingType('addEvents')"
            >
              <span v-if="useClassroom.store.edit_course">save</span>
              <span v-else>add</span>
            </button>
          </div>
        </div>
      </form>
    </el-dialog>
  </section>

  <!-- cropper image -->
  <el-dialog
    v-model="isLoading.store.cropModal"
    v-if="isLoading.store.cropModal"
    width="780"
    align-center
    class="bg-opacity-50 p-6 !w-[400px] !rounded-lg"
  >
    <cropper-image />
    <p class="_c07 text-center mt-4">
      Or, <label class="_c2a" for="add_photo">upload a different photo</label>
    </p>
  </el-dialog>
</template>

<script setup>
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
    value: "public",
  },
  {
    label: "Only some members have access",
    value: "private",
  },
  {
    label: "Members of a certain level",
    value: "level_lock",
  },
];

watch(
  () => useClassroom.create.access,
  () => {
    if (useClassroom.create.access == "certain") {
      useClassroom.create.level = 1;
    } else {
      useClassroom.create.level = null;
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

function handleEditCourse(data) {
  useClassroom.store.add_course = true;
  useClassroom.store.edit_course = true;
  for (let i in useClassroom.create) {
    useClassroom.create[i] = data[i];
  }
  console.log(useClassroom.create.image);
  isLoading.store.croppedImage = useClassroom.create.image;
  isLoading.store.croppedFile = useClassroom.create.image;
}

function handleAddedPhoto(e) {
  isLoading.store.cropModal = false;
  const file = e.target.files[0];
  console.log(file);
  // useClassroom.create.image = file;
  isLoading.store.previewImage = URL.createObjectURL(file);
  document.getElementById("add_photo").value = "";
  setTimeout(() => {
    isLoading.store.cropModal = true;
  }, 100);
}

function deleteImage() {
  useClassroom.create.image = "";
  isLoading.store.croppedImage = "";
}

function handleSubmit() {
  useClassroom.create_course();
}

watch(
  () => isLoading.store.croppedImage,
  () => {
    if (isLoading.store.croppedImage) {
      useClassroom.create.image = isLoading.store.croppedFile;
      isLoading.store.previewImage = "";
    }
  }
);

watch(
  () => useClassroom.store.add_course,
  () => {
    if (!useClassroom.store.add_course) {
      useClassroom.store.edit_course = false;
    }
  }
);

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
