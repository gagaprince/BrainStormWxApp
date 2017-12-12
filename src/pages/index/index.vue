<template>
    <div class="container">
        <template v-if="isLoading">
            <loading-page></loading-page>
        </template>
        <template v-if="!isLoading">
            <div class="search-frame t-l-vh_c">
                <div class="search t-l-v_c">
                    <input type="text"
                           :value="searchVal"
                           placeholder="请输入查询单词"
                           placeholder-style="color:#afafaf;font-size:16px;"
                           confirm-type="search"
                           @input="inputHandler"
                           @confirm="searchHandler"
                    >
                </div>
                <div class="search-btn iconfont icon-iconfront-sousuo" @click="searchHandler"></div>
            </div>
            <div class="header">
                <div v-if="userInfo.avatarUrl" class="header-img">
                    <img :src="userInfo.avatarUrl" alt="" mode="widthFix">
                </div>
                <div v-if="userInfo.nickName" class="welcome">Hi,{{userInfo.nickName}}</div>
                <div v-if="userInfo.nickName && record" class="day-num t-l-h_c">第{{record.dayIndex+1}}天</div>
                <div v-if="userInfo.nickName" class="desc t-l-h_c">{{energy.english}}</div>
            </div>
            <div v-if="false" class="pk t-l-vh_c">
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
                        <div class="word-num">{{record.collectCount}}</div>
                        <div class="desc">生词本</div>
                    </div><!--
                    <div class="word-card t-l-vh_c">
                        <div class="word-num">0</div>
                        <div class="desc">我的单词</div>
                    </div>-->
                </div>
                <div class="word-type t-l-vh_c">
                    当前使用：GRE词库
                </div>
                <form @submit="beginLearn" report-submit="true">
                    <div class="begin-btn-frame t-l-vh_c">
                        <!--<div @click="beginLearn">开始学习</div>-->
                        <button formType="submit" class="begin-btn">开始学习</button>
                    </div>
                </form>
                <form @submit="beginReview" report-submit="true">
                    <div class="review-btn-frame t-l-vh_c">
                        <button formType="submit" class="begin-btn">生词本</button>
                    </div>
                </form>
            </div>
        </template>
    </div>
</template>

<script>
import account from '../../lib/common/account';
import superbridge from '../../lib/common/superbridge';

import loadingPage from '../../components/loadingpage/loadingPage.component.vue';

let isFirstOnShow = true;
export default {
    data () {
        return {
            searchVal: '',
            userInfo: {},
            record: {},
            energy: '',
            isLoading: true,
            wordType: {
                id: 'cet4',
                name: '大学英语四级词库'
            },
            wordTypes: [
                {
                    id: 'cet4',
                    name: '大学英语四级词库'
                },
                {
                    id: 'cet6',
                    name: '大学英语六级词库'
                },
                {
                    id: 'gre',
                    name: 'GRE词库'
                }
            ]
        };
    },
    created () {
        //
    },
    onLoad () {
        this.isLoading = true;
        account.init().then(() => {
            console.log('账户初始化成功');
            console.log('openId:' + superbridge.getOpenId());
            this.init();
            isFirstOnShow = false;
        });
    },
    onShow () {
        if (!isFirstOnShow) {
            this.initRecord();
        }
    },
    onHide () {
        //
    },

    components: {
        'loading-page': loadingPage
    },

    methods: {
        init () {
            this.initHeader();
            this.initRecord();
            this.initEnergy();
        },
        initHeader () {
            superbridge.getUserInfo().then((res) => {
                console.log(res);
                this.userInfo = res.userInfo;
            });
        },
        initRecord () {
            superbridge.fetch('/brain/loadRecordNum', {
                showLoading: false,
                method: 'POST'
            }).then((res) => {
                if (res.code === 0) {
                    this.record = res.data;
                    this.isLoading = false;
                }
            });
        },
        initEnergy () {
            superbridge.fetch('/brain/energy', {
                method: 'POST'
            }).then((res) => {
                if (res.code === 0) {
                    this.energy = res.data;
                }
            });
        },
        beginLearn (e) {
            this.formSubmit(e).then(() => {
                let url = '/pages/learn/learn';
                superbridge.openWebview({
                    url
                });
            });
        },
        beginReview (e) {
            this.formSubmit(e).then(() => {
                let url = '/pages/review/review';
                superbridge.openWebview({
                    url
                });
            });
        },
        inputHandler (e) {
            this.searchVal = e.target.value;
        },
        searchHandler (e) {
            let val = this.searchVal;
            let url = `/pages/search/search?word=${val.trim()}`;
            superbridge.openWebview({
                url
            });
            setTimeout(() => {
                this.searchVal = '';
            });
        },
        formSubmit (e) {
            const formId = e.target.formId;
            return superbridge.fetch('/brain/collectFormId', {
                showLoading: false,
                method: 'POST',
                body: {
                    formId
                }
            });
        }
    }
};
</script>

<style>
    page{
        background:url(https://p1.meituan.net/codeman/cb0bf41ab416a426f6b8cc0d98b699a7135369.jpg);
        background-size: 375px 667px;
        height: 100%;
    }
</style>
<style lang="less" scoped>
    @import "../../lib/style/fonts/iconfont.css";
    @import "../../lib/style/layout";
    .container{
        /*background: rgba(255,255,255,0.8);*/
        height: 100%;
        .search-frame{
            width:100%;
            height: 50px;
            position: relative;
            .search{
                width:80%;
                height: 30px;
                background:#fff;
                border-radius: 15px;
                padding: 0 15px;
                input{
                    font-size: 18px;
                }
            }
            .search-btn{
                font-size: 20px;
                color: #40ba9e;
                position: absolute;
                right: 10%;
                top:13px;
                margin-left: -20px;
                z-index: 99;
            }
        }
        .header{
            min-height: 140px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 10px 10px;
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
                line-height: 60px;
                width:90%;
                color: #40ba9e;
                font-family:"SimHei";
                text-overflow:ellipsis;
                white-space:nowrap;
                overflow:hidden;
                text-align: center;
            }
            .desc{
                font-size: 15px;
                color: #efefef;
                width:80%;
            }
            .day-num{
                font-size: 20px;
                margin-bottom: 10px;
                color: #efefef;
                width:80%;
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
            /*background: rgba(255,255,255,0.8);*/
            .word-cards{
                padding: 0 10px;
                height:80px;
                display: flex;
                .word-card{
                    width:33.33%;
                    flex-direction: column;
                    .word-num{
                        font-size: 30px;
                        font-weight: bolder;
                        color: #efefef;
                        font-family:"STHupo";
                    }
                    .desc{
                        color: #efefef;
                        font-size: 14px;
                    }
                }
            }
            .word-type{
                color: #efefef;
                margin-top: 10px;

            }
            .begin-btn-frame,.review-btn-frame{
                position: absolute;
                bottom: 80px;
                width:100%;
                height:100px;
                .begin-btn{
                    width: 200px;
                    height:50px;
                    background: rgba(64,186,158,0.8);
                    color: #fff;
                    text-align: center;
                    line-height: 50px;
                    border-radius: 25px;
                }
            }
            .review-btn-frame{
                bottom: 20px;
            }
        }
    }
</style>
