<template>
    <view class="root bg-f9">
        <label class="header fs22 mlr40 mt22">
            <view @click="uploadImage" class="add-photo-btn bg-2b9f60 color-fff">+ 添加照片</view>
            <view class="tips ml50 color-333">学生组织照片墙(点击删除，最多10张)</view>
            <!-- <view class="tips ml50 color-333">点击图片即可删除</view> -->
        </label>
        <view class="main mlr40 mt33">
            <view v-for="(item, index) in images" :key="index" class="box">
                <view class="relative">
                    <image @click="deletePhoto(index)" class="img-default" :src="item.url" />
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
            uploadImage() {
                uni.chooseImage({
                    count: 10 - this.images.length,
                    success: chooseImageRes => {
                        uni.showLoading({title: "文件上传中..."});
                        uni.uploadFile({
                            url: uni.requestUrl + "/files/image/upload",
                            filePath: chooseImageRes.tempFiles[0].path,
                            name: "image",
                            complete: uploadFileRes => {
                                let result = JSON.parse(uploadFileRes.data);
                                result.data.url = uni.requestUrl + result.data.path;
                                delete result.data.path;
                                this.images = [...this.images, result.data];
                                uni.hideLoading();
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
            save() {
                uni.apiRequest("/api/user/update_organization", {
                    data: { file: this.images.map(item => item.id).toString() },
                    success: res => {
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