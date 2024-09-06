<template>
    <div class="black-overlay">
        <img src="/images/scanner_pict.svg" alt="" class="scanner-move-pict">
        <img src="/images/letters.svg" alt="" class="letters">

    </div>
</template>

<script setup>

</script>

<style scoped>
.black-overlay {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: #000000b5;
}

.scanner-move-pict {
    width: 964px;
    margin-top: 1462px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    animation: moveHorisontal 2s infinite alternate ease-in-out;
}

.letters {
    position: absolute;
    margin-top: 2216px;
    width: 868px;
    margin-left: 50%;
    transform: translateX(-50%);

}

@keyframes moveHorisontal {
    0% {
        left: 40%;
    }

    100% {
        left: 60%;
    }
}
</style>