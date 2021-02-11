import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    // {
    //     path: '/games',
    //     name: 'Games',
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/Games.vue')
    // },
    // {
    //     // path: '/:id',
    //     // name: 'CardShow',
    //     // component: () =>
    //     //     import ( /* webpackChunkName: "about" */ '../views/CardShow.vue'),
    //     // props: true

    // }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router