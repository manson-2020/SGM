<template>
    <view class="root bg-f9">
        <view class="article color-666 fs26 mlr40 mt10">{{ about.content }}</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                about: {}
            };
        },
        created() {
            uni.apiRequest("/api/User/about", {
                success: res => (this.about = res.data.result)
            });
        }
    };
</script>

<style>
</style>