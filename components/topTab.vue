<template>
    <view class="uni-tab-bar" :style="'height:' + (showLine ? 70 : 50) + 'rpx'">
        <scroll-view class="uni-swiper-tab">
            <view class="tab-warapper">
                <view
                    class="swiper-tab-list"
                    :class="{'active' : tabIndex == index}"
                    @click="tabtap(index)"
                    v-for="(item, index) in tabBars"
                    :key="index"
                >
                    <text>{{ item }}</text>
                    <view
                        v-if="showLine"
                        :style="'background: ' + lineColor + ';'"
                        class="swiper-tab-line"
                    />
                </view>
            </view>
        </scroll-view>
    </view>
</template>
<script>
    export default {
        props: {
            tabBars: Array,
            tabIndex: Number,
            scrollStyle: {
                type: String,
                default: ""
            },
            scrollItemStyle: {
                type: String,
                default: ""
            },
            showLine: {
                type: Boolean,
                default: false
            },
            lineColor: {
                type: String,
                default: "#2b9f60"
            }
        },
        methods: {
            //点击切换导航
            tabtap(index) {
                this.$emit("tabtap", index);
            }
        }
    };
</script>　

<style>
    .tab-warapper {
        flex-direction: row;
        align-items: baseline;
    }
    .swiper-tab-list {
        color: #999;
        font-size: 32rpx;
        margin-right: 77rpx;
        transition: all 0.3s;
    }
    .uni-tab-bar .active {
        color: #000;
        font-size: 40rpx;
    }
    .active .swiper-tab-line {
        width: 100%;
        margin-top: 16rpx;
        height: 4rpx;
        border-radius: 20rpx;
    }
</style>
