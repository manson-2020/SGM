<template>
    <view class="root">
        <uni-nav-bar
            :shadow="false"
            :border="false"
            backgroundColor="#f9f9f9"
            left-icon="back"
            :fixed="true"
            :statusBar="true"
            title="发布动态"
            @tapLeft="goBack"
            @tapRight="release"
        >
            <view slot="right" class="release-btn bg-2b9f60 color-fff fs26">发布</view>
        </uni-nav-bar>
        <view class="main mlr40">
            <input
                @input="inputState"
                data-type="title"
                class="fs26 mt45 pb20 title-input"
                placeholder="在这里写下发布动态的标题"
                placeholder-class="color-999"
            />
            <textarea
                @input="inputState"
                data-type="content"
                class="fs26 mt28 idea-textarea"
                placeholder="写下此刻的想法(限字50)..."
                placeholder-class="color-aaa"
                maxlength="500"
            />

            <radio-group @change="inputState" data-type="type" class="dynamic-type">
                <label
                    @click="radio(index)"
                    class="type-radio color-333 fs28 f1"
                    v-for="(item, index) in radioGroup"
                    :key="index"
                >
                    <radio :value="item.text" color="#2b9f60" :checked="item.isChecked" />
                    添加{{ item.text }}
                </label>
            </radio-group>

            <view v-for="(item, index) in radioGroup" :key="index">
                <view v-if="item.text == '视频' && item.isChecked" class="mt50 upload-video">
                    <video v-if="video.tempFilePath" :src="video.tempFilePath" />
                    <image
                        v-else
                        @click="chooseVideo"
                        class="img-video"
                        src="/static/img-video.png"
                    />
                </view>
                <view v-if="item.text == '图片' && item.isChecked" class="mt50 upload-picture">
                    <view class="upload-images">
                        <image
                            mode="aspectFill"
                            v-for="(item, index) in images"
                            :key="index"
                            @click="deletePhoto(index)"
                            class="img-default mr22 mb22"
                            :src="item.path"
                        />
                    </view>
                    <image
                        v-if="images.length < 6"
                        @click="chooseImage"
                        class="img-default"
                        src="/static/img-default.png"
                    />
                    <view class="fs24 color-ccc mt33">{{ images.length }}/6 最多能上传6张图片</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar";
    export default {
        components: { uniNavBar },
        data() {
            return {
                radioGroup: [
                    { text: "视频", isChecked: false },
                    { text: "图片", isChecked: false }
                ],
                inputValue: {
                    type: "",
                    title: "",
                    content: ""
                },
                video: {},
                images: [],
                requestUrl: uni.requestUrl
            };
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            goBack() {
                uni.navigateBack();
            },
            deletePhoto(index) {
                this.images.splice(index, 1);
            },
            submitData(data) {
                uni.apiRequest("/api/Dynamic/add", {
                    data,
                    complete() {
                        uni.hideLoading();
                    },
                    success: res => {
                        uni.showToast({
                            title: res.data.msg,
                            icon: res.data.code == 200 ? "success" : "none",
                            success: _ => {
                                if (res.data.code == 200) {
                                    setTimeout(() => {
                                        uni.hideToast();
                                        uni.switchTab({ url: "/pages/home" });
                                    }, 1200);
                                }
                            }
                        });
                    },
                    fail() {
                        uni.showToast({ title: "发布动态失败！", icon: "none" });
                    }
                });
            },
            release() {
                let data = {
                    title: this.inputValue.title,
                    content: this.inputValue.content
                };
                uni.showLoading({ title: "处理中...", mask: true });
                if (this.inputValue.type == "视频") {
                    delete data.file;
                    if (this.video.tempFilePath) {
                        uni.uploadFile({
                            url: uni.requestUrl + "/files/file/upload",
                            filePath: this.video.tempFilePath,
                            name: "file",
                            success: uploadFileRes => {
                                let result = JSON.parse(uploadFileRes.data);
                                data.video = result.data.id;
                                uni.showToast({
                                    title: result.msg,
                                    icon: result.code == 200 ? "success" : "none",
                                    success: _ => {
                                        if (result.code == 200) {
                                            this.submitData(data);
                                        }
                                    }
                                });
                            },
                            fail() {
                                uni.showToast({
                                    title: "视频上传失败， 请重新试一下！",
                                    icon: "none"
                                });
                            }
                        });
                    } else {
                        this.submitData(data);
                    }
                } else if (this.inputValue.type == "图片") {
                    delete data.video;
                    if (this.images.length) {
                        let times = Number();
                        this.images.map((item, index) => {
                            uni.uploadFile({
                                url: uni.requestUrl + "/files/image/upload",
                                filePath: item.path,
                                name: "image",
                                complete: uploadFileRes => {
                                    let result = JSON.parse(uploadFileRes.data);
                                    if (result.code == 200) {
                                        times++;
                                        this.images[index].id = result.data.id;
                                        if (times == this.images.length) {
                                            data.file = this.images
                                                .map(item => item.id)
                                                .toString();
                                            this.submitData(data);
                                        }
                                    } else {
                                        uni.hideLoading();
                                        uni.showToast({
                                            title: `图${index + 1}：${result.msg}`,
                                            icon: "none"
                                        });
                                    }
                                }
                            });
                        });
                    } else {
                        this.submitData(data);
                    }
                } else {
                    this.submitData(data);
                }
            },
            radio(index) {
                this.radioGroup.map(item => {
                    item.isChecked = false;
                });
                this.radioGroup[index].isChecked = true;
            },
            chooseVideo() {
                uni.chooseVideo({
                    count: 1,
                    success: chooseVideoRes => (this.video = chooseVideoRes)
                });
            },
            chooseImage() {
                uni.chooseImage({
                    count: 6 - this.images.length,
                    success: chooseImageRes =>
                        chooseImageRes.tempFilePaths.map(item =>
                            this.images.push({ path: item })
                        )
                });
            }
        }
    };
</script>

<style>
    .release-btn {
        padding: 8rpx 19rpx;
        border-radius: 18rpx;
        box-sizing: border-box;
    }

    .main {
        flex: 1;
    }

    .title-input {
        border-bottom: #eee 1rpx solid;
    }

    .idea-textarea {
        width: 100%;
    }

    .dynamic-type {
        display: flex;
        flex-direction: row;
    }

    .upload-video {
        align-items: center;
    }

    .img-video {
        width: 626rpx;
        height: 313rpx;
    }

    .img-default {
        width: 153rpx;
        height: 153rpx;
    }

    .upload-images {
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>