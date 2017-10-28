<script>

export default {
    created () {

    },
    onLaunch () {
        console.log('app on launch!');
        console.log(this.$root.$mp);
    },
    onShow () {
        console.log('app show');
    },
    onHide () {
        console.log('app onhide');
    }
};
</script>

<style>

</style>
