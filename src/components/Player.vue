<template>
  <div class="audioplayer">
    <div class="song-details">
      <div class="image">
        <img src="https://files.musicmp3.ru/mcovers/alm79337.jpg" width="100%" height="100%" />
      </div>
      <div class="song-name">
        Bitch don't kill my vibe<br />
        <span class="artist-names">Kendrick Lamar, Dr. Dre</span>
      </div>
    </div>
    <div class="song-control-wrapper">
      <audio id='audio_box' ref="audio" @timeupdate='onTimeUpdateListener'>
        Audio tag not supported in this browser
      </audio>
      <div class="song-controls">
        <div class="control-buttons">
          <button class="stepBackward"><font-awesome-icon icon="backward" /></button>
          <button class="playButton" v-bind:class="{ pause: playing }" @click="playPause">
            <font-awesome-icon icon="play-circle" v-if="!playing" />
            <font-awesome-icon icon="pause-circle" v-if="playing" />
          </button>
          <button class="stepForward"><font-awesome-icon icon="forward" /></button>
        </div>
        <span class="currentTime">{{ fmtMSS(currentSecond) }}</span>
        <span class="totalTime">{{ fmtMSS(duration) }}</span>
        <vue-slider 
          ref="timeSlider" 
          v-model="currentSecond" 
          v-bind="songSliderOptions" 
          @drag-end="dragEnd" 
          @drag-start="dragStart" 
          @click.native="clickedValue"
          @mouseover="songSliderActive = true" 
          @mouseleave="songSliderActive = false">
        </vue-slider>
      </div>
    </div>
    <div class="volume-control">
      <font-awesome-icon icon="volume-up" class="icon" v-if="!muted" @click="mute" />
      <font-awesome-icon icon="volume-mute" class="icon" v-if="muted" @click="mute" />
      <vue-slider ref="volumeSlider" v-model="volume" v-bind="volumeSliderOptions"></vue-slider>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
  name: 'Player',
  components: {
    vueSlider
  },
  data() {
    return {
      volume: 25,
      muted: false,
      audio: null,
      lastVol: 50,
      playing: false,
      sliderBeingDragged: false,
      currentSecond: 0,
      duration: 0,
      songSliderOptions: {
        tooltip: false,
        height: 4,
        width: '100%',
        bgStyle: {
          "backgroundColor": "rgba(255, 255, 255, 0.2)"
        },
        processStyle: {
          "backgroundColor": "var(--primaryColor)"
        },
        speed: 0
      },
      volumeSliderOptions: {
        height: 4,
        tooltip: false,
        max: 100,
        min: 0,
        interval: 0.1,
        bgStyle: {
          "backgroundColor": "rgba(255, 255, 255, 0.2)"
        },
        processStyle: {
          "backgroundColor": "var(--primaryColor)"
        },
        speed: 0
      },
      searchQuery: null
    }
  }, 
  watch: {
    'volume': function(newVal) {
      this.$refs.audio.volume = newVal / 100
      if(this.$refs.audio.volume === 0) {
        this.muted = true;
      } else {
        this.muted = false;
      }
    },
    'songSliderActive': function() {
      document.body.onkeydown = function(e) {
        if(e.keyCode == 39){
          if(this.currentSecond < this.duration) {
            this.currentSecond++
            this.$refs.audio.currentTime = this.currentSecond
          }
        } else if(e.keyCode == 37) {
          if(this.currentSecond > 0) {
            this.currentSecond--
            this.$refs.audio.currentTime = this.currentSecond
          }
        }
      }
    }
  },
  methods: {
    fmtMSS(s) {
      return(s-(s%=60))/60+(9<s?':':':0')+s
    },
    playPause() {
      this.songSliderOptions.max = this.duration

      
      if(!this.playing) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }

      this.playing = !this.playing;
    },
    onTimeUpdateListener: function() {
      // Update current time
      this.songSliderOptions.max = this.duration
      if(!this.sliderBeingDragged) {
        this.currentSecond = Math.floor(this.$refs.audio.currentTime)
      }
      this.duration = Math.floor(this.$refs.audio.duration)
    },
    dragEnd() {
      this.sliderBeingDragged = false
      this.$refs.audio.currentTime = this.currentSecond
    },
    dragStart() {
      this.sliderBeingDragged = true
    },
    clickedValue() {
      this.$refs.audio.currentTime = this.currentSecond
    },
    mute() {
      if(this.volume > 0) {
        this.lastVol= volume 
        this.volume = 0
      } else {
        this.volume = this.lastVol
      }
    }
  },
  mounted() {
    let that = this
    if(this.audio == null) {
      this.$refs.audio.src = '../assets/compton.mp3'
      this.$refs.audio.controls = false
      this.$refs.audio.autoplay = false
      this.$refs.audio.volume = this.volume / 100

      this.$refs.audio.onended = function() {
          that.playing = false
          that.currentSecond = 0
          this.pause()
      }
    }

    
    document.body.onkeyup = function(e) {
      if(e.keyCode == 32){
        that.playPause()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
