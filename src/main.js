import Vue from "Vue";
import VueRouter from "vue-router";
import App from "./App";
import router from "./router";

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router,
}).$mount("#app");