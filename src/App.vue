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
  methods: {
    clearSearch() {
      this.searchQuery = ''
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
