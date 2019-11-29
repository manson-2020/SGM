<template>
    <view>
        <view class="option">
            <view class="option-item">
                <image style="width: 24rpx; height: 37rpx" src="/static/icon-phone.png" />
                <view class="input-box">
                    <input
                        @input="inputState"
                        data-type="number"
                        class="input fs25 f1 pt10 pb10"
                        type="number"
                        placeholder="手机号"
                        placeholder-style="color: #d4d4d4"
                    />
                    <view class="split" />
                    <view class="fs25 prefix">+86</view>
                    <image class="icon-down" src="/static/icon-down.png" />
                </view>
            </view>

            <view class="uni-padding-wrap fs25">
                <radio-group @change="inputState" data-type="type" class="radio-group">
                    <label v-for="item in radioGroup" :key="item.id">
                        <radio :value="item.id" color="#2b9f60" :checked="item.isChecked" />
                        {{ item.text }}
                    </label>
                </radio-group>
            </view>

            <view class="option-item">
                <image style="width: 27rpx; height: 33rpx" src="/static/icon-password.png" />
                <view class="input-box">
                    <input
                        @input="inputState"
                        data-type="password"
                        class="input fs25 f1 pt10 pb10"
                        type="password"
                        placeholder="登录密码"
                        placeholder-style="color: #d4d4d4"
                    />
                </view>
            </view>
            <button @click="signIn" class="btn primery fs32 mt50">登 录</button>
            <button @click="signUp" class="btn mt35 fs32">去 注 册</button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                inputValue: {
                    number: 0,
                    password: "",
                    type: ""
                },
                radioGroup: [
                    {
                        id: "2",
                        text: "会员",
                        isChecked: false
                    },
                    {
                        id: "3",
                        text: "学生组织管理员",
                        isChecked: false
                    }
                ]
            };
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            signUp() {
                this.$emit("signUp");
            },
            signIn() {
                if (
                    this.inputValue.number &&
                    this.inputValue.type &&
                    this.inputValue.password
                ) {
                    uni.apiRequest("/api/member/logins", {
                        data: {
                            mobile: this.inputValue.number,
                            password: this.inputValue.password,
                            type: this.inputValue.type
                        },
                        complete: res => {
                            uni.showToast({
                                title: res.data.msg,
                                icon: res.data.code == 200 ? "success" : "none",
                                duration: 1500,
                                complete: _ => {
                                    setTimeout(_ => {
                                        uni.hideToast();
                                        if (res.data.code == 200) {
                                            uni.setStorage({
                                                key: "accountInfo",
                                                data: res.data.result,
                                                success: _ => {
                                                    uni.switchTab({
                                                        url: "/pages/home"
                                                    });
                                                }
                                            });
                                        }
                                    }, 1500);
                                }
                            });
                        }
                    });
                }
            }
        }
    };
</script>

<style>
    .option-item {
        flex-direction: row;
        align-items: center;
        margin: 60rpx 50rpx 0;
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
        margin-left: 50rpx;
        margin-right: 50rpx;
        height: 90rpx;
        line-height: 90rpx;
        background-color: #eff0f2;
    }

    .btn::after {
        border: none;
    }
    .btn.primery {
        background-color: #2b9f60;
        color: #fff;
    }

    .uni-padding-wrap {
        flex-direction: row;
        color: #d4d4d4;
        margin: 43rpx 25rpx 0;
        justify-content: space-around;
    }

    .radio-group {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
</style>
