import { defineStore } from 'pinia'

export const useOnlineStore = defineStore('online', {
  state: () => ({
    online: true,
    timeSync: 0,
    idStore: 0,
  }),
  getters: {
    getTimeSync(state) {
      const timesync = process.client ? localStorage.getItem('timeSync') : null
      if (timesync !== undefined && timesync !== null)
        return parseInt(timesync)
      else
        return state.timeSync
    },
    getIdStore(state) {
      const idStore = process.client ? localStorage.getItem('idStore') : null
      if (idStore !== undefined && idStore !== null)
        return parseInt(idStore)
      else
        return state.idStore
    },
  },
  actions: {
    changeOnline(val: boolean) {
      this.online = val
    },
    setTimeSync(val: number) {
      localStorage.setItem('timeSync', val.toString())
      this.timeSync = val
    },
    setIdstore(val: number) {
      localStorage.setItem('idStore', val.toString())
      this.idStore = val
    },
    clear() {
      localStorage.removeItem('timeSync')
      localStorage.removeItem('idStore')
    },
  },
})
