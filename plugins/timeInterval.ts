export default defineNuxtPlugin(() => {
  let timeRun = 0
  const store = useOnlineStore()
  window.setInterval(async () => {
    const timeSinc = store.timeSync
    const idStore = store.idStore
    if (timeSinc > 0) {
      if (store.online) {
        if ((timeRun % timeSinc) === 0)
          await useSynchron(idStore)

        timeRun++
      }
    }
  }, 60000)
})
