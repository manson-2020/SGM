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
            <view slot="right" class="save-btn bg-2b9f60 color-fff fs26">保存</view>
        </uni-nav-bar>
        <scroll-view scroll-y class="info-container f1">
            <view v-if="userOrorganization" class="main mlr40">
                <view class="frame-item mt20">
                    <label
                        v-for="(item, index) in options.user.firstItmes"
                        :key="index"
                        @click="openPopup('gender', item.disabled)"
                        :class="'item-label color-999 fs28 ' + (index && 'mt50')"
                    >
                        <text>{{ item.text }}：{{ item.type == 'image' ? (inputValue.gender || userInfo[item.dataType]) : "" }}</text>
                        <image v-if="item.type == 'image'" :class="item.className" :src="item.src" />
                        <input
                            v-else
                            class="f1 fs28"
                            @input="inputState"
                            :maxlength="item.maxlength"
                            :data-type="item.dataType"
                            :value="userInfo[item.dataType]"
                            :placeholder="item.placeholder"
                            placeholder-class="color-999"
                        />
                    </label>
                </view>
                <view
                    v-for="(item, index) in options.user.secondItems"
                    :key="index"
                    class="frame-item mt30 mb50"
                >
                    <text class="item-title fs28 color-333">{{ item.text }}</text>
                    <textarea
                        class="item-textarea mt35 color-999 fs28"
                        :data-type="item.dataType"
                        @input="inputState"
                        :placeholder="item.placeholder"
                        :value="userInfo[item.dataType]"
                    />
                </view>
            </view>
            <view v-else class="main mlr40">
                <view class="frame-item mt20">
                    <label
                        v-for="(item, index) in options.organization.firstItmes"
                        :key="index"
                        @click="openPopup('type', item.disabled)"
                        :class="'item-label color-999 fs28 ' + (index && 'mt50')"
                    >
                        <text>{{ item.text }}：{{ item.type == 'image' ? (inputValue.type.type || userInfo[item.dataType]) : "" }}</text>
                        <image v-if="item.type == 'image'" :class="item.className" :src="item.src" />
                        <input
                            v-else
                            class="f1 fs28"
                            @input="inputState"
                            :maxlength="item.maxlength"
                            :data-type="item.dataType"
                            :value="userInfo[item.dataType]"
                            :placeholder="item.placeholder"
                            placeholder-class="color-999"
                        />
                    </label>
                </view>
                <view
                    v-for="(item, index) in options.organization.secondItems"
                    :key="index"
                    class="frame-item mt30 mb50"
                >
                    <text class="item-title fs28 color-333">{{ item.text }}</text>
                    <textarea
                        class="item-textarea mt35 color-999 fs28"
                        :data-type="item.dataType"
                        @input="inputState"
                        :placeholder="item.placeholder"
                        :value="userInfo[item.dataType]"
                    />
                </view>
            </view>
        </scroll-view>
        <uni-popup ref="gender" type="bottom">
            <view class="popup-box bg-fff fs32 text-center">
                <view
                    v-for="(item, index) in gender"
                    @click="inputState({type: 'gender', value: item})"
                    :key="index"
                    class="box-item mlr40"
                >{{ item }}</view>
            </view>
        </uni-popup>

        <uni-popup ref="type" type="bottom">
            <view class="popup-box bg-fff fs32 text-center">
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
                userOrorganization: true,
                accountInfo: uni.getStorageSync("accountInfo"),
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
                    type: "",
                    nickname: "",
                    age: "",
                    qq: "",
                    email: "",
                    name: ""
                },
                gender: ["男", "女"],
                userInfo: {},
                types: [],
                options: {
                    user: {
                        firstItmes: [
                            {
                                text: "昵称",
                                type: "text",
                                maxlength: 16,
                                dataType: "nickname",
                                placeholder: "请输入昵称",
                                disabled: true
                            },
                            {
                                text: "姓名",
                                type: "text",
                                maxlength: 9,
                                dataType: "member_name",
                                placeholder: "请输入姓名",
                                disabled: true
                            },
                            {
                                text: "性别",
                                type: "image",
                                dataType: "sex",
                                className: "icon-down",
                                src: "/static/icon-down.png"
                            },
                            {
                                text: "年龄",
                                type: "number",
                                maxlength: 3,
                                dataType: "age",
                                placeholder: "请输入你的年龄",
                                disabled: true
                            },
                            {
                                text: "学校",
                                type: "text",
                                maxlength: 20,
                                dataType: "school_name",
                                placeholder: "请输入学校名称",
                                disabled: true
                            },
                            {
                                text: "QQ",
                                type: "number",
                                maxlength: 10,
                                dataType: "qq",
                                placeholder: "请输入QQ号码",
                                disabled: true
                            },
                            {
                                text: "邮箱",
                                type: "text",
                                maxlength: 20,
                                dataType: "email",
                                placeholder: "请输入你的邮箱",
                                disabled: true
                            }
                        ],
                        secondItems: [
                            {
                                text: "个人简介",
                                dataType: "brief",
                                placeholder: "请输入个人简介..."
                            },
                            {
                                text: "个人爱好",
                                dataType: "hobby",
                                placeholder: "请输入个人爱好..."
                            }
                        ]
                    },
                    organization: {
                        firstItmes: [
                            {
                                text: "组织",
                                type: "text",
                                maxlength: 16,
                                dataType: "name",
                                placeholder: "请输入组织名称",
                                disabled: true
                            },
                            {
                                text: "类型",
                                type: "image",
                                dataType: "type",
                                className: "icon-down",
                                src: "/static/icon-down.png"
                            },
                            {
                                text: "学校",
                                type: "text",
                                maxlength: 16,
                                dataType: "school_name",
                                placeholder: "请输入学校全称",
                                disabled: true
                            },
                            {
                                text: "地址",
                                type: "text",
                                maxlength: 25,
                                dataType: "school_address",
                                placeholder: "请输入学校地址",
                                disabled: true
                            }
                        ],
                        secondItems: [
                            {
                                text: "学生组织简介",
                                dataType: "introduce",
                                placeholder: "学生组织简介..."
                            }
                        ]
                    }
                }
            };
        },
        onLoad(options) {
            this.userOrorganization = options.type == 2 ? true : false;
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
                            icon: "none",
                            mask: true
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
                            hobby: this.inputValue.hobby,
                            nickname: this.inputValue.nickname,
                            age: this.inputValue.age,
                            qq: this.inputValue.qq,
                            email: this.inputValue.email
                        },
                        success: res => {
                            uni.showToast({
                                title: res.data.msg,
                                icon: res.data.code == 200 ? "success" : "none",
                                mask: true,
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
                            name: this.inputValue.name,
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
                                mask: true,
                                success: _ =>
                                    setTimeout(() => {
                                        res.data.code == 200 && uni.navigateBack();
                                    }, 1500)
                            });
                        }
                    });
                }
            },
            openPopup(type, disabled) {
                if (disabled) {
                    return false;
                } else {
                    this.$refs[type].open();
                }
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

    .info-container {
        height: 0;
    }

    .frame-item {
        background: #fff;
        box-shadow: 0 8rpx 12rpx 2rpx rgba(43, 159, 96, 0.12);
        border-radius: 14rpx;
        box-sizing: border-box;
        padding: 36rpx 90rpx 50rpx;
    }

    .item-label {
        /* border-bottom: solid 1rpx #d4d4d4; */
        padding: 0 16rpx;
        justify-content: space-between;
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
        padding-left: 10rpx;
    }

    .popup-box {
        border-top-left-radius: 12rpx;
        border-top-right-radius: 12rpx;
    }

    .box-item {
        padding: 12rpx 30rpx;
        border-bottom: 1rpx solid rgba(235, 235, 235, 0.5);
        height: 60rpx;
        line-height: 60rpx;
    }
</style>