<template>
  <v-footer id="core-footer" :inset="false" app height="82">
    <v-spacer />
    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="tertiary--text footer-links">{{
          link.name
        }}</a>
      </span>
    </div>

    <span class="font-weight-light copyright">
      &copy;
      {{ new Date().getFullYear() }}
      
    </span>
    <v-spacer />
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      links: [
        { name: "主页", Link: "/" },
        { name: "官网", Link: "https://www.creative-tim.com" },
        { name: "关于我们", Link: "https://creative-tim.com/presentation" },
        { name: "功能建议", Link: "https://blog.creative-tim.com" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
