import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: "/auth",
            name: "auth",
            component: () => import("@/views/Auth.vue"),
        }
    ],
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !await firebase.getCurrentUser()) {
        next('auth');
    } else {
        next();
    }
});

export default router;