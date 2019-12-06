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
                    <item-card tab="search" :params="params" />
                </swiper-item>
            </swiper>
        </view>
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
                }
            };
        },
        methods: {
            inputState(e) {
                this.inputValue[e.currentTarget.dataset.type] = e.detail.value;
            },
            search() {
                if (this.inputValue.keyWords) {
                    this.params = {
                        keyWords: this.inputValue.keyWords,
                        confirm: true
                    };
                }
                return false;
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
</style>