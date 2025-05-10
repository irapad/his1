<template>
  <HeaderComponent />
  <Sidebar />
  <Footer />
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    HeaderComponent,
    Footer,
    Sidebar,
  }
};
</script>

<style></style>