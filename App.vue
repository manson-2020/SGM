<script>
    export default {
        globalData: {
            avatar: "/static/img-default.png"
        },
        onLaunch() {
            uni.getStorage({
                key: "accountInfo",
                success: _ =>
                    uni.switchTab({
                        url: "/pages/home"
                    }),
                fail: _ =>
                    uni.navigateTo({
                        url: "/pages/index"
                    })
            });
        },
        onShow() {
            console.log("App Show");
        },
        onHide() {
            console.log("App Hide");
        }
    };
</script>

<style>
    /* * {
            touch-action: none;
        } */

    uni-radio .uni-radio-input.uni-radio-input-checked:before {
        font-size: 16rpx;
    }

    uni-radio .uni-radio-input {
        width: 30rpx;
        height: 30rpx;
    }

    view {
        display: flex;
        flex-direction: column;
    }

    label {
        display: flex;
        align-items: center;
    }

    uni-tabbar .uni-tabbar {
        z-index: 0;
    }

    navigator {
        display: flex;
    }

    scroll-view {
        height: 100%;
        box-sizing: border-box;
    }

    .status {
        height: var(--status-bar-height);
    }

    .root-tab-nav {
        height: calc(100vh - 44px - 50px);
    }

    .root-nav {
        height: calc(100vh - 44px);
    }

    .root-tab {
        height: calc(100vh - 50px);
    }

    .root {
        height: 100vh;
    }

    .shelter.full-screen {
        opacity: 0;
        height: 0;
        z-index: 999;
    }

    .shelter {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #333;
        opacity: 0.28;
        transition: opacity 0.3s;
    }

    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .f1 {
        flex: 1;
    }

    .lh-30 {
        line-height: 30rpx;
    }

    .pr15 {
        padding-right: 15rpx;
    }

    .pl15 {
        padding-left: 15rpx;
    }

    .pt10 {
        padding-top: 10rpx;
    }

    .pt28 {
        padding-top: 28rpx;
    }

    .pt50 {
        padding-top: 50rpx;
    }

    .pt60 {
        padding-top: 60rpx;
    }

    .pb10 {
        padding-bottom: 10rpx;
    }

    .pb20 {
        padding-bottom: 20rpx;
    }

    .pb28 {
        padding-bottom: 28rpx;
    }

    .pb50 {
        padding-bottom: 50rpx;
    }

    .mlr20 {
        margin-left: 20rpx;
        margin-right: 20rpx;
    }

    .mlr40 {
        margin-left: 40rpx;
        margin-right: 40rpx;
    }

    .mlr80 {
        margin-left: 80rpx;
        margin-right: 80rpx;
    }

    .ml12 {
        margin-left: 12rpx;
    }

    .ml15 {
        margin-left: 15rpx;
    }

    .ml18 {
        margin-left: 18rpx;
    }

    .ml20 {
        margin-left: 20rpx;
    }

    .ml22 {
        margin-left: 22rpx;
    }

    .ml25 {
        margin-left: 25rpx;
    }

    .ml30 {
        margin-left: 30rpx;
    }

    .ml35 {
        margin-left: 35rpx;
    }

    .ml50 {
        margin-left: 50rpx;
    }

    .ml77 {
        margin-left: 77rpx;
    }

    .ml90 {
        margin-left: 90rpx;
    }

    .mr11 {
        margin-right: 11rpx;
    }

    .mr18 {
        margin-right: 18rpx;
    }

    .mr22 {
        margin-right: 22rpx;
    }

    .mr35 {
        margin-right: 35rpx;
    }

    .mr50 {
        margin-right: 50rpx;
    }

    .mb11 {
        margin-bottom: 11rpx;
    }

    .mb18 {
        margin-bottom: 18rpx;
    }

    .mb20 {
        margin-bottom: 20rpx;
    }

    .mb22 {
        margin-bottom: 22rpx;
    }

    .mb30 {
        margin-bottom: 30rpx;
    }

    .mb35 {
        margin-bottom: 35rpx;
    }

    .mb44 {
        margin-bottom: 44rpx;
    }

    .mb50 {
        margin-bottom: 50rpx;
    }

    .mb60 {
        margin-bottom: 60rpx;
    }

    .mb140 {
        margin-bottom: 140rpx;
    }

    .mb180 {
        margin-bottom: 180rpx;
    }

    .mt3 {
        margin-top: 3rpx;
    }

    .mt10 {
        margin-top: 10rpx;
    }

    .mt15 {
        margin-top: 15rpx;
    }

    .mt18 {
        margin-top: 18rpx;
    }

    .mt20 {
        margin-top: 20rpx;
    }

    .mt22 {
        margin-top: 22rpx;
    }

    .mt25 {
        margin-top: 25rpx;
    }

    .mt28 {
        margin-top: 28rpx;
    }

    .mt30 {
        margin-top: 30rpx;
    }

    .mt33 {
        margin-top: 33rpx;
    }

    .mt35 {
        margin-top: 35rpx;
    }

    .mt38 {
        margin-top: 38rpx;
    }

    .mt40 {
        margin-top: 40rpx;
    }

    .mt45 {
        margin-top: 45rpx;
    }

    .mt50 {
        margin-top: 50rpx;
    }

    .mt55 {
        margin-top: 55rpx;
    }

    .mt60 {
        margin-top: 60rpx;
    }

    .mt70 {
        margin-top: 60rpx;
    }

    .mt110 {
        margin-top: 110rpx;
    }

    .mt290 {
        margin-top: 290rpx;
    }

    .fw-bold {
        font-weight: bold;
    }

    .fs12 {
        font-size: 12rpx;
    }

    .fs14 {
        font-size: 14rpx;
    }

    .fs16 {
        font-size: 16rpx;
    }

    .fs17 {
        font-size: 17rpx;
    }

    .fs18 {
        font-size: 18rpx;
    }

    .fs20 {
        font-size: 20rpx;
    }

    .fs21 {
        font-size: 20rpx;
    }

    .fs22 {
        font-size: 22rpx;
    }

    .fs23 {
        font-size: 23rpx;
    }

    .fs24 {
        font-size: 24rpx;
    }

    .fs25 {
        font-size: 25rpx;
    }

    .fs26 {
        font-size: 26rpx;
    }

    .fs28 {
        font-size: 28rpx;
    }

    .fs29 {
        font-size: 29rpx;
    }

    .fs30 {
        font-size: 30rpx;
    }

    .fs32 {
        font-size: 32rpx;
    }

    .fs33 {
        font-size: 33rpx;
    }

    .fs36 {
        font-size: 36rpx;
    }

    .fs40 {
        font-size: 40rpx;
    }

    .fs42 {
        font-size: 42rpx;
    }

    .fs62 {
        font-size: 62rpx;
    }

    .text-center {
        text-align: center;
    }

    .text-left {
        text-align: left;
    }

    .text-right {
        text-align: right;
    }

    .bg-f9 {
        background-color: #f9f9f9;
    }

    .bg-eee {
        background-color: #eee;
    }

    .bg-fff {
        background-color: #fff;
    }

    .bg-000 {
        background-color: #000;
    }

    .bg-ccc {
        background-color: #ccc;
    }

    .bg-d4 {
        background-color: #d4d4d4;
    }

    .bg-2b9f60 {
        background-color: #2b9f60;
    }

    .bg-a1bce2 {
        background-color: #a1bce2;
    }

    .bg-fbd59d {
        background-color: #fbd59d;
    }

    .bg-eb {
        background-color: #ebebeb;
    }

    .color-000 {
        color: #000;
    }

    .color-ccc {
        color: #ccc;
    }

    .color-fff {
        color: #fff;
    }

    .color-576b95 {
        color: #576b95;
    }

    .color-181818 {
        color: #181818;
    }

    .color-333 {
        color: #333;
    }

    .color-666 {
        color: #666;
    }

    .color-aaa {
        color: #aaa;
    }

    .color-eee {
        color: #eee;
    }

    .color-b1b1b1 {
        color: #b1b1b1;
    }

    .color-2b9f60 {
        color: #2b9f60;
    }

    .color-999 {
        color: #999;
    }

    .color-bf {
        color: #bfbfbf;
    }

    .color-9a {
        color: #9a9a9a;
    }
</style>
