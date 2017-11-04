<template>
    <div class="container">
        <div class="content en">
            <span v-for="(item, index) in splitWords" :key="index" :class="item.classType" @click="wordTapHandler($event,item.word)">
                {{item.word}}
            </span>
            <span class="voice">
                <voice
                    size="small"
                    :voiceSrc="voiceSrc"
                    :id="id"
                ></voice>
            </span>
        </div>
        <div class="content zn">
            {{chinese}}
        </div>
        <div class="mt"></div>
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
            word: {
                type: String,
                required: true
            },
            english: {
                type: String,
                required: true
            },
            chinese: {
                type: String,
                required: true
            },
            voiceSrc: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                //
            };
        },
        components: {
            voice
        },
        computed: {
            splitWords () {
                return this.english.split(' ').reduce((pre, item) => {
                    pre.push({
                        word: item,
                        classType: item.toLowerCase().split(/[\\.|\\!|,|\\?]/)[0] === this.word.toLowerCase() ? 'weight' : ''
                    });
                    return pre;
                }, []);
            }
        },
        methods: {
            wordTapHandler (e, word) {
                this.$emit('wordTap', word);
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
        .content{
            margin-left: 20px;
            font-size: 14px;
            width:250px;
            color: #635a68;
        }
        .en{
            font-size: 16px;
            position: relative;
            .voice{
                position: absolute;
                bottom: 0;
                margin-left: 10px;
            }
            .weight{
                font-weight: bolder;
                font-size: 18px;
                color: #333;
            }
        }
        .zn{
            font-size: 16px;
        }
        .mt{
            margin-top: 10px;
        }
    }
</style>