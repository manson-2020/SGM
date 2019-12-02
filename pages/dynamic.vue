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
                    <item-card :tab="index ? 'my' : 'follow'" :refresh="refresh" />
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
    import SwiperTabHead from "@/components/topTab";
    import itemCard from "@/components/item-card";
    export default {
        components: {
            SwiperTabHead,
            itemCard
        },
        data() {
            return {
                tabIndex: 0,
                tabBars: ["已关注", "我的动态"],
                followContent: [],
                myContent: [],
                refresh: true
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
            tabtap(index) {
                this.tabIndex = index;
            },

            tabChange(e) {
                this.tabIndex = e.detail.current;
                //切换选项卡更换数据。
                // if (e.detail.current) {
                //     this.content = [];
                // } else {
                //     this.content = [];
                // }
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
</style>