import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/signup",
            name: "add-users",
            component: () => import("./components/AddUsers")
        },

        {
            path: "/",
            alias:"/users",
            name: "users-list",
            component: () => import("./components/UsersList")
        },

        {
            path: "/users/login",
            name: "users-details",
            component: () => import("./components/Users")
        },

      
    ]
});