import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
import contact from "../components/contact.vue"
import about from "../components/about.vue"
import searchedResults from "../components/book/searchedResults.vue"


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: home
  },

  {
    path: '/searchedResults',
    name: 'searchedResults',
    component: searchedResults
  },
  {
    path: '/about',
    name: 'about',
    component: about
  }, {
    path: '/contact',
    name: 'contact',
    component: contact
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router