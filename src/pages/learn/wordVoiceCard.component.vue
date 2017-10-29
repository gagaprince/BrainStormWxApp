<template>
    <div class="container">
        <div class="word-voice-frame t-l-v_c">
            <voice
                :voiceSrc="voiceSrc"
                :id="id"
            ></voice>
            <div class="word-voice">{{wordVoice}}</div>
        </div>
    </div>
</template>
<script>
    import voice from './voice.vue';
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            voiceSrc: {
                type: String,
                required: true
            },
            wordVoice: {
                type: String,
                required: true
            }
        },
        data () {
            return {
            };
        },
        components: {
            voice
        },
        computed: {},
        methods: {
        },
        created () {
            console.log('voice create');
        }
    };
</script>
<style lang="less" scoped>
    @import "../../lib/style/fonts/iconfont.css";
    @import "../../lib/style/layout";
    .container {
        .word-voice-frame{
            margin-top: 10px;
            .word-voice{
                font-size: 20px;
                margin-left: 20px;
                color: #635b68;
            }
        }
    }
</style>