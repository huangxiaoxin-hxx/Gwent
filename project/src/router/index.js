import Vue from 'vue'
import VueRouter from 'vue-router'
import JoinGame from '../views/JoinGame'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'JoinGame',
    component: JoinGame
  },
  {
    path: '/battle',
    name: 'Battle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Battle/index.vue')
  },
  {
    path: '/selectCard',
    name: 'SelectCard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SelectCard/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
