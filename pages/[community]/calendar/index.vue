<template>
  <main class="bg-white rounded-xl border">
    <div v-if="!store.table">
      <section class="flex items-center justify-between p-4">
        <button>Today</button>
        <div class="full_flex text-center gap-2">
          <img
            @click="decMonth"
            class="h-7 w-7 hover:bg-gray-200 rounded-full rotate-180 cursor-pointer p-2"
            src="@/assets/svg/calendar_arrow.svg"
            alt=""
          />
          <div>
            <h1 class="font-bold">February 2024</h1>
            <p>1:17pm Tashkent time</p>
          </div>
          <img
            @click="incMonth"
            class="h-7 w-7 hover:bg-gray-200 rounded-full cursor-pointer p-2"
            src="@/assets/svg/calendar_arrow.svg"
            alt=""
          />
        </div>
        <button @click="store.table = true">table</button>
      </section>
      <section class="grid grid-cols-7 font-semibold">
        <div class="full_flex border h-9" v-for="i in weeks">{{ i }}</div>
      </section>
      <section>
        <div class="grid grid-cols-7" v-for="date in store.calendar">
          <div class="border h-[120px] px-4 py-[6px]" v-for="i in date">
            {{ i[1] }}
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
        <div class="flex items-center text-center gap-2 py-5">
          <img
            @click="decMonth"
            class="h-7 w-7 hover:bg-gray-200 rounded-full rotate-180 cursor-pointer p-2"
            src="@/assets/svg/calendar_arrow.svg"
            alt=""
          />
          <img
            @click="incMonth"
            class="h-7 w-7 hover:bg-gray-200 rounded-full cursor-pointer p-2"
            src="@/assets/svg/calendar_arrow.svg"
            alt=""
          />
          <div>
            <h1 class="font-bold">February 2024</h1>
          </div>
        </div>
        <button @click="store.table = false">calendar</button>
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
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { useEventStore } from "@/store";
import { Calendar } from "calendar";

const useEvent = useEventStore();
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
