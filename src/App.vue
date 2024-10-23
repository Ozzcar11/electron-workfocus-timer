<script setup lang="ts">
import { computed, ref } from "vue"
import { throttle } from "@/utils/throttle"
import { centerX, centerY } from "./composables/windowValues"

import AppTimer from "@/components/app/app-timer.vue"

const mouseDegrees = ref<number>(0)

const getStringMouseDegress = computed(() => `${mouseDegrees.value}deg`)

const backgroundRotation = throttle((event: MouseEvent) => {
  const deltaX = event.clientX - centerX.value
  const deltaY = event.clientY - centerY.value

  mouseDegrees.value = (Math.atan2(deltaY, deltaX) * 180) / Math.PI - 90
}, 50)
</script>

<template>
  <div class="timer" @mousemove="backgroundRotation">
    <div class="timer__wrapper">
      <div class="timer__title">WORKFOCUS</div>
      <app-timer />
    </div>
  </div>
</template>

<style lang="scss">
.timer {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0;
  background-image: linear-gradient(
    v-bind(getStringMouseDegress),
    hsl(279deg 46% 34%) 0%,
    hsl(266deg 41% 29%) 0%,
    hsl(254deg 35% 25%) 1%,
    hsl(242deg 31% 20%) 5%,
    hsl(231deg 25% 15%) 16%,
    hsl(216deg 19% 10%) 100%
  );

  &__wrapper {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    position: relative;
    color: white;
    text-align: center;
    font-size: 60px;
    font-weight: 600;
    margin: 20px 0;
    cursor: default;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      display: block;
      width: 100%;
      height: 2px;
      background-color: white;
      transform: scale(0, 1);
      transition: transform 0.5s ease;
    }

    &:hover::before {
      transform: scale(1, 1);
    }
  }
}
</style>
