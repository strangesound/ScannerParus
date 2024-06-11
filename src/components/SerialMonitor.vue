<template>
  <div>
    <div class="cv">{{ state.currentValue }}</div>
  </div>
</template>

<script setup>
import state from '../store.js'

</script>

<style scoped>
.cv {
  font-size: 10vw;
}
</style>