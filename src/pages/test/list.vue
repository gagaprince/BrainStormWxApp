<template>
    <div>
        <div v-for="(item,index) in dataList" :key="index">
            <div @click="onItemTap(item)">{{item}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            dataList: {
                type: Object,
                required: true
            }
        },
        methods: {
            onItemTap (item) {
                this.$emit('itemTap', item);
            }
        }
    };
</script>

<style>

</style>
