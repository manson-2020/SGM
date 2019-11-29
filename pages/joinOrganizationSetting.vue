<template>
    <view class="root bg-f9">
        <view class="main bg-fff">
            <view class="mb180 mt45">
                <view class="color-999 fs22">申请学生组织问题：</view>
                <view class="underline bg-eee" />
                <input
                    data-type="problem"
                    @input="inputState"
                    :value="inputValue.problem"
                    class="fs22"
                    placeholder-class="fs21 color-aaa"
                    placeholder="请输入申请加入问题或提示语"
                />
            </view>

            <view class="mb180">
                <view class="color-999 fs22">问题答案：</view>
                <view class="underline bg-eee" />
                <input
                    data-type="answer"
                    @input="inputState"
                    :value="inputValue.answer"
                    class="fs22"
                    placeholder-class="fs21 color-aaa"
                    placeholder="请输入问题答案"
                />
            </view>
        </view>
        <view @click="saveSubmit" class="save-btn color-fff bg-2b9f60 fs32 mlr80 mt70">保 存</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                inputValue: {
                    problem: "",
                    answer: ""
                }
            };
        },
        created() {
            uni.apiRequest("/api/User/user_info", {
                data: {
                    user_id: uni.getStorageSync("accountInfo").id,
                    type: uni.getStorageSync("accountInfo").type
                },
                success: res => {
                    this.inputValue.problem = res.data.result.problem;
                    this.inputValue.answer = res.data.result.answer;
                }
            });
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            saveSubmit() {
                uni.apiRequest("/api/user/update_organization", {
                    data: {
                        problem: this.inputValue.problem,
                        answer: this.inputValue.answer
                    },
                    success: res => {
                        uni.showToast({
                            title: res.data.msg,
                            icon: res.data.code == 200 ? "success" : "none",
                            success: _ => {
                                setTimeout(() => {
                                    uni.navigateBack();
                                    uni.hideToast();
                                }, 1500);
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style>
    .main {
        padding: 0 40rpx;
    }

    .underline {
        height: 1rpx;
        margin: 26rpx 0;
    }

    .save-btn {
        align-items: center;
        padding: 30rpx 0;
        border-radius: 12rpx;
    }
</style>