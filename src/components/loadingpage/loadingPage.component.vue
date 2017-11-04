<template>
    <div class="container">
        <div class="load-container">
            <div class="loader"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {},
        data () {
            return {};
        },
        components: {},
        computed: {},
        methods: {},
        created () {
            console.log('create');
        }
    };
</script>
<style lang="less" scoped>
    .container {
        height: 100%;
        width:100%;
        background: #fff;
        .load-container{
            width:100%;
            height: 100%;
            .loader {
                top:0;
                bottom: 0;
                left:0;
                right: 0;
                margin: auto;
                position: absolute;
                font-size: 15px;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                text-indent: -9999em;
                -webkit-animation: load4 1.3s infinite linear;
                animation: load4 1.3s infinite linear;
            }
            @-webkit-keyframes load4 {
                0%,
                100% {
                    box-shadow: 0em -3em 0em 0.2em #40ba9e, 2em -2em 0 0em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 -0.5em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 0em #40ba9e;
                }
                12.5% {
                    box-shadow: 0em -3em 0em 0em #40ba9e, 2em -2em 0 0.2em #40ba9e, 3em 0em 0 0em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 -0.5em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                25% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 0em #40ba9e, 3em 0em 0 0.2em #40ba9e, 2em 2em 0 0em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 -0.5em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                37.5% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 0em #40ba9e, 2em 2em 0 0.2em #40ba9e, 0em 3em 0 0em #40ba9e, -2em 2em 0 -0.5em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                50% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 0em #40ba9e, 0em 3em 0 0.2em #40ba9e, -2em 2em 0 0em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                62.5% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 0em #40ba9e, -2em 2em 0 0.2em #40ba9e, -3em 0em 0 0em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                75% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 0em #40ba9e, -3em 0em 0 0.2em #40ba9e, -2em -2em 0 0em #40ba9e;
                }
                87.5% {
                    box-shadow: 0em -3em 0em 0em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 0em #40ba9e, -3em 0em 0 0em #40ba9e, -2em -2em 0 0.2em #40ba9e;
                }
            }
            @keyframes load4 {
                0%,
                100% {
                    box-shadow: 0em -3em 0em 0.2em #40ba9e, 2em -2em 0 0em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 -0.5em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 0em #40ba9e;
                }
                12.5% {
                    box-shadow: 0em -3em 0em 0em #40ba9e, 2em -2em 0 0.2em #40ba9e, 3em 0em 0 0em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 -0.5em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                25% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 0em #40ba9e, 3em 0em 0 0.2em #40ba9e, 2em 2em 0 0em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 -0.5em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                37.5% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 0em #40ba9e, 2em 2em 0 0.2em #40ba9e, 0em 3em 0 0em #40ba9e, -2em 2em 0 -0.5em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                50% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 0em #40ba9e, 0em 3em 0 0.2em #40ba9e, -2em 2em 0 0em #40ba9e, -3em 0em 0 -0.5em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                62.5% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 0em #40ba9e, -2em 2em 0 0.2em #40ba9e, -3em 0em 0 0em #40ba9e, -2em -2em 0 -0.5em #40ba9e;
                }
                75% {
                    box-shadow: 0em -3em 0em -0.5em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 0em #40ba9e, -3em 0em 0 0.2em #40ba9e, -2em -2em 0 0em #40ba9e;
                }
                87.5% {
                    box-shadow: 0em -3em 0em 0em #40ba9e, 2em -2em 0 -0.5em #40ba9e, 3em 0em 0 -0.5em #40ba9e, 2em 2em 0 -0.5em #40ba9e, 0em 3em 0 -0.5em #40ba9e, -2em 2em 0 0em #40ba9e, -3em 0em 0 0em #40ba9e, -2em -2em 0 0.2em #40ba9e;
                }
            }
        }
    }
</style>