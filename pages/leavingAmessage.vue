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
            <view @click="getData" class="refresh fs26 color-fff bg-2b9f60">刷新</view>
        </view>

        <view class="main">
            <swiper class="swiper-box" :current="tabIndex" @change="tabChange">
                <swiper-item v-for="(item, index) in tabBars" :key="index">
                    <scroll-view class="scroll-view" scroll-y v-if="index == 0">
                        <view class="main-wrapper">
                            <view v-for="item in messageList0" :key="item.id" class="main-item">
                                <view class="userInfo">
                                    <navigator
                                        class="avatar"
                                        :url="'/pages/' + (item.type == 2 ? 'user' : 'organization') + 'Info' + '?userId=' + item.get_id + '&type=' + item.type"
                                    >
                                        <image class="avatar" :src="item.url" mode="aspectFill" />
                                    </navigator>
                                    <view class="text-box">
                                        <view class="nickname color-333 fs30">{{ item.get_name }}</view>
                                        <view
                                            class="time color-aaa fs22 mt10"
                                        >{{ item.create_time }}</view>
                                    </view>
                                </view>
                                <view class="ml90">
                                    <view class="content mt38 color-aaa fs30">{{ item.content }}</view>
                                    <view class="tel color-aaa fs28 mt38">联系电话：1898451251</view>
                                </view>
                            </view>
                            <view
                                v-if="!messageList0.length"
                                class="loading text-center color-aaa fs33"
                            >暂无更多内容~</view>
                        </view>
                    </scroll-view>

                    <scroll-view class="scroll-view" scroll-y v-if="index == 1">
                        <view class="main-wrapper">
                            <view v-for="item in messageList1" :key="item.id" class="main-item">
                                <view class="userInfo">
                                    <navigator
                                        class="avatar"
                                        :url="'/pages/' + (item.type == 2 ? 'user' : 'organization') + 'Info' + '?userId=' + item.member_id + '&type=' + item.type"
                                    >
                                        <image class="avatar" :src="item.url" mode="aspectFill" />
                                    </navigator>
                                    <view class="text-box">
                                        <view class="nickname color-333 fs30">{{ item.name }}</view>
                                        <view
                                            class="time color-aaa fs22 mt10"
                                        >{{ item.create_time }}</view>
                                    </view>
                                </view>
                                <view class="ml90">
                                    <view class="content mt38 color-aaa fs30">{{ item.content }}</view>
                                    <view class="tel color-aaa fs28 mt38">联系电话：1898451251</view>
                                </view>
                            </view>
                            <view
                                v-if="!messageList1.length"
                                class="loading text-center color-aaa fs33"
                            >暂无更多内容~</view>
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
                messageList0: [],
                messageList1: []
            };
        },
        onShow() {
            this.getData();
        },
        methods: {
            getData() {
                uni.showLoading({ title: "加载中" });
                this.tabBars.map((item, index) => {
                    uni.apiRequest("/api/User/leavingList", {
                        data: { is_my: index + 1 },
                        complete: res => {
                            uni.hideLoading();
                            res.data.code == 200 &&
                                (this["messageList" + index] = res.data.result);
                        }
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
        width: 75rpx;
        height: 75rpx;
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
    }

    .time::before {
        content: "";
        background-image: url(../static/icon-time.png);
        background-size: 100% 100%;
        width: 20rpx;
        height: 20rpx;
        margin-right: 9rpx;
    }

    .loading {
        padding: 20rpx 0;
    }
</style>