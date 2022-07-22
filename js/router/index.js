import console from '@/components/console'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/console',
    name: 'console',
    component: console
  }
 ]
})