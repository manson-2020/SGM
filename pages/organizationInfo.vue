<template>
    <view class="root bg-f9">
        <scroll-view class="scroll-view" scroll-y>
            <view class="header">
                <view class="photo-wall fs22 color-666 mt30">
                    <view class="top-row">
                        <view class="photo-frame0 bg-a1bce2 ml15">
                            <image
                                v-if="organizationInfo.file[0]"
                                class="photo"
                                mode="aspectFill"
                                :src="organizationInfo.file[0].url"
                            />
                        </view>
                        <view class="photo-frame1 bg-fbd59d mt15">
                            <image
                                v-if="organizationInfo.file[1]"
                                class="photo"
                                mode="aspectFill"
                                :src="organizationInfo.file[1].url"
                            />
                        </view>
                        <view class="photo-frame2 bg-a1bce2">
                            <image
                                v-if="organizationInfo.file[2]"
                                class="photo"
                                mode="aspectFill"
                                :src="organizationInfo.file[2].url"
                            />
                        </view>
                        <view class="photo-frame3 bg-fbd59d mt30">
                            <image
                                v-if="organizationInfo.file[3]"
                                class="photo"
                                mode="aspectFill"
                                :src="organizationInfo.file[3].url"
                            />
                        </view>
                        <view class="photo-frame4 bg-a1bce2 mt40">
                            <image
                                v-if="organizationInfo.file[4]"
                                class="photo"
                                mode="aspectFill"
                                :src="organizationInfo.file[4].url"
                            />
                        </view>
                        <view class="photo-frame5 bg-fbd59d mt3">
                            <image
                                v-if="organizationInfo.file[5]"
                                class="photo"
                                mode="aspectFill"
                                :src="organizationInfo.file[5].url"
                            />
                        </view>

                        <view
                            v-if="!(accountInfo.type == userType && accountInfo.id == userId)"
                            @click="openPopup('apply')"
                            class="apply-btn color-fff fs26 bg-2b9f60 text-center mt45"
                        >申请</view>
                    </view>

                    <view class="middle-row mt3">
                        <view class="left-column">
                            <view class="photo-frame6 bg-fbd59d">
                                <image
                                    v-if="organizationInfo.file[6]"
                                    class="photo"
                                    mode="aspectFill"
                                    :src="organizationInfo.file[6].url"
                                />
                            </view>
                            <view class="photo-frame7 bg-a1bce2 mt20">
                                <image
                                    v-if="organizationInfo.file[7]"
                                    class="photo"
                                    mode="aspectFill"
                                    :src="organizationInfo.file[7].url"
                                />
                            </view>
                        </view>
                        <view class="middle-column ml15">
                            <view class="photo-frame8 bg-a1bce2 mt25">
                                <image
                                    v-if="organizationInfo.file[8]"
                                    class="photo"
                                    mode="aspectFill"
                                    :src="organizationInfo.file[8].url"
                                />
                            </view>
                            <view class="photo-frame9 bg-a1bce2 mt15">
                                <image
                                    v-if="organizationInfo.file[9]"
                                    class="photo"
                                    mode="aspectFill"
                                    :src="organizationInfo.file[9].url"
                                />
                            </view>
                        </view>
                        <view class="avatar-frame bg-fbd59d ml12 mt18">
                            <image class="avatar" mode="aspectFill" :src="organizationInfo.logo" />
                        </view>
                        <view class="attribute text-right">
                            <view class="fs26 color-333">{{ organizationInfo.name }}</view>
                            <view class="fs26 color-333 mt25">{{ organizationInfo.type }}</view>
                            <view class="fs22 color-999 mt22">{{ organizationInfo.school_name }}</view>
                            <view class="fs22 color-999 mt28">
                                <text>成员数：{{ organizationInfo.number }}</text>
                                <text>关注：{{ organizationInfo.fans }}</text>
                            </view>
                        </view>
                    </view>

                    <view class="bottom-row mt15">
                        <view
                            class="register-time color-333 fs24"
                        >注册时间：{{ organizationInfo.create_time }}</view>
                        <view
                            v-if="!(accountInfo.type == userType && accountInfo.id == userId)"
                            @click="openPopup('leavingMessage')"
                            class="leavingMessage-btn bg-2b9f60 fs26 color-fff"
                        >我的留言</view>
                        <view class="popup-btn color-333 fs26">
                            <view
                                v-if="!(accountInfo.type == userType && accountInfo.id == userId)"
                                @click="confirm('follow')"
                                class="cancel-follow-btn bg-eee"
                            >{{ organizationInfo.is_follow ? "取消" : "" }}关注</view>
                            <view
                                @click="openPopup('introduction')"
                                class="introduction-btn bg-eee ml18"
                            >简介</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="main mt35">
                <item-card
                    :refresh="refresh"
                    :organizationId="userId"
                    tab="organization"
                    @browsePicture="browsePicture"
                />
            </view>
        </scroll-view>

        <uni-popup ref="introduction" type="bottom">
            <view class="popup-box bg-fff mlr40 mb44">
                <view class="title color-000 fs35 text-center mt45">简介</view>
                <scroll-view
                    class="content fs30 color-999 mt45"
                    scroll-y
                >{{ organizationInfo.introduce }}</scroll-view>
                <view class="btn-box color-333 fs32 mt60">
                    <view
                        @click="closePopup('introduction')"
                        class="understand-btn f1 text-center"
                    >了解</view>
                </view>
            </view>
        </uni-popup>

        <uni-popup ref="leavingMessage" type="center" :maskClick="false">
            <view class="popup-box bg-fff">
                <view class="title color-000 fs30 text-center mt45">留言</view>
                <textarea
                    data-type="message"
                    @input="inputState"
                    class="message-textarea fs25 mt55"
                    placeholder="请输入留言内容"
                    placeholder-class="color-999"
                />
                <view class="btn-box color-333 fs30 mt60">
                    <view @click="closePopup('leavingMessage')" class="cancel-btn f1 text-center">取消</view>
                    <view class="divider-line" />
                    <view @click="confirm('leavingMessage')" class="submit-btn f1 text-center">提交</view>
                </view>
            </view>
        </uni-popup>

        <uni-popup ref="apply" type="center" :maskClick="false">
            <view class="popup-box bg-fff">
                <view class="title color-000 fs30 text-center mt45">申请</view>
                <view class="fs25 color-999 ml35 mr35 mt55">{{ organizationInfo.problem }}</view>
                <textarea
                    data-type="cipher"
                    @input="inputState"
                    class="message-textarea fs25 mt28"
                    placeholder="请输入学生组织申请暗号"
                    placeholder-class="color-999"
                />
                <view class="btn-box color-333 fs30 mt60">
                    <view @click="closePopup('apply')" class="cancel-btn f1 text-center">取消</view>
                    <view class="divider-line" />
                    <view @click="confirm('apply')" class="submit-btn f1 text-center">提交</view>
                </view>
            </view>
        </uni-popup>

        <uni-popup ref="browsePopup" type="center" opacity="0.9" :maskClick="false">
            <view class="popup-box browse">
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
    import itemCard from "@/components/item-card";
    import uniPopup from "@/components/uni-popup";

    export default {
        components: {
            itemCard,
            uniPopup
        },
        data() {
            return {
                avatar: getApp().globalData.avatar,
                organizationInfo: { file: [] },
                accountInfo: uni.getStorageSync("accountInfo"),
                inputValue: {
                    message: "",
                    cipher: ""
                },
                messageFlag: false,
                followFlag: false,
                applyFlag: false,
                userId: "",
                userType: "",
                refresh: true,
                pictures: [],
                currentIndex: 0
            };
        },
        onShow() {
            this.refresh = !this.refresh;
            uni.apiRequest("/api/User/user_info", {
                data: {
                    user_id: this.userId,
                    type: 3
                },
                success: res => (this.organizationInfo = res.data.result)
            });
        },
        onLoad(options) {
            this.userId = options.userId;
            this.userType = options.type;
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            openPopup(type) {
                this.$refs[type].open();
            },
            closePopup(type) {
                this.$refs[type].close();
            },
            confirm(type) {
                switch (type) {
                    case "leavingMessage":
                        if (this.messageFlag) return;
                        this.messageFlag = true;
                        uni.apiRequest("/api/User/leavingAdd", {
                            data: {
                                user_id: this.userId,
                                type: this.userType,
                                content: this.inputValue.message
                            },
                            success: res =>
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: res.data.code == 200 ? "success" : "none",
                                    success: _ => {
                                        this.closePopup("leavingMessage");
                                        this.messageFlag = false;
                                    }
                                })
                        });
                        break;
                    case "apply":
                        if (this.applyFlag) return;
                        this.applyFlag = true;
                        uni.apiRequest("/api/User/comeAdd", {
                            data: {
                                organization_id: this.userId,
                                answer: this.inputValue.cipher
                            },
                            success: res =>
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: res.data.code == 200 ? "success" : "none",
                                    success: _ => {
                                        this.closePopup("apply");
                                        this.applyFlag = false;
                                    }
                                })
                        });
                        break;
                    case "follow":
                        if (this.followFlag) return;
                        this.followFlag = true;
                        uni.apiRequest("/api/Dynamic/follow", {
                            data: {
                                user_id: this.userId,
                                type: this.userType,
                                is_follow: Number(!this.organizationInfo.is_follow)
                            },
                            success: res => {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: res.data.code == 200 ? "success" : "none",
                                    success: _ => {
                                        if (res.data.code == 200) {
                                            this.followFlag = false;
                                            this.organizationInfo.is_follow = Number(
                                                !this.organizationInfo.is_follow
                                            );
                                        }
                                    }
                                });
                            }
                        });
                        break;
                }
            },
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
            }
        }
    };
