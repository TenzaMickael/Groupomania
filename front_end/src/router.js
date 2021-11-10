import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [

        // USERS //

        {
            path: '/signup',
            name: 'add-users',
            component: () => import('./components/AddUsers')
        },

        {
            path: '/',
            alias:'login',
            name: 'users-connection',
            component: () => import('./components/Users')
        },

        {
            path: '/all-users',
            name : 'all-users',
            component: () => import('./components/UsersList')
        },

        {
            path: '/modify-user',
            name: 'modify-user',
            component: () => import('./components/Users')
        },

        {
            path: '/delete-user',
            name: 'delete-user',
            component: () => import('./components/Users')
        },


        // POSTS //
        {
            path : '/create-post',
            name: 'create-post',
            component: () => import('./components/AddPosts')
        }, 

        {
            path: '/all-posts',
            name: 'all-posts',
            component: () => import ('./components/PostsList')
        },

        {
            path: '/post/:id',
            name: 'one-post',
            component: () => import ('./components/Posts')
        },

        {
            path: '/modify-post/:id',
            name : 'modify-post',
            component: () => import ('./components/updatePost')
        },

        {
            path : '/delete-post',
            name : 'delete-post',
            component: () => import ('./components/Posts')
        },


        // COMMENTS //
        {
            path : '/create-comment',
            name: 'create-comment',
            component: () => import('./components/AddPosts')
        }, 

        {
            path: '/all-comments',
            name: 'all-comments',
            component: () => import ('./components/CommentsList')
        },

        {
            path: '/one-comment',
            name: 'one-comment',
            component: () => import ('./components/Comments')
        },

        {
            path: '/modify-comment',
            name : 'modify-comment',
            component: () => import ('./components/Comments')
        },

        {
            path : '/delete-comment',
            name : 'delete-comment',
            component: () => import ('./components/Comments')
        }
      
    ]
});