<template>
    <view class="root bg-f9">
        <view class="status" />
        <view class="header">
            <navigator class="icon-search" url="/pages/search" hover-class="navigator-hover">
                <image class="icon-search" src="/static/icon-search.png" />
            </navigator>
            <view class="drop-down" @click="dropDown">
                <text class="fs30">{{ dynamicName }}</text>
                <image class="icon-down_black" src="/static/icon-down_black.png" />

                <view
                    class="drop-down-menu fs30 text-center"
                    :style="isShowMenu && 'height: calc(60rpx * ' + types.length +'); opacity: 1'"
                >
                    <view
                        v-for="(item, index) in types"
                        :key="index"
                        @click.stop="switchType(index)"
                        class="menu-item"
                    >{{ item.type }}</view>
                </view>
            </view>
        </view>
        <view class="tabBar">
            <swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" />
        </view>

        <view class="slider">
            <view class="recover">
                <image
                    @click="showSwiper"
                    class="icon-recover"
                    src="/static/icon-recover.png"
                    :style="'transform: rotateZ('+(hideBwSwiper ? 0 : 180)+'deg)'"
                />
            </view>
            <view class="bw-swiper" :style="'height: ' + (hideBwSwiper ? '336rpx': '0')">
                <bw-swiper
                    imageKey="url"
                    :swiperList="swiperList"
                    nextMargin="20rpx"
                    previousMargin="40rpx"
                    :swiperHeight="336"
                    :swiperType="true"
                    :indicatorDots="false"
                    @clickItem="clickItem"
                />
            </view>
        </view>

        <view class="main">
            <swiper class="swiper-box" :current="tabIndex" @change="tabChange">
                <swiper-item v-for="(item, index) in tabBars" :key="index">
                    <item-card
                        :tab="index ? 'hot' : 'new'"
                        :dynamicId="dynamicId"
                        :refresh="refresh"
                    />
                </swiper-item>
            </swiper>
        </view>

        <view
            :style="isShowMenu && 'opacity: 0.28; height: 100vh;'"
            @click="hide"
            class="shelter full-screen"
        />
    </view>
</template>

<script>
    import swiperTabHead from "@/components/topTab";
    import bwSwiper from "@/components/bw-swiper";
    import itemCard from "@/components/item-card";
    export default {
        components: {
            swiperTabHead,
            bwSwiper,
            itemCard
        },
        data() {
            return {
                tabIndex: 0,
                tabBars: ["最新", "热门"],
                swiperList: [],
                hideBwSwiper: true,
                isShowMenu: false,
                types: [],
                dynamicId: null,
                dynamicName: "全部类型",
                refresh: true
            };
        },
        onShow() {
            this.refresh = !this.refresh;
            uni.apiRequest("/api/member/getType", {
                success: res => {
                    this.types = [
                        { type: "全部类型", id: 0 },
                        { type: "个人类型", id: -1 },
                        ...res.data.result
                    ];
                }
            });
            uni.apiRequest("/api/Wheel/lists", {
                success: res => (this.swiperList = res.data.result)
            });
        },
        methods: {
            tabtap(index) {
                this.tabIndex = index;
            },

            clickItem(item) {
                item.herf_a &&
                    uni.navigateTo({ url: `/pages/webView?url=${item.herf_a}` });
            },

            tabChange(e) {
                this.tabIndex = e.detail.current;
            },
            showSwiper() {
                this.hideBwSwiper = !this.hideBwSwiper;
            },

            dropDown() {
                uni.hideTabBar();
                this.isShowMenu = true;
            },

            hide() {
                this.isShowMenu = false;
                uni.showTabBar();
            },

            switchType(index) {
                this.dynamicId = this.types[index].id;
                this.dynamicName = this.types[index].type;
                this.hide();
            }
        }
    };
</script>

<style>
    .header {
        margin: 20rpx 40rpx 0;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .drop-down {
        position: relative;
        flex-direction: row;
        align-items: center;
    }

    .drop-down-menu {
        position: absolute;
        width: 120%;
        transform: translateY(100%);
        bottom: -10rpx;
        background: #f9f9f9;
        z-index: 99999;
        height: 0;
        opacity: 0;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.2s;
    }

    .menu-item {
        padding: 0 12rpx;
        height: 60rpx;
        line-height: 60rpx;
    }

    .icon-search {
        width: 38rpx;
        height: 40rpx;
    }

    .icon-down_black {
        width: 28rpx;
        height: 17rpx;
        margin-left: 20rpx;
    }

    .uni-swiper-slide-frame {
        justify-content: center;
        align-items: center;
    }
    .swiper-image {
        width: 100%;
        height: 100%;
    }

    .main {
        flex: 1;
        padding-top: 30rpx;
    }

    .swiper-box {
        height: 100%;
    }

    .icon-recover {
        width: 40rpx;
        height: 40rpx;
        transition: all 0.3s;
    }

    .recover {
        align-items: flex-end;
        margin-right: 60rpx;
        margin-bottom: 12rpx;
    }

    .bw-swiper {
        height: 336rpx;
        overflow: hidden;
        transition: all 0.5s;
    }

    .tabBar {
        margin-top: 50rpx;
        margin-left: 38rpx;
    }
</style>