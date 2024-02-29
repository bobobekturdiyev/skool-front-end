<template>
  <main class="bg-white rounded-xl border">
    <div v-if="!store.table">
      <section class="flex items-center justify-between p-4">
        <div class="flex gap-7">
          <div class="full_flex text-center gap-2">
            <img @click="decMonth" class="h-7 w-7 hover:bg-gray-200 rounded-full rotate-180 cursor-pointer p-2"
              src="@/assets/svg/calendar_arrow.svg" alt="" />
            <div>
              <h1 class="font-semibold">{{ FormatDate() }}</h1>
              <p class="_c07 text-xs">06 pm Tashkent time</p>
            </div>
            <img @click="incMonth" class="h-7 w-7 hover:bg-gray-200 rounded-full cursor-pointer p-2"
              src="@/assets/svg/calendar_arrow.svg" alt="" />
          </div>
          <button @click="getToday('today')" class="_c2a font-medium">Today</button>
        </div>
        <div class="full_flex gap-4">
          <button class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8"
            @click="useEvent.store.add_event = true">
            <img src="@/assets/svg/plus.svg" alt="" />
          </button>
          <button class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8" @click="store.table = true">
            <img src="@/assets/svg/table.svg" alt="" />
          </button>
        </div>
      </section>
      <section class="grid grid-cols-7 font-semibold">
        <div class="flex items-center px-4 text-start font-medium text-sm border h-9" v-for="i in weeks">
          {{ i }}
        </div>
      </section>
      <section>
        <div class="grid grid-cols-7" v-for="date in store.calendar">
          <div class="border h-[120px] px-4 py-[6px]" v-for="i in date">
            <p :class="store.today[1] == i[1] && store.today[0] == i[0] ? 'b_cbc' : ''"
              class="full_flex text-xs font-medium _c07 p-1 h-6 -ml-1 rounded-full max-w-fit min-w-[24px]">{{ i[1] }}</p>
            <div class="whitespace-nowrap _c07 cursor-pointer text-xs overflow-x-auto space-y-1">
              <div v-show="checkDates(i[1], i[0], event.date) && index < 1" v-for="(event, index) in useEvent.store.events">
                <div v-for="e in event.data"
                  class="flex items-center w-fit pr-2 gap-[6px]  rounded-[4px] b_cf0f overflow-hidden max-w-[100%]"
                  @click="openEventData(i)">
                  <p class="min-w-[2px] b_c2a h-6"></p>
                  <p class="truncate max-w-[100%] overflow-hidden">{{ e.time }} - {{ e.title }}</p>
                </div>
                <p class="_c2a text-xs font-medium">+2 more</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section v-else>
      <div class="flex items-center justify-between px-4">
        <div class="flex items-center text-center gap-1 py-5">
          <img @click="decMonth" class="h-7 w-7 hover:bg-gray-200 rounded-full rotate-180 cursor-pointer p-2"
            src="@/assets/svg/calendar_arrow.svg" alt="" />
          <h1 class="font-semibold">February 2024</h1>
          <img @click="incMonth" class="h-7 w-7 hover:bg-gray-200 rounded-full cursor-pointer p-2"
            src="@/assets/svg/calendar_arrow.svg" alt="" />
        </div>
        <button class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8" @click="store.table = false">
          <img src="@/assets/svg/calendar.svg" alt="" />
        </button>
      </div>
      <div class="grid" v-for="date in store.calendar">
        <div class="border h-[120px] py-[6px] space-y-4 overflow-hidden p-4" v-for="i in date">
          <div class="flex gap-5" @click="openEventData(i[2], index)"
            v-for="(event, index) in useEvent.store.events[i[2]]?.data">
            <img class="rounded-lg h-[100px]" :src="event.image" alt="" />
            <div>
              <p>
                {{ event.date }}
                {{ event.time }}
              </p>
              <p>{{ event.time }} - {{ event.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <el-dialog v-model="useEvent.store.eventModal" class="!rounded-2xl overflow-hidden !p-0 max-w-[400px]" align-center>
      <img v-if="store.eventInfo.image" class="w-full -mt-2 mb-1" :src="store.eventInfo.image" alt="" />
      <div v-else class="h-[242px] -mt-2 mb-1 w-full b_cf2 full_flex">
        <img src="@/assets/svg/calendar/calendar_img.svg" alt="" />
      </div>
      <div class="p-5 space-y-6">
        <div class="mb-7 flex _c00 items-center justify-between">
          <div>
            <h1 class="text-2xl font-semibold">
              {{
                store.eventInfo.title
              }}
            </h1>
          </div>
          <button class="border_cbc w-9 h-9 r_8 full_flex">
            <img src="@/assets/svg/edit.svg" alt="" />
          </button>
        </div>
        <div class="flex items-center gap-4">
          <img class="w-6" src="@/assets/svg/calendar/calendar_black.svg" alt="" />
          <div>
            <p class="_c00 font-medium text-md" v-for="i in formatCalendarDate()">
              {{ i[0] }} 16th @ {{ store.eventInfo.time }} - {{ i[1] }}
            </p>
            <p class="_ca1 text-sm"> {{
              store.eventInfo
                .timezone
            }}</p>
          </div>
        </div>
        <div v-if="store.eventInfo.location_value" class="flex items-center gap-4">
          <img class="w-6" src="@/assets/svg/calendar/zoom.svg" alt="" />
          <a :href="store.eventInfo.location_value" target="_blank"
            class="_c2a font-medium text-md hover:underline cursor-pointer"> {{
              store.eventInfo
                .location_value
            }}</a>
        </div>
        <p class="text-sm">
          {{ store.eventInfo.description }}
        </p>
        <button class="!text-sm font-semibold b_cbc _c07 w-full r_8 uppercase full_flex gap-[10px]">
          Add to calendar
          <img class="w-4" src="@/assets/svg/select_arrow.svg" alt="" />
        </button>
      </div>
    </el-dialog>

    <!-- add course -->
    <el-dialog v-model="useEvent.store.add_event" width="780" align-center class="bg-opacity-50 p-6 !rounded-lg">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <h1 class="text-2xl pb-2 font-semibold _c07">Add event</h1>
        <div>
          <input v-model="useEvent.create.title" @input="handleInput('input')" type="text" class="text-sm"
            placeholder="Title" required />
          <p class="text-end mt-1 _ca1 text-sm">
            {{ useEvent.create.title?.length }}/50
          </p>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <el-date-picker @change="checkIsActive" v-model="useEvent.create.date" type="date"
              class="!min-w-[136px] !w-[136px] !p-0 -mt-2" placeholder="Feb 23, 2024" format="MMM DD, YYYY" />
            <img class="-ml-8 z-10 mr-8" src="@/assets/svg/select_arrow.svg" alt="" />
          </div>
          <div>
            <el-select v-model="useEvent.create.time" class="!w-[136px]" placeholder="Time">
              <el-option v-for="item in time_list" :key="item" :label="item" :value="item">
                <div class="flex items-center gap-2">
                  {{ item }}
                  <img v-if="useEvent.create.time == item" src="@/assets/svg/checked.svg" alt="" />
                </div>
              </el-option>
            </el-select>
          </div>
          <div>
            <el-select @change="checkIsActive" v-model="useEvent.create.duration" class="!w-[136px]"
              placeholder="Duration">
              <el-option v-for="item in duration_list" :key="item[0]" :label="item[0]" :value="item[1]">
                <div class="flex items-center gap-2">
                  {{ item[0] }}
                  <img v-if="useEvent.create.duration == item" src="@/assets/svg/checked.svg" alt="" />
                </div>
              </el-option>
            </el-select>
          </div>
          <div class="w-full timezone">
            <el-select v-model="useEvent.create.timezone" filterable class="!w-full"
              placeholder="(GMT +05:00) Asia/Tashkent">
              <el-option v-for="item in timeZones" :key="item" :label="item" :value="item">
                <div class="flex items-center gap-2">
                  {{ item }}
                  <img v-if="useEvent.create.timezone == item" src="@/assets/svg/checked.svg" alt="" />
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
        <el-checkbox v-model="useEvent.store.recurring" label="Recurring event" />
        <div class="flex items-center gap-4">
          <div>
            <label class="_ca1 block mb-2 text-xs" for="location">Location</label>
            <el-dropdown placement="bottom-start" class="dropdown h-10 border border-[#E0E0E0] rounded-[4px] px-3"
              trigger="click">
              <div class="flex items-center justify-between">
                <div class="flex items-center !w-[132px] gap-2">
                  <img :src="useEvent.create.location.value" alt="">
                  {{ useEvent.create.location.label }}
                </div>
                <img class="-mt-0.5" src="@/assets/svg/select_arrow.svg" alt="">
              </div>
              <template #dropdown>
                <el-dropdown-menu class="community_dropdown min-w-[200px] !-ml-3 dropdown_shadow">
                  <el-dropdown-item @click="useEvent.create.location = item" class="flex items-center !gap-2"
                    v-for="item in location_list">
                    <img :src="item.value" alt="">
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="w-full">
            <label class="_ca1 block mb-2 text-xs" for="location">Zoom link</label>
            <input v-model="useEvent.create.location_value" type="text" class="!font-[400]" placeholder="http" />
          </div>
        </div>
        <div>
          <textarea @input="handleInput('textarea')" id="write_message" v-model="useEvent.create.description"
            class="h-[90px] text-sm w-full rounded-[4px]" placeholder="Description"></textarea>
          <p class="text-end mt-2 _ca1 text-sm">
            {{ useEvent.create.description?.length }}/300
          </p>
        </div>
        <div class="flex gap-4">
          <label v-if="!isLoading.store.croppedImage" for="add_photo"
            class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm h-[188px] w-[366px]">
            <img src="@/assets/svg/add_photo.svg" alt="" />
            <p>Upload cover image</p>
            <p class="_ca1 text-xs font-medium">1460 x 752 px</p>
          </label>
          <label class="relative imagelabel" v-else for="add_photo">
            <button @click="deleteImage" type="button"
              class="absolute deleteimage !hidden top-2 right-2 rounded-full w-7 h-7 full_flex border p-2">
              <img src="@/assets/svg/x.svg" alt="">
            </button>
            <img class="h-[188px] w-[366px] overflow-hidden rounded-xl object-cover" :src="isLoading.store.croppedImage"
              alt="" />
          </label>
          <div class="py-5 space-y-5">
            <div>
              <label class="_ca1 text-xs" for="access">Who can attend this event</label>
              <el-select class="block w-full mt-2" v-model="useEvent.create.access" placeholder="Select">
                <el-option v-for="item in access_list" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                  <div class="flex items-center gap-2">
                    {{ item.label }}
                    <img v-if="useEvent.create.access == item.value" src="@/assets/svg/checked.svg" alt="" />
                  </div>
                </el-option>
              </el-select>
            </div>
            <div v-if="useEvent.create.access == 'level'">
              <label class="_ca1 text-xs" for="access">Access starts at level</label>
              <el-select class="block w-full mt-2 el_select" v-model="useEvent.create.access_value" placeholder="Select">
                <el-option v-for="item in 9" :key="item" :label="item" :value="item">
                  <div class="flex items-center gap-2">
                    {{ item }}
                    <img v-if="useEvent.create.access_value == item" src="@/assets/svg/checked.svg" alt="" />
                  </div>
                </el-option>
              </el-select>
            </div>
            <el-checkbox v-model="useEvent.create.remind" label="Remind members by email 1 day before" />
          </div>
          <input @change="handleAddedPhoto" id="add_photo" type="file" class="w-0 h-0 overflow-hidden !p-0" />
        </div>
        <div class="flex items-center justify-between pt-3">
          <div class="flex justify-end w-full gap-3 text-sm font-semibold">
            <button type="button" @click="useEvent.store.add_event = false" class="uppercase h-10 px-6 rounded-lg _ca1">
              cancel
            </button>
            <button :type="isLoading.isLoadingType('createCourse') ? 'button' : 'submit'
              " :class="store.is_active ? 'b_cbc _c07' : 'b_ce0 _ca1'" @click="reposrtToAdmins"
              class="uppercase h-10 px-6 rounded-lg" v-loading="isLoading.isLoadingType('createCourse')">
              add
            </button>
          </div>
        </div>
      </form>
    </el-dialog>

    <!-- cropper image -->
    <el-dialog v-model="isLoading.store.cropModal" v-if="isLoading.store.cropModal" width="780" align-center
      class="bg-opacity-50 p-6 !w-[400px] !rounded-lg">
      <cropper-image />
      <p class="_c07 text-center mt-4">Or, <label class="_c2a" for="add_photo">upload a different photo</label></p>
    </el-dialog>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useEventStore, useLoadingStore } from "@/store";
import moment from 'moment-timezone';
import { Calendar } from "calendar";
import zoom from "@/assets/svg/calendar/zoom.svg"
import meet from "@/assets/svg/calendar/meet.svg"
import address from "@/assets/svg/calendar/address.svg"
import link from "@/assets/svg/calendar/link.svg"

const useEvent = useEventStore();
const isLoading = useLoadingStore();
const cal = new Calendar(1);
const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const timeZones = moment.tz.names().map((name) => {
  const offset = moment.tz(name).format('Z');
  return `(GMT${offset}) ${name}`;
});

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const offset = moment().tz(timeZone).format('Z');
const location = moment.tz(timeZone).zoneAbbr();
useEvent.create.timezone = `(GMT ${offset}) ${timeZone}`

const store = reactive({
  calendar: [],
  year: "",
  month: "",
  eventId: [],
  table: false,
  is_active: false,
  today: [],
  eventInfo: "",
});

const access_list = [
  {
    label: "All members",
    value: "all",
  },
  {
    label: "Members at a level",
    value: "level",
  },
  {
    label: "Members in a course",
    value: "course",
  },
];

const location_list = [
  {
    label: "Zoom",
    value: zoom,
  },
  {
    label: "Meet",
    value: meet,
  },
  {
    label: "Address",
    value: address,
  },
  {
    label: "Link",
    value: link,
  },
]


const time_list = [
  "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm"
]

const duration_list = [
  ["0.5 hours", 0.5], ["1 hour", 1], ["1.5 hours", 1.5], ["2 hours", 2], ["2.5 hours", 2.5]
]

useEvent.create.location = location_list[0]
useEvent.create.date = new Date();

function openEventData(data) {
  store.eventInfo = data
  useEvent.store.eventModal = true;
}

function formatCalendarDate() {
  let formatDate, dateString, time, duration, date, options, formattedDate, day, suffix, lastTime
  try {
    dateString = store.eventInfo.date;
    time = store.eventInfo.time;
    time = time.slice(0, -2)
    duration = store.eventInfo.duration
    date = new Date(+dateString);
    options = { weekday: 'long', month: 'long', day: 'numeric' };
    formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    // Adding suffix to day
    day = date.getDate();
    suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';

    lastTime = addTime(time, duration);
    formatDate = formattedDate.replace(/\d{1,2}$/, (match) => match + suffix);
  } catch (_) { }
  return [[formatDate, lastTime]];
}

function checkDates(day, month, date) {
  const newDate = new Date(+date)
  if (newDate.getMonth() == month && newDate.getDate() == day) {
    return true;
  }
  return false;
}

function addTime(baseTime, hoursToAdd) {
  let hours, minutes;
  const [baseHours, baseMinutes] = baseTime.split(':').map(Number);
  const date = new Date();
  try {
    date.setHours(baseHours);
    date.setMinutes(baseMinutes);

    date.setHours(date.getHours() + Math.floor(hoursToAdd));
    date.setMinutes(date.getMinutes() + (hoursToAdd % 1) * 60);

    hours = date.getHours().toString().padStart(2, '0');
    minutes = date.getMinutes().toString().padStart(2, '0');
  } catch (_) { }
  return `${hours}:${minutes}`;
}

function FormatDate() {
  const date = new Date(useEvent.store.start_date)
  const options = { month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleString('en-US', options);
  return formattedDate;
}

function getToday(type) {
  const offsetMinutes = new Date().getTimezoneOffset();
  const data = new Date(new Date().getTime() - offsetMinutes * 60 * 1000);
  const date = new Date().getDate();
  store.year = data.getFullYear();
  store.month = data.getMonth();
  store.today = [store.month, date]
  if (type == 'today') {
    getCalendar(store.year, store.month);
  }
}

getToday()

function incMonth() {
  if (store.month == 11) {
    store.month = -1;
  }
  store.month += 1;
  getCalendar(store.year, store.month);
}

function handleLocation(item) {
  console.log(item)
}

function handleInput(type) {
  if (type == "input") {
    checkIsActive();
    useEvent.create.title = useEvent.create.title?.slice(0, 50);
  } else {
    useEvent.create.description = useEvent.create.description?.slice(
      0,
      300
    );
  }
}

function handleAddedPhoto(e) {
  isLoading.store.cropModal = false;
  const file = e.target.files[0];
  isLoading.store.previewImage = URL.createObjectURL(file);
  document.getElementById("add_photo").value = "";
  setTimeout(() => {
    isLoading.store.cropModal = true
  }, 100);
}

function deleteImage() {
  useEvent.create.image = "";
  isLoading.store.croppedImage = "";
}

function decMonth() {
  if (store.month == 0) {
    store.month = 12;
  }
  store.month -= 1;
  getCalendar(store.year, store.month);
}

function getCalendar(year, month) {
  store.calendar = [];
  store.startAndEndDate = [];
  let t = -1;
  store.calendar = cal.monthDates(
    year,
    month,
    function (d) {
      console.log(d);
      t++;
      store.startAndEndDate.push(d);
      return [d.getMonth(), (" " + d.getDate()).slice(-2), t];
    },
    function (w) {
      return w;
    }
  );

  useEvent.store.start_date = new Date(
    store.year,
    ...store.calendar[0][0]
  ).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  useEvent.store.end_date = new Date(
    store.year,
    ...store.calendar[store.calendar.length - 1][6]
  ).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  useEvent.get_event();
}

function checkIsActive() {
  if (useEvent.create.date && useEvent.create.title && useEvent.create.time && useEvent.create.duration) {
    store.is_active = true;
  } else {
    store.is_active = false;
  }
}

function handleSubmit() {
  if (store.is_active) {
    useEvent.add_event();
  }
}

watch(() => isLoading.store.croppedImage, () => {
  if (isLoading.store.croppedImage) {
    useEvent.create.image = isLoading.store.croppedFile;
    isLoading.store.previewImage = "";
  }
})

onBeforeMount(() => {
  getCalendar(store.year, store.month);
  window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft") {
      decMonth();
    } else if (e.key == "ArrowRight") {
      incMonth();
    }
  });
});
</script>

<style lang="scss" scoped></style>