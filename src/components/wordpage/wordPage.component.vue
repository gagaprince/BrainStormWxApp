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
            <div class="collection-btn" @click="collectBtnHandler">
                <div :class="collectBtnStyle"></div>
            </div>
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
            <div class="chinese ex">
                <div class="label-frame">
                    <div class="label">例句</div>
                </div>
                <div class="content-frame">
                    <div v-for="(item, index) in currentWord.brainSentenceModels" :key="index">
                        <template v-if="index<3">
                            <sentence
                                :id="`sentence_${index}`"
                                :word="currentWord.word"
                                :english="item.english.replace(/\\/gi,'')"
                                :chinese="item.chinese"
                                :voiceSrc="item.voice"
                                @wordTap="wordTapHandler"
                            ></sentence>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import superbridge from '../../lib/common/superbridge';
    import wordVoiceCard from '../wordVoiceCard.component.vue';
    import sentence from '../sentence.component.vue';
    export default {
        props: {
            currentWord: {
                type: Object,
                required: true
            },
            voiceObj: {
                type: Object,
                required: true
            },
            fromType: {
                type: String,
                required: false,
                defalut: 'learn'
            }
        },
        data () {
            return {
                isActive: false
            };
        },
        components: {
            'word-voice-card': wordVoiceCard,
            sentence
        },
        computed: {
            collectBtnStyle () {
                return this.isActive ? 'iconfont icon-shuqian shuqian active' : 'iconfont icon-shuqian shuqian'
            },
            onWordChange () {
                const word = this.currentWord;
                console.log(word);
                if (word.id) {
                    superbridge.fetch('/brain/isInCollect', {
                        showLoading: false,
                        body: {
                            wordId: word.id
                        },
                        method: 'POST'
                    }).then((res) => {
                        if (res.code === 0) {
                            let data = res.data;
                            if (data) {
                                // 有收藏过
                                this.isActive = data.isAlive;
                            } else {
                                this.isActive = false;
                            }
                        } else {
                            //
                        }
                    });
                }
            },
            en () {
                // 英文音标
                let enU = this.voiceObj.ph_en || '';
                if (enU) {
                    return `英 [${this._decode(enU)}]`;
                }
                return '';
            },
            am () {
                // 美国音标
                let amU = this.voiceObj.ph_am || '';
                if (amU) {
                    return `美 [${this._decode(amU)}]`;
                }
                return '';
            }
        },
        methods: {
            _decode (s) {
                let r = s.replace(/u/gi, '%u');
                r = unescape(r);
                return r;
            },
            wordTapHandler (word) {
                let url = `/pages/search/search?word=${word}`;
                if (this.fromType !== 'search') {
                    superbridge.openWebview({
                        url
                    });
                } else {
                    superbridge.openWebview({
                        url,
                        redirect: true
                    });
                }
            },
            _addCollection () {
                const word = this.currentWord;
                superbridge.fetch('/brain/addCollect', {
                    showLoading: false,
                    body: {
                        wordId: word.id
                    },
                    method: 'POST'
                });
            },
            _removeCollection () {
                const word = this.currentWord;
                superbridge.fetch('/brain/removeCollect', {
                    showLoading: false,
                    body: {
                        wordId: word.id
                    },
                    method: 'POST'
                });
            },
            collectBtnHandler () {
                if (this.isActive) {
                    this.isActive = 0;
                    this._removeCollection();
                } else {
                    this.isActive = 1;
                    this._addCollection();
                }
            }
        },
        created () {
            console.log('create');
        }
    };
</script>
<style lang="less" scoped>
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
            position: relative;
            .collection-btn{
                position: absolute;
                top:20px;
                right: 40px;
                .shuqian{
                    font-size: 30px;
                    color: #655d6a;
                }
                .active{
                    color: #40ba9e;
                }
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
                        border-radius: 5px;
                        background: #b9dfa5;
                        color: #fff;
                        font-size: 18px;
                        line-height: 30px;
                        text-align: center;
                    }
                }
                .content-frame{
                    width:300px;
                    margin-top: 5px;
                    .content{
                        margin-left: 20px;
                        font-size: 14px;
                        width:250px;
                        color: #635a68;
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
    }
</style>