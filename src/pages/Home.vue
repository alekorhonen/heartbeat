<template>
    <div class="home">
        <h1>Recently played</h1>
        <div id="grid">
            <div class="col">
                <img src="https://files.musicmp3.ru/mcovers/alm79337.jpg" class="album-cover" />
                <div class="album-details">
                    <span class="album-title">Good Kid, M.A.A.D City 123123123</span>
                    <span class="album-artist">Kendrick Lama333333333333333333r</span>
                </div>
            </div>
            <div class="col">
                <img src="https://files.musicmp3.ru/mcovers/alm79337.jpg" class="album-cover" />
                <div class="album-details">
                    <span class="album-title">Good Kid, M.A.A.D City</span>
                    <span class="album-artist">Kendrick Lamar</span>
                </div>
            </div>
        </div>
        <div v-if="artists.length > 0">
            <h2>Artists</h2>
            <ul class="search-items">
                <li v-for="(artist, index) in artists" v-bind:key="index">{{ artist.name }} &nbsp;<small class="shadow-text">in Artists</small></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            artists: [],
        }
    }
}
</script>

<style scoped>
    h1 {
        font-size: 2.3asdasdasasasem;
        margin: 0;
        margin-left: 10px;
        margin-bottom: 10px;
    }

    #grid .col {
        display: inline-block;
        padding: 0;
        width: 180px;

        margin: 10px;

        border-radius: 2px;

        cursor: pointer;
        transition: all 0.3s ease;
    }

    #grid .col:hover {
        background: rgba(224, 31, 61, 0.7);
    }

    #grid .col .album-cover {
        display: block;
        width: 160px;
        margin: 10px auto;

        border-radius: 2px;
    }

    #grid .col .album-details {
        padding: 0 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    #grid .col .album-title {
        font-weight: 600;
    }

    #grid .col .album-artist {
        display: block;
        font-size: 12px;
        padding: 10px 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
