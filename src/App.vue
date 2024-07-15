<template>
  <div id="app">


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
  height: 3840px;
  width: 2160px;
  overflow: hidden;
  /* padding: 0 88px; */

}

.cv{
  position: absolute;
  left: 0;
  top: 0;
  font-size: 5vw;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: bisque;
  opacity: .3;
}
.plus{
  font-size: 5vw;

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