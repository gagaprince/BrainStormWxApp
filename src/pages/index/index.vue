<template>
    <div class="container">
        <div v-if="userInfo.avatarUrl" class="header-frame">
            <div class="header-img">
                <img :src="userInfo.avatarUrl" alt="" mode="widthFix">
            </div>
            <div class="header-msg">
                <div class="line-item">
                    <div class="label">{{userInfo.nickName}}</div>
                    <div class="money">
                        <div class="gold">
                            <img
                                src="http://p0.meituan.net/codeman/4a832502b68d73d3714239ee87ae74457091.png"
                                alt=""
                                mode="widthFix"
                            >
                        </div>
                        <div class="num">2333</div>
                        <div class="plus iconfont icon-iconjiahao"></div>
                    </div>
                </div>
                <div class="line-item">
                    <div class="label">LV.10</div>
                    <div class="score">
                        <div class="score-content"></div>
                    </div>
                </div>
            </div>
            <div class="qrcode"></div>
        </div>
        <div class="icon-list">
            <div class="icon-item">
                <div class="icon-img">
                    <img
                        src="http://p1.meituan.net/codeman/206e91d7a4c6ec42ad611cd96c4782ce9906.png"
                        alt=""
                        mode="widthFix"
                    >
                </div>
                <div class="name">排位赛</div>
            </div>
            <div class="icon-item">
                <div class="icon-img">
                    <img
                        src="http://p1.meituan.net/codeman/28de17f9d6cb97f35b61a3204cf959e94645.png"
                        alt=""
                        mode="widthFix"
                    >
                </div>
                <div class="name">好友排行</div>
            </div>
            <div class="icon-item">
                <div class="icon-img">
                    <img
                        src="http://p0.meituan.net/codeman/ca5afc3d0062c8a886cd5e4b990178354377.png"
                        alt=""
                        mode="widthFix"
                    >
                </div>
                <div class="name">好友对战</div>
            </div>
            <div class="icon-item">
                <div class="icon-img">
                    <img
                        src="http://p1.meituan.net/codeman/74249adf5f2db3dc92aa46984bc48b1e4545.png"
                        alt=""
                        mode="widthFix"
                    >
                </div>
                <div class="name">一站到底</div>
            </div>
            <div class="icon-item">
                <div class="icon-img">
                    <img
                        src="http://p1.meituan.net/codeman/8234485dd1d9c2dd3eb9cfc2585c38bb5352.png"
                        alt=""
                        mode="widthFix"
                    >
                </div>
                <div class="name">商店</div>
            </div>
            <div class="icon-item">
                <div class="icon-img">
                    <img
                        src="http://p0.meituan.net/codeman/91bd1887a3ba18c3f0a71ccdc7a7fde24853.png"
                        alt=""
                        mode="widthFix"
                    >
                </div>
                <div class="name">银行</div>
            </div>
            <div class="icon-item">
                <div class="icon-img">
                    <img
                        src="http://p1.meituan.net/codeman/61c6176aa87273d7bf2b245a65d8c5877929.png"
                        alt=""
                        mode="widthFix"
                    >
                </div>
                <div class="name">我的物品</div>
            </div>
        </div>
    </div>
</template>

<script>
import account from '../../lib/common/account';
import superbridge from '../../lib/common/superbridge';
export default {
    data () {
        return {
            userInfo: {}
        };
    },
    created () {
        //
    },
    onLoad () {
        account.init().then(() => {
            console.log('账户初始化成功');
            console.log('openId:' + superbridge.getOpenId());
            this.init();
        });
    },
    onHide () {
        //
    },

    components: {
    },

    methods: {
        init () {
            this.initHeader();
        },
        initHeader () {
            superbridge.getUserInfo().then((res) => {
                console.log(res);
                this.userInfo = res.userInfo;
            });
        }
    }
};
</script>

<style>
    page{
        background:#FFF;
        background:
            linear-gradient(45deg, #344984 25%, #2e437b 0,#2e437b 50%,#344984 0%,#344984 75%,#2e437b 0);
        background-size:10px 10px;
    }
</style>
<style lang="less" scoped>
    @import "../../lib/style/fonts/iconfont.css";
    .container{
        padding: 0 15px;
        .header-frame{
            height: 56px;
            padding: 6px 0;
            background: #2a4b8b;
            border-radius: 5px;
            border: 1px solid #2a4b8b;
            display: flex;
            justify-content: center;
            .header-img{
                width:50px;
                height:50px;
                border-radius: 50%;
                border: 3px solid #fff;
                overflow: hidden;
                Image{
                    width:100%;
                }
            }
            .header-msg{
                width:190px;
                padding: 0 0 0 15px;
                .line-item{
                    height:25px;
                    margin:3px 0;
                    display: flex;
                    align-items: center;
                    position: relative;
                    .label{
                        color: #fff;
                        font-size: 14px;
                    }
                    .money, .score{
                        width:120px;
                        position: absolute;
                        right: 0;
                        height: 100%;
                    }
                    .money{
                        height:15px;
                        border-radius:5px;
                        background: #26366d;
                        display: flex;
                        justify-content: center;
                        .gold {
                            left: 0;
                            position: absolute;
                            margin-top: -2px;
                            width:20px;
                            height: 20px;
                            Image{
                                width:100%;
                            }
                        }
                        .num{
                            color: #fff;
                            font-size: 13px;
                        }
                        .plus{
                            position: absolute;
                            right:0;
                            color:#fff;
                            font-size: 10px;
                            margin-top: 2px;
                            margin-right: 2.5px;
                        }
                    }
                    .score{
                        width:130px;
                        height:12.5px;
                        border-radius: 8px;
                        background: #26366d;
                        .score-content{
                            width:10px;
                            height: 12px;
                            border-radius: 8px;
                            background: #fff;
                        }
                    }
                }
            }
            .qrcode{
                width:50px;
            }
        }
        .icon-list{
            display: flex;
            flex-wrap: wrap;
            .icon-item{
                width:33%;
                height: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .icon-img{
                    width:70px;
                    height:70px;
                    overflow: hidden;
                    Image{
                        width:100%;
                    }
                }
                .name{
                    color: #fff;
                    font-size: 12px;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
    }
</style>
