import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",

    routes: [
        {
           path: "/",
           alias: "/posts",
           name:"posts",
           Component: () => import("./components/PostsList") 
        },

        {
            path: "/posts/:id",
            name : "post-details",
            component: () => import("./components/Post")
        },

        {
            path:"/add",
            name: "add",
            component: () => import("./components/AddPost")
        }
    ]
});