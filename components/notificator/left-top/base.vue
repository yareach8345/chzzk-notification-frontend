<template>
  <div class="p-2 border-4 rounded-lg w-full">
    <div class="text-lg font-bold">
      <slot name="title"/>
    </div>
    <div>
      <slot/>
    </div>
    <div class="space-y-2">
      <slot name="detail"/>
    </div>
  </div>
</template>