<template>
    <view class="root bg-f9">
        <scroll-view scroll-y class="article color-666 fs28 mlr40">
            <parser :html="about.content" />
        </scroll-view>
    </view>
</template>

<script>
    import parser from "@/components/jyf-Parser/index";
    export default {
        components: { parser },
        data() {
            return {
                about: {}
            };
        },
        created() {
            uni.apiRequest("/api/User/about", {
                success: res => {
                    res.data.result.content = res.data.result.content.replace(
                        ` src="`,
                        ` src="${uni.requestUrl}`
                    );
                    this.about = res.data.result;
                }
            });
        }
    };
</script>

<style>
    .article {
        padding-top: 10rpx;
        width: auto;
        height: 0;
        flex: 1;
    }
</style>