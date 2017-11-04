<template>
    <div class="container">
        <template v-if="isLoading">
            <loading-page></loading-page>
        </template>
        <template v-if="!isLoading">
            <scroll-view
                scorll-y
            >
                <word-page
                    :currentWord="currentWord"
                    :voiceObj="voiceObj"
                    fromType="search"
                ></word-page>
            </scroll-view>
        </template>
    </div>
</template>
<script>
    import account from '../../lib/common/account';
    import superbridge from '../../lib/common/superbridge';

    import wordPage from '../../components/wordpage/wordPage.component.vue';
    import loadingPage from '../../components/loadingpage/loadingPage.component.vue';
    export default {
        props: {},
        data () {
            return {
                currentWord: {},
                isLoading: true
            };
        },
        components: {
            'word-page': wordPage,
            'loading-page': loadingPage
        },
        computed: {
            voiceObj () {
                return JSON.parse(this.currentWord.voice || '{}');
            }
        },
        methods: {
            init (query) {
                let word = query.word;
                if (word) {
                    this.initWord(word);
                } else {
                    superbridge.closeWebview();
                }
            },
            initWord (word) {
                superbridge.fetch('/brain/search', {
                    body: {
                        word
                    },
                    method: 'POST'
                }).then((res) => {
                    if (res.code === 0) {
                        let data = res.data;
                        if (data) {
                            this.currentWord = data;
                        }
                        this.isLoading = false;
                    } else {
                        superbridge.alert({
                            content: '没有搜到这个词',
                            title: '对不起'
                        }).then(() => {
                            superbridge.closeWebview();
                        });
                    }
                });
            }
        },
        created () {
            console.log('create');
        },
        onLoad (data) {
            this.isLoading = true;
            account.init().then(() => {
                this.init(this.$root.$mp.query);
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
        .next-btn{
            width:50px;
            height:50px;
            border-radius: 50%;
            background: #b9dfa5;
            position: fixed;
            right: 20px;
            bottom: 10px;
            color: #fff;
            font-size: 12px;
        }
    }
</style>