import type { Step } from "@/types/step";

export const baseWorkConfig: Step = {
  title: "Time to focus!",
  time: 25,
}

export const baseBreackConfig: Step = {
  title: "Short break",
  time: 5,
}

export const longBreakConfig: Step = {
  title: "Long Break",
  time: 15,
}

export const millisecondsInMinutes = 60000
export const longBreakStep = 4