<script setup lang="ts">
import { RouterView } from 'vue-router';
import Footer from './components/Layout/Footer.vue';
import HeaderMenu from './components/Layout/HeaderMenu.vue';
</script>

<template>
  <n-config-provider preflight-style-disabled>
    <n-space vertical size="large">
      <n-layout>
        <n-layout-header class="n-layout-header absolute top-0 left-0 right-0 z-1">
          <div class="w-full flex align-middle "><HeaderMenu /></div>
          
          <!-- <div><RouterLink to="/">Home</RouterLink></div>
          <div><RouterLink to="/about">About</RouterLink></div> -->
          </n-layout-header>
        <n-layout-content >
          <RouterView />
        </n-layout-content>
        <n-layout-footer class="absolute bottom-0 left-0 right-0"><Footer /></n-layout-footer>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<script lang="ts">
import { NButton } from 'naive-ui';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    NButton,
  },
})
</script>
<style scoped>
.n-layout-header {
  height: 64px;
    padding: 0 50px;
    color: #fff;
    line-height: 64px;
    background: #ebebeb;
  width: 100vw;
  display: flex;
}

n-layout-footer {
  text-align: center;
  padding: 16px;
  display: flex;
}

n-layout-content {
  background-color: #fff;
  min-height: calc(100vh - 64px);
}
n-layout {
  min-height: 100vh;
  
}
</style>
