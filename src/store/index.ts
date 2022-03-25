import { defineStore, createPinia } from "pinia";

const pinia = createPinia()

export default pinia;

export type User = {
  name: string,
  email: string,
}

export type UserRootState = {
  isAuthenticated: boolean,
  user: User,
  accessToken: string
};

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isAuthenticated: false,
    user: {
      name: '',
      email: '',
    },
    accessToken: ''
  } as UserRootState),

  actions: {
    logUserIn(token: string, user: User) {
      this.setAuthStatus(true)
      this.assignJWTToken(token)
      this.setUser(user)
    },
    logUserOut() {
      this.isAuthenticated = false
      this.assignJWTToken('')
      this.setUser({ name: '', email: '' })
    },
    setAuthStatus(authStatus: boolean) {
      this.isAuthenticated = authStatus
    },
    assignJWTToken(token: string) {
      this.accessToken = token
    },
    setUser(user: User) {
      this.user = user
    }
  },
  getters: {
    jwtToken: (state) => state.accessToken,
    isLoggedIn: (state) => state.isAuthenticated,
    getUser: (state) => state.user
  }
})

export type ErrorRootState = {
  errors: Array<string>
};

export const useErrorStore = defineStore({
  id: 'errorStore',
  state: () => ({
    errors: []
  } as ErrorRootState),
  actions: {
    addError(error: string) {
      this.errors.push(error)
    },
    clearErrors() {
      this.errors = []
    }
  },
  getters: {
    getErrors: (state) => state.errors,
    hasErrors: (state) => state.errors.length > 0
  }
})