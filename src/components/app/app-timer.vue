<script lang="ts" setup>
import { computed, ref } from "vue"

const mlsecInMin = 60000

let currentStep = ref(0)
const allSteps = [
  {
    title: "ЛЕТС ГОУУ!!!!",
    time: 0.1,
  },
  {
    title: "Отдых",
    time: 0.2,
  },
  {
    title: "Работаем. Метро Любюлино",
    time: 25,
  },
  {
    title: "Отдых",
    time: 5,
  },
  {
    title: "Ещё немножко братишка",
    time: 25,
  },
  {
    title: "Отдых",
    time: 5,
  },
  {
    title: "Последний рывок. Ты справишься!",
    time: 25,
  },
  {
    title: "Отдых",
    time: 5,
  },
  {
    title: "Длинный отдых",
    time: 15,
  },
]

const getCurrentStep = computed(() => allSteps[currentStep.value])

const showTime = ref(`${getCurrentStep.value.time}:00`)

function startTimer() {
  const currentTime = new Date(getCurrentStep.value.time * mlsecInMin)

  const timerInterval = setInterval(() => {
    showTime.value = new Date(
      currentTime.setSeconds(currentTime.getSeconds() - 1)
    ).toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    })

    if (currentTime.getTime() <= 0) {
      clearInterval(timerInterval)
      currentStep.value += 1
      showTime.value = `${getCurrentStep.value.time}:00`
    }
  }, 1000)
}
</script>

<template>
  <div class="clock">
    <div class="clock__step">{{ getCurrentStep.title }}</div>
    <div class="clock__self">{{ showTime }}</div>
    <button class="clock__button" @click="startTimer">Start</button>
  </div>
</template>

<style lang="scss" scoped>
.clock {
  display: flex;
  flex-direction: column;
  align-items: center;
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
