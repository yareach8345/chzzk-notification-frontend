<script setup lang="ts">

</script>

<template>
  <div class="h-full p-2 border-r border-chzzk-border bg-chzzk-black">
    <sidebar-login-info-view/>
    <hr class="my-3"/>
    <sidebar-page-nav-item
      title="메인페이지"
      page="index"
    >
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
      </template>
      Main Page
    </sidebar-page-nav-item>
    <sidebar-page-nav-item
        title="채널목록"
        page="channels"
    >
      <template #icon>
        <svg-tv-mini-play/>
      </template>
      Channels
    </sidebar-page-nav-item>
    <sidebar-page-nav-item
        title="장치목록"
        page="devices"
    >
      <template #icon>
        <svg-device/>
      </template>
      Devices
    </sidebar-page-nav-item>
    <sidebar-page-nav-item
        title="실시간 이벤트 보기"
        page="events-view"
    >
      <template #icon>
        <svg-log/>
      </template>
      Live Events
    </sidebar-page-nav-item>
  </div>
</template>

<style scoped>

</style>