import axios from "axios";
import store from "@/store";
import { EventBus } from "@/plugins/event-bus.js";

var CryptoJS = require("crypto-js");
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers["X-Device"] = store.getters.device; // "browser.165b754a6a5ntiqij7bq" 由设备类型 和 设备 ID 组成。
    let jsonStr = JSON.stringify(config.data);
    if (!jsonStr) {
      // 如果不存在就给一个空字符串
      jsonStr = "";
    }
    let beforeHashStr = jsonStr;
    let token = store.getters.token;
    if (token) {
      config.headers["X-Access-Token"] = token; // getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      beforeHashStr += token;
    }

    let md5Str = CryptoJS.MD5(beforeHashStr).toString();
    var ciphertext = encrypt(jsonStr, md5Str).toString();
    var wordArray = CryptoJS.enc.Utf8.parse(ciphertext + "." + md5Str);
    var base64 = CryptoJS.enc.Base64.stringify(wordArray);
    config.data = base64;
    // 默认都使用 json 提交
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错
     */
    const res = response.data;
    if (res.status !== 200) {
      EventBus.$error(res.message || res.error, {
        showClose: true
      });

      if (res.status === 401) {
        EventBus.$confirm(
          "确定登出",
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          {
            color: "warning"
          }
        ).then(() => {
          store.dispatch("user/FedLogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/FedLogOut').then(() => {
        //     location.reload()// 为了重新实例化vue-router对象 避免bug
        //   });
        // });
      }
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  error => {
    let message = error.message;
    let status = 0;
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
      status = error.response.status;
    }
    EventBus.$error(message, {
      showClose: true
    });
    if (status === 401) {
      EventBus.$confirm(
        "确定登出",
        "你已被登出，可以取消继续留在该页面，或者重新登录",
        {
          color: "warning"
        }
      ).then(() => {
        store.dispatch("user/FedLogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
      // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //     store.dispatch('user/FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     });
      // })
    }
    return Promise.reject(error);
  }
);

function encrypt(text, md5Str) {
  var key = md5Str.substring(0, 16);
  var iv = key;
  return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
}

function decrypt(text, md5Str) {
  var key = md5Str.substring(0, 16);
  var iv = key;
  var result = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return result.toString(CryptoJS.enc.Utf8);
}

export default service;
