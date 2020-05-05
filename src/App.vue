<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/HeartBeat.png" />
    </div>
    <div class="sidebar">
      <ul>
        <li class="user-nav-link" v-if="LoggedIn">
          <a href="#">
            <img v-bind:src="userPhoto" />
            {{ displayName }}
            <span class="anchor"><font-awesome-icon icon="chevron-down" /></span>
          </a>
        </li>
        <li class="title">Navigation</li>
        <li><router-link to="/"><font-awesome-icon icon="home" class="icon" />&nbsp; Home</router-link></li>
        <li><router-link to="/songs"><font-awesome-icon icon="music" class="icon" />&nbsp; Songs</router-link></li>
        <li><router-link to="/playlists"><font-awesome-icon icon="book" class="icon" />&nbsp; Library</router-link></li>
        <li class="title">Playlists</li>
        <li><router-link to="/#">House</router-link></li>
      </ul>
      <button class='btn'><font-awesome-icon icon='plus' style='margin-right: 10px'/>Add a new Playlist</button>
    </div>
    <div class="container">
      <div class="top-bar">
        <div class="user-nav right">
          <button class="login" @click="login" v-if="!LoggedIn">Login</button>
          <button class="login" @click="logout" v-if="LoggedIn">Logout</button>
        </div>
        <form class="search-form" @submit.prevent="search">
          <a 
            href="#" 
            class="clear-search" 
            v-if="searchQuery != ''" 
            :class="{active: clearSearchFocus}"
            @click="clearSearch">
            &times;
          </a>
          <input 
            type="text" 
            class="search-input" 
            v-model="searchQuery" 
            @focus="clearSearchFocus = true" 
            @blur="clearSearchFocus = false"
            placeholder="Search your library...">
        </form>
      </div>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
    </div>
    <Player />
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import Player from '@/components/Player'

export default {
  name: 'App',
  components: {
    Player
  },
  data() {
    return {
      searchQuery: '',
      clearSearchFocus: false,
      LoggedIn: false,
      displayName: null
    }
  },
  created() {
    // if(firebase.auth().currentUser) {
    //   this.LoggedIn = true
    //   this.displayName = firebase.auth().currentUser.displayName
    //   this.userPhoto = firebase.auth().currentUser.photoURL
    // }
  },
  methods: {
    clearSearch() {
      this.searchQuery = ''
    },
    login() {
      // var provider = new firebase.auth.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/youtube.readonly')
      // firebase.auth().useDeviceLanguage();
      // firebase.auth().signInWithRedirect(provider);
      // firebase.auth().getRedirectResult().then((result) => {
      //   console.log(result)
      //   if (result.credential) {
      //     // This gives you a Google Access Token. You can use it to access the Google API.
      //     var token = result.credential.accessToken;
      //   }
      // }).catch((error) => {

      // });

      this.$getGapiClient()
      .then(gapi => {
        this.getAuthInstance().signIn();
      })
    },
    logout() {
      // let that = this
      // firebase.auth().signOut().then(function() {
      //   that.LoggedIn = false
      // }).catch(function(error) {
      //   console.log(error.message)
      // });

      
    },
    search() {
      this.$getGapiClient()
      .then(gapi => {
        var request = gapi.client.youtube.search.list({
          part: '',
          type: 'video',
          q: encodeURIComponent(this.searchQuery).replace(/%20/g, '+'),
          maxResults: 3,
          order: 'viewCount'
        })

        //Execute request
        request.execute((response) => {
          console.log(response)
        })
      })
    }
  }
}
</script>

<style>
  @import "./assets/colors.css";
  @import "./assets/style.css";

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.1s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
