import type { Step } from "@/types/step";

export const baseWorkConfig: Step = {
  title: "Time to focus!",
  time: 1,
}

export const baseBreackConfig: Step = {
  title: "Отдых",
  time: 1,
}

export const longBreakConfig: Step = {
  title: "Длинный отдых",
  time: 1,
}

export const millisecondsInMinutes = 60000
export const longBreakStep = 4