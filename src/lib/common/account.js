/**
 * account 用户模块
 * 检测本地是否有openId 和 unionId
 * 如果缺少其中一个则 进入登录流程
 * 调用wx.login获取code 将code传回后台获取openId和unionId
 * 之后的调用都要带上openId和unionId
 */
import superbridge from './superbridge';

class account {
    // 检查微信session
    static checkSession () {
        return new Promise((success, fail) => {
            wx.checkSession({
                success,
                fail
            });
        });
    }
    // 检查是否有uuid
    static checkUUID () {
        return Boolean(superbridge.getUUID());
    }
    static checkOpenId () {
        return Boolean(superbridge.getOpenId());
    }
    static checkUnionId () {
        return Boolean(superbridge.getUnionId());
    }
    // 请求uuid 或 本地生成
    static requestForUUID () {
        return superbridge.fetch('/uuid/uuid/v1/register', {
            showError: false,
            method: 'POST',
            body: {}
        }).then((res) => {
            const uuid = res.data ? res.data.uuid : Date.now();
            superbridge.setUUID(uuid);
        }).catch(() => {
            superbridge.setRandomUUID();
        });
    }
    // 调用微信api接口 登录
    static login () {
        return new Promise((resolve, reject) => {
            wx.login({
                success (res) {
                    console.log('wx.login获取的结果');
                    console.log(res);
                    resolve(res);
                },
                fail: reject
            });
        });
    }
    // 请求openId 和 unionId
    static requestForOpenIdAndUnionId () {
        return account.login().then((res) => {
            return superbridge.getUserInfo().then((info) => {
                info.code = res.code;
                return info;
            });
        }).then((info) => {
            return superbridge.fetch('/brain/wx/login', {
                isForUser: true,
                showError: false,
                method: 'POST',
                body: {
                    code: info.code,
                    signature: info.signature,
                    encryptedData: info.encryptedData,
                    iv: info.iv
                }
            });
        }).then((res) => {
            let openId = res.data && res.data.openId || '';
            let unionId = res.data && res.data.unionId || '';
            superbridge.setOpenId(openId);
            superbridge.setUnionId(unionId);
            if (res.code !== 0) {
                console.log('获取openId unionId出错');
                // 跳转至检查网络错误页面
            }
        });
    }
    // app注册后 在onLaunch方法中调用此方法初始化账户
    static init () {
        return account.checkSession().then(() => {
            // 如果没有openId 或者没有unionId 则开始登录流程
            let promise = null;
            // if (!account.checkOpenId() || !account.checkUnionId()) {
            if (!account.checkOpenId()) {
                promise = account.requestForOpenIdAndUnionId();
            } else {
                promise = Promise.resolve();
            }
            return promise;
        }).catch(() => {
            console.log('session 过期 重新登录');
            return account.requestForOpenIdAndUnionId();
        });
    }
}

export default account;
