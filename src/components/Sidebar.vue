<template>
    <div class="sidebar">
      <ul>
            <li class="brand-name">
                <img src="../assets/HeartBeat.png" />
            </li>
            <li class="title">Navigation</li>
            <li><router-link to="/"><font-awesome-icon icon="home" class="icon" />&nbsp; Home</router-link></li>
            <li><router-link to="/songs"><font-awesome-icon icon="music" class="icon" />&nbsp; Songs</router-link></li>
            <li><router-link to="/playlists"><font-awesome-icon icon="book" class="icon" />&nbsp; Library</router-link></li>
            <li class="title">Playlists</li>
            <li><router-link to="/#">House</router-link></li>
            <li><button @click="open"><font-awesome-icon icon='plus' style='margin-right: 10px'/>Add a new Playlist</button></li>
        </ul>
    </div>
</template>

<script>
import Modal from '@/components/modals/new-playlist'
export default {
    methods: {
        open() {
            this.$modal.show(Modal, {
                text: 'This text is passed as a property'
            })
        }
    }
}
</script>