import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
    // 这个字段走 app.json
    config: {
        pages: ['pages/index/index'], // Will be filled in webpack
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '嘎嘎记单词',
            navigationBarTextStyle: 'black'
        }
    }
};
