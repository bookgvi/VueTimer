import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { routes } from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