</script>

<style>
    .header {
        padding: 0 40rpx;
    }

    .photo-wall {
        background: #fff;
        box-shadow: 0px 8px 12px 2px rgba(43, 159, 96, 0.12);
        border-radius: 14px;
        padding: 30rpx 25rpx;
    }

    .photo,
    .avatar {
        width: 100%;
        height: 100%;
    }

    .top-row,
    .middle-row {
        flex-direction: row;
        justify-content: space-between;
    }

    [class^="frame"] {
        box-sizing: border-box;
    }

    .photo-frame0 {
        width: 88rpx;
        height: 88rpx;
        padding: 7rpx 7rpx 15rpx;
    }

    .photo-frame1 {
        width: 75rpx;
        height: 82rpx;
        padding: 6rpx 6rpx 14rpx;
    }

    .photo-frame2 {
        width: 97rpx;
        height: 97rpx;
        padding: 7rpx 7rpx 17rpx;
    }

    .photo-frame3 {
        width: 49rpx;
        height: 49rpx;
        padding: 4rpx 6rpx 8rpx 4rpx;
    }

    .photo-frame4 {
        width: 54rpx;
        height: 58rpx;
        padding: 4rpx 4rpx 7rpx;
    }

    .photo-frame5 {
        width: 47rpx;
        height: 50rpx;
        padding: 4rpx 4rpx 8rpx;
    }

    .photo-frame6 {
        width: 113rpx;
        height: 113rpx;
        padding: 8rpx 8rpx 17rpx;
    }

    .photo-frame7 {
        width: 125rpx;
        height: 107rpx;
        padding: 9rpx 10rpx 15rpx;
    }

    .photo-frame8 {
        width: 53rpx;
        height: 57rpx;
        padding: 6rpx 6rpx 9rpx;
    }

    .photo-frame9 {
        width: 75rpx;
        height: 79rpx;
        padding: 7rpx 7rpx 13rpx;
    }

    .avatar-frame {
        width: 187rpx;
        height: 190rpx;
        padding: 10rpx 11rpx 19rpx 10rpx;
    }

    .apply-btn {
        width: 76rpx;
        height: 33rpx;
        justify-content: center;
        border-radius: 15rpx;
    }

    .bottom-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .leavingMessage-btn,
    .cancel-follow-btn,
    .introduction-btn {
        border-radius: 15rpx;
        padding: 7rpx 10rpx;
    }

    .popup-btn {
        flex-direction: row;
    }

    .popup-box .content {
        height: 700rpx;
        padding: 0 35rpx;
        box-sizing: border-box;
        line-height: 44rpx;
    }

    .popup-box .btn-box {
        border-top: 1rpx solid rgba(235, 235, 235, 0.5);
        flex-direction: row;
    }

    .understand-btn {
        padding: 25rpx 0;
    }

    .message-textarea {
        box-sizing: border-box;
        margin-left: 35rpx;
        margin-right: 35rpx;
        padding: 33rpx 28rpx;
        background-color: rgba(235, 235, 235, 0.3);
    }

    .cancel-btn,
    .submit-btn {
        padding: 30rpx 0;
    }

    .popup-box.browse {
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