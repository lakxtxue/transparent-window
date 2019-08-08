<template>
<div>
      <Header></Header>
      <Viewport></Viewport>
      <!-- <Footer></Footer> -->
</div>
</template>

<script>
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Viewport from "@/layout/Viewport";
export default {
  components: {
    Header,
    Footer,
    Viewport
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
