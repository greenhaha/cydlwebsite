<template>
  <div class="app-footer w-full">
    HLYM CS2 ©2026 Created by HLYMCN
    <br />
    <a href="https://beian.miit.gov.cn/" target="_blank">辽ICP备19004490号-1</a>
  </div>
</template>

<style scoped>
.app-footer {
  text-align: center;
  padding: 16px;
  font-size: 12px;
  color: var(--theme-footer-text);
  background: var(--theme-footer-bg);
  backdrop-filter: blur(12px);
}

.app-footer a {
  color: var(--theme-footer-link);
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}
</style>
