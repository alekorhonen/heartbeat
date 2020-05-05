import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faHome, faBook, faMusic, faPlayCircle, faPauseCircle, faBackward, faForward, faVolumeUp, faVolumeMute, faChevronLeft, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add({faPlus, faHome, faBook, faMusic, faPlayCircle, faPauseCircle, faBackward, faForward, faVolumeUp, faVolumeMute, faChevronLeft, faChevronRight, faChevronDown })
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')