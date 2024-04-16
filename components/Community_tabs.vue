<template>
  <nav class="max-w-[100vw] overflow-hidden overflow-x-auto">
    <el-tabs class="min-w-fit"
      v-model="store.activeName"
      @click="handleClick"
    >
      <el-tab-pane label="Community" name=""></el-tab-pane>
      <el-tab-pane label="Classroom" name="classroom"></el-tab-pane>
      <el-tab-pane label="Calendar" name="calendar"></el-tab-pane>
      <el-tab-pane label="Members" name="members"></el-tab-pane>
      <el-tab-pane label="Leaderboards" name="leaderboards"></el-tab-pane>
      <el-tab-pane label="About" name="about"></el-tab-pane>
    </el-tabs>
  </nav>
</template>

<script setup>

const router = useRouter();
const store = reactive({
  activeName: "first",
});

// watch(() => store.activeName, () => {
//     console.log(store.activeName);
// })

const handleClick = (tab, event) => {
//   console.log(tab, event);
  console.log(store.activeName);
  router.push(`/${router.currentRoute.value.params.community}/${store.activeName}`)
};

onBeforeMount(() => {
  console.log(router.currentRoute.value.name?.split('-')[1]);
  const route_name = router.currentRoute.value.name?.split('-')[1];
  if (route_name) {
    store.activeName = route_name;
  }else {
    store.activeName = ""
  }
})
</script>

<style lang="scss" scoped></style>
