<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <!-- 项目设置 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/projectSettings'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-object-group fa-lg"></i>项目设置</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/projectSettings/projectSettings'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>项目设置</router-link>
                        </li>
                    </ul>
                </router-link>
                <!-- 财务明细 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/financialDetails'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-object-group fa-lg"></i>财务明细</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/financialDetails/detailsImport'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>财务明细导入</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/financialDetails/detailedQuery'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>财务明细查询</router-link>
                        </li>
                    </ul>
                </router-link>
                <!-- 财务明细 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/Reconciliation'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-object-group fa-lg"></i>对账平台</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/Reconciliation/Reconciliation'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>对账平台</router-link>
                        </li>
                    </ul>
                </router-link>
                <!-- 财务明细 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/financialStatements'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-object-group fa-lg"></i>财务报表</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/financialStatements/reconciliationReport'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>对账报表</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/financialStatements/acceptReport'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>受理月支出收入</router-link>
                        </li>
                    </ul>
                </router-link>
                <!-- 设置 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/SetUp'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-object-group fa-lg"></i>设置</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/SetUp/PersonalManagement'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>人员管理</router-link>
                        </li>
                    </ul>
                </router-link>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
  name: 'sidebar',
  data() {
    return {
    }
  },
  computed: {
    isScheduleManage: function () {
      let role = window.localStorage.getItem('role')
      return role == 'admin' || role.indexOf('scheduleManage') > -1
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
.nav-link {
    cursor: pointer;
}
.nav-padding {
    padding-left: 30px!important;
}
.link-padding {
    padding-left: 60px!important;
}
</style>
