<template>
    <view class="root bg-f9">
        <scroll-view scroll-y class="f1">
            <view
                v-for="(item, index) in comments"
                :key="index"
                class="comment-item mlr40 mt60 mb60"
            >
                <image :src="item.url" class="avatar" />
                <view class="item-main f1 ml25">
                    <view class="comment-info">
                        <view class="nickname color-000 fs30">{{ item.name }}</view>
                        <view class="time color-999 fs26">{{ item.create_time }}</view>
                    </view>
                    <view class="comment-content mt25 color-333 fs26">{{ item.comment }}</view>
                </view>
            </view>
        </scroll-view>
        <view class="blank" />
        <view class="comment-frame bg-fff" :style="'bottom: ' + keyboardheaght + 'px'">
            <input
                @input="inputState"
                :value="inputValue.comment"
                data-type="comment"
                class="comment-input f1 fs25"
                placeholder-class="color-999"
                placeholder="喜欢就评论告诉TA"
                confirm-type="send"
                focus
                @confirm="send"
                @focus="keyboard"
                @blur="keyboard"
                :adjust-position="false"
            />
            <view @click="send" class="color-999 fs26 send-btn">发送</view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                avatar: getApp().globalData.avatar,
                inputValue: { comment: "" },
                comments: [],
                keyboardheaght: 0
            };
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            send() {
                uni.apiRequest("/api/Dynamic/comment", {
                    data: {
                        dynamic_id: this.dynamicId,
                        comment: this.inputValue.comment
                    },
                    success: res => {
                        this.inputValue.comment = "";
                        this.comments = [res.data.result, ...this.comments];
                    }
                });
            },
            keyboard(e) {
                this.keyboardheaght = e.type == "focus" ? e.detail.height : 0;
            }
        },
        onLoad(options) {
            this.dynamicId = options.dynamic_id;
            uni.apiRequest("/api/User/comment", {
                data: {
                    dynamic_id: options.dynamic_id
                },
                success: res => (this.comments = res.data.result)
            });
        }
    };
</script>

<style>
    .avatar {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
    }

    .comment-item {
        flex-direction: row;
    }

    .comment-info {
        flex-direction: row;
        justify-content: space-between;
    }

    .nickname {
        font-weight: bold;
    }

    .comment-content {
        line-height: 44rpx;
    }

    .blank {
        height: 115rpx;
    }

    .comment-frame {
        position: fixed;
        width: 100vw;
        height: 115rpx;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding: 0 40rpx;
        box-sizing: border-box;
    }

    .comment-input {
        height: 66rpx;
        border: 1rpx solid #aaa;
        border-radius: 33rpx;
        padding-left: 50rpx;
    }

    .send-btn {
        height: 100%;
        justify-content: center;
        padding-left: 30rpx;
    }
</style>