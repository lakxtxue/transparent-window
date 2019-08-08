<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="info">
                <v-toolbar-title>登录代理商系统</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn href="#" icon large v-on="on">
                      <v-icon large>mdi-star-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>加入收藏夹</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large href="#" v-on="on">
                      <v-icon large>mdi-wechat</v-icon>
                    </v-btn>
                  </template>
                  <span>关注微信公众号</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <validation-observer ref="obs">
                  <input-text-field
                    label="邮箱/手机号码"
                    prepend-icon="mdi-account"
                    rules="required|max:40|emailOrMobile"
                    v-model="user.userName"
                    autocapitalize="off"
                    maxlength="40"
                  />
                  <input-text-field
                    label="密码"
                    prepend-icon="mdi-lock"
                    rules="required|max:40|min:8"
                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPwd ? 'text' : 'password'"
                    v-model="user.password"
                    autocapitalize="off"
                    autocomplete="off"
                    @click:append="showPwd = !showPwd"
                    maxlength="40"
                  />
                </validation-observer>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script type="text/ecmascript-6">
import { ValidationObserver } from "vee-validate";
import store from "@/store";

export default {
  name: "login",
  components: {
    ValidationObserver
  },
  data() {
    return {
      showPwd: false,
      user: {
        userName: "",
        password: ""
      },
      redirect: undefined
    };
  },

  computed: {},
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {},
  destroyed() {},
  methods: {
    login() {
      this.logging = true;
      this.$refs.obs.validate().then(result => {
        if (result) {
          store
            .dispatch("user/Login", this.user)
            .then(result => {
              if (result.status == 200) {
                this.$router.push({ path: this.redirect || "/" });
              }
            })
            .catch(() => {
              this.logging = false;
            });
        } else {
          this.logging = false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
