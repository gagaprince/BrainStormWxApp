<template>
    <div class="container">
        <div class="word-frame">
            <div class="word-card">{{currentWord.word}}</div>
            <word-voice-card
                id="amAudio"
                :voiceSrc="voiceObj.ph_am_mp3"
                :wordVoice="am"
            ></word-voice-card>
            <word-voice-card
                id="enAudio"
                :voiceSrc="voiceObj.ph_en_mp3"
                :wordVoice="en"
            ></word-voice-card>
            <div class="bt-line"></div>
        </div>
        <div v-if="currentWord.brainMeanModels" class="trans-frame">
            <div class="chinese">
                <div class="label-frame">
                    <div class="label">中文</div>
                </div>
                <div class="content-frame">
                    <div class="content" v-for="(item, index) in currentWord.brainMeanModels" :key="index">
                        {{item.brainPosModel.name}} {{item.means}}
                    </div>
                </div>
            </div>
            <div v-if="false" class="chinese ex">
                <div class="label-frame">
                    <div class="label">例句</div>
                </div>
                <div class="content"></div>
            </div>
        </div>
        <div v-if="false" class="learn-schedule">
            学习进度
        </div>
        <div class="next-btn t-l-vh_c" @click="nextWord">下一个</div>
    </div>
</template>
<script>
    import account from '../../lib/common/account';
    import superbridge from '../../lib/common/superbridge';

    import wordVoiceCard from './wordVoiceCard.component.vue';
    export default {
        props: {},
        data () {
            return {
                newWordList: [],
                historyWordList: [],
                nowIndex: 0
            };
        },
        components: {
            'word-voice-card': wordVoiceCard
        },
        computed: {
            voiceObj () {
                return JSON.parse(this.currentWord.voice || '{}');
            },
            en () {
                // 英文音标
                let enU = this.voiceObj.ph_en || '';
                return `英 [${this._decode(enU)}]`;
            },
            am () {
                // 美国音标
                let amU = this.voiceObj.ph_am || '';
                return `美 [${this._decode(amU)}]`;
            },
            currentWord () {
                return this.newWordList && (this.newWordList[this.nowIndex] || (this.histroyWordList && this.histroyWordList[this.nowIndex - this.newWordList.length])) || {};
            }
        },
        methods: {
            init () {
                this.initRecord();
            },
            initRecord () {
                superbridge.fetch('/brain/loadRecord', {
                    method: 'POST'
                }).then((res) => {
                    if (res.code === 0) {
                        let data = res.data;
                        if (data) {
                            this.newWordList = data.newWords;
                            this.histroyWordList = data.historyWords;
                        }
                    }
                    console.log(this.currentWord);
                });
            },
            _decode (s) {
                let r = s.replace(/u/gi, '%u');
                r = unescape(r);
                return r;
            },
            nextWord () {
                this.nowIndex ++;
                if (this.nowIndex >= (this.newWordList.length + this.histroyWordList.length)) {
                    this.nowIndex = 0;
                }
                console.log(this.nowIndex);
            }
        },
        created () {
            console.log('create');
        },
        onLoad (data) {
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
        .word-frame{
            padding: 0 20px;
            .word-card{
                color: #655d6a;
                font-size: 40px;
                font-weight: bolder;
                height: 60px;
                line-height: 60px;
            }
            .bt-line{
                margin-top: 20px;
                border-bottom: 1px dashed #afafaf;
            }
        }
        .trans-frame{
            padding: 0 20px;
            .chinese{
                margin-top: 10px;
                display: flex;
                .label-frame{
                    width:50px;
                    .label{
                        width:50px;
                        height:30px;
                        border-radius: 10px;
                        background: #b9dfa5;
                        color: #efefef;
                        font-size: 18px;
                        line-height: 30px;
                        text-align: center;
                    }
                }
                .content-frame{
                    width:250px;
                    margin-top: 5px;
                    .content{
                        margin-left: 20px;
                        font-size: 14px;
                        width:250px;
                    }
                }
            }
            .ex{
                margin-top: 20px;
                .label-frame{
                    .label{
                        background: #efc7c7;
                    }
                }

            }
        }
        .next-btn{
            width:80px;
            height:80px;
            border-radius: 50%;
            background: #b9dfa5;
            position: fixed;
            right: 20px;
            bottom: 10px;
            color: #fff;
        }
    }
</style>