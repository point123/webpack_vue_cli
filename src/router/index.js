import VueRouter from "vue-router";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/home",
            component: () => import("../views/Home/index.vue"),
        },
        {
            path: "/about",
            component: () => import("../views/About/index.vue"),
        }
    ]
})