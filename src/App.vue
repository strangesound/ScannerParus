<template>
  <div id="app">
    <div class="cv">{{ state.currentValue }}</div>


    <VideoScroller :scroll-position="scrollPosition" />


  </div>
</template>

<script setup>

import VideoScroller from './components/VideoScroller.vue';
import state from './store.js'

</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  /* padding: 0 88px; */

}

.controls {
  position: fixed;
  bottom: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
}


.temp {
  font-size: 5vw;
  position: absolute;
  left: 0;
  top: 0;
  background-color: black;
  padding: 1vw;
  z-index: 100;
}

.cv {
  font-size: 10vw;
  position: absolute;
  top: 0;
  z-index: 999;
}


</style>