import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { checkAuth } from "../lib/api";
import pinia, { useTransactionStore, useUserStore } from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "Register" */ "../views/Register.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "Profile" */ "../views/Profile.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore(pinia);
  const transactionStore = useTransactionStore();
  transactionStore.setIsLoading(true);

  // Check if there is a user logged in
  if (!userStore.isLoggedIn) {
    await checkAuth().then(async (response) => {
      if (response.status === 200) {
        const user = await response.json();
        userStore.logUserIn(user);

        if (to.path === "/") {
          router.push("/dashboard");
        }
      } else {
        if (to?.meta?.requiresAuth) {
          router.push("/");
        }
      }
    });
  }

  transactionStore.setIsLoading(false);
});

export default router;
