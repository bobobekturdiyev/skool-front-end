<template>
  <header class="pb-[60px] relative">
    <NuxtLoadingIndicator height="4" color="#2a85ff"/>
    <div class="h-[64px] mb-10">
      <Navbar />
    </div>
    <Pinned class="absolute top-0 left-0" />
    <div
      class="pb-[40px] mx-auto xl:px-[200px] lg:px-[100px] md:px-[100px] sm:px-[50px] px-5 max-w-[1536px]"
    >
      <div
        v-if="useGroup.store.group_by_username.status == 'active'"
        :class="
          isLoading.isLoadingType('getByUsername') ? 'pointer-events-none' : ''
        "
      >
        <Community_tabs />
      </div>
      <slot />
    </div>
    <Pagination v-if="$router.currentRoute.value.name == 'index'" />

    <!-- cropper image -->
    <el-dialog
      v-model="isLoading.store.inviteModal"
      width="1036px"
      align-center
      class="bg-opacity-50 !p-0 !rounded-lg members_dialog overflow-hidden"
    >
      <MembersModal />
    </el-dialog>

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
              :class="
                useClassroom.store.is_active ? 'b_cbc _c07' : 'b_ce0 _ca1'
              "
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

    <!-- Delete -->
    <el-dialog
      v-model="useClassroom.store.delete"
      width="400"
      align-center
      class="!rounded-xl overflow-hidden px-6 py-7"
    >
      <div class="space-y-7">
        <h1 class="text-2xl font-semibold">
          Delete course?
        </h1>
        <p class="text-lg">Are you sure you want to delete this course?</p>
        <div class="flex justify-end gap-3 text-sm font-semibold">
          <button
            @click="useClassroom.store.delete = false"
            class="uppercase h-10 px-6 rounded-lg _ca1"
          >
            cancel
          </button>
          <button
            @click="useClassroom.delete_course"
            v-loading="isLoading.isLoadingType('deleteCourse')"
            class="uppercase h-10 px-6 b_cbc _c07 rounded-lg"
          >
            delete
          </button>
        </div>
      </div>
    </el-dialog>
  </header>
</template>

<script setup>
import {
  useLoadingStore,
  useGroupStore,
  useMemberStore,
  useClassroomStore,
} from "@/store";
const isLoading = useLoadingStore();
const useMembers = useMemberStore();
const useClassroom = useClassroomStore();
const useGroup = useGroupStore();

watch(
  () => isLoading.store.inviteModal,
  () => {
    if (!isLoading.store.inviteModal) {
      useMembers.store.manageUserRole = false;
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
</script>

<style lang="scss" scoped></style>
