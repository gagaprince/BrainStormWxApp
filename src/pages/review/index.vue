<template>
    <div class="container">
        <template v-if="isLoading">
            <loading-page></loading-page>
        </template>
        <template v-if="!isLoading">
            <template v-if="isShow">
                <scroll-view
                    scroll-y="true"
                    :style="scrollViewStyle"
                    :scroll-top="scrollViewTop"
                >
                    <word-page
                        :currentWord="currentWord"
                        :voiceObj="voiceObj"
                    ></word-page>
                    <div v-if="false" class="learn-schedule">
                        学习进度
                    </div>
                </scroll-view>
                <div class="footer t-l-vh_c">
                    <div class="pre-btn t-l-vh_c" @click="preWord">上一个</div>
                    <progress
                        :percent="wordPercent"
                        activeColor="#b9dfa5"
                    ></progress>
                    <div class="progress-desc t-l-vh_c">{{wordProgress}}</div>
                    <div class="next-btn t-l-vh_c" @click="nextWord">下一个</div>
                </div>
            </template>
        </template>
    </div>
</template>
<script>
    import account from '../../lib/common/account';
    import superbridge from '../../lib/common/superbridge';

    import wordPage from '../../components/wordpage/wordPage.component.vue';
    import loadingPage from '../../components/loadingpage/loadingPage.component.vue';
    import store from '../../lib/common/store';
    export default {
        props: {},
        data () {
            return {
                isShow: false,
                wordList: [],
                nowIndex: 0,
                isLoading: true,
                scrollViewStyle: 'height:0px;',
                scrollViewTop: 0
            };
        },
        components: {
            'word-page': wordPage,
            'loading-page': loadingPage
        },
        computed: {
            voiceObj () {
                return JSON.parse(this.currentWord.voice || '{}');
            },
            currentWord () {
                return this.wordList && this.wordList[this.nowIndex] || {};
            },
            wordPercent () {
                let percent = 0;
                if (this.wordList) {
                    percent = parseInt((this.nowIndex + 1) / (this.wordList.length) * 100);
                }
                return percent;
            },
            wordProgress () {
                let progress = '';
                if (this.wordList) {
                    progress = `${this.nowIndex + 1}/${this.wordList.length}`;
                }
                return progress;
            }
        },
        methods: {
            init () {
                this.initRecord();
                this.initScrollViewStyle();
            },
            initRecord () {
                superbridge.fetch('/brain/listCollect', {
                    body: {
                    },
                    method: 'POST'
                }).then((res) => {
                    if (res.code === 0) {
                        let data = res.data;
                        if (data) {
                            this.wordList = data;
                            if (data.length === 0) {
                                superbridge.alert({
                                    content: '生词本是空的，还是去学习今日单词吧',
                                    title: '提示'
                                }).then(() => {
                                    let url = '/pages/learn/learn';
                                    superbridge.openWebview({
                                        url,
                                        redirect: true
                                    });
                                });
                            } else {
                                this.isShow = true;
                            }
                        }
                        this.isLoading = false;
                        this.showWordTost();
                    } else {
                        superbridge.alert({
                            content: '服务器出错了，请稍后再试',
                            title: '对不起'
                        }).then(() => {
                            superbridge.closeWebview();
                        });
                    }
                });
            },
            initScrollViewStyle () {
                superbridge.getSystemInfo().then((res) => {
                    let windowHeight = res.windowHeight;
                    this.scrollViewStyle = `height:${windowHeight - 70}px;`;
                });
            },
            showWordTost () {
                let hasShow = store.get('hasShowWordTost', '');
                if (!hasShow) {
                    superbridge.alert({
                        content: '点击不认识的单词可以直接查询哟',
                        title: '温馨提示'
                    });
                    store.set('hasShowWordTost', 1);
                }
            },
            preWord () {
                this.nowIndex --;
                if (this.nowIndex < 0) {
                    this.nowIndex = this.wordList.length - 1;
                }
                this.scrollViewTop = 0;
            },
            nextWord () {
                this.nowIndex ++;
                if (this.nowIndex >= (this.wordList.length)) {
                    this.nowIndex = 0;
                }
                this.scrollViewTop = 0;
            }
        },
        created () {
            console.log('create');
        },
        onLoad (data) {
            this.isLoading = true;
            account.init().then(() => {
                this.init();
            });
        },
        onShow () {
            console.log('onShow');
        },
        onHide () {
            console.log('onHide');
        },
        onPullDownRefresh () {
            console.log('onPullDownRefresh');
        }
    };
</script>
<style>
    page{
        background: #fefefe;
    }
</style>
<style lang="less" scoped>
    @import "../../lib/style/fonts/iconfont.css";
    @import "../../lib/style/layout";
    .container {
        scroll-view{
            height: 100%;
        }
        .footer{
            height:70px;
            width:100%;
            position: absolute;
            z-index: 99;
            bottom: 0;
            background: #fff;
            progress{
                width:45%;
            }
            .progress-desc{
                font-size: 16px;
                width:50px;
                color: #40ba9e;
            }
            .pre-btn,.next-btn{
                width:50px;
                height:50px;
                border-radius: 50%;
                background: #b9dfa5;
                position: absolute;
                color: #fff;
                font-size: 12px;
                bottom: 10px;
            }
            .pre-btn{
                left: 20px;
            }
            .next-btn{
                right: 20px;
            }
        }

    }
</style>