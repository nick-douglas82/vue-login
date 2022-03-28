import { defineStore, createPinia } from "pinia";

const pinia = createPinia();

export default pinia;

export type User =
  | {
      name: string;
      email: string;
    }
  | {};

export type UserRootState = {
  isAuthenticated: boolean;
  user: User;
};

export const useUserStore = defineStore({
  id: "userStore",
  state: () =>
    ({
      isAuthenticated: false,
      user: {
        name: "",
        email: "",
      },
    } as UserRootState),

  actions: {
    logUserIn(user: User) {
      this.setAuthStatus(true);
      this.setUser(user);
    },
    logUserOut() {
      this.isAuthenticated = false;
      this.setUser({});
    },
    setAuthStatus(authStatus: boolean) {
      this.isAuthenticated = authStatus;
    },
    setUser(user: User) {
      this.user = user;
    },
  },
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },
});

export type ErrorRootState = {
  errors: Array<string>;
};

export const useErrorStore = defineStore({
  id: "errorStore",
  state: () =>
    ({
      errors: [],
    } as ErrorRootState),
  actions: {
    addError(error: string) {
      this.errors.push(error);
    },
    clearErrors() {
      this.errors = [];
    },
  },
  getters: {
    getErrors: (state) => state.errors,
    hasErrors: (state) => state.errors.length > 0,
  },
});
