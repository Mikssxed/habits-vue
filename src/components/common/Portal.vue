<script setup lang="ts"></script>

<template>
  <Teleport to="#portal">
    <div class="fixed top-0 left-0 z-10 h-screen w-screen">
      <div role="button" class="h-screen w-screen bg-black/50" />
      <slot />
    </div>
  </Teleport>
</template>
