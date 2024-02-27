<template>
  <main class="bg-white rounded-xl border">
    <div v-if="!store.table">
      <section class="flex items-center justify-between p-4">
        <div class="flex gap-7">
          <div class="full_flex text-center gap-2">
            <img
              @click="decMonth"
              class="h-7 w-7 hover:bg-gray-200 rounded-full rotate-180 cursor-pointer p-2"
              src="@/assets/svg/calendar_arrow.svg"
              alt=""
            />
            <div>
              <h1 class="font-semibold">February 2024</h1>
              <p class="_c07 text-xs">06 pm Tashkent time</p>
            </div>
            <img
              @click="incMonth"
              class="h-7 w-7 hover:bg-gray-200 rounded-full cursor-pointer p-2"
              src="@/assets/svg/calendar_arrow.svg"
              alt=""
            />
          </div>
          <button class="_c2a font-medium">Today</button>
        </div>
        <div class="full_flex gap-4">
          <button
            class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8"
            @click="useEvent.store.add_event = true"
          >
            <img src="@/assets/svg/plus.svg" alt="" />
          </button>
          <button
            class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8"
            @click="store.table = true"
          >
            <img src="@/assets/svg/table.svg" alt="" />
          </button>
        </div>
      </section>
      <section class="grid grid-cols-7 font-semibold">
        <div
          class="flex items-center px-4 text-start font-medium text-sm border h-9"
          v-for="i in weeks"
        >
          {{ i }}
        </div>
      </section>
      <section>
        <div class="grid grid-cols-7" v-for="date in store.calendar">
          <div class="border h-[120px] px-4 py-[6px]" v-for="i in date">
            <p class="text-xs font-medium _c07">{{ i[1] }}</p>
            <div
              class="whitespace-nowrap text-blue-600 cursor-pointer overflow-x-auto"
            >
              <p
                @click="openEventData(i[2], index)"
                v-for="(event, index) in useEvent.store.events[i[2]]?.data"
              >
                {{ event.time }} - {{ event.title }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section v-else>
      <div class="flex items-center justify-between px-4">
        <div class="flex items-center text-center gap-1 py-5">
          <img
            @click="decMonth"
            class="h-7 w-7 hover:bg-gray-200 rounded-full rotate-180 cursor-pointer p-2"
            src="@/assets/svg/calendar_arrow.svg"
            alt=""
          />
          <h1 class="font-semibold">February 2024</h1>
          <img
            @click="incMonth"
            class="h-7 w-7 hover:bg-gray-200 rounded-full cursor-pointer p-2"
            src="@/assets/svg/calendar_arrow.svg"
            alt=""
          />
        </div>
        <button
          class="full_flex border border-[#BCDEFF] hover:bg-[#BCDEFF] h-9 w-9 r_8"
          @click="store.table = false"
        >
          <img src="@/assets/svg/calendar.svg" alt="" />
        </button>
      </div>
      <div class="grid" v-for="date in store.calendar">
        <div
          class="border h-[120px] py-[6px] space-y-4 overflow-hidden p-4"
          v-for="i in date"
        >
          <div
            class="flex gap-5"
            @click="openEventData(i[2], index)"
            v-for="(event, index) in useEvent.store.events[i[2]]?.data"
          >
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

    <el-dialog
      v-model="store.eventModal"
      class="!rounded-2xl overflow-hidden p-5 max-w-[400px]"
      align-center
    >
      <img
        class="w-full mb-2"
        :src="
          useEvent.store.events[store.eventId[0]]?.data[store.eventId[1]].image
        "
        alt=""
      />
      <h1 class="text-xl font-bold mb-2">
        {{
          useEvent.store.events[store.eventId[0]]?.data[store.eventId[1]].title
        }}
      </h1>
      <p>
        {{
          useEvent.store.events[store.eventId[0]]?.data[store.eventId[1]].date
        }}
        {{
          useEvent.store.events[store.eventId[0]]?.data[store.eventId[1]].time
        }}
      </p>
      <p>
        {{
          useEvent.store.events[store.eventId[0]]?.data[store.eventId[1]]
            .timezone
        }}
      </p>
      <p class="mt-2 mb-4">
        {{
          useEvent.store.events[store.eventId[0]]?.data[store.eventId[1]]
            .location_value
        }}
      </p>
      <p>
        {{
          useEvent.store.events[store.eventId[0]]?.data[store.eventId[1]]
            .description
        }}
      </p>
      <button class="bg-blue-600 w-full mt-3 text-white rounded-full">
        Button
      </button>
    </el-dialog>

    <!-- add course -->
    <el-dialog
      v-model="useEvent.store.add_event"
      width="780"
      align-center
      class="bg-opacity-50 p-6 !rounded-lg"
    >
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <h1 class="text-2xl pb-2 font-semibold _c07">Add event</h1>
        <div>
          <input
            @input="handleInput('input')"
            type="text"
            class="text-sm"
            placeholder="Title"
            required
          />
          <p class="text-end mt-1 _ca1 text-sm">
            {{ useEvent.create.title?.length }}/50
          </p>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <el-date-picker
              v-model="useEvent.create.date"
              type="date"
              class="!min-w-[136px] !w-[136px] !p-0 -mt-2"
              placeholder="Feb 23, 2024"
              format="MMM DD, YYYY"
            />
            <img
              class="-ml-8 z-10 mr-8"
              src="@/assets/svg/select_arrow.svg"
              alt=""
            />
          </div>
          <div>
            <el-select class="!w-[136px]" placeholder="Time">
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
                    v-if="useEvent.create.access == item.value"
                    src="@/assets/svg/checked.svg"
                    alt=""
                  />
                </div>
              </el-option>
            </el-select>
          </div>
          <div>
            <el-select class="!w-[136px]" placeholder="Duration">
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
                    v-if="useEvent.create.access == item.value"
                    src="@/assets/svg/checked.svg"
                    alt=""
                  />
                </div>
              </el-option>
            </el-select>
          </div>
          <div class="w-full">
            <el-select class="!w-full" placeholder="(GMT +05:00) Asia/Tashkent">
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
                    v-if="useEvent.create.access == item.value"
                    src="@/assets/svg/checked.svg"
                    alt=""
                  />
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
        <el-checkbox
          v-model="useEvent.create.recurring"
          label="Recurring event"
        />
        <div class="flex items-center gap-4">
          <div>
            <label class="_ca1 block mb-2 text-xs" for="location"
              >Location</label
            >
            <el-select id="location" class="!w-[132px]" placeholder="Location">
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
                    v-if="useEvent.create.access == item.value"
                    src="@/assets/svg/checked.svg"
                    alt=""
                  />
                </div>
              </el-option>
            </el-select>
          </div>
          <div class="w-full">
            <label class="_ca1 block mb-2 text-xs" for="location"
              >Zoom link</label
            >
            <input type="text" class="!font-[400]" placeholder="http" />
          </div>
        </div>
        <div>
          <textarea
            @input="handleInput('textarea')"
            id="write_message"
            v-model="useEvent.create.description"
            class="h-[90px] text-sm w-full rounded-[4px]"
            placeholder="Description"
          ></textarea>
          <p class="text-end mt-2 _ca1 text-sm">
            {{ useEvent.create.description?.length }}/300
          </p>
        </div>
        <div class="flex gap-4">
          <label
            v-if="!useEvent.store.title"
            for="add_photo"
            class="full_flex flex-col gap-1 cursor-pointer _c2a b_cf2 rounded-xl font-medium text-sm h-[188px] w-[366px]"
          >
            <img src="@/assets/svg/add_photo.svg" alt="" />
            <p>Upload cover image</p>
            <p class="_ca1 text-xs font-medium">1460 x 752 px</p>
          </label>
          <img
            v-else
            class="h-[188px] w-[366px] rounded-xl object-cover"
            :src="useEvent.store.title"
            alt=""
          />
          <div class="py-5 space-y-5">
            <div>
              <label class="_ca1 text-xs" for="access"
                >Who can attend this event</label
              >
              <el-select
                class="block w-full mt-2"
                v-model="useEvent.create.access"
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
                      v-if="useEvent.create.access == item.value"
                      src="@/assets/svg/checked.svg"
                      alt=""
                    />
                  </div>
                </el-option>
              </el-select>
            </div>
            <div v-if="useEvent.create.access == 'certain'">
              <label class="_ca1 text-xs" for="access"
                >Access starts at level</label
              >
              <el-select
                class="block w-full mt-2 el_select"
                v-model="useEvent.create.level"
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
                      v-if="useEvent.create.level == item"
                      src="@/assets/svg/checked.svg"
                      alt=""
                    />
                  </div>
                </el-option>
              </el-select>
            </div>
            <el-checkbox
              v-model="useEvent.create.recurring"
              label="Remind members by email 1 day before"
            />
          </div>
          <input
            @change="handleAddedPhoto"
            id="add_photo"
            type="file"
            class="w-0 h-0 overflow-hidden !p-0"
          />
        </div>
        <div class="flex items-center justify-between pt-3">
          <div class="flex justify-end w-full gap-3 text-sm font-semibold">
            <button
              type="button"
              @click="useEvent.store.add_event = false"
              class="uppercase h-10 px-6 rounded-lg _ca1"
            >
              cancel
            </button>
            <button
              :type="
                isLoading.isLoadingType('createCourse') ? 'button' : 'submit'
              "
              :class="useEvent.create.title ? 'b_cbc _c07' : 'b_ce0 _ca1'"
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
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useEventStore, useLoadingStore } from "@/store";
import { Calendar } from "calendar";

const useEvent = useEventStore();
const isLoading = useLoadingStore();
const cal = new Calendar(1);
const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const store = reactive({
  calendar: [],
  year: "",
  month: "",
  eventModal: false,
  eventId: [],
  table: false,
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

function openEventData(id, index) {
  store.eventId = [id, index];
  store.eventModal = true;
}

const offsetMinutes = new Date().getTimezoneOffset();
const data = new Date(new Date().getTime() - offsetMinutes * 60 * 1000);
store.year = data.getFullYear();
store.month = data.getMonth();

function incMonth() {
  if (store.month == 11) {
    store.month = -1;
  }
  store.month += 1;
  getCalendar(store.year, store.month);
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
n
