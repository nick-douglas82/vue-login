import { useErrorStore, useUserStore, useTransactionStore } from "../store";
import router from "../router";
import defaultOptions from "./defaultOptions";

export const checkAuth = async () => {
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  return await fetch(`${import.meta.env.VITE_DB_API}/api/auth`, {
    method: "POST",
    ...defaultOptions,
  });
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
    userStore.logUserIn(user.user);
    router.push("/dashboard");
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
  transactionStore.setIsLoading(false);
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
    router.push("/");
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
  transactionStore.setIsLoading(false);
};

export const updateUser = async (name: string, email: string, id: number) => {
  const userStore = useUserStore();
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();

  transactionStore.setIsLoading(true);

  const response = await fetch(`${import.meta.env.VITE_DB_API}/api/auth/account/${id}`, {
    method: "PATCH",
    ...defaultOptions,
    body: JSON.stringify({ email, name }),
  });
  if (response.status >= 200 && response.status <= 299) {
    const user = await response.json();
    userStore.logUserIn(user);
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
  transactionStore.setIsLoading(false);
};

export const deleteUserAccount = async () => {
  const userStore = useUserStore();
  const errorStore = useErrorStore();
  const transactionStore = useTransactionStore();
  transactionStore.setIsLoading(true);
  const response = await fetch(`${import.meta.env.VITE_DB_API}/api/auth/delete/${userStore.user.id}`, {
    method: "DELETE",
    ...defaultOptions,
  });
  if (response.status >= 200 && response.status <= 299) {
    userStore.logUserOut();
    router.push("/");
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
  transactionStore.setIsLoading(false);
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
  } else {
    errorStore.addError(`Error logging in: ${await response.text()}`);
  }
  transactionStore.setIsLoading(false);
};
