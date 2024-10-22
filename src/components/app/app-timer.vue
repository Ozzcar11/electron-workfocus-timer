<script lang="ts" setup>
import { computed, ref } from "vue"
import {
  longBreakConfig,
  baseBreackConfig,
  longBreakStep,
  mlsecInMin,
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

const showTime = ref<string>(`${getCurrentStep.value.time}:00`)

function startTimer() {
  const currentTime: Date = new Date(getCurrentStep.value.time * mlsecInMin)

  const timerInterval = setInterval(() => {
    if (currentTime.getTime() <= 0) {
      clearInterval(timerInterval)

      if (currentStep.value !== availableSteps.length - 1) {
        currentStep.value++
      } else {
        currentStep.value = 0
        allSteps.value++
      }

      showTime.value = `${getCurrentStep.value.time}:00`
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
    <div class="clock__step">{{ getCurrentStep.title }}</div>
    <div class="clock__self">{{ showTime }}</div>
    <div class="">{{ allSteps }}</div>
    <button class="clock__button" @click="startTimer">Start</button>
  </div>
</template>

<style lang="scss" scoped>
.clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #ffffff11;
  border-radius: 15px;
  padding: 20px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ffffff22;
  }

  &__self {
    font-size: 60px;
    font-weight: 700;
    color: #fff;
  }
  &__button {
    padding: 12px 24px;
    font-size: 18px;
  }
}
</style>
