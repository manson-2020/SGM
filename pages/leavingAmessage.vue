<template>
    <view class="root bg-f9">
        <view class="status" />
        <view class="header">
            <SwiperTabHead
                :showLine="true"
                :tabBars="tabBars"
                :tabIndex="tabIndex"
                @tabtap="tabtap"
            />
            <view @click="getData" class="refresh fs22 color-fff bg-2b9f60">刷新</view>
        </view>

        <view class="main">
            <swiper class="swiper-box" :current="tabIndex" @change="tabChange">
                <swiper-item v-for="(item, index) in tabBars" :key="index">
                    <scroll-view class="scroll-view" scroll-y>
                        <view class="main-wrapper">
                            <view
                                v-for="item in messageList[index]"
                                :key="item.id"
                                class="main-item"
                            >
                                <view class="userInfo">
                                    <image class="avatar" :src="item.url" mode="aspectFill" />
                                    <view class="text-box">
                                        <view class="nickname color-333 fs28">{{ item.name }}</view>
                                        <view class="time color-aaa fs18">{{ item.create_time }}</view>
                                    </view>
                                </view>
                                <view class="ml90">
                                    <view class="content mt38 color-aaa fs22">{{ item.content }}</view>
                                    <view class="tel color-aaa fs18 mt38">联系电话：1898451251</view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
    import SwiperTabHead from "@/components/topTab";
    export default {
        components: {
            SwiperTabHead
        },
        data() {
            return {
                tabIndex: 0,
                tabBars: ["给我的留言", "我给的留言"],
                messageList: [[], []]
            };
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.tabBars.map((item, index) => {
                   
                    uni.apiRequest("/api/User/leavingList", {
                        data: { is_my: index + 1 },
                        success: res => (this.messageList[index] = res.data.result)
                    });
                });
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
    }

    .main {
        flex: 1;
        padding-top: 30rpx;
    }

    .swiper-box {
        height: 100%;
    }

    .refresh {
        padding: 8rpx 20rpx;
        border-radius: 18rpx;
    }

    .main-item {
        margin: 0 40rpx 30rpx;
        background: #fff;
        box-shadow: 0px 8px 12px 2px rgba(43, 159, 96, 0.12);
        border-radius: 14px;
        padding: 22rpx 30rpx 24rpx 20rpx;
    }

    .userInfo {
        flex-direction: row;
        height: 66rpx;
    }

    .avatar {
        width: 66rpx;
        height: 66rpx;
        border-radius: 50%;
    }

    .text-box {
        margin-left: 24rpx;
        flex: 1;
        justify-content: space-between;
    }

    .content {
        line-height: 33rpx;
    }

    .time {
        flex-direction: row;
        align-items: center;
        overflow: hidden;
    }

    .time::before {
        content: "";
        background-image: url(../static/icon-time.png);
        background-size: 100% 100%;
        width: 20rpx;
        height: 20rpx;
        margin-right: 9rpx;
    }
</style>