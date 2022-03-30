import { useErrorStore, useUserStore, useTransactionStore } from "../store";
import router from "../router";
import defaultOptions from "./defaultOptions";

export const checkAuth = async () => {
  const userStore = useUserStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  return await fetch(`${import.meta.env.VITE_DB_API}/api/auth`, {
    method: "POST",
    ...defaultOptions,
  });

  // if (response.status >= 200 && response.status <= 299) {
  //   const user = await response.json();
  //   userStore.logUserIn(user);
  //   router.push("/dashboard");
  //   transactionStore.setIsLoading(false);
  // } else {
  //   const responseBody = await response.json();
  //   userStore.setAuthStatus(responseBody.body.auth);
  //   transactionStore.setIsLoading(false);
  // }
};

export const logInUser = async (email: string, password: string) => {
  const userStore = useUserStore();
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_DB_API}/api/auth/sign-in`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({ email, password }),
  });

  if (response.status >= 200 && response.status <= 299) {
    const user = await response.json();
    userStore.logUserIn(user);
    router.push("/dashboard");
    transactionStore.setIsLoading(false);
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
    transactionStore.setIsLoading(false);
  }
};

export const createNewUser = async (email: string, name: string, password: string) => {
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_DB_API}/api/auth/register`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({ email, name, password }),
  });
  if (response.status >= 200 && response.status <= 299) {
    await response.json();
    router.push("/");
    transactionStore.setIsLoading(false);
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
    transactionStore.setIsLoading(false);
  }
};

export const logOutUser = async () => {
  const userStore = useUserStore();
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_DB_API}/api/auth/sign-out`, {
    method: "POST",
    ...defaultOptions,
  });

  if (response.status >= 200 && response.status <= 299) {
    const user = await response.json();
    userStore.logUserOut();
    router.push("/");
    transactionStore.setIsLoading(false);
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
    transactionStore.setIsLoading(false);
  }
};
