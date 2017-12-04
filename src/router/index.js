import Vue from 'vue'
import Vuerouter from 'vue-router'

Vue.use(Vuerouter)
const Goods = resolve => {
  import('@/components/goods/goods').then((module) => {
    resolve(module)
  })
}
const Ratings = resolve => {
  import('@/components/ratings/ratings').then((module) => {
    resolve(module)
  })
}
const Seller = resolve => {
  import('@/components/seller/seller').then((module) => {
    resolve(module)
  })
}
export default new Vuerouter({
  routes: [
    {path: '/', redirect: {path: '/goods'}},
    {path: '/goods', name: 'goods', component: Goods},
    {path: '/ratings', name: 'ratings', component: Ratings},
    {path: '/seller', name: 'seller', component: Seller}
  ]
})
