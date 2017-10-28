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
            navigationBarBackgroundColor: '#326bb0',
            navigationBarTitleText: '头脑特攻队',
            navigationBarTextStyle: '#fff'
        }
    }
};
