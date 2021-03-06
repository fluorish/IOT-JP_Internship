// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import Colors from 'vuetify/es5/util/colors'
import Vuefire from 'vuefire'
import VueRouter from 'vue-router'
import VueParticles from 'vue-particles'
import AsyncComputed from 'vue-async-computed'
import 'vuetify/dist/vuetify.min.css'

import { routes } from './router/index'
import { store } from './components/state/index'
import { auth } from './config/firebase'

import Alert from './components/shared/Alert.vue'
import Snackbar from './components/shared/Snackbar.vue'
import { ScalingSquaresSpinner  } from 'epic-spinners'

Vue.use(Vuefire)
Vue.use(VueRouter)
Vue.use(VueParticles)
Vue.use(AsyncComputed);

Vue.use(Vuetify, {
  theme: {
    primary: Colors.cyan.darken2,
    secondary: Colors.teal.accent2,
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.config.productionTip = false

const router = new VueRouter({
	mode: 'history',
	routes,
});

Vue.component('app-alert', Alert)
Vue.component('snack-bar', Snackbar)
Vue.component('app-spinner', ScalingSquaresSpinner)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    auth.onAuthStateChanged( user =>{
      if(user){
        console.log('App login')
        this.$store.dispatch('autoSign', user)
      }else{
        console.log('App logout')
        this.$router.push({name: 'Authentication'})
      }
    })
  }
})
