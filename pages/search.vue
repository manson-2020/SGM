<template>
    <view class="root bg-f9">
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
                    autofocus
                    placeholder="搜索"
                />
            </label>
            <navigator open-type="navigateBack" class="submit-cancle color-181818 fs32">取消</navigator>
        </view>

        <scroll-view class="f1 search-result"> 
            <item-card tab="search" :params="params" />
        </scroll-view>
        <!-- <view class="search-module">
            <view class="search-title color-b1b1b1 fs29">搜索指定内容</view>
            <view class="modules color-576b95 fs32">
                <view
                    v-for="(item, index) in classify"
                    :key="index"
                    :style="((index + 1) % 3) && 'border-right: 1px solid #dadada'"
                    class="module-item"
                >搜索分类</view>
            </view>
        </view>-->
    </view>
</template>

<script>
    import itemCard from "@/components/item-card";

    export default {
        components: { itemCard },
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
                this.params = {
                    keyWords: this.inputValue.keyWords,
                    confirm: true
                };
            }
        }
    };
</script>

<style>
    .root {
        padding-top: 40rpx;
        box-sizing: border-box;
    }

    .search {
        flex-direction: row;
        justify-content: space-between;
        margin: 40rpx;
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

    .search-result {
        margin-top: 90rpx;
        align-items: center;
    }

</style>