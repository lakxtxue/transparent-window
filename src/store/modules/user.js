// import { login, logout, getUserInfo } from '@/views/user/api/UserInfoApi'
import { getToken, setToken, removeToken } from "@/utils/auth";
import Cookies from "js-cookie";
import Fingerprint from "fingerprintjs";
let fingerprint = new Fingerprint({ canvas: true }).get();

const user = {
  namespaced: true,
  state: {
    device: "browser." + fingerprint,
    userInfo: {},
    status: "",
    code: "",
    token: getToken(),
    surName: ""
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      state.device = "browser." + fingerprint;
      // 在 cookies 里也放一份设备信息
      Cookies.set("device", state.device);
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_SURNAME: (state, surName) => {
      state.surName = surName;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    }
  },

  actions: {
    // SetToken({ commit }, token){
    //   commit('SET_TOKEN', token);
    //   setToken(token);
    // },
    // 用户名登录
    Login({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        login(loginData)
          .then(result => {
            const data = result.data;
            commit("SET_TOKEN", data.tokenId);
            setToken(data.tokenId);
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            if (!response.data) {
              reject(response);
            }
            const data = response.data;
            commit("SET_SURNAME", data.surName);
            commit("SET_USER_INFO", data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit("SET_TOKEN", "");
            removeToken();
            commit("SET_SURNAME", "");
            commit("SET_USER_INFO", "");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        commit("SET_SURNAME", "");
        commit("SET_USER_INFO", "");
        resolve();
      });
    }
  }
};

export default user;
