<template>
    <view class="root">
        <video id="video" :src="videoSrc" autoplay @fullscreenchange="goBack" />
    </view>
</template>

<script>
    export default {
        data() {
            return {
                videoSrc: ""
            };
        },
        methods: {
            goBack(e) {
                if (!e.detail.fullScreen) {
                    uni.navigateBack();
                }
            }
        },
        onReady(res) {
            uni.createVideoContext("video").requestFullScreen({direction: 0});
        },
        onLoad(options) {
            this.videoSrc = options.src;
        }
    };
</script>

<style>
    .root {
        justify-content: center;
        align-items: center;
        background: #000;
    }
</style>