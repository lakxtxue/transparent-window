import Vue from "vue";
import { EventBus, shorthands, Message } from "./event-bus.js";

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function() {
      return EventBus;
    }
  },
  $message: {
    get: function() {
      return Message;
    }
  }
});
Object.keys(shorthands).forEach(key => {
  Vue.prototype["$" + key] = shorthands[key];
});
