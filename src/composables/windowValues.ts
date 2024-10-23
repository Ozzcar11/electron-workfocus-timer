import { computed } from "vue"

const width = computed(() => window.innerWidth)
const height = computed(() => window.innerHeight)

const centerX = computed(() => width.value / 2)
const centerY = computed(() => height.value / 2)



export { width, height, centerX, centerY }