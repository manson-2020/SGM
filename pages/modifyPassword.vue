<template>
    <view class="root bg-f9">
        <view class="frame mt20 mlr40">
            <label
                v-for="(item, index) in inputFrames"
                :key="index"
                :class="'frame-item color-999 fs28 ' + (index ? 'mt70' : '')"
            >
                <image
                    :class="item.className + ' mr18'"
                    :src="'/static/' + item.className + '.png'"
                />
                <input
                    :data-type="item.type"
                    @input="inputState"
                    class="f1"
                    password="true"
                    :placeholder="item.placeholder"
                    placeholder-class="color-999 fs28"
                />
            </label>
        </view>
        <view @click="saveSumit" class="save-btn color-fff bg-2b9f60 fs32 mlr80 mt70">保 存</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                inputFrames: [
                    {
                        type: "original",
                        className: "icon-key",
                        placeholder: "请输入原密码"
                    },
                    {
                        type: "new",
                        className: "icon-password",
                        placeholder: "请输入新密码"
                    },
                    {
                        type: "repeat",
                        className: "icon-repassword",
                        placeholder: "请确认密码"
                    }
                ],
                inputValue: {}
            };
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            saveSumit() {
                uni.apiRequest("/api/User/update_info", {
                    data: {
                        password: this.inputValue.original,
                        last_password: this.inputValue.repeat
                    },
                    success: res => {
                        uni.showToast({
                            title: res.data.msg,
                            icon: res.data.code == 200 ? "success" : "none",
                            success: _ => {
                                setTimeout(() => {
                                    res.data.code == 200 && uni.navigateBack();
                                }, 1200);
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style>
    .icon-key {
        width: 38rpx;
        height: 38rpx;
    }

    .icon-password,
    .icon-repassword {
        width: 33rpx;
        height: 39rpx;
    }

    .frame {
        background: #fff;
        box-shadow: 0 8rpx 12rpx 2rpx rgba(43, 159, 96, 0.12);
        border-radius: 14rpx;
        padding: 107rpx 90rpx 50rpx;
    }

    .frame-item {
        border-bottom: solid 1rpx #d4d4d4;
        padding: 0 16rpx 12rpx;
    }

    .save-btn {
        align-items: center;
        padding: 30rpx 0;
        border-radius: 12rpx;
    }
</style>