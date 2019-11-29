<template>
    <web-view :src="url" />
</template>

<script>
    export default {
        data() {
            return {
                url: ""
            };
        },
        onLoad(options) {
            this.url = options.url;
        }
    };
</script>

<style>
</style>