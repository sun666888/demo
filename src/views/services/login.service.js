import axios from 'axios';
export default {
    // 登录
    login(mobile, passwd) {
        return axios({
            url: "/settlement/public/index.php/api/login",
            method: "post",
            data: { mobile, passwd }
        }).then();
    },

    // 登出
    loginOut() {
        return axios({
            url: "/settlement/public/index.php/api/logout",
            method: "get",
            params: {}
        }).then();
    },
}