<template>
    <view>
        <view class="swiperContent">
            <swiper
                @change="change"
                @animationfinish="animationfinish"
                :indicator-dots="indicatorDots"
                :indicator-active-color="indicatorActiveColor"
                :indicator-color="indicatorColor"
                :autoplay="(autoplay && flag)"
                :current="current"
                :interval="interval"
                :duration="duration"
                :circular="circular"
                :vertical="vertical"
                :previous-margin="previousMargin"
                :next-margin="nextMargin"
                :display-multiple-items="displayMultipleItems"
                :skip-hidden-item-layout="skipHiddenItemLayout"
                :style="{'height':swiperHeight+'rpx'}"
                :class="(swiperType && displayMultipleItems ==1 && !vertical && !fullScreen)?'cardSwiper':'' "
                class="screen-swiper"
            >
                <swiper-item
                    class="swiper-item"
                    v-for="(item,index) in swiperList"
                    :key="index"
                    :class="(cardCur==index && displayMultipleItems ==1 && !vertical &&  !fullScreen)?'cur':''"
                    @click="clickItem(index)"
                >
                    <view v-if="item[imageKey] && !item[videoKey]">
                        <image :src="item[imageKey]" :style="{'height':swiperHeight+'rpx'}" />
                    </view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
    export default {
        name: "bw-swiper",
        props: {
            fullScreen: {
                // 是否全屏
                type: Boolean,
                default: false
            },
            swiperList: {
                // 滑块视图容器数据
                type: Array,
                default: []
            },
            swiperType: {
                // false => 全屏限高轮播图 true => 卡塔式轮播图
                type: Boolean,
                default: false
            },
            videoAutoplay: {
                // true =>自动播放
                type: Boolean,
                default: false
            },
            videoKey: {
                // 视频映射的键
                type: String,
                default: "src"
            },
            imageKey: {
                //  图片映射的键
                type: String,
                default: "img"
            },
            textKey: {
                //   文字说明映射的键
                type: String,
                default: "text"
            },
            textTip: {
                // 图片文字说明 false => 隐藏
                type: Boolean,
                default: false
            },
            textStyleSize: {
                // 图片文字大小
                type: Number,
                default: 24
            },
            textStyleBottom: {
                // 图片文字位置
                type: Number,
                default: 5
            },
            textStyleRight: {
                // 图片文字位置
                type: Number,
                default: 5
            },
            textStyleColor: {
                // 图片文字颜色
                type: String,
                default: "#ffffff"
            },
            textStyleBgcolor: {
                // 图片文字背景色
                type: String,
                default: "transparent"
            },
            w_h: {
                //宽高比 推荐 w/h => 2
                type: Number,
                default: 2
            },
            skipHiddenItemLayout: {
                //是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
                type: Boolean,
                default: false
            },
            displayMultipleItems: {
                //同时显示的滑块数量
                type: Number,
                default: 1
            },
            nextMargin: {
                // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 头条小程序不支持
                type: String,
                default: "0px"
            },
            previousMargin: {
                //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值头条小程序不支持
                type: String,
                default: "0px"
            },
            vertical: {
                //滑动方向是否为纵向 卡牌  不支持纵向以及同时显示的2块以上滑块数量
                type: Boolean,
                default: false
            },
            circular: {
                // 是否采用衔接滑动
                type: Boolean,
                default: true
            },
            duration: {
                // 滑动动画时长
                type: Number,
                default: 400
            },
            interval: {
                // 自动切换时间间隔
                type: Number,
                default: 2500
            },
            current: {
                // 当前所在滑块的 index
                type: Number,
                default: 0
            },
            autoplay: {
                // 是否自动切换
                type: Boolean,
                default: true
            },
            indicatorColor: {
                // 指示点颜色
                type: String,
                default: "#CCCCCC"
            },
            indicatorActiveColor: {
                // 当前选中的指示点颜色
                type: String,
                default: "#ffffff"
            },
            indicatorDots: {
                // 是否显示面板指示点
                type: Boolean,
                default: true
            },
            swiperHeight: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                flag: true,
                cardCur: 0,
                inde: 0,
                im: []
            };
        },

        methods: {
            play: function() {
                this.flag = false;
            },
            pause: function() {
                this.flag = true;
            },
            clickItem: function(index) {
                if (this.swiperList.length > 0) {
                    this.$emit("clickItem", this.swiperList[index]);
                }
            },
            change: function(e) {
                this.$emit("change", e);
                this.inde = e.detail.current;
            },
            animationfinish: function(e) {
                this.cardCur = e.detail.current;
                this.$emit("animationfinish", e);
            }
        }
    };
</script>

<style>
    .www {
        width: 25%;
        height: 50rpx;
    }
    .images {
        height: 100rpx;
    }
    .img {
        display: flex;
    }
    .tu {
        width: 40rpx;
        height: 40rpx;
    }

    .cardSwiper .swiper-item {
        width: 89% !important;
        overflow: initial;
    }

    .screen-swiper cardSwiper {
        height: 600rpx !important;
    }
    .cardSwiper .swiper-item view {
        width: 100%;
        display: block;
        height: 100%;
        border-radius: 10rpx;
        transform: scale(0.93, 0.8);
        /* opacity: 0.7; */
        transition: all 0.1s ease-in 0s;
        overflow: hidden;
        box-sizing: border-box;
        margin-left: 30rpx;
    }
    .cardSwiper .cur view {
        transform: initial;
        opacity: 1;
        transition: all 0.3s;
    }
    .swiper-item view {
        height: 100%;
        width: 100%;
        position: relative;
    }
    .swiperText {
        position: absolute;
        color: #ffffff;
        z-index: 2;
        border-radius: 4rpx;
    }
    .screen-swiper image {
        width: 100%;
    }
    .screen-swiper video,
    .swiper-item video {
        width: 100%;
        display: block;
        height: 100%;
    }
    .swiperContent {
        width: 100%;
    }
    .images {
        width: 200rpx;
        height: 20rpx;
        margin-left: 30rpx;
    }
    .hih {
        width: 100rpx;
        height: 20rpx;
        background: rgba(153, 153, 153, 1);
        border-radius: 10rpx;
        line-height: 20rpx;
    }
    .cake {
        display: flex;
        width: 90%;
        margin: 0 5%;
        text-align: center;
        line-height: 10rpx;
        margin-top: 40rpx;
    }
    .ooop {
        margin-left: 40rpx;
        line-height: 100rpx;
        margin: 0 atuo;
    }
</style>
