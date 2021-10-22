import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias:"/users",
            name: "users",
            component: () => import("./components/UsersList")
        },

        {
            path: "/users/:id",
            name: "users-details",
            component: () => import("./components/Users")
        },

        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddUsers")
        }
    ]
});