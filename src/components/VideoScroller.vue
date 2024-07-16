<template>
    <div>
        <!-- <div class="cv">

            <p class="">{{ state.currentValue }}</p>
            <p class="">{{ Math.round(scrollPosition) }}</p>
        </div> -->

        <div ref="scrollContainer" class="scroll-container">
            <div class="container" :style="{ transform: `translateX(${-scrollPosition}px)`, width: `${totalWidth}px` }">
                <!-- <img :src="`/images/back_${scannerType}.jpg`" alt="" class="background"> -->
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



const scannerType = 'podvodny';

// console.log('scannerConfig[scannerType]', scannerConfig[scannerType]);
// console.log('encoderWidth', scannerConfig[scannerType].encoderWidth);




const scrollPosition = computed(() => {
    // console.log('totalWidth.value/10', Math.max(0, Math.min(state.totalWidth/state.encoderWidth, totalWidth.value - 2160)));
    return calculateScrollPosition()
    // return Math.max(0, Math.min(state.currentValue * state.totalWidth/state.encoderWidth, totalWidth.value - 2160));
});

const video = ref(null);
const videoOpacity = ref(0);
const currentVideo = ref('');
const videoSources = ref([]);
const zoneWidth = ref(0);
const gap = ref(0);
const padding = ref(0);
const totalWidth = ref(0);

const scrollContainer = ref(null);
const containerWidth = scrollContainer?.clientWidth;


const loadConfig = (scannerType) => {
    const config = scannerConfig[scannerType];
    zoneWidth.value = config.zoneWidth;
    gap.value = config.gap;
    padding.value = config.padding;
    totalWidth.value = config.totalWidth;
    videoSources.value = config.videos;
};

const mapValue = (value, inMin, inMax, outMin, outMax) => {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

const calculateScrollPosition = () => {
    return mapValue(state.currentValue, 0, scannerConfig[scannerType].encoderWidth, 0, scannerConfig[scannerType].totalWidth - 2160);
};

const onScroll = () => {
    // const scrollLeft = scrollPosition.value;
    // const paddingValue = padding.value;
    // const zoneWidthValue = zoneWidth.value;
    // const gapValue = gap.value;

    // // Включаем паддинги в расчет начала и конца зон
    // let adjustedScrollLeft = scrollLeft - paddingValue;
    // let currentIndex;

    // if (scannerType.value === 'bronenosny') {
    //     // Учитываем gap после второй зоны
    //     if (adjustedScrollLeft > (2 * zoneWidthValue + paddingValue)) {
    //         adjustedScrollLeft -= gapValue;
    //     }
    //     currentIndex = Math.floor(adjustedScrollLeft / zoneWidthValue);
    // } else {
    //     currentIndex = Math.floor(adjustedScrollLeft / zoneWidthValue);
    // }

    // let startZone = (currentIndex * zoneWidthValue) + paddingValue;
    // if (scannerType.value === 'bronenosny' && currentIndex >= 2) {
    //     startZone += gapValue;
    // }
    // const endZone = startZone + zoneWidthValue;

    // if (adjustedScrollLeft >= startZone && (adjustedScrollLeft + containerWidth) <= endZone) {
    //     currentVideo.value = videoSources.value[currentIndex];
    //     videoOpacity.value = 0;
    //     // console.log('currentVideo.value', currentVideo.value, 'opacity 1');
    // } else {
    //     videoOpacity.value = 0;
    //     // console.log('currentVideo.value', currentVideo.value, 'opacity 0');
    // }
    // calculateCurrentIndex()
    // handleVideoChange()
};


const calculateCurrentIndex = () => {
    const scrollLeft = scrollPosition.value;
    const paddingValue = padding.value;
    const zoneWidthValue = zoneWidth.value;
    const gapValue = gap.value;

    let adjustedScrollLeft = scrollLeft - paddingValue;
    let currentIndex;

    currentIndex = Math.floor(adjustedScrollLeft / zoneWidthValue);

    console.log('currentIndex befor', currentIndex);
    const startZone = currentIndex * zoneWidthValue + paddingValue;
    const endZone = startZone + zoneWidthValue;
    const midZone = (startZone + endZone) / 2;

    console.log(startZone, endZone, midZone);

    if (adjustedScrollLeft > (currentIndex * zoneWidthValue + paddingValue + zoneWidthValue / 2)) {
        currentIndex += 1;
    }

    if (currentIndex < 0) {
        return 0
    }
    if (currentIndex > videoSources.value.length - 1) {
        return videoSources.value.length - 1
    }

    return currentIndex;
};



const handleVideoChange = (newIndex) => {
    if (currentVideo.value !== videoSources.value[newIndex]) {
        videoOpacity.value = 0;
        setTimeout(() => {
            currentVideo.value = videoSources.value[newIndex];
            videoOpacity.value = 1;
        }, 500); // Должно совпадать с transition-duration в CSS
    }
};





onMounted(() => {


    loadConfig(scannerType);

    console.log('loadConfig',
        zoneWidth.value,
        gap.value,
        padding.value,
        totalWidth.value,
        videoSources.value
    );


    watch(scrollPosition, () => {
        const newIndex = calculateCurrentIndex();
        handleVideoChange(newIndex);
    });

    handleVideoChange(calculateCurrentIndex())
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
