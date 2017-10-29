<template>
    <div class="container">
        <div class="header">
            <div v-if="userInfo.avatarUrl" class="header-img">
                <img :src="userInfo.avatarUrl" alt="" mode="widthFix">
            </div>
            <div v-if="userInfo.nickName" class="welcome t-l-vh_c">Hi,{{userInfo.nickName}}</div>
            <div v-if="userInfo.nickName" class="desc t-l-h_c">不积跬步无以至千里,一定要坚持哟</div>
        </div>
        <div class="pk t-l-vh_c">
            <div class="friend-pk">
                <img src="http://p0.meituan.net/codeman/244aea13af93a91cb61f3ff7c31b9dfd58978.jpg" alt="" mode="widthFix">
                <div class="desc">好友对战</div>
            </div>
            <div class="random-pk">
                <img src="http://p1.meituan.net/codeman/4fc75dcfc17037627a16539d1cb9214e84636.jpg" alt="" mode="widthFix">
                <div class="desc">随机对战</div>
            </div>
        </div>
        <div class="learn">
            <div class="word-cards">
                <div class="word-card t-l-vh_c">
                    <div class="word-num">{{record.newSize}}</div>
                    <div class="desc">新词数</div>
                </div>
                <div class="word-card t-l-vh_c">
                    <div class="word-num">{{record.totalSize}}</div>
                    <div class="desc">今日单词</div>
                </div>
                <div class="word-card t-l-vh_c">
                    <div class="word-num">{{record.totalSize}}</div>
                    <div class="desc">剩余单词</div>
                </div><!--
                <div class="word-card t-l-vh_c">
                    <div class="word-num">0</div>
                    <div class="desc">我的单词</div>
                </div>-->
            </div>
            <div class="begin-btn-frame t-l-vh_c">
                <div @click="beginLearn" class="begin-btn">开始学习</div>
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
            userInfo: {},
            record: {}
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
            this.initRecord();
        },
        initHeader () {
            superbridge.getUserInfo().then((res) => {
                console.log(res);
                this.userInfo = res.userInfo;
            });
        },
        initRecord () {
            superbridge.fetch('/brain/loadRecordNum', {
                method: 'POST'
            }).then((res) => {
                if (res.code === 0) {
                    this.record = res.data;
                }
            });
        },
        beginLearn () {
            let url = '/pages/learn/learn';
            superbridge.openWebview({
                url
            });
        }
    }
};
</script>

<style>
    page{
        background:url(http://p1.meituan.net/codeman/bfd4d94c7fed81a71fd4ad5051ab8bcc70771.jpg);
        background-size: 375px 667px;
        height: 100%;
    }
</style>
<style lang="less" scoped>
    @import "../../lib/style/fonts/iconfont.css";
    @import "../../lib/style/layout";
    .container{
        .header{
            min-height: 140px;
            background: rgba(255,255,255,0.8);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 10px;
            .header-img{
                width:50px;
                height:50px;
                border-radius: 50%;
                overflow: hidden;
                border: 4px solid #efefef;
                Image{
                    width:100%;
                }
            }
            .welcome{
                height: 60px;
                font-size: 30px;
                font-weight: bolder;
                color: #40ba9e;
                font-family:"SimHei";
            }
            .desc{
                font-size: 15px;
                color: #999;
            }
        }
        .pk{
            margin-top: 10px;
            padding: 12px 10px;
            background: rgba(255,255,255,0.8);
            height:170px;
            .friend-pk{
                width:200px;
                height:150px;
                margin-right: 15px;
            }
            .random-pk{
                width:100px;
                height:150px;
                margin-left: 15px;
            }
            .friend-pk,.random-pk{
                position: relative;
                border-radius: 5px;
                overflow: hidden;
                Image{
                    width:100%;
                }
                .desc{
                    position: absolute;
                    color: #fff;
                    top:0;
                    margin:10px 0 0 10px;
                    font-family: "SimHei";
                }
            }
        }
        .learn{
            margin-top: 10px;
            background: rgba(255,255,255,0.8);
            .word-cards{
                padding: 0 10px;
                height:100px;
                display: flex;
                .word-card{
                    width:33.33%;
                    flex-direction: column;
                    .word-num{
                        font-size: 30px;
                        font-weight: bolder;
                        color: #333;
                        font-family:"STHupo";
                    }
                    .desc{
                        color: #999;
                        font-size: 14px;
                    }
                }
            }
            .begin-btn-frame{
                width:100%;
                height:100px;
                .begin-btn{
                    width: 200px;
                    height:50px;
                    background: #40ba9e;
                    color: #fff;
                    text-align: center;
                    line-height: 50px;
                    border-radius: 25px;
                }
            }
        }
    }
</style>
