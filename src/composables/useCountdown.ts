import { ref, onMounted, onUnmounted } from 'vue'

export function useCountdown(targetDate: string | Date) {
  const days = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)
  const isFinished = ref(false)
  
  let timer: ReturnType<typeof setInterval> | null = null

  function updateCountdown() {
    const now = new Date().getTime()
    const target = new Date(targetDate).getTime()
    const diff = target - now

    if (diff <= 0) {
      days.value = 0
      hours.value = 0
      minutes.value = 0
      seconds.value = 0
      isFinished.value = true
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      return
    }

    days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
  }

  function start() {
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    days,
    hours,
    minutes,
    seconds,
    isFinished,
    start,
    stop,
  }
}
