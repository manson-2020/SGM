<template>
    <view class="root">
        <view class="status" />
        <view class="search">
            <label class="input-box bg-fff">
                <image class="icon-search_mini" src="/static/icon-search_mini.png" />
                <input
                    @input="inputState"
                    data-type="keyWords"
                    confirm-type="search"
                    @confirm="search"
                    class="search-input fs33"
                    focus
                    placeholder="搜索"
                />
            </label>
            <navigator open-type="navigateBack" class="submit-cancle color-181818 fs32">取消</navigator>
        </view>

        <view class="main">
            <swiper class="swiper-box">
                <swiper-item>
                    <item-card tab="search" :params="params" @browsePicture="browsePicture" />
                </swiper-item>
            </swiper>
        </view>

        <uni-popup ref="browsePopup" type="center" opacity="0.9" :maskClick="false">
            <view class="popup-box">
                <swiper :current="currentIndex" class="swiper">
                    <swiper-item
                        @click="hideBrowse"
                        v-for="(item, index) in pictures"
                        :key="index"
                        class="swiper-item"
                    >
                        <image :src="item" mode="widthFix" style="width: 100%;" />
                    </swiper-item>
                </swiper>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import itemCard from "@/components/item-card";
    import uniPopup from "@/components/uni-popup";

    export default {
        components: { itemCard, uniPopup },
        data() {
            return {
                inputValue: {
                    keyWords: ""
                },
                params: {
                    keyWords: "",
                    confirm: false
                },
                pictures: [],
                currentIndex: 0
            };
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            search() {
                this.params = {
                    keyWords: this.inputValue.keyWords,
                    confirm: true
                };
            },
            browsePicture(items) {
                this.pictures = items.pictures;
                this.currentIndex = items.pitureIndex;
                this.$refs.browsePopup.open();
                uni.hideTabBar();
            },
            hideBrowse() {
                this.pictures = Array();
                this.$refs.browsePopup.close();
                uni.showTabBar();
            }
        }
    };
</script>

<style>
    page {
        background-color: #f9f9f9;
    }

    .search {
        box-sizing: border-box;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 40rpx;
        padding: 0 40rpx;
        align-items: center;
        height: 70rpx;
    }

    .input-box {
        height: 100%;
        flex: 1;
        margin-right: 15rpx;
        border-radius: 6px;
    }

    .search-input {
        flex: 1;
        height: 100%;
        padding: 0 10rpx;
    }

    .icon-search_mini {
        margin-left: 36rpx;
        width: 28rpx;
        height: 28rpx;
    }

    .main {
        flex: 1;
        padding-top: 30rpx;
    }

    .swiper-box {
        height: 100%;
    }

    .submit-cancle {
        padding: 10rpx;
    }

    .popup-box {
        width: 100vw;
        height: 100vh;
    }

    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-item {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>