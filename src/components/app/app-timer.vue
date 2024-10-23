<script lang="ts" setup>
import { computed, ref } from "vue"
import { getProperStringTime } from "@/utils/getProperStringTime"
import {
  longBreakConfig,
  baseBreackConfig,
  longBreakStep,
  millisecondsInMinutes,
  baseWorkConfig,
} from "@/constants/timerConfig"

import type { Step } from "@/types/step"

let currentStep = ref<number>(0)
let allSteps = ref<number>(1)

const breakHandler = computed<Step>(() =>
  allSteps.value % longBreakStep === 0 ? longBreakConfig : baseBreackConfig
)

const availableSteps: Step[] = [
  baseWorkConfig,
  {
    get title() {
      return breakHandler.value.title
    },
    get time() {
      return breakHandler.value.time
    },
  },
]

const getCurrentStep = computed<Step>(() => availableSteps[currentStep.value])

const showTime = ref<string>(getProperStringTime(getCurrentStep.value.time))

function startTimer() {
  const currentTime: Date = new Date(
    getCurrentStep.value.time * millisecondsInMinutes
  )

  const timerInterval = setInterval(() => {
    if (currentTime.getTime() <= 0) {
      clearInterval(timerInterval)

      if (currentStep.value !== availableSteps.length - 1) {
        currentStep.value++
      } else {
        currentStep.value = 0
        allSteps.value++
      }

      showTime.value = getProperStringTime(getCurrentStep.value.time)
      return
    }

    showTime.value = new Date(
      currentTime.setSeconds(currentTime.getSeconds() - 1)
    ).toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    })
  }, 1000)
}
</script>

<template>
  <div class="clock">
    <div class="clock__title">{{ getCurrentStep.title }}</div>
    <div class="clock__self">{{ showTime }}</div>
    <div class="clock__step">#{{ allSteps }}</div>
    <button class="clock__button" @click="startTimer">START</button>
    <button class="clock__skip" @click="currentStep++">SKIP</button>
  </div>
</template>

<style lang="scss" scoped>
.clock {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #ffffff11;
  border-radius: 15px;
  padding-top: 32px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ffffff22;
  }

  &__title {
    font-size: 34px;
    font-weight: 700;
    background: linear-gradient(
      145deg,
      hsl(293deg 47% 67%) 0%,
      hsl(309deg 51% 65%) 29%,
      hsl(320deg 62% 64%) 43%,
      hsl(328deg 71% 63%) 57%,
      hsl(334deg 78% 61%) 71%,
      hsl(339deg 82% 59%) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__self {
    font-size: 94px;
    font-weight: 700;
    color: #fff;
  }

  &__step {
    font-size: 24px;
    font-weight: 700;
    color: #ffffff67;
  }

  &__skip {
    position: absolute;
    right: 20px;
    top: calc(50% - 15px);
    transform: translateY(-50%);
    border-radius: 50%;
    width: 42px;
    height: 42px;
    border: 0;
    cursor: pointer;
  }

  &__button {
    color: #000000ff;
    font-size: 32px;
    font-weight: 700;
    margin-top: 20px;
    padding: 12px 24px;
    width: 100%;
    border: 0;
    border-radius: 0 0 15px 15px;
    cursor: pointer;
    &:hover {
      color: #000000ff;
    }
  }
}
</style>
