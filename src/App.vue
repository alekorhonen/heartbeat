<template>
  <div id="app">
    <Sidebar />
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
import Sidebar from '@/components/Sidebar'
import Player from '@/components/Player'

export default {
  name: 'App',
  components: {
    Player,
    Sidebar
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
