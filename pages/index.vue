<template>
    <view>
        <image class="bg-banner" src="/static/bg-banner.png" />
        <view class="main">
            <view class="wrapper bg-fff">
                <sign-in v-if="signIn_or_signUp" @signUp="signUp" />
                <sign-up v-else @previousStep="previousStep" />
            </view>
        </view>
    </view>
</template>

<script>
    import signIn from "@/components/sign_in";
    import signUp from "@/components/sign_up";

    export default {
        components: { signUp, signIn },
        data() {
            return {
                signIn_or_signUp: true
            };
        },
        onLoad() {},
        methods: {
            signUp() {
                this.signIn_or_signUp = false;
            },
            previousStep() {
                this.signIn_or_signUp = true;
            }
        }
    };
</script>

<style>
    page {
        background-color: #f9f9f9;
    }
    
    .bg-banner {
        position: absolute;
        top: 0;
        height: 400rpx;
        width: 100%;
    }

    .main {
        margin-top: 256rpx;
        padding: 0 40rpx;
        box-sizing: border-box;
        z-index: 9;
    }

    .wrapper {
        box-shadow: 0 8rpx 12rpx 2rpx rgba(43, 159, 96, 0.12);
        border-radius: 14rpx;
        padding-bottom: 70rpx;
        box-sizing: border-box;
        overflow: hidden;
    }
</style>
