<template>
  <div class="p-2 border-2 rounded-lg w-full flex items-center justify-center gap-2">
    <div class="font-bold">
      <slot name="title"/>
    </div>
    <div>
      <slot/>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>