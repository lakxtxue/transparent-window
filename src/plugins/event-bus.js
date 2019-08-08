import Vue from "vue";
const EventBus = new Vue();

function Message(message, options = {}) {
  EventBus.$emit("toast", {
    message: message,
    type: options.type || "error",
    timeout: 6 * 1000,
    showClose: options.showClose
  });
}
const colors = ["purple", "info", "success", "warning", "error"];
function createShorthands() {
  const shorthands = {};
  colors.forEach(
    color =>
      (shorthands[color] = (text, options = {}) => {
        options.type = color;
        Message(text, options);
      })
  );
  return shorthands;
}
const shorthands = createShorthands();

export { EventBus, Message, shorthands };
