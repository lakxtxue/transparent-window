import Cookies from "js-cookie";
import * as Util from "@/utils";

const app = {
  namespaced: true,
  state: {
    language: Cookies.get("language") || "en",
    permissionData: "",
    dark: true
  },
  // mutations 不关心业务逻辑，只关心状态
  mutations: {
    SET_PERMISSION_LIST: (state, permissionData) => {
      state.permissionData = permissionData;
    },
    CHANGE_THEME: state => {
      state.dark = !state.dark;
    }
  },
  // actions 是业务逻辑
  actions: {
    SetPermissionData({ commit }) {
      return new Promise((resolve, reject) => {
        Util.getPermissionData()
          .then(result => {
            const data = result.data;
            commit("SET_PERMISSION_LIST", data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    ChangeTheme({ commit }) {
      commit("CHANGE_THEME");
    }
  }
};

export default app;
