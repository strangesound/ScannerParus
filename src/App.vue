<template>
  <div id="app">


    <VideoScroller :scroll-position="scrollPosition" />


    <Transition>
      <MoveScannerOverlay v-if="isActive" />
    </Transition>


  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import VideoScroller from './components/VideoScroller.vue';
import MoveScannerOverlay from './components/MoveScannerOverlay.vue';
import state from './store.js'
const isActive = ref(true);

let timer = null;

const resetTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }

  isActive.value = false;

  timer = setTimeout(() => {
    isActive.value = true;
  }, 155000);
};

watch(() => state.currentValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    resetTimer();
  }
});

resetTimer();





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
  margin: 0;
  padding: 0;
  /* padding: 0 88px; */

}

.cv {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 5vw;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: bisque;
  opacity: .3;
  margin: 0;
  padding: 0;
}

.cv>p {
  margin: 0;
}

.plus {
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

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>