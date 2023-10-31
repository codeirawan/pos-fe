import { defineStore } from 'pinia'
import IAuthForm from 'interfaces/Auth/IAuthForm'

const userLoginFormInitialValue = {
  phone: '1234',
  password: 'admin'
} as IAuthForm

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userLoginForm: Object.assign({}, userLoginFormInitialValue)
  }),
  getters: {
    getSelectedStore(): any | null {
      const { data } = useAuth()
      if (data.value) {
        return data.value!.stores[0];
      }
      return null;
    }
  }
})