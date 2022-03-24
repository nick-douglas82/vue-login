import { User, useUserStore } from '../store'
import router from '../router'
import defaultOptions from "./defaultOptions"

export type UserAuthResponse = {
  accessToken: string,
  user: User
}

export const logInUser = (email: string, password: string) => {
  const userStore = useUserStore();

  api<UserAuthResponse>('/auth/sign-in', {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({ email, password }),
  }).then(response => {
    const { accessToken, user } = response;
    userStore.logUserIn(accessToken, user)
    router.push('/dashboard')
  })
}

export const api = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const apiUrl = `${import.meta.env.VITE_DB_API}/api${url}`
  const response = await fetch(apiUrl, {
    ...init,
  })
  return await response.json()
}