import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home'
import Playlists from '@/pages/Playlists'
import Songs from '@/pages/Songs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: Playlists
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
  ]
})
