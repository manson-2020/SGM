<template>
    <view class="root bg-f9">
        <view class="status" />
        <view class="header">
            <navigator url="/pages/search" hover-class="navigator-hover">
                <image class="icon-search" src="/static/icon-search.png" />
            </navigator>
            <view class="ml77">
                <SwiperTabHead
                    :showLine="true"
                    :tabBars="tabBars"
                    :tabIndex="tabIndex"
                    @tabtap="tabtap"
                />
            </view>

            <navigator url="/pages/releaseDynamics">
                <image class="icon-add" src="/static/icon-add.png" />
            </navigator>
        </view>

        <view class="main">
            <swiper class="swiper-box" :current="tabIndex" @change="tabChange">
                <swiper-item v-for="(item, index) in tabBars" :key="index">
                    <item-card
                        :tab="index ? 'my' : 'follow'"
                        :refresh="refresh"
                        @browsePicture="browsePicture"
                    />
                </swiper-item>
            </swiper>
        </view>

        <uni-popup ref="browsePopup" type="center" opacity="0.9" :maskClick="false">
            <view class="popup-box">
                <swiper :current="currentIndex" class="swiper">
                    <swiper-item
                        @click="hideBrowse"
                        v-for="(item, index) in pictures"
                        :key="index"
                        class="swiper-item"
                    >
                        <image :src="item" mode="widthFix" style="width: 100%;" />
                    </swiper-item>
                </swiper>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import SwiperTabHead from "@/components/topTab";
    import itemCard from "@/components/item-card";
    import uniPopup from "@/components/uni-popup";
    export default {
        components: {
            SwiperTabHead,
            itemCard,
            uniPopup
        },
        data() {
            return {
                tabIndex: 0,
                tabBars: ["已关注", "我的动态"],
                followContent: [],
                myContent: [],
                refresh: true,
                pictures: [],
                currentIndex: 0
            };
        },
        onShow() {
            this.refresh = !this.refresh;
            uni.apiRequest("/api/Dynamic/lists", {
                data: {
                    follow: 1
                },
                success: res => {
                    this.followContent = res.data.result.data;
                }
            });
            uni.apiRequest("/api/Dynamic/lists", {
                data: {
                    is_my: 1
                },
                success: res => {
                    this.myContent = res.data.result.data;
                }
            });
        },
        methods: {
            browsePicture(items) {
                this.pictures = items.pictures;
                this.currentIndex = items.pitureIndex;
                this.$refs.browsePopup.open();
                uni.hideTabBar();
            },
            hideBrowse() {
                this.pictures = Array();
                this.$refs.browsePopup.close();
                uni.showTabBar();
            },
            tabtap(index) {
                this.tabIndex = index;
            },

            tabChange(e) {
                this.tabIndex = e.detail.current;
            }
        }
    };
</script>

<style>
    .header {
        margin: 20rpx 40rpx 0;
        height: 77rpx;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .icon-search {
        width: 38rpx;
        height: 40rpx;
        margin: 10rpx;
    }

    .icon-add {
        width: 40rpx;
        height: 40rpx;
        margin: 10rpx;
    }

    .main {
        flex: 1;
        padding-top: 30rpx;
    }

    .swiper-box {
        height: 100%;
    }

    .popup-box {
        width: 100vw;
        height: 100vh;
    }

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-item {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>