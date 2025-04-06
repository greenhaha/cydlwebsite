<script setup lang="ts">
</script>

<template>
  <main>
    <div class="absolute inset-0 w-full h-full">
      <div class="pointer-events-none absolute inset-0">
        <video src="../assets/bg/hecheng1.mp4" muted autoplay="true" class="w-full h-full bg-cover bg-center min-w-full min-h-full object-cover globalVideo" loop="true" preload="metadata" transition="all duration-100 cubic-bezier(.4,0,.2,1)"></video>
      </div>
    </div>
    <div class="home-grass pointer-events-none absolute inset-0 z-0"></div>
    <div class="absolute inset-0 w-full h-full top-[-140px]  z-0  flex flex-col items-center justify-center">
      <n-h1 class="text-[48px]">HLYM CS2 社区服务器</n-h1>
      <n-h5 class="text-[24px]  ">面向所有CS2玩家的公益服务器，所有内容均免费！</n-h5>
    </div>
  </main>
</template>

<style scoped>
.home-grass{
  background: linear-gradient(180deg, hsla(0, 0%, 100%, .4), #f5f5f5);
}
</style>
