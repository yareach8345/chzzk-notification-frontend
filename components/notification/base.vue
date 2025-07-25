<template>
  <div class="absolute z-50 right-0 top-0 p-2 border-4 rounded-lg w-96">
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