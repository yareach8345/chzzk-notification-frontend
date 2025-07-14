<script setup lang="ts">

</script>

<template>
  <div class="h-full p-2 border-r border-chzzk-border bg-chzzk-black z-50">
    <sidebar-login-info-view/>
    <hr class="my-3"/>
    <sidebar-page-nav-item
      title="메인페이지"
      page="index"
    >
      <template #icon>
        <svg-home/>
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