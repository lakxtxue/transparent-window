<template>
  <v-content
    class="viewport" 
  >
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-content>
</template>
<script>
export default {
  name: "Viewport",
  data() {
    return {};
  },
  components: {},
  created() {}
};
</script>
<style lang="scss" scoped>
.viewport {
  // border:3px solid red;
  height: 100vh;
  // margin-top: 70px;
  position: absolute;
  width: 100vw;
}
</style>
