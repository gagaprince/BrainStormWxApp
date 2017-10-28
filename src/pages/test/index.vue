<template>
    <div class="test">
        <div class="btns">
            <div class="btn">
                <button type="default" size="mini" @click="showtoast($event,9)">测试toast</button>
            </div>
            <div class="btn">
                <button type="default" size="mini" @click="showModal">测试模态窗</button>
            </div>
            <div class="btn">
                <button type="default" size="mini" @click="showLoading">showloading</button>
            </div>
            <div class="btn">
                <button type="default" size="mini" @click="hideLoading">hideloading</button>
            </div>
            <div class="btn">
                <button type="default" size="mini" @click="showActionSheet">showActionSheet</button>
            </div>
            <div class="btn">
                <button type="default" size="mini" @click="goIndex">去首页</button>
            </div>

            <div class="btn">
                <button type="default" size="mini" @click="countAdd">countAdd</button>
            </div>
            <div>计数器{{count}}</div>
            <div>1计算计数器{{computedCount}}</div>
            <div>2计算计数器{{computedCount2}}</div>
            <div v-if="count>1">
                <view class="section__title">普通选择器</view>
            </div>
            <div v-show="isShow">
                <picker @change="bindPickerChange" :value="index" :range="pickArray">
                    <view class="picker">
                        <div>当前选择是：{{pickArray[index]}}</div>
                        <div>当前的计算值是：{{computedPick}}</div>
                    </view>
                </picker>
            </div>
            <div v-show="false">
                <scroll-view scroll-y class="scroll-view_H" style="height: 200px;"
                             @scrolltoupper="top"
                             @scrolltolower="low"
                             @scroll="scroll">
                    <div class="view-items">
                        <view id="green" class="scroll-view-item bc_green"></view>
                        <view id="red" class="scroll-view-item bc_red"></view>
                        <view id="yellow" class="scroll-view-item bc_yellow"></view>
                        <view id="blue" class="scroll-view-item bc_blue"></view>
                    </div>
                </scroll-view>
            </div>
            <div class="touchTest">
                <div class="touch-frame"
                     @touchstart="touchStartHandle"
                     @touchmove="touchMoveHandle"
                     @touchend="touchEndHandle">

                </div>
            </div>

            <div>{{pickArray}}</div>

            <alist :dataList="pickArray" @itemTap="itemTapHandle"></alist>

        </div>
    </div>
</template>

<script>

import superbridge from '../../lib/common/superbridge';
import list from './list';

export default {
    components: {
        alist: list
    },
    data () {
        return {
            logs: [],
            pickArray: [1, 2, 3, 4, 5],
            index: 0,
            hello: 'sdfg',
            isShow: true,
            count: 0
        };
    },
    methods: {
        showModal () {
            wx.showModal({
                title: '提示',
                content: '这是一个模态弹窗',
                success (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },
        showtoast (e, num) {
            console.log(num);
            console.log(e);
            wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
            });
        },
        showLoading () {
            wx.showLoading({
                title: '加载中'
            });
        },
        hideLoading () {
            wx.hideLoading();
        },
        showActionSheet () {
            wx.showActionSheet({
                itemList: ['A', 'B', 'C'],
                success: function (res) {
                    console.log(res.tapIndex);
                },
                fail: function (res) {
                    console.log(res.errMsg);
                }
            });
        },
        goIndex () {
            let url = '/pages/index/index';
            superbridge.openWebview({url});
        },
        bindPickerChange (e) {
            console.log('picker发送选择改变，携带值为', e.target.value);
            this.index = e.target.value;
        },
        top () {
            console.log('top');
        },
        low () {
            console.log('low');
        },
        scroll () {
            console.log('scroll');
        },
        itemTapHandle (item) {
            console.log('index : ' + item);
        },
        countAdd () {
            setTimeout(() => {
                this.count++;
            }, 1000);
        },
        touchStartHandle (e) {
            console.log(e);
        },
        touchMoveHandle (e) {
            console.log(e);
            e.stopPropagation();
        },
        touchEndHandle (e) {
            console.log(e);
        },
        _reset () {
            this.count = 0;
        }
    },
    computed: {
        computedPick () {
            let val = this.pickArray[this.index];
            return val * val;
        },
        computedCount () {
            return this.count * 2;
        },
        computedCount2 () {
            return this.count * 3;
        }
    },

    created (data) {
        console.log('test created');
        console.log('data：' + data);
    },
    onLoad (data) {
        console.log('test onLoad');
        let page = superbridge.getCurrentPage();
        console.log(page.options);
        wx.setTopBarText({
            text: 'hello, world!'
        });
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#ff0000',
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        });
        wx.showNavigationBarLoading();
        wx.setNavigationBarTitle({
            title: '当前页面'
        });
        console.log(this.$root.$mp.query);
    },
    onShow () {
        setTimeout(() => {
            wx.hideNavigationBarLoading();
        }, 1000);
    },
    onHide () {
        console.log('test on hide');
    },
    onPullDownRefresh () {
        console.log('refresh');
        this._reset();
        wx.stopPullDownRefresh();
    }
};
</script>

<style lang="less">
.test {
    .test1 {
        font-size: 18px;
        display: block;
    }
}

.btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
        display: block;
        button {
            min-width: 200px;
        }
    }
}

.scroll-view_H {
    height: 100px;
    width: 100%;
    .view-items {
        /*display:flex;*/
        /*flex-direction:row;*/
        /*align-items:start;*/
        /*flex-wrap:nowrap;*/
        .scroll-view-item {
            height: 100px;
            width: 100%;
        }
        .bc_green {
            background: green;
        }
        .bc_red {
            background: red;
        }
        .bc_yellow {
            background: yellow;
        }
        .bc_blue {
            background: blue;
        }
    }
}

.touchTest {
    width: 100%;
    height: 100px;
    .touch-frame {
        width: 100%;
        height: 100%;
        background: #123456;
    }
}
</style>
