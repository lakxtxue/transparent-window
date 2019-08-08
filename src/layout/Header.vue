<template>
<div style="border-radius: 8px 30px 0px 0px;">
    <v-system-bar window dark>
      <v-icon>mdi-message</v-icon>
      <span>10 unread messages</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-window-minimize</v-icon>
      <v-icon>mdi-window-maximize</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "nav-header",
  computed: {
    ...mapState("menu", ["header"])
  },
  data() {
    return {
      isFullscreen: false,
      logo: "./static/logo.png",
      responsive: false,
      responsiveInput: false
    };
  },
  methods: {
    changeTheme() {
      this.$store.dispatch("app/ChangeTheme");
      this.$vuetify.theme.dark = this.$store.getters.dark;
      const fs = require("fs");
      fs.readdir("/", (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
      });
    },
    logout() {
      this.$confirm("确认退出当前用户？", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        cancelButtonClass: "cancelButton",
        type: "info"
      }).then(() => {
        this.$store.dispatch("user/LogOut").then(() => {
          // 登出后跳转到登录页面
          this.$router.push("/refresh");
        });
      });
    },
    screenMode(isFullscreen) {
      // 为 true 应该切换为全屏
      let el = document.getElementById("app");
      this.FullScreen(el, isFullscreen);
    },
    FullScreen(el, isFullscreen) {
      if (!isFullscreen) {
        //退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (!document.msRequestFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        //进入全屏
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#core-toolbar {
  // z-index:99999;
  //
  &.dark-theme {
    background-color: #1a1a1a;
  }
  .v-badge__badge {
    height: 12px;
    width: 12px;
    min-width: 12px;
    line-height: 15px;
    font-size: 12px;
    margin: 0px auto;
  }
  .v-badge--overlap .v-badge__badge {
    top: -5px;
    right: -5px;
  }
}
#core-toolbar .items .v-btn {
  text-decoration: none;
  margin-left: 20px;
  // color: $footer-border-color;
  &:hover,
  &:focus,
  &:active {
    color: $brand-primary !important;
  }
}
.logout-btn {
  color: $black-color;
}
.header-links {
  color: $brand-primary !important;
}
.theme--dark.v-btn.v-btn--icon {
  color: $footer-border-color;
}
// .v-btn{
//     color: $brand-primary !important;
// }
</style>
