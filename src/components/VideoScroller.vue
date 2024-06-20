<template>
    <div>
        <div class="scroll-container">
            <div class="container" :style="{ transform: `translateX(${-scrollPosition}px)`, width: `${totalWidth}px` }">
                <img :src="`/images/back_${scannerType}.jpg`" alt="" class="background">
                <!-- :src="`back_${scannerType}.jpg`" -->
            </div>
        </div>
        <video ref="video" :src="currentVideo" muted autoplay loop :style="{ opacity: videoOpacity }"></video>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import state from '../store.js';
import scannerConfig from '@/assets/json/scannerConfig.json';
// console.log(scannerConfig);

const scannerType = 'bronenosny';

const scrollPosition = computed(() => {
    console.log('totalWidth.value/10', Math.max(0, Math.min(state.currentValue * 10, totalWidth.value / 10)));
    return Math.max(0, Math.min(state.currentValue * 10, totalWidth.value - 2160));
});

const video = ref(null);
const videoOpacity = ref(0);
const currentVideo = ref('');
const videoSources = ref([]);
const zoneWidth = ref(0);
const gap = ref(0);
const padding = ref(0);
const totalWidth = ref(0);

const loadConfig = (scannerType) => {
    const config = scannerConfig[scannerType];

    zoneWidth.value = config.zoneWidth;
    gap.value = config.gap;
    padding.value = config.padding;
    totalWidth.value = config.totalWidth;
    videoSources.value = config.videos;
};


const onScroll = () => {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollLeft = scrollPosition.value;
    const containerWidth = scrollContainer.clientWidth;
    const paddingValue = padding.value;
    const zoneWidthValue = zoneWidth.value;
    const gapValue = gap.value;

    // Включаем паддинги в расчет начала и конца зон
    let adjustedScrollLeft = scrollLeft - paddingValue;
    let currentIndex;

    if (scannerType.value === 'bronenosny') {
        // Учитываем gap после второй зоны
        if (adjustedScrollLeft > (2 * zoneWidthValue + paddingValue)) {
            adjustedScrollLeft -= gapValue;
        }
        currentIndex = Math.floor(adjustedScrollLeft / zoneWidthValue);
    } else {
        currentIndex = Math.floor(adjustedScrollLeft / zoneWidthValue);
    }

    let startZone = (currentIndex * zoneWidthValue) + paddingValue;
    if (scannerType.value === 'bronenosny' && currentIndex >= 2) {
        startZone += gapValue;
    }
    const endZone = startZone + zoneWidthValue;

    if (adjustedScrollLeft >= startZone && (adjustedScrollLeft + containerWidth) <= endZone) {
        currentVideo.value = videoSources.value[currentIndex];
        videoOpacity.value = 1;
        console.log('currentVideo.value', currentVideo.value, 'opacity 1');
    } else {
        videoOpacity.value = 0;
        console.log('currentVideo.value', currentVideo.value, 'opacity 0');
    }
};


// Следим за изменением scrollPosition и вызываем onScroll при изменениях
watch(scrollPosition, () => {
    onScroll();
});

onMounted(() => {
    loadConfig(scannerType);
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
}

.container {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: #05204f;
    transition: transform 0.5s ease-out;
}

.background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    object-fit: cover;
    /* z-index: 0; */
}

video {
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    transition: opacity 1s;
    z-index: 5;
    pointer-events: none;
}
</style>
