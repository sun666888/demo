/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

// Containers
import Full from "@/containers/Full";

Vue.use(Router);

export default new Router({
    mode: "hash", // Demo is living in GitHub.io, so required!
    linkActiveClass: "open active",
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
            path: "/",
            redirect: "/pages/login",
            name: "主页",
            component: Full,
            children: [
                // 项目设置
                {
                    path: "/projectsettings",
                    name: "项目设置",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: 'denglu',
                            name: "欢迎登录",
                            component: () =>
                                import ('../views/components/projectsettings/denglu')
                        },
                        {
                        path: "projectsettings",
                        name: "项目设置",
                        component: () =>
                            import ('../views/components/projectsettings/projectsettings.vue')
                        },
                    ]
                },
                // 财务明细
                {
                    path: "/financialDetails",
                    name: "项目设置",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                        path: "detailedQuery",
                        name: "财务明细查询",
                        component: () =>
                            import ('../views/components/financialDetails/detailedQuery.vue')
                        },
                        {
                        path: "detailsImport",
                        name: "财务明细导入",
                        component: () =>
                            import ('../views/components/financialDetails/detailsImport.vue')
                        },
                    ]
                },
                // 对账平台
                {
                    path: "/Reconciliation",
                    name: "对账平台",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                        path: "Reconciliation",
                        name: "对账平台",
                        component: () =>
                            import ('../views/components/Reconciliation/Reconciliation.vue')
                        }
                    ]
                },
                // 财务报表
                {
                    path: "/financialStatements",
                    name: "财务报表",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                        path: "reconciliationReport",
                        name: "对账报表",
                        component: () =>
                            import ('../views/components/financialStatements/reconciliationReport.vue')
                        },
                        {
                        path: "acceptReport",
                        name: "受理月支出收入",
                        component: () =>
                            import ('../views/components/financialStatements/acceptReport.vue')
                        }
                    ]
                },
                // 设置
                {
                    path: "/SetUp",
                    name: "设置",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                        path: "Personalmanagement",
                        name: "个人管理",
                        component: () =>
                            import ('../views/components/SetUp/PersonalManagement.vue')
                        },
                    ]
                },
            ]
        },
        {
            path: "/pages",
            name: "Pages",
            component: {
                render(c) {
                    return c("router-view");
                }
            },
            children: [{
                path: "login",
                name: "Login",
                component: () =>
                    import ('../views/components/pages/Login.vue')
            }]
        }
    ]
})
