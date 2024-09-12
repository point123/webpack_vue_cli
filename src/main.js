import Vue from "Vue";
import VueRouter from "vue-router";
import App from "./App";
import router from "./router";

Vue.use(VueRouter);

var x;

new Vue({
    render: h => h(App),
    router,
}).$mount("#app");