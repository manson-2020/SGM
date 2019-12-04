<template>
    <scroll-view scroll-y @scrolltolower="loadMore">
        <view v-for="(item, index) in content.data" :key="index" class="main-item">
            <view v-if="tab != 'organization'" class="item-header">
                <navigator
                    class="avatar"
                    :url="'/pages/' + (item.type == 2 ? 'user' : 'organization') + 'Info' + '?userId=' + item.user_id + '&type=' + item.type"
                >
                    <image class="avatar" :src="item.user_logo" mode="aspectFill" />
                </navigator>
                <view class="item-title">
                    <view class="item-name">
                        <view class="username fs30 color333">{{ item.user_name }}</view>
                        <view class="school-name fs23 color-666">{{ item.school_name }}</view>
                    </view>
                    <!-- <view class="degree-fire fs18 color-666">热度：{{ item. degreeFire}}</view> -->
                </view>
                <view
                    v-if="(tab != 'my') && !(accountInfo.type == item.type && accountInfo.id == item.user_id)"
                >
                    <view
                        @click="select(index, 1, 'follow')"
                        v-if="!item.is_follow"
                        class="follow fs26 color-2b9f60"
                    >＋关注</view>
                    <view
                        v-else
                        @click="select(index, 0, 'follow')"
                        class="follow cancel-follow fs26 color-999"
                    >已关注</view>
                </view>
            </view>
            <view
                class="fs24 color-aaa ml20 mt20"
            >{{item.original_name ? ('转载于' + item.original_name) : '原创文章'}}</view>

            <view v-if="tab == 'organization'" class="article-title fs32 ml22 mr22">{{ item.title }}</view>
            <view v-if="item.video" class="preview-video mt22">
                <view
                    @click="playVideo(item.video)"
                    class="preview-video-image"
                    :style="'background-image: url(' + requestUrl + item.video_img +');'"
                >
                    <image class="icon-play" src="/static/icon-play.png" />
                    <view class="shelter" />
                </view>
            </view>

            <view v-if="item.file.length" class="preview-picture mt22 mlr20">
                <image
                    v-for="(pitureItem, pitureIndex) in item.file"
                    :key="pitureIndex"
                    @click="browsePicture(index, pitureIndex)"
                    :src="pitureItem"
                    :class="'mb11 ' + (((pitureIndex + 1) % 3 != 0) && 'mr11')"
                    mode="aspectFill"
                />
            </view>

            <view class="article">
                <view v-if="tab != 'organization'" class="article-title fs32">{{ item.title }}</view>
                <view class="article-describe fs30 color-aaa">{{ item.content }}</view>
                <view class="article-time fs22 text-right color-aaa">{{ item.create_time }}</view>
            </view>
            <view class="operation-box fs26 color-aaa">
                <label v-if="!item.is_fabulous" @click="select(index, 1, 'like')" class="operation">
                    <image class="icon-like" src="/static/icon-like.png" />
                    <view class="ml15">{{ item.fabulous }}</view>
                </label>
                <label v-else @click="select(index, 0, 'like')" class="operation">
                    <image class="icon-like" src="/static/icon-liked.png" />
                    <view class="ml15">{{ item.fabulous }}</view>
                </label>
                <label @click="comment(index)" class="operation">
                    <image class="icon-comment" src="/static/icon-comment.png" />
                    <view class="ml15">{{ item.comment }}</view>
                </label>
                <label @click="share(index)" class="operation">
                    <image class="icon-share" src="/static/icon-share.png" />
                    <view class="ml15">{{ item.forward }}</view>
                </label>
            </view>
        </view>
        <view class="loading text-center color-aaa fs33">{{ loadingText }}</view>
    </scroll-view>
</template>

