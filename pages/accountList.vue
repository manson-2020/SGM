<template>
    <scroll-view class="root bg-f9" scroll-y>
        <view v-if="!list.length" class="text-center color-aaa fs33 pt50">暂无更多内容</view>
        <view v-else class="bg-fff pt50 pb50">
            <view v-for="(item, index) in list" :key="index" class="list mb50">
                <image class="avatar" :src="item.url || avatar" />
                <view class="describe f1 ml22">
                    <view class="first-column">
                        <view class="name fs30 color-000">{{ item.nickname }}</view>
                        <view class="tel fs26 color-bf">{{ item.member_mobile }}</view>
                    </view>
                    <view class="second-column">
                        <view
                            class="text fs26 color-9a"
                        >学校：{{ item.school_address || item.school_name || "未知" }}</view>
                        <view
                            @click="operation(index)"
                            v-if="pageType == 'member'"
                            class="btn bg-2b9f60 color-fff fs28"
                        >清除</view>

                        <view
                            @click="operation(index, 2)"
                            v-if="pageType == 'examine' && item.status == 0"
                            class="btn bg-2b9f60 color-fff fs28"
                        >同意</view>

                        <view
                            v-if="pageType == 'examine' && item.status == 1"
                            class="btn bg-ccc color-fff fs28"
                        >已拒绝</view>
                        <view
                            v-if="pageType == 'examine' && item.status == 2"
                            class="btn bg-ccc color-fff fs28"
                        >已通过</view>

                        <view
                            @click="operation(index)"
                            v-if="pageType == 'follow'"
                            class="btn bg-ccc color-fff fs28"
                        >取消关注</view>
                    </view>
                    <view v-if="pageType == 'examine' || pageType == 'member'" class="third-column">
                        <view class="text fs25 color-9a">申请日期：{{ item.create_time }}</view>
                        <view
                            @click="operation(index, 1)"
                            v-if="pageType == 'examine' && item.status == 0"
                            class="btn bg-fff color-2b9f60 fs28 border-2b9f60"
                        >不同意</view>
                    </view>
                    <!-- <view v-if="pageType != 'fans'" class="last-column">
                        <view class="text fs25 color-9a">答案: {{ item.answer }}</view>
                    </view>-->
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
    export default {
        data() {
            return {
                avatar: getApp().globalData.avatar,
                pageType: "",
                list: []
            };
        },
        methods: {
            operation(index, type) {
                switch (this.pageType) {
                    case "examine":
                        uni.apiRequest("/api/User/homeAdd", {
                            data: {
                                come_id: this.list[index].id,
                                status: type
                            },
                            success: res => {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: res.data.code == 200 ? "success" : "none",
                                    success: _ => this.pageData()
                                });
                            }
                        });
                        break;
                    case "member":
                        uni.showModal({
                            title: "是否确认？",
                            content: "",
                            success: res => {
                                if (res.confirm) {
                                    uni.apiRequest("/api/User/homeDel", {
                                        data: { id: this.list[index].id },
                                        success: res => {
                                            uni.showToast({
                                                title: res.data.msg,
                                                icon:
                                                    res.data.code == 200
                                                        ? "success"
                                                        : "none",
                                                success: _ => this.pageData()
                                            });
                                        }
                                    });
                                }
                            }
                        });
                        break;
                    case "fans":
                        break;
                    case "follow":
                        uni.apiRequest("/api/Dynamic/follow", {
                            data: {
                                type: this.list[index].type,
                                user_id: this.list[index].id,
                                is_follow: 0
                            },
                            complete: res => {
                                if (res.data.code == 200) {
                                    uni.showToast({
                                        title: res.data.msg,
                                        icon:
                                            res.data.code == 200
                                                ? "success"
                                                : "none",
                                        success: _ =>
                                            res.data.code == 200 && this.pageData()
                                    });
                                }
                            }
                        });
                        break;
                }
            },
            pageData() {
                switch (this.pageType) {
                    case "examine":
                        uni.apiRequest("/api/User/homeList", {
                            success: res => {
                                this.list = res.data.result;
                            }
                        });
                        uni.setNavigationBarTitle({ title: "申请审核" });
                        break;
                    case "fans":
                        uni.apiRequest("/api/User/follow_fans", {
                            data: {
                                follow_fans: 0
                            },
                            success: res => {
                                this.list = res.data.result;
                            }
                        });
                        uni.setNavigationBarTitle({ title: "粉丝" });
                        break;
                    case "member":
                        uni.apiRequest("/api/User/homeMember", {
                            data: {
                                organization_id: uni.getStorageSync("accountInfo")
                                    .id
                            },
                            success: res => {
                                this.list = res.data.result.data;
                            }
                        });
                        uni.setNavigationBarTitle({ title: "组织成员" });
                        break;
                    case "follow":
                        uni.apiRequest("/api/User/follow_fans", {
                            data: {
                                follow_fans: 1
                            },
                            success: res => {
                                this.list = res.data.result;
                            }
                        });
                        uni.setNavigationBarTitle({ title: "关注的人" });
                        break;
                }
            }
        },

        onLoad(options) {
            this.pageType = options.pageType;
            this.pageData();
        }
    };
</script>

<style>
    .avatar {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
    }

    .list {
        flex-direction: row;
        padding-left: 60rpx;
        padding-right: 60rpx;
    }

    .describe {
        border-bottom: 1rpx solid #d8d8d8;
    }

    .first-column,
    .second-column,
    .third-column,
    .last-column {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12rpx;
    }

    .btn {
        padding: 5rpx 15rpx;
        border-radius: 15px;
        box-sizing: border-box;
    }

    .border-2b9f60 {
        border: 1rpx solid #2b9f60;
    }
</style>