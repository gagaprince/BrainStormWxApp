<template>
    <div class="container">
        <div class="voice-btn t-l-vh_c" @click="playAmVoice">
            <div class="iconfont icon-xiaolaba laba"></div>
            <template v-if="voiceSrc">
                <audio :src="voiceSrc" :id="id"></audio>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
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
        computed: {},
        methods: {
            playAmVoice () {
                let audioCtx = wx.createAudioContext(this.id);
                audioCtx.play();
            }
        },
        created () {
            console.log('create');
        }
    };
</script>
<style lang="less" scoped>
    @import "../../lib/style/fonts/iconfont.css";
    @import "../../lib/style/layout";
    .container {
        .voice-btn{
            width:30px;
            height:30px;
            border-radius: 50%;
            background: #a09ca3;
            .laba{
                color:#fff;
                font-size: 16px;
                font-weight: bolder;
            }
        }
    }
</style>