/**
 * Superbridge 超级桥
 */

import store from './store';

let HOST = 'https://gagalulu.wang';    // 线上服务域名

if (process.env.NODE_ENV === 'st') { // 预发布
    HOST = 'http://wxapp.meishi.st.sankuai.com';
}

if (process.env.NODE_ENV === 'test') { // 测试
    HOST = 'http://wxapp.meishi.test.sankuai.com';
}

if (process.env.NODE_ENV === 'development') { // 开发
    HOST = 'http://192.168.2.119:9999';
}

const httpErrorMsg = '网络请求失败，请检查网络是否畅通';

const KEY_OPENID = 'brain_wxapp_openId';
const KEY_UNIONID = 'brain_wxapp_unionId';
const KEY_UUID = 'brain_wxapp_uuid';
const KEY_TOKEN = 'meishi_wxapp_token';

class superbridge {
    // 设置当前页面的navbar title
    static setTitle ({ title = '' }) {
        wx.setNavigationBarTitle({ title });
    }
    // 请求后端的数据接口 默认请求小程序后台 个别请求用户中心后台 返回一个promise对象
    static fetch (url, _options = {}) {
        const options = Object.assign({
            showLoading: true,
            showError: true,
            content: '加载中...',
            isForUser: false  // 是否是用户登录相关
        }, _options);

        return new Promise((resolve, reject) => {
            if (options.showLoading) {
                this.showLoading({
                    content: options.content,
                    mask: true
                });
            }

            let requestUrl = url;

            if (!(url.indexOf('//') === 0 || url.indexOf('https://') === 0 || url.indexOf('http://') === 0)) {
                requestUrl = `${HOST}${url}`;
            }

            console.log(requestUrl);

            const pageSource = 'brain_wxapp'; // 小程序来源标识

            wx.request({
                url: `${requestUrl}`,
                data: Object.assign({
                    pageSource,
                    openId: superbridge.getOpenId(),
                    unionId: superbridge.getUnionId()
                }, options.body || {}),
                method: options.method || 'GET',
                header: options.header || {
                    'content-type': 'application/json'
                },
                success: (res) => {
                    if (options.showLoading) {
                        this.hideLoading();
                    }

                    if (options.showError) {
                        if (res.statusCode < 200 || res.statusCode > 300) {
                            superbridge.alert({content: httpErrorMsg});
                            reject(res);
                            return;
                        }
                    }

                    resolve(res.data);
                },
                fail: () => {
                    if (options.showLoading) {
                        this.hideLoading();
                    }
                    reject();
                }
            });
        });
    }
    // 自定义单选象确认框
    static alert ({ content = '', title = '' }) {
        return new Promise((success, fail) => {
            wx.showModal({
                title,
                content,
                showCancel: false,
                confirmColor: '#21c0ae',
                complete: function (res) {
                    if (res.confirm) {
                        success(res);
                    } else if (res.cancel) {
                        fail(res);
                    }
                }
            });
        });
    }

    // 自定义多选象确认框
    static confirm ({ content = '', title = '', options }) {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title,
                content,
                cancelText: options[0].label || '取消',
                confirmText: options[1].label || '确定',
                confirmColor: '#21c0ae',
                success: function (res) {
                    if (res.confirm) {
                        resolve(res);
                        if (options[1].callback) {
                            options[1].callback();
                        }
                    } else if (res.cancel) {
                        reject(res);
                        if (options[0].callback) {
                            options[0].callback();
                        }
                    }
                }
            });
        });
    }
    // 获取当前系统参数
    static getSystemInfo () {
        return new Promise((resolve, reject) => {
            wx.getSystemInfo({
                success: (res) => {
                    resolve(res);
                },
                fail: () => {
                    reject();
                }
            });
        });
    }
    // 获取用户信息
    static getUserInfo () {
        return new Promise((success, fail) => {
            wx.getUserInfo({
                success,
                fail
            });
        });
    }
    // toast 封装
    static toast ({content, duration = 1}, success, fail) {
        wx.showToast({
            title: content,
            icon: 'success',    // 图标，有效值 "success", "loading"
            duration: parseInt(duration * 1000)
        });
    }
    // 显示加载中
    static showLoading ({content = '加载中...', mask = true}) {
        wx.showLoading({
            title: content,
            mask
        });
    }
    // 隐藏加载中
    static hideLoading () {
        wx.hideLoading();
    }
    // 获取当前位置
    static getLocation () {
        return new Promise((success, fail) => {
            wx.getLocation({
                success,
                fail
            });
        });
    }
    // 打开新的页
    static openWebview ({ url, redirect = false }) {
        if (redirect) {
            wx.redirectTo({ url });
            return;
        }
        wx.navigateTo({ url });
    }
    // 关闭当前页
    static closeWebview () {
        wx.navigateBack({
            delta: 1
        });
        // wx.navigateBack(1);
    }
    // 设置navbar 背景颜色
    static setTitleColor (options) {
        wx.setNavigationBarColor(options);
    }
    // 获取当前小程序openId 没有返回 ''
    static getOpenId () {
        return store.get(KEY_OPENID, '');
    }
    static setOpenId (openId) {
        return store.set(KEY_OPENID, openId);
    }
    // 获取小程序的unionId 没有返回 '';
    static getUnionId () {
        return store.get(KEY_UNIONID, '');
    }
    static setUnionId (unionId) {
        return store.set(KEY_UNIONID, unionId);
    }
    // 获取当前小程序的UUID 没有返回 ''
    static getUUID () {
        return store.get(KEY_UUID, '');
    }
    static setUUID (uuid) {
        return store.set(KEY_UUID, uuid);
    }
    static setRandomUUID () {
        return store.set(KEY_UUID, new Date().getTime());
    }
    // 获取当前小程序的token 没有返回 ''
    static getToken () {
        return store.get(KEY_TOKEN, '');
    }
    static setToken (token) {
        return store.set(KEY_TOKEN, token);
    }
}

export default superbridge;
