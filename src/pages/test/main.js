import Vue from 'vue';
import App from './index';

const app = new Vue(App);
app.$mount();

export default {
    config: {
        onReachBottomDistance: 30,
        enablePullDownRefresh: true,
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '测试专用',
        navigationBarTextStyle: 'black'
    }
};
