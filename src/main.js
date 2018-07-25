// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Core
import Vue from 'vue'
import router from './router'
import VueLocalStorage from 'vue-localstorage'
import moment from 'moment'
import money from 'v-money'
import VueSweetAlert2 from 'vue-sweetalert2'

// CSS Template Object
import Vuetify from 'vuetify'

// CSS Additional
import 'vuetify/dist/vuetify.min.css'
//import '../static/fonts/fonts.css'


import colors from 'vuetify/es5/util/colors'

// Vuex
import { store } from './store/store'

// Layout
import App from './App'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// using
Vue.use(Vuetify, {
    theme: {
        primary: colors.blue.darken4,
        

    }
})
Vue.use(VueAxios, axios)
Vue.use(VueLocalStorage, {
    name: 'ls'
})
Vue.use(money);
Vue.use(VueSweetAlert2);

Vue.prototype.moment=moment
Vue.config.productionTip = false

/* filter global */
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('uppercase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
})

Vue.filter('lowercase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toLowerCase()
})

Vue.filter('number', function (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
   

/* eslint-disable no-new */
new Vue({
    store: store,
    el: '#app',
    router,
    components: { App },
    template: '<App />'
})
