<template>
  <v-app
    class="ue-application"
    style="overflow:hidden;border-radius: 8px 30px 8px 8px;background-image: url(/static/images/192940fgo2og5zklgd27zn.jpg);
  background-size: 100% 100%;"
  >
    <div style="overflow:hidden;height:100vh;width:100vw;border-radius: 8px 30px 8px 8px;padding-top:0px;padding-bottom:0px;backdrop-filter: brightness(1) blur(50px);">
      <v-snackbar :color="color" top :timeout="timeout" v-model="snackbar">
        <v-icon v-if="toastIcon" color="white" class="mr-3">mdi-bell-plus</v-icon>
        <div>{{ message }}</div>
        <v-icon v-if="showClose" size="16" @click="snackbar = false">mdi-close-circle</v-icon>
      </v-snackbar>
      <common-confirm ref="confirm"></common-confirm>
      <router-view />
    </div>
  </v-app>
</template>
<script>
import Vue from "vue";
export default {
  components: {},
  data() {
    return {
      toastIcon: null,
      color: "info",
      snackbar: false,
      timeout: 6 * 1000,
      showClose: false,
      message: "hello world"
    };
  },
  mounted() {
    this.$bus.$on("toast", this.toast);
    Vue.prototype.$confirm = this.$refs.confirm.open;
  },
  methods: {
    toast(param) {
      if (param) {
        if (param.type) {
          this.color = param.type;
        }
        if (param.timeout) {
          this.timeout = param.timeout;
        }
        if (param.icon) {
          this.toastIcon = param.icon;
        }
        this.showClose = param.showClose;
        if (param.message) {
          this.message = param.message;
        }
      }
      this.snackbar = true;
    }
  }
};
</script>
<style lang="scss">
.ue-application {
  -webkit-app-region: drag;
  height: 100vh;
  width: 100vw;
}
</style>
