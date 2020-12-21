import axios from 'axios';
import { data } from 'jquery';
export default {
    // 对账列表
    accountList(data) {
        return axios({
            url: "/settlement/public/index.php/api/report/account",
            method: "post",
            data: data
        }).then();
    },

    // 受理月列表
    acceptanceList(data) {
        return axios({
            url: "/settlement/public/index.php/api/report/acceptance",
            method: "post",
            data: data
        }).then();
    },

    // 项目列表
    name(){
        return axios({
            url: "/settlement/public/index.php/api/name",
            method: "get",
        }).then();
    },

    // 地市列表
    city(){
        return axios({
            url: "/settlement/public/index.php/api/city",
            method: "get",
        }).then();
    },

    // 平台列表
    platom(){
        return axios({
            url: "/settlement/public/index.php/api/platom",
            method: "get",
        }).then();
    },

    // 折算率
    detail(data){
        return axios({
            url: "/settlement/public/index.php/api/project/detail",
            method: "get",
            params: data
        }).then();
    },

    // 保存折算率
    discount(data) {
        return axios({
            url: "/settlement/public/index.php/api/discount",
            method: "post",
            data: data
        }).then();
    },

    
}