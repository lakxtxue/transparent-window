import Vue from "vue";
import VueRouter from "vue-router";
// 路由数据
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(() => {});
export default router;
