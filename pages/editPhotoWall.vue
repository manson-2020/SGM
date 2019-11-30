<template>
    <view class="root bg-f9">
        <label class="header fs22 mlr40 mt22">
            <view @click="chooseImage" class="add-photo-btn bg-2b9f60 color-fff">+ 添加照片</view>
            <view class="tips ml50 color-333">学生组织照片墙(点击删除，最多10张)</view>
            <!-- <view class="tips ml50 color-333">点击图片即可删除</view> -->
        </label>
        <view class="main mlr40 mt33">
            <view v-for="(item, index) in images" :key="index" class="box">
                <view class="relative">
                    <image
                        @click="deletePhoto(index)"
                        class="img-default"
                        mode="aspectFill"
                        :src="item.url"
                    />
                    <!-- <image class="icon-close" src="/static/icon-close.png" /> -->
                </view>
            </view>
        </view>
        <view @click="save" class="confirm-btn color-fff bg-2b9f60 fs32 mlr80 mt290">确 定</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                images: []
            };
        },
        methods: {
            deletePhoto(index) {
                this.images.splice(index, 1);
            },
            chooseImage() {
                uni.chooseImage({
                    count: 10 - this.images.length,
                     success: chooseImageRes => {
                        chooseImageRes.tempFilePaths.map(item => {
                            this.images.push({ url: item });
                        });
                    }
                });
            },
            submitData() {
                uni.apiRequest("/api/user/update_organization", {
                    data: {
                        file: this.images.map(item => item.id).toString()
                    },
                    success: res => {
                        uni.hideLoading();
                        uni.showToast({
                            title: res.data.msg,
                            icon: res.data.code == 200 ? "success" : "none",
                            success: _ => {
                                setTimeout(() => {
                                    uni.hideToast();
                                    uni.navigateBack();
                                }, 1500);
                            }
                        });
                    }
                });
            },
            save() {
                uni.showLoading({ title: "处理中..." });
                let times = Number();
                this.images.map((item, index) => {
                    if (!item.id) {
                        uni.uploadFile({
                            url: uni.requestUrl + "/files/image/upload",
                            filePath: item.url,
                            name: "image",
                            complete: uploadFileRes => {
                                let result = JSON.parse(uploadFileRes.data);
                                this.images[index].id = result.data.id;
                                times++;
                                if (times == this.images.length) {
                                    this.submitData();
                                }
                            }
                        });
                    } else {
                        times++;
                        if (times == this.images.length) {
                            this.submitData();
                        }
                    }
                });
            }
        },
        created() {
            uni.apiRequest("/api/User/user_info", {
                data: {
                    user_id: uni.getStorageSync("accountInfo").id,
                    type: 3
                },
                success: res => (this.images = res.data.result.file)
            });
        }
    };
</script>

<style>
    .relative {
        position: relative;
    }

    .img-default {
        width: 153rpx;
        height: 153rpx;
    }

    .add-photo-btn {
        padding: 9rpx 12rpx;
        border-radius: 18rpx;
    }

    .main {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .box {
        width: 25%;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        margin-bottom: 20rpx;
    }

    .relative {
        position: relative;
    }

    .icon-close {
        position: absolute;
        width: 16rpx;
        height: 16rpx;
        right: 6rpx;
        top: 6rpx;
    }

    .confirm-btn {
        align-items: center;
        padding: 30rpx 0;
        border-radius: 12rpx;
    }
</style>