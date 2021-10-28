import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [

        {
            path: '/',
            alias:'login',
            name: 'users-connection',
            component: () => import('./components/Users')
        },


        {
            path: '/signup',
            name: 'add-users',
            component: () => import('./components/AddUsers')
        },

        {
            path: '/posts',
            name: 'add-posts',
            component: () => import('./components/AddPosts')
        },

        {
            path: '/comments',
            name: 'add-comments',
            component: () => import('./components/AddComments')
        }

       /* {
            path: "/",
            alias:"/users",
            name: "users-list",
            component: () => import("./components/UsersList")
        },

      */
      
    ]
});