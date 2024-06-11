<template>
    <div class="scroll-container">
        <div class="container" :style="{ transform: `translateX(${-scrollPosition}px)` }">
            <div class="background"></div>
            <div class="videos">
                <video v-for="i in 5" :key="i" :ref="setVideoRefs" :src="`/videos/parus_${i}.mp4`" muted loop></video>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import state from '../store.js'



const videoRefs = ref([]);

const scrollPosition = computed(() => {
    return Math.max(0, Math.min(state.currentValue, 5000));
});


const setVideoRefs = (el) => {
    if (el) {
        videoRefs.value.push(el);
    }
};

const options = {
    threshold: [0, 0.8] // Trigger at 0% and 80% visibility
};

const handleIntersect = (entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.intersectionRatio >= 0.8) {
            video.play();
        } else {
            if (entry.intersectionRatio === 0) {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
};

onMounted(() => {
    const observer = new IntersectionObserver(handleIntersect, options);
    videoRefs.value.forEach(video => {
        observer.observe(video);
    });
});

onUnmounted(() => {
    observer.disconnect();
});
</script>

<style scoped>
body,
html {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
}

.scroll-container {
    width: 100vw;
    height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
}

.container {
    position: relative;
    width: 597vw;
    height: 100%;
    transition: transform 0.5s ease-out;
    background-color: #05204f;
}

.background {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 79.765vh;
    background-image: url('/images/print.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center; /* Центрируем изображение */
    z-index: -1;
}

.videos {
    margin: 0 17.475vw;
    display: grid;
    grid-template-columns: repeat(5, 68.6fr);
    gap: 2.8%;
    opacity: .3;
}

video {
    width: 100vw;
    /* Ширина каждого видео равна ширине экрана */
    height: 100%;
}
</style>