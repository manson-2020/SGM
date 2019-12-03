<template>
    <view class="root">
        <uni-nav-bar
            :shadow="false"
            :border="false"
            backgroundColor="#f9f9f9"
            left-icon="back"
            :fixed="true"
            :statusBar="true"
            :title="title"
            @tapLeft="goBack"
            @tapRight="edit"
        >
            <image
                v-if="accountInfo.id == userId && accountInfo.type == userType"
                slot="right"
                class="icon-edit"
                src="/static/icon-leavingAmessage_selected.png"
            />
        </uni-nav-bar>
        <scroll-view scroll-y class="scroll-view f1">
            <image class="avatar-fill bg-2b9f60" :src="avatar || userInfo.logo" mode="aspectFill" />

            <view class="header mt70">
                <image
                    @click="changeAvatar"
                    class="avatar"
                    :src="avatar || userInfo.logo"
                    mode="aspectFill"
                />
                <view class="summary ml22">
                    <text class="fs30 color-fff">{{ userInfo.member_mobile || userInfo.name }}</text>
                    <view class="fs26 color-eee member-container">
                        <navigator url="/pages/accountList?pageType=follow">关注 {{ userInfo.follow }}</navigator>
                        <text style="margin: 0 20rpx;">|</text>
                        <navigator url="/pages/accountList?pageType=fans">粉丝 {{ userInfo.fans }}</navigator>
                    </view>
                </view>
                <view
                    v-if="userId != accountInfo.id ||
                    userType != accountInfo.type"
                    class="btn-box fs20 text-center"
                >
                    <view
                        @click="follow"
                        class="follow color-2b9f60 bg-fff"
                    >{{ userInfo.is_follow ? "已" : "" }}关注</view>
                    <view @click="openPopup" class="leaveMessage color-eee">给他留言</view>
                </view>
            </view>

            <view class="main mt35">
                <view v-if="isOrganization" class="options fs22 color-666">
                    <view class="option-item">
                        <text class="mr50">管理员账号：{{ userInfo.admin_mobile }}</text>
                    </view>
                    <view class="option-item">
                        <text class="mr50">学校全名称：{{ userInfo.school_name }}</text>
                        <text class="mr50">类别：{{ userInfo.type }}</text>
                    </view>
                    <view class="option-item">
                        <text class="mr50">学校地址：{{ userInfo.school_address }}</text>
                    </view>
                </view>

                <view v-else class="options fs26 color-666">
                    <view class="option-item">
                        <text class="color-333 fs40 mr50">
                            <!-- 昵称： -->
                            {{ userInfo.nickname && (userInfo.nickname.length > 9 ? (userInfo.nickname.substr(0, 9) + '…') : userInfo.nickname) }}
                        </text>
                        <text class="mr50">
                            <!-- 性别： -->
                            {{ userInfo.sex }}
                        </text>
                        <text class="mr50">
                            <!-- 年龄： -->
                            {{ userInfo.age }}岁
                        </text>
                    </view>
                    <view class="option-item">
                        <text class="mr50">姓名：{{ userInfo.member_name }}</text>
                        <text class="mr50">学校全名称：{{ userInfo.school_name }}</text>
                    </view>
                    <view class="option-item">
                        <text class="mr50">QQ：{{ userInfo.qq }}</text>
                        <text class="mr50">邮箱：{{ userInfo.email }}</text>
                    </view>
                </view>

                <view v-if="isOrganization" class="options fs26 color-666 mt30">
                    <view class="option-item">
                        <image class="icon-introduction" src="/static/icon-introduction.png" />
                        <text class="ml18 f1 mr18 lh-30">{{ userInfo.introduce }}</text>
                    </view>
                </view>

                <view v-else class="options fs26 color-666 mt30">
                    <view class="option-item">
                        <image class="icon-introduction" src="/static/icon-introduction.png" />
                        <text class="ml18 f1 mr18 lh-30">{{ userInfo.brief }}</text>
                    </view>
                    <view class="option-item">
                        <image class="icon-hobby" src="/static/icon-hobby.png" />
                        <text class="ml18 f1 mr18 lh-30">{{ userInfo.hobby }}</text>
                    </view>
                </view>

                <view v-if="isOrganization" class="mlr40 mt110 fs32 color-33">
                    <navigator
                        url="/pages/editPhotoWall"
                        class="organization-edit-btn mb20 pt28 pb28 bg-d4"
                    >编辑照片墙</navigator>
                    <navigator
                        url="/pages/accountList?pageType=member"
                        class="organization-edit-btn mb20 pt28 pb28 bg-d4"
                    >查看学生组织成员</navigator>
                </view>

                <view v-else class="options mt30 text-center">
                    <view class="option-title color333 fs30 mb18">已申请学生组织</view>
                    <view class="option-item fs26 color-666">
                        <text class="column">学生组织名称</text>
                        <text class="column">学校名称</text>
                        <text class="column">加入日期</text>
                    </view>
                    <view
                        v-for="item in organizations"
                        :key="item.id"
                        class="option-item fs26 color-666"
                    >
                        <text class="column">{{ item.name }}</text>
                        <text class="column">{{ item.school_name }}</text>
                        <text class="column">{{ item.create_time }}</text>
                    </view>
                </view>
            </view>
        </scroll-view>

        <uni-popup ref="popup_leavingMessage" type="center" :maskClick="false">
            <view class="popup-box bg-fff">
                <view class="title color-000 fs30 text-center mt45">留言</view>
                <textarea
                    data-type="message"
                    @input="inputState"
                    class="message-textarea fs25"
                    placeholder="请输入留言内容"
                    placeholder-class="color-999"
                />
                <view class="btn-box color-333 fs30 mt60">
                    <view @click="closePopup" class="cancel-btn f1 text-center">取消</view>
                    <view class="divider-line" />
                    <view @click="confirm" class="submit-btn f1 text-center">提交</view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import uniPopup from "@/components/uni-popup";
    import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar";

    export default {
        components: { uniPopup, uniNavBar },
        data() {
            return {
                avatar: "",
                isOrganization: false,
                userInfo: {},
                title: "会员信息",
                userId: null,
                userType: null,
                accountInfo: uni.getStorageSync("accountInfo"),
                inputValue: {
                    message: ""
                },
                messageFlag: false,
                followFlag: false,
                organizations: []
            };
        },
        onLoad(options) {
            this.userId = options.userId;
            this.userType = options.type;
            this.isOrganization = options.type == 2 ? false : true;
        },
        onShow() {
            if (this.isOrganization) {
                this.title = "组织信息";
            }
            uni.apiRequest("/api/User/user_info", {
                data: {
                    user_id: this.userId,
                    type: this.userType
                },
                success: res => {
                    this.userInfo = res.data.result;
                }
            });

            uni.apiRequest("/api/User/homeOrganization", {
                data: {
                    member_id: this.userId
                },
                success: res => {
                    this.organizations = res.data.result.data;
                }
            });
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            openPopup() {
                this.$refs.popup_leavingMessage.open();
            },

            closePopup() {
                this.$refs.popup_leavingMessage.close();
            },

            goBack() {
                uni.navigateBack();
            },

            gotoFans() {
                uni.navigateTo({ url: "/pages/accountList?pageType=fans" });
            },

            edit() {
                uni.navigateTo({
                    url: `/pages/editData?type=${this.userType}`
                });
            },
            confirm() {
                if (this.messageFlag) return;
                this.messageFlag = true;
                uni.apiRequest("/api/User/leavingAdd", {
                    data: {
                        user_id: this.userId,
                        type: this.userType,
                        content: this.inputValue.message
                    },
                    success: res => {
                        uni.showToast({
                            title: res.data.msg,
                            icon: res.data.code == 200 ? "success" : "none",
                            success: _ => {
                                this.closePopup();
                                this.messageFlag = false;
                            }
                        });
                    }
                });
            },

            follow() {
                if (this.followFlag) return;
                this.followFlag = true;
                uni.apiRequest("/api/Dynamic/follow", {
                    data: {
                        user_id: this.userId,
                        type: this.userType,
                        is_follow: Number(!this.userInfo.is_follow)
                    },
                    success: res => {
                        uni.showToast({
                            title: res.data.msg,
                            icon: res.data.code == 200 ? "success" : "none",
                            success: _ => {
                                if (res.data.code == 200) {
                                    this.followFlag = false;
                                    this.userInfo.is_follow = Number(
                                        !this.userInfo.is_follow
                                    );
                                }
                            }
                        });
                    }
                });
            },

            changeAvatar() {
                if (
                    this.userId == this.accountInfo.id &&
                    this.userType == this.accountInfo.type
                ) {
                    uni.showModal({
                        title: "提示",
                        content: "是否确认更换头像？",
                        confirmColor: "#2b9f60",
                        success: res => {
                            if (res.confirm) {
                                uni.chooseImage({
                                    count: 1,
                                    success: chooseImageRes => {
                                        uni.uploadFile({
                                            url:
                                                uni.requestUrl +
                                                "/files/image/upload",
                                            filePath:
                                                chooseImageRes.tempFiles[0].path,
                                            name: "image",
                                            complete: uploadFileRes => {
                                                let result = JSON.parse(
                                                    uploadFileRes.data
                                                );
                                                result.data.path =
                                                    uni.requestUrl +
                                                    result.data.path;
                                                if (result.code == 200) {
                                                    uni.apiRequest(
                                                        `/api/User/${
                                                            this.userType == 2
                                                                ? "update_info"
                                                                : "update_organization"
                                                        }`,
                                                        {
                                                            data: {
                                                                logo: result.data.id
                                                            },
                                                            complete: res => {
                                                                uni.showToast({
                                                                    title:
                                                                        res.data
                                                                            .msg,
                                                                    icon:
                                                                        res.data
                                                                            .code ==
                                                                        200
                                                                            ? "success"
                                                                            : "none",
                                                                    duration: 1200,
                                                                    success: _ => {
                                                                        res.data
                                                                            .code ==
                                                                            200 &&
                                                                            (this.avatar =
                                                                                result.data.path);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
                return false;
            }
        }
    };
</script>

<style>
    page {
        background: #f9f9f9;
    }

    .avatar-fill {
        position: absolute;
        width: 100vw;
        height: 326rpx;
        filter: blur(9rpx) brightness(0.8);
        z-index: -1;
        top: 0;
    }

    .scroll-view {
        z-index: 0;
        height: auto;
    }

    .header,
    .main {
        padding: 0 40rpx;
    }

    .header {
        flex-direction: row;
    }

    .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        border: rgba(255, 255, 255, 0.3) 6rpx solid;
    }

    .summary {
        flex: 1;
        justify-content: space-around;
    }

    .header .btn-box {
        align-items: flex-end;
        justify-content: space-around;
    }

    .follow,
    .leaveMessage {
        border-radius: 14rpx;
        padding: 5rpx 13rpx;
        display: inline-block;
    }

    .leaveMessage {
        border: 1rpx solid #fff;
    }

    .options {
        background: #fff;
        box-shadow: 0px 8px 12px 2px rgba(43, 159, 96, 0.12);
        border-radius: 14px;
        padding: 30rpx 25rpx;
    }

    .option-item {
        flex-direction: row;
        align-items: baseline;
        margin: 15rpx 0;
    }

    .column {
        width: 33.33%;
    }

    .icon-introduction {
        width: 38rpx;
        height: 33rpx;
    }

    .icon-hobby {
        width: 34rpx;
        height: 35rpx;
    }

    .message-textarea {
        box-sizing: border-box;
        margin: 55rpx 35rpx 0;
        padding: 33rpx 28rpx;
        background-color: rgba(235, 235, 235, 0.3);
    }

    .popup-box .btn-box {
        border-top: 1rpx solid rgba(235, 235, 235, 0.5);
        flex-direction: row;
    }

    .cancel-btn,
    .submit-btn {
        padding: 30rpx 0;
    }

    .divider-line {
        width: 1rpx;
        background-color: #d2d3d5;
        opacity: 0.5;
    }

    .icon-edit {
        width: 40rpx;
        height: 40rpx;
    }

    .organization-edit-btn {
        border-radius: 12rpx;
        justify-content: center;
    }

    .member-container {
        flex-direction: row;
    }
</style>
