<script setup>
import { onMounted } from 'vue'
import Header from '../components/Layouts/Header.vue'
import Aside from '../components/Layouts/Aside.vue'
import Footer from '../components/Layouts/Footer.vue'


onMounted(() => {
  var scripts = [
    "/src/assets/js/vendor.js",
    "/src/assets/js/script.js"
  ];

  setTimeout(function(){
    scripts.forEach(script => {
      let tag = document.createElement("script")
      tag.setAttribute("src", script)
      tag.setAttribute("async",'')
      document.body.appendChild(tag)
    });
  },1000)

})
</script>
<template>
    <div class="warpper">
      <Header />
      <Aside />
      <main class="workspace">
        <RouterView />
        <!-- <Footer /> -->
      </main>
    </div>
</template>

<script>
export default {
  name: 'AdminLayout',
}
</script>

<style lang="less" scoped>
.warpper{
  position: relative;
  display: flex;
  min-height: 100vh;
}
</style>
