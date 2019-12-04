<template>
    <view class="root bg-f9">
        <view class="header bg-2b9f60" />
        <view class="main">
            <view class="user-box mt50">
                <image class="avatar" :src="userInfo.logo || avatar" />
                <text class="fs30 color-fff mt22">{{ userInfo.name || userInfo.nickname }}</text>
            </view>
            <view class="options mt25">
                <navigator
                    v-for="(item, index) in options"
                    :key="index"
                    :class="'options-item fs32 ' + (index && 'bt-d8')"
                    hover-class="none"
                    :url="item.url"
                >
                    <text>{{ item.text }}</text>
                    <image class="icon-next" src="/static/icon-next.png" />
                </navigator>
            </view>
            <view class="options mt60">
                <view @click="loginOut" class="options-item fs30">
                    <text>退出</text>
                    <image class="icon-next" src="/static/icon-next.png" />
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                avatar: getApp().globalData.avatar,
                accountInfo: uni.getStorageSync("accountInfo"),
                userInfo: {},
                options: [
                    {
                        text: "学生组织信息",
                        url: `/pages/userInfo?type=3&userId=${
                            uni.getStorageSync("accountInfo").id
                        }`
                    },
                    {
                        text: "申请学生组织设置",
                        url: "/pages/joinOrganizationSetting"
                    },
                    {
                        text: "申请学生组织审核",
                        url: "/pages/accountList?pageType=examine"
                    },
                    { text: "修改密码", url: "/pages/modifyPassword" },
                    { text: "关于我们", url: "/pages/about" }
                ]
            };
        },
        methods: {
            loginOut() {
                uni.removeStorage({
                    key: "accountInfo",
                    success: res => {
                        uni.redirectTo({ url: "/pages/index" });
                    }
                });
            }
        },
        onShow() {
            uni.apiRequest("/api/User/user_info", {
                data: {
                    user_id: this.userId,
                    type: this.accountInfo.type
                },
                success: res => {
                    if (res.data.code == 200) {
                        this.userInfo = res.data.result;
                    } else {
                        uni.showToast({ title: res.data.msg, icon: "none" });
                    }
                }
            });
        },
        created() {
            if (this.accountInfo.type == 2) {
                this.options = [
                    {
                        text: "会员信息",
                        url: `/pages/userInfo?type=2&userId=${
                            uni.getStorageSync("accountInfo").id
                        }`
                    },
                    {
                        text: "修改密码",
                        url: "/pages/modifyPassword"
                    },
                    {
                        text: "关于我们",
                        url: "/pages/about"
                    }
                ];
            }
        }
    };
</script>

<style>
    .main {
        z-index: 9;
    }

    .header {
        height: 370rpx;
        width: 100vw;
        position: absolute;
        top: 0;
    }

    .user-box {
        justify-content: center;
        align-items: center;
    }

    .avatar {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
    }

    .options {
        margin-left: 40rpx;
        margin-right: 40rpx;
        background: #fff;
        box-shadow: 0px 8px 12px 2px rgba(43, 159, 96, 0.12);
        border-radius: 14px;
        padding: 0 27rpx;
    }

    .options-item {
        height: 100rpx;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .bt-d8 {
        border-top: 1rpx solid #d8d8d8;
    }

    .icon-next {
        width: 13rpx;
        height: 23rpx;
    }
</style>