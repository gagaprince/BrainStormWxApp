<template>
    <div class="container">
        <div :class="btnClass" @click="playAmVoice">
            <div class="iconfont icon-laba laba"></div>
            <template v-if="voiceSrc">
                <audio :src="voiceSrc" :id="id"></audio>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            size: {
                type: String,
                required: false
            },
            id: {
                type: String,
                required: true
            },
            voiceSrc: {
                type: String,
                required: true
            }
        },
        data () {
            return {};
        },
        components: {},
        computed: {
            btnClass () {
                return `voice-btn t-l-vh_c ${this.size || ''} ${this.voiceSrc ? '' : 'disable'}`;
            }
        },
        methods: {
            playAmVoice () {
                if (this.voiceSrc) {
                    let audioCtx = wx.createAudioContext(this.id);
                    audioCtx.play();
                }
            }
        },
        created () {
            console.log('create');
        }
    };
</script>
<style lang="less" scoped>
    @import "../lib/style/fonts/iconfont.css";
    @import "../lib/style/layout";
    .container {
        .voice-btn{
            width:30px;
            height:30px;
            border-radius: 50%;
            background: #a09ca3;
            .laba{
                margin-top:-1px;
                color:#fff;
                font-size: 16px;
                font-weight: bolder;
            }
        }
        .disable{
            background: #efefef;
        }
        .small{
            width:20px;
            height: 20px;
            .laba{
                color:#fff;
                font-size: 10px;
            }
        }
    }
</style>