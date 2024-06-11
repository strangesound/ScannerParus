<template>
  <div id="app">
    <div class="cv">{{ state.currentValue }}</div>


    <VideoScroller :scroll-position="scrollPosition" />
    <!-- <div class="controls">
      <button @click="scrollLeft">Left</button>
      <button @click="scrollRight">Right</button>
    </div> -->
    <!-- <div class="temp">{{ scrollPosition }}</div> -->

  </div>
</template>

<script setup>

import { ref } from 'vue';
import VideoScroller from './components/VideoScroller.vue';
// import SerialMonitor from './components/SerialMonitor.vue';
import state from './store.js'

// const scrollPosition = ref(0);

// const scrollLeft = () => {
//   if (scrollPosition.value > 0) {
//     scrollPosition.value -= window.innerWidth;



//   }
// };

// const scrollRight = () => {
//   if (scrollPosition.value < window.innerWidth * 4) {
//     scrollPosition.value += window.innerWidth;

//     console.log('window.innerWidth', window.innerWidth);
//     console.log('window.innerWidth', window.innerWidth);

//   }
// };
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
  padding: 0;
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