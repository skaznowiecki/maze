import Vue from 'vue'
import Router from 'vue-router'
import MazePage from '@/components/MazePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Maze',
      component: MazePage
    }
  ]
})
