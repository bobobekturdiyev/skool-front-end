<template>
  <main class="bg-white rounded-xl border">
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
      <button>event</button>
    </section>
    <section class="grid grid-cols-7 font-semibold">
      <div class="full_flex border h-9" v-for="i in weeks">{{ i }}</div>
    </section>
    <section>
      <div class="grid grid-cols-7" v-for="date in store.calendar">
        <div class="border h-[120px] px-4 py-[6px]" v-for="i in date">
          {{ i[1] }}
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "community",
});

import { Calendar } from "calendar";

const cal = new Calendar(1);
const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const store = reactive({
  calendar: [],
  year: "",
  month: "",
});

const offsetMinutes = new Date().getTimezoneOffset();
const data = new Date(new Date().getTime() - offsetMinutes * 60 * 1000);
store.year = data.getFullYear();
store.month = data.getMonth();
getCalendar(store.year, store.month);

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
  store.calendar = cal.monthDates(
    year,
    month,
    function (d) {
      console.log(d);
      store.startAndEndDate.push(d);
      return [d.getMonth(), (" " + d.getDate()).slice(-2)];
    },
    function (w) {
      return w;
    }
  );
}

onBeforeMount(() => {
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
