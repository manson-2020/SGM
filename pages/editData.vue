<template>
    <view class="root bg-f9">
        <uni-nav-bar
            :shadow="false"
            :border="false"
            left-icon="back"
            backgroundColor="#f9f9f9"
            :fixed="true"
            :statusBar="true"
            title="编辑基本信息"
            @tapLeft="goBack"
            @tapRight="save"
        >
            <view slot="right" class="save-btn bg-2b9f60 color-fff fs22">保存</view>
        </uni-nav-bar>
        <scroll-view scroll-y class="f1" style="height: auto;">
            <view v-if="userOrorganinzation" class="main mlr40">
                <view class="frame-item mt20">
                    <label class="item-account color-999 fs25">
                        <text>账号：</text>
                        <input
                            class="f1 fs25"
                            type="number"
                            maxlength="11"
                            :value="userInfo.member_mobile"
                            @input="inputState"
                            data-type="member_mobile"
                            placeholder="请输入电话号码"
                            placeholder-class="color-999"
                        />
                    </label>
                    <label @click="openPopup('gender')" class="item-type color-999 fs25 mt50">
                        <text>性别：{{ inputValue.gender || userInfo.sex }}</text>
                        <image class="icon-down" src="/static/icon-down.png" />
                    </label>

                    <label class="item-school color-999 fs25 mt50">
                        <text>姓名：</text>
                        <input
                            class="f1 fs25"
                            @input="inputState"
                            data-type="member_name"
                            :value="userInfo.member_name"
                            placeholder="请输入姓名"
                            placeholder-class="color-999"
                        />
                    </label>

                    <label class="item-address color-999 fs25 mt50">
                        <text>学校：</text>
                        <input
                            class="f1 fs25"
                            @input="inputState"
                            data-type="school_name"
                            placeholder="请输入学校名称"
                            :value="userInfo.school_name"
                            placeholder-class="color-999"
                        />
                    </label>
                </view>
                <view class="frame-item mt30">
                    <text class="item-title fs25 color-333">个人简介</text>
                    <textarea
                        class="item-textarea mt35 color-999 fs20"
                        data-type="brief"
                        @input="inputState"
                        placeholder="请输入个人简介..."
                        :value="userInfo.brief"
                    />
                </view>

                <view class="frame-item mt30">
                    <text class="item-title fs25 color-333">个人爱好</text>
                    <textarea
                        class="item-textarea mt35 color-999 fs20"
                        data-type="hobby"
                        @input="inputState"
                        placeholder="请输入个人爱好..."
                        :value="userInfo.hobby"
                    />
                </view>
            </view>
            <view v-else class="main mlr40">
                <view class="frame-item mt20">
                    <label class="item-account color-999 fs25">
                        <text>账号：</text>
                        <input
                            class="f1 fs25"
                            type="number"
                            maxlength="11"
                            placeholder="请输入手机号码"
                            @input="inputState"
                            data-type="admin_mobile"
                            :value="userInfo.admin_mobile"
                            placeholder-class="color-999"
                        />
                    </label>

                    <label @click="openPopup('type')" class="item-type color-999 fs25 mt50">
                        <text>类型：{{ inputValue.type.type || userInfo.type }}</text>
                        <image class="icon-down" src="/static/icon-down.png" />
                    </label>

                    <label class="item-school color-999 fs25 mt50">
                        <text>学校：</text>
                        <input
                            class="f1 fs25"
                            :value="userInfo.school_name"
                            @input="inputState"
                            data-type="school_name"
                            placeholder="学校全称"
                            placeholder-class="color-999"
                        />
                    </label>

                    <label class="item-address color-999 fs25 mt50">
                        <text>地址：</text>
                        <input
                            class="f1 fs25"
                            :value="userInfo.school_address"
                            @input="inputState"
                            data-type="school_address"
                            placeholder="学校地址"
                            placeholder-class="color-999"
                        />
                    </label>
                </view>
                <view class="frame-item mt30">
                    <text class="item-title fs25 color-333">学生组织简介</text>
                    <textarea
                        class="item-textarea mt35 color-999 fs20"
                        :value="userInfo.introduce"
                        @input="inputState"
                        data-type="introduce"
                        placeholder="学生组织简介..."
                    />
                </view>
            </view>
        </scroll-view>
        <uni-popup ref="gender" type="bottom">
            <view class="popup-box bg-fff fs30 text-center">
                <view
                    v-for="(item, index) in gender"
                    @click="inputState({type: 'gender', value: item})"
                    :key="index"
                    class="box-item mlr40"
                >{{ item }}</view>
            </view>
        </uni-popup>

        <uni-popup ref="type" type="bottom">
            <view class="popup-box bg-fff fs30 text-center">
                <view
                    v-for="item in types"
                    :key="item.id"
                    @click="inputState({type: 'type', value: item})"
                    class="box-item mlr40"
                >{{ item.type }}</view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar";
    import uniPopup from "@/components/uni-popup";

    export default {
        components: { uniNavBar, uniPopup },
        data() {
            return {
                userOrorganinzation: true,
                inputValue: {
                    member_mobile: "",
                    member_name: "",
                    school_name: "",
                    gender: "",
                    brief: "",
                    hobby: "",
                    admin_mobile: "",
                    school_name: "",
                    school_address: "",
                    introduce: "",
                    type: ""
                },
                gender: ["男", "女"],
                userInfo: {},
                types: [],
                accountInfo: uni.getStorageSync("accountInfo")
            };
        },
        onLoad(options) {
            this.userOrorganinzation = options.type == 2 ? true : false;
        },

        created() {
            uni.apiRequest("/api/User/user_info", {
                data: { user_id: this.accountInfo.id, type: this.accountInfo.type },
                success: res => (this.userInfo = res.data.result)
            });

            if (this.accountInfo.type == 3) {
                uni.apiRequest("/api/member/getType", {
                    success: res => {
                        this.types = res.data.result;
                    },
                    fail(res) {
                        uni.showToast({
                            title: "服务器连接失败，请重试！",
                            icon: "none"
                        });
                    }
                });
            }
        },
        methods: {
            inputState(e) {
                if (e.type == "gender" || e.type == "type") {
                    this.closePopup(e.type);
                    this.inputValue[e.type] = e.value;
                    return;
                }

                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            goBack() {
                uni.navigateBack();
            },
            save() {
                if (this.accountInfo.type == 2) {
                    uni.apiRequest("/api/User/update_info", {
                        data: {
                            member_mobile: this.inputValue.member_mobile,
                            member_name: this.inputValue.member_name,
                            sex: this.inputValue.gender == "男" ? 1 : 0,
                            school_name: this.inputValue.school_name,
                            brief: this.inputValue.brief,
                            hobby: this.inputValue.hobby
                        },
                        success: res => {
                            uni.showToast({
                                title: res.data.msg,
                                icon: res.data.code == 200 ? "success" : "none",
                                success: _ =>
                                    setTimeout(() => {
                                        res.data.code == 200 && uni.navigateBack();
                                    }, 1500)
                            });
                        }
                    });
                } else {
                    uni.apiRequest("/api/user/update_organization", {
                        data: {
                            admin_mobile: this.inputValue.admin_mobile,
                            type_id: this.inputValue.type.id,
                            school_name: this.inputValue.school_name,
                            school_address: this.inputValue.school_address,
                            introduce: this.inputValue.introduce
                        },
                        success: res => {
                            uni.showToast({
                                title: res.data.msg,
                                icon: res.data.code == 200 ? "success" : "none",
                                success: _ =>
                                    setTimeout(() => {
                                        res.data.code == 200 && uni.navigateBack();
                                    }, 1500)
                            });
                        }
                    });
                }
            },
            openPopup(type) {
                this.$refs[type].open();
            },

            closePopup(type) {
                this.$refs[type].close();
            }
        }
    };
</script>

<style>
    .save-btn {
        padding: 8rpx 19rpx;
        border-radius: 18rpx;
        box-sizing: border-box;
    }

    .frame-item {
        background: #fff;
        box-shadow: 0 8rpx 12rpx 2rpx rgba(43, 159, 96, 0.12);
        border-radius: 14rpx;
        padding: 36rpx 90rpx 50rpx;
    }

    .item-account,
    .item-type,
    .item-school,
    .item-address {
        border-bottom: solid 1rpx #d4d4d4;
        padding: 0 16rpx;
    }

    .item-type {
        justify-content: space-between;
        padding-bottom: 15rpx;
    }

    .icon-down {
        width: 21rpx;
        height: 12rpx;
    }

    input {
        line-height: normal;
    }

    .item-textarea {
        width: 100%;
        height: 106rpx;
    }

    .popup-box {
        border-top-left-radius: 12rpx;
        border-top-right-radius: 12rpx;
        padding-bottom: 44px;
    }

    .box-item {
        padding: 12rpx 30rpx;
        border-bottom: 1rpx solid rgba(235, 235, 235, 0.5);
        height: 60rpx;
        line-height: 60rpx;
    }
</style>