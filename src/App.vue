<script setup lang="ts">
import AppTimer from "./components/app/app-timer.vue"
</script>

<template>
  <div class="timer">
    <div class="timer__wrapper">
      <div class="timer__title">WorkFocus - Timer</div>
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
  background-color: rgb(57, 87, 77);

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    color: white;
    text-align: center;
    font-size: 60px;
    font-weight: 600;
    text-decoration: underline;
  }
}
</style>
