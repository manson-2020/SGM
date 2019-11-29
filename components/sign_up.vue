<template>
    <view>
        <view @click="previousStep" class="close-box ml50 mt20">
            <uni-icons type="back" color="#2b9f60" size="30" />
            <text class="color-2b9f60 fs30">{{tabIndex == 2 ? "上一步" : "返回登录"}}</text>
        </view>
        <view class="tab fs28">
            <view
                v-for="(item, index) in tabs"
                :key="index"
                :class="'tab-item ' + ((tabIndex == index || (tabIndex == 2 && index == 1)) && 'active')"
                @click="switchTab(index)"
            >{{ item }}</view>
        </view>
        <view v-if="tabIndex != 2" class="option">
            <view
                v-for="(item, index) in (tabIndex ? options_two : options_one)"
                :key="index"
                class="option-item"
            >
                <image :style="item.style" :src="'/static/icon-'+item.type+'.png'" />
                <view class="input-box">
                    <input
                        :disabled="item.type == 'type'"
                        @input="inputState"
                        :data-type="item.type"
                        :value="inputValue[item.type]"
                        class="input fs25 f1 pb10 pt10"
                        @click="openPopup"
                        :placeholder="item.placeholder"
                        :type="(item.type == 'phone' || item.type == 'contact') ? 'number' : (item.type == 'password' || item.type == 'repassword') ? 'password' : 'text'"
                    />
                    <view v-if="!index" class="split" />
                    <view v-if="!index" class="fs25 prefix">+86</view>
                    <image
                        v-if="item.type == 'phone' || item.type == 'type'"
                        class="icon-down"
                        src="/static/icon-down.png"
                    />
                </view>
            </view>
            <button @click="submit" class="btn">{{ btns[tabIndex] }}</button>
        </view>
        <view v-if="tabIndex == 2" class="next-box">
            <textarea
                maxlength="200"
                @input="inputState"
                data-type="introduction"
                class="textarea fs25"
                placeholder="学生组织简介（限字200）"
            />
            <view class="avatar_title">
                <view class="fs25">头像</view>
                <view class="fs17">(点击头像选择手机相册图片上传))</view>
            </view>
            <image
                class="img-default"
                @click="uploadImage(1, 'avatar')"
                :src="avatar.path || '/static/img-default.png'"
                mode="aspectFill"
            />
            <view class="student-photo fs17">学生组织照片墙(最多10张)</view>
            <view class="student-photo-box">
                <!-- <image class="icon-lr" src="/static/icon-left.png" /> -->
                <image
                    v-for="(item, index) in photoWalls"
                    :key="index"
                    class="img-default-mini"
                    :src="'http://school.shdong.cn' + item.path"
                />
                <image
                    v-if="photoWalls.length <= 10"
                    class="img-default-mini"
                    @click="uploadImage(10, 'photoWalls')"
                    src="/static/img-default.png"
                />

                <!-- <image class="icon-lr" src="/static/icon-right.png" /> -->
            </view>
            <button @click="submit" class="btn">{{ btns[tabIndex] }}</button>
        </view>

        <uni-popup ref="type" type="bottom">
            <view class="popup-box bg-fff fs30 text-center">
                <view
                    @click="inputState"
                    data-type="type"
                    :data-item="item.type"
                    :data-typeid="item.id"
                    v-for="item in types"
                    :key="item.id"
                    class="box-item mlr40"
                >{{ item.type }}</view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import uniIcons from "@/components/uni-nav-bar/uni-icons";
    import uniPopup from "@/components/uni-popup";

    export default {
        components: { uniIcons, uniPopup },
        data() {
            return {
                avatar: {},
                tabIndex: 0,
                inputValue: {
                    phone: "",
                    user: "",
                    school: "",
                    contact: "",
                    email: "",
                    password: "",
                    repassword: "",
                    organize: "",
                    type: "",
                    typeId: "",
                    position: "",
                    introduction: ""
                },
                btns: ["注册", "下一步", "完成"],
                tabs: ["个人注册", "学生组织注册"],
                options_one: [
                    {
                        type: "phone",
                        style: "width: 24rpx; height: 37rpx",
                        placeholder: "手机号"
                    },
                    {
                        type: "user",
                        style: "width: 27rpx; height: 31rpx",
                        placeholder: "姓名"
                    },
                    {
                        type: "school",
                        style: "width: 34rpx; height: 31rpx",
                        placeholder: "所在学校全称"
                    },
                    {
                        type: "contact",
                        style: "width: 26rpx; height: 26rpx",
                        placeholder: "请输入联系方式"
                    },
                    {
                        type: "email",
                        style: "width: 29rpx; height: 21rpx",
                        placeholder: "请输入邮箱"
                    },
                    {
                        type: "password",
                        style: "width: 27rpx; height: 33rpx",
                        placeholder: "登录密码"
                    },
                    {
                        type: "repassword",
                        style: "width: 27rpx; height: 33rpx",
                        placeholder: "确认登录密码"
                    }
                ],
                options_two: [
                    {
                        type: "phone",
                        style: "width: 24rpx; height: 37rpx",
                        placeholder: "管理员手机号"
                    },
                    {
                        type: "organize",
                        style: "width: 27rpx; height: 23rpx",
                        placeholder: "学生组织名称"
                    },
                    {
                        type: "type",
                        style: "width: 31rpx; height: 27rpx",
                        placeholder: "请选择学生组织类型"
                    },
                    {
                        type: "school",
                        style: "width: 34rpx; height: 31rpx",
                        placeholder: "所在学校全称"
                    },
                    {
                        type: "position",
                        style: "width: 26rpx; height: 33rpx",
                        placeholder: "学校地址"
                    },
                    {
                        type: "password",
                        style: "width: 27rpx; height: 33rpx",
                        placeholder: "登录密码"
                    },
                    {
                        type: "repassword",
                        style: "width: 27rpx; height: 33rpx",
                        placeholder: "确认登录密码"
                    }
                ],
                types: [],
                photoWalls: []
            };
        },

        methods: {
            inputState(e) {
                if (e.currentTarget.dataset.type == "type") {
                    this.inputValue.type = e.currentTarget.dataset.item;
                    this.inputValue.typeid = e.currentTarget.dataset.typeid;
                    this.$refs.type.close();
                    return;
                }
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            previousStep() {
                if (this.tabIndex == 2) {
                    this.tabIndex = 1;
                } else {
                    this.$emit("previousStep");
                }
            },
            switchTab(index) {
                if (index != this.tabIndex) {
                    this.inputValue = {
                        phone: "",
                        user: "",
                        school: "",
                        contact: "",
                        email: "",
                        password: "",
                        repassword: "",
                        organize: "",
                        type: "",
                        typeid: "",
                        position: ""
                    };
                }
                this.tabIndex = index;
            },
            submit() {
                switch (this.tabIndex) {
                    case 0:
                        if (
                            !this.inputValue.repassword ||
                            !this.inputValue.phone ||
                            !this.inputValue.user ||
                            !this.inputValue.school ||
                            !this.inputValue.email ||
                            !this.inputValue.contact
                        ) {
                            uni.showToast({
                                title: "请检查输入信息是否完整！",
                                icon: "none"
                            });
                        } else if (
                            this.inputValue.password != this.inputValue.repassword
                        ) {
                            uni.showToast({
                                title: "两次输入密码不匹配！",
                                icon: "none"
                            });
                        } else {
                            uni.apiRequest("/api/member/reg", {
                                data: {
                                    password: this.inputValue.repassword,
                                    member_mobile: this.inputValue.phone,
                                    nickname: this.inputValue.user,
                                    school_name: this.inputValue.school,
                                    email: this.inputValue.email,
                                    qq: this.inputValue.contact
                                },
                                complete: res => {
                                    console.log(res);
                                    uni.showToast({
                                        title: res.data.msg,
                                        icon: "none",
                                        success() {
                                            if (res.data.code == 200) {
                                                uni.setStorageSync(
                                                    "accountInfo",
                                                    res.data.result
                                                );
                                                setTimeout(_ => {
                                                    uni.switchTab({
                                                        url: "/pages/home"
                                                    });
                                                }, 2000);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        break;
                    case 1:
                        this.tabIndex = 2;
                        break;
                    case 2:
                        uni.apiRequest("/api/member/regN", {
                            data: {
                                admin_mobile: this.inputValue.phone,
                                name: this.inputValue.organize,
                                school_name: this.inputValue.school,
                                school_address: this.inputValue.position,
                                type_id: this.inputValue.typeid,
                                introduce: this.inputValue.introduction,
                                password: this.inputValue.repassword,
                                logo: this.avatar.id,
                                file: this.photoWalls
                                    .map(item => item.id)
                                    .toString()
                            },
                            complete: res => {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: "none",
                                    success() {
                                        if (res.data.code == 200) {
                                            uni.setStorageSync(
                                                "accountInfo",
                                                res.data.result
                                            );
                                            setTimeout(_ => {
                                                uni.switchTab({
                                                    url: "/pages/home"
                                                });
                                            }, 2000);
                                        }
                                    }
                                });
                            }
                        });
                        break;
                }
            },
            uploadImage(count, type) {
                uni.chooseImage({
                    count: type == "avatar" ? count : count - this.photoWalls,
                    success: chooseImageRes => {
                        uni.uploadFile({
                            url: uni.requestUrl + "/files/image/upload",
                            filePath: chooseImageRes.tempFiles[0].path,
                            name: "image",
                            complete: uploadFileRes => {
                                let result = JSON.parse(uploadFileRes.data);
                                if (type == "avatar") {
                                    result.data.path =
                                        uni.requestUrl + result.data.path;
                                    this.avatar = result.data;
                                } else {
                                    this.photoWalls = [
                                        ...this.photoWalls,
                                        result.data
                                    ];
                                }

                                uni.showToast({
                                    title: result.msg,
                                    icon: result.code == 200 ? "success" : "none",
                                    duration: 1200
                                });
                            }
                        });
                    }
                });
            },
            openPopup(e) {
                if (e.currentTarget.dataset.type == "type") {
                    uni.apiRequest("/api/member/getType", {
                        success: res => {
                            this.types = res.data.result;
                            this.$refs.type.open();
                        },
                        fail(res) {
                            uni.showToast({
                                title: "服务器连接失败，请重试！",
                                icon: "none"
                            });
                        }
                    });
                }
            }
        }
    };
</script>

<style>
    .tab {
        flex-direction: row;
        justify-content: space-around;
        align-items: baseline;
        padding: 0 50rpx 15rpx;
    }

    .tab-item {
        padding: 50rpx 12rpx 18rpx;
    }

    .tab-item.active {
        border-bottom: #2b9f60 3rpx solid;
        color: #2b9f60;
    }
    .option-item {
        flex-direction: row;
        align-items: center;
        margin: 45rpx 50rpx 0;
    }

    .input-box {
        flex: 1;
        flex-direction: row;
        align-items: center;
        margin-left: 25rpx;
        border-bottom: #d4d4d4 1rpx solid;
    }

    .input {
        width: 400rpx;
    }

    .split {
        background-color: #d4d4d4;
        width: 1rpx;
        height: 30rpx;
    }

    .prefix {
        margin: 0 27rpx;
        line-height: 8rpx;
    }

    .icon-down {
        width: 17rpx;
        height: 10rpx;
    }

    .btn {
        margin: 65rpx 50rpx 0;
        background-color: #eff0f2;
    }

    .btn::after {
        border: none;
    }

    .textarea {
        margin-top: 50rpx !important;
        height: 190rpx;
        width: auto;
        border-bottom: #d4d4d4 1px solid;
    }

    .textarea,
    .avatar_title,
    .img-default,
    .student-photo,
    .student-photo-box {
        margin: 0 90rpx;
        padding: 20rpx;
    }

    .avatar_title {
        flex-direction: row;
        align-items: baseline;
        color: #d4d4d4;
        margin-top: 40rpx;
    }

    .student-photo {
        margin-top: 28rpx;
        color: #d4d4d4;
    }

    .img-default {
        margin-top: 17rpx;
        width: 153rpx;
        height: 153rpx;
    }

    .img-default-mini {
        margin-top: 17rpx;
        margin-right: 10rpx;
        width: 119rpx;
        height: 119rpx;
    }

    .icon-lr {
        width: 24rpx;
        height: 24rpx;
    }

    .student-photo-box {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .close-box {
        flex-direction: row;
        align-items: center;
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
