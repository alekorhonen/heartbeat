import Vue from 'vue'
import firebase from 'firebase';
import VueGAPI from "vue-gapi";
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faHome, faBook, faMusic, faPlayCircle, faPauseCircle, faBackward, faForward, faVolumeUp, faVolumeMute, faChevronLeft, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add({faPlus, faHome, faBook, faMusic, faPlayCircle, faPauseCircle, faBackward, faForward, faVolumeUp, faVolumeMute, faChevronLeft, faChevronRight, faChevronDown })
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(firebase) 

Vue.config.productionTip = false

let app = '';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBNY5k5zx0xz7WNONNkCymNeM72tCqwh84",
  authDomain: "client-dd43d.firebaseapp.com",
  databaseURL: "https://client-dd43d.firebaseio.com",
  projectId: "client-dd43d",
  storageBucket: "client-dd43d.appspot.com",
  messagingSenderId: "267952330576"
};
firebase.initializeApp(config);

//Initialize Gapi
const apiConfig = {
  apiKey: "AIzaSyAXMFSWuGx4Y8OF1B6IUrUBrpxvHUMnEqA",
  clientId: "267952330576-tr90lrtt5e83mectb0chq2qb7j26o993.apps.googleusercontent.com",
  scope: "https://www.googleapis.com/auth/youtube.readonly"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

Vue.use(VueGAPI, apiConfig)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});