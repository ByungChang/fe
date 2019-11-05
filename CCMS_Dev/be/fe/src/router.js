import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import( './views/Board.vue')
    },
    {
      path: '/company',
      name: 'company',
<<<<<<< HEAD
      component: () => import( './views/company.vue')
      
=======
      component: () => import( './views/company.vue'),
>>>>>>> df031a02d4863d4d37e78da808bb3a5404330257
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import( './views/Profile.vue')
    },
    {
      path: '/userManagement',
      name: 'userManagement',
      props:true,
      component: () => import( '@/components/userComponents/userManagement.vue')
    },
    {
      path: '/snackbar',
      name: 'snackbar',
      component: () => import( '@/components/userComponents/ConfirmSnackBar.vue')
    },
    
    {
      path: '*',
      name: 'e404',
      component: () => import( './views/e404.vue')
    },
  ]
})