<script>
    export default {
        props: {
            tab: {
                type: String,
                default: ""
            },
            dynamicId: {
                type: [Number, String],
                default: ""
            },
            organizationId: {
                type: [Number, String],
                default: ""
            },
            params: {
                type: Object,
                default: () => {}
            },
            refresh: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                content: { data: [] },
                flag: false,
                itemIndex: 0,
                requestUrl: uni.requestUrl,
                loadingText: "加载中...",
                page: 2,
                accountInfo: uni.getStorageSync("accountInfo"),
                keyWords: ""
            };
        },
        created() {
            this.getData();
        },

        watch: {
            dynamicId(val) {
                uni.apiRequest("/api/Dynamic/lists", {
                    data: {
                        style: this.tab == "new" ? 2 : 3,
                        dynamic_type_id: val
                    },
                    success: res => {
                        this.content = res.data.result;
                        if (
                            res.data.result.params.all_page <=
                            res.data.result.params.page
                        ) {
                            this.loadingText = "没有更多了~";
                        } else {
                            this.loadingText = "加载更多...";
                        }
                    }
                });
            },
            params(val) {
                this.keyWords = val.keyWords;
                uni.apiRequest("/api/Dynamic/lists", {
                    data: {
                        title: val.keyWords
                    },
                    success: res => {
                        this.content = res.data.result;
                        if (
                            res.data.result.params.all_page <=
                            res.data.result.params.page
                        ) {
                            this.loadingText = "没有更多了~";
                        } else {
                            this.loadingText = "加载更多...";
                        }
                    }
                });
            },
            refresh(val) {
                this.getData();
            }
        },
        methods: {
            getData() {
                let data;
                switch (this.tab) {
                    case "hot":
                        data = { style: 3 };
                        break;
                    case "follow":
                        data = { follow: 1 };
                        break;
                    case "my":
                        data = { is_my: 1 };
                        break;
                    case "organization":
                        data = {
                            organization_id: this.organizationId
                        };
                        break;
                    case "search":
                        this.loadingText = "";
                        return;
                    default:
                        data = {};
                        break;
                }

                uni.apiRequest("/api/Dynamic/lists", {
                    data,
                    success: res => {
                        if (res.data.code == 200) {
                            this.content = res.data.result;
                            if (
                                res.data.result.params.all_page <=
                                res.data.result.params.page
                            ) {
                                this.loadingText = "没有更多了~";
                            } else {
                                this.loadingText = "加载更多...";
                            }
                        } else {
                            uni.showToast({ title: res.data.msg, icon: "none" });
                        }
                    }
                });
            },
            comment(index) {
                uni.navigateTo({
                    url: `/pages/comment?dynamic_id=${this.content.data[index].id}`
                });
            },
            select(index, isSelected, type) {
                if (this.flag) return;
                this.flag = true;
                if (type == "follow") {
                    uni.apiRequest("/api/Dynamic/follow", {
                        data: {
                            type: this.content.data[index].type,
                            user_id: this.content.data[index].user_id,
                            is_follow: isSelected
                        },
                        complete: res => {
                            this.flag = false;
                            if (res.data.code == 200) {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: res.data.code == 200 ? "success" : "none",
                                    success: _ => {
                                        if (res.data.code == 200) {
                                            this.content.data[
                                                index
                                            ].is_follow = isSelected;
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                if (type == "like") {
                    uni.apiRequest("/api/Dynamic/fabulous", {
                        data: {
                            dynamic_id: this.content.data[index].id,
                            is_fabulous: isSelected
                        },
                        complete: res => {
                            uni.showToast({
                                title: res.data.msg || res.errMsg,
                                icon: res.data.code == 200 ? "success" : "none",
                                success: _ => {
                                    this.flag = false;
                                    if (res.data.code == 200) {
                                        this.content.data[
                                            index
                                        ].is_fabulous = isSelected;
                                        if (isSelected) {
                                            this.content.data[index].fabulous++;
                                        } else {
                                            this.content.data[index].fabulous--;
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            },
            share(index) {
                uni.showModal({
                    title: "转发",
                    content: "是否需要转发这篇文章？",
                    confirmColor: "#2b9f60",
                    success: res => {
                        if (res.confirm) {
                            uni.apiRequest("/api/Dynamic/forward", {
                                data: {
                                    dynamic_id: this.content.data[index].id
                                },
                                success: res => {
                                    if (res.data.code == 200) {
                                        this.getData();
                                    }
                                    uni.showToast({
                                        title: res.data.msg,
                                        icon:
                                            res.data.code == 200
                                                ? "success"
                                                : "none"
                                    });
                                }
                            });
                        }
                    }
                });
            },
            playVideo(src) {
                uni.navigateTo({ url: `/pages/playVideo?src=${src}` });
            },

            browsePicture(index, pitureIndex) {
                this.$emit("browsePicture", {
                    pictures: this.content.data[index].file,
                    pitureIndex
                });
            },
            loadMore() {
                if (this.content.params.page >= this.content.params.all_page) {
                    this.loadingText = "没有更多了~";
                } else {
                    let data = {};
                    switch (this.tab) {
                        case "hot":
                            data = { style: 3, page: this.page };
                            break;
                        case "new":
                            data = {
                                style: 2,
                                dynamic_id: this.content.params.dynamic_id
                            };
                            break;
                        case "follow":
                            data = {
                                style: 2,
                                dynamic_id: this.content.params.dynamic_id,
                                follow: 1
                            };
                            break;
                        case "my":
                            data = {
                                style: 2,
                                dynamic_id: this.content.params.dynamic_id,
                                is_my: 1
                            };
                            break;
                        case "organization":
                            data = {
                                style: 2,
                                dynamic_id: this.content.params.dynamic_id,
                                organization_id: this.organizationId
                            };
                            break;
                        case "search":
                            data = {
                                style: 2,
                                dynamic_id: this.content.params.dynamic_id,
                                title: this.keyWords
                            };
                            break;
                    }
                    uni.apiRequest("/api/Dynamic/lists", {
                        data,
                        success: res => {
                            this.content.data = [
                                ...this.content.data,
                                ...res.data.result.data
                            ];
                            this.page++;
                            this.content.params = res.data.result.params;
                            if (
                                res.data.result.params.all_page <=
                                res.data.result.params.page
                            ) {
                                this.loadingText = "没有更多了~";
                            }
                        }
                    });
                }
            }
        }
    };
</script>

<style>
    .popup-box .btn-box {
        border-top: 1rpx solid rgba(235, 235, 235, 0.5);
        flex-direction: row;
    }

    .cancel-btn,
    .submit-btn {
        padding: 30rpx 0;
    }

    .main-item {
        margin: 0 40rpx 30rpx;
        background: #fff;
        box-shadow: 0px 8px 12px 2px rgba(43, 159, 96, 0.12);
        border-radius: 14px;
        padding: 36rpx 0 50rpx;
    }

    .item-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 21rpx;
        box-sizing: border-box;
    }

    .avatar {
        width: 75rpx;
        height: 75rpx;
        border-radius: 50%;
    }

    .follow {
        padding: 8rpx 11rpx;
        border: 1px solid #2b9f60;
        border-radius: 15rpx;
    }

    .cancel-follow {
        border: 1px solid #999;
    }

    .school-name {
        margin-top: 6rpx;
    }

    .item-title {
        flex: 1;
        flex-direction: row;
        align-items: flex-end;
        padding-left: 16rpx;
    }

    .degree-fire {
        margin-left: 145rpx;
    }

    .preview-video {
        margin-top: 22rpx;
        height: 308rpx;
    }

    .preview-picture {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .preview-video-image {
        position: relative;
        height: 100%;
        background-size: cover;
        background-position: center;
    }

    .icon-play {
        position: absolute;
        width: 51rpx;
        height: 58rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
    }

    .preview-picture image {
        width: 203rpx;
        height: 194rpx;
    }

    .article {
        margin: 30rpx 22rpx 40rpx;
    }

    .article-describe {
        margin-top: 22rpx;
        word-break: break-word;
    }

    .article-time {
        margin-top: 15rpx;
    }

    .operation-box {
        flex-direction: row;
        padding-left: 22rpx;
    }

    .operation {
        margin-right: 75rpx;
    }

    .icon-like {
        width: 40rpx;
        height: 42rpx;
    }
    .icon-comment {
        width: 43rpx;
        height: 38rpx;
    }
    .icon-share {
        width: 34rpx;
        height: 38rpx;
    }

    .video {
        width: 100%;
        height: 100%;
    }

    .loading {
        padding: 20rpx 0;
    }

    .article-title {
        font-weight: bold;
    }

    .popup-box {
        width: 100vw;
        height: 100vh;
        z-index: 9999;
    }
</style>