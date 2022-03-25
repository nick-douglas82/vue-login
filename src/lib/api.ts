import { useErrorStore, User, useUserStore } from '../store'
import router from '../router'
import defaultOptions from "./defaultOptions"


export const logInUser = async (email: string, password: string) => {
  const userStore = useUserStore();
  const errorStore = useErrorStore();

  const response = await fetch(`${import.meta.env.VITE_DB_API}/api/auth/sign-in`, {
    method: 'POST',
    ...defaultOptions,
    body: JSON.stringify({ email, password })
  });
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    userStore.logUserIn(jsonResponse.accessToken, jsonResponse.user);
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
}

// export const api = async <T>(url: string, init?: RequestInit): Promise<T> => {
//   const response = await apiResponse(url, init);
//   return await response.json();
// }

// const buildHttpError = async (response: Response): Promise<ApiError> => {
//   const responseText = await response.text();

//   const error = new Error(responseText) as ApiError;

//   error.name = `${response.status} ${response.statusText}`;
//   error.status = response.status;

//   return error;
// };

// export const apiResponse = async (url: string, init?: RequestInit): Promise<Response> => {
//   const apiUrl = `${import.meta.env.VITE_DB_API}/api${url}`;

//   const response = await fetch(apiUrl, {
//     ...init,
//   });

//   if (!response.ok) {
//     return response
//   }

//   return response;
// };
