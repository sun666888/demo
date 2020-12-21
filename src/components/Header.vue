<template>
    <navbar>
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
        <a class="navbar-brand"></a>
        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item">
                <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
            </li>
        </ul>
        <ul class="nav navbar-nav ml-auto d-md-down-none">
            <li class="yi-proName"><span style="color: #20a8d8;font-weight: 600;">结算管理系统</span></li>
        </ul>
        <ul class="nav navbar-nav ml-auto d-md-down-none">
            <li class="nav-item">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link nav-lick pr-3 yi-username">
                      {{username}}<i class="el-icon-arrow-down el-icon--right yi-username-icon"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item command="a">修改密码</el-dropdown-item> -->
                        <el-dropdown-item command="b">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
        <!-- <el-dialog title="重置密码" :modal-append-to-body="false" :visible.sync="passwordDialog" width="25%" center>
            <div class="content-show text-center">
                <div class="row mb-1 list-search">
                    <div class="col-md-12 search-field">
                        <div class="label yi-confirm">原始密码：</div>
                        <input type="password" class="form-control input-field" placeholder="输入原始密码" v-model.trim="origPassword" />
                    </div>
                </div>
                <div class="row mb-1 list-search">
                    <div class="col-md-12 search-field">
                        <div class="label">新密码：</div>
                        <input type="password" class="form-control input-field" placeholder="输入新密码" v-model.trim="password" />
                    </div>
                </div>
                <div class="row mb-1 list-search">
                    <div class="col-md-12 search-field">
                        <div class="label yi-confirm">确认密码：</div>
                        <input type="password" class="form-control input-field" placeholder="请再次输入新密码" v-model.trim="rePassword" v-on:blur="checkPwd" />
                    </div>
                </div>
                <div class="row mb-1 yi_footer">
                    <span :class="{'pwd-info-error animated shake': pwd_err}" v-show="pwd_err">两次输入密码不一致</span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmUpdate" :disabled="pwd_err">确 定</el-button>
            </span>
        </el-dialog> -->
    </navbar>
</template>
<script>
import { Dialog } from 'element-ui'
import navbar from './Navbar'
import { dropdown } from 'vue-strap'
import loginSrv from "@/../src/views/services/login.service.js";

/* eslint-disable */
export default {
    data() {
        return {
            username: "",
            passwordDialog: false,
            origPassword: "",
            password: "",
            rePassword: "",
            pwd_err: false,
            isactive: true,
            isonLine: false,
            isMute: false,
            isSchdule: false
        }
    },
  components: {
      navbar,
      dropdown,
      'el-dialog': Dialog
  },
  mounted() {
        let self = this;
        eventBus.$on('eventBusLine', function(val) {
            self.isonLine = val;
        });
        // this.username = window.localStorage.getItem("user");
        // let role = window.localStorage.getItem('role');
        // if (role.indexOf('schedule') != -1) {
        //     this.isSchdule = !this.isSchdule;
        // }
  },
  methods: {
      loginOut(){
            let self = this;
            loginSrv.loginOut().then(resp => {
                // if (this.isSchdule) {
                    this.scriptCors("http://localhost:10666?orders=signOut");
                // }
                window.localStorage.removeItem("mobile");
                // window.localStorage.removeItem("role");
                this.$router.push('/');
            });
      },
      handleCommand(command) {
          if (command == "a") {     // 修改密码
              this.passwordDialog = true;
          } else if(command == "b") {   // 退出登录
              this.loginOut();
          }
      },
    // confirmUpdate() {
    //     if (this.origPassword && this.password && this.rePassword) {
    //         loginSrv.updatePassword( this.origPassword, this.password, this.rePassword).then(resp => {
    //             this.$message.success("密码修改成功!");
    //             this.passwordDialog = false;
    //             this.origPassword = "";
    //             this.password = "";
    //             this.rePassword = "";
    //             this.$router.push("/");
    //         }, err => {
    //             this.$message.error(err.error.message);
    //         });
    //     } else {
    //         this.$message.error("请填写所有内容");
    //     }
    // },
    // checkPwd() {
    //     if (this.password === this.rePassword) {
    //         this.pwd_err = false;
    //         return;
    //     } else {
    //         this.pwd_err = true;
    //     }
    // },
    sidebarToggle(e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize(e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle(e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
    },
    scriptCors(src, message) {
        let script = document.createElement("script");
        script.src = src ;
        document.body.insertBefore(script, document.body.firstChild);
        document.body.removeChild(script);
        if (message) {
            this.$message.success(message);
        }
    },

  }
}
</script>

<style lang="scss">
  .yi-username{
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover .yi-username-icon{
        transform: rotate(180deg);
    }
    .yi-username-icon {
        transition: all 0.3s ease-in-out;
    }
  }
  .content-show {
      .list-search {
          .search-field {
              position: relative;
              padding-left: 75px;
              margin-bottom: 1em;
              .label {
                  position: absolute;
                  left: 20px;
                  top: 8px;
                  text-align: right;
              }
              .yi-confirm {
                left: 6px;
              }
          }
      }
  }
  .pwd-info-error{
        background: #F2DEDE;
        text-align: center;
        font-size: 14px;
        color: red;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        padding: 0 10px;
  }
  .yi_footer {
      justify-content: center;
  }
  .yi-proName {
      font-size: 16px;
  }
  .call-a {
      display: block;
      text-align: center;
  }
  .yi-ul li {
      margin-right: 20px;
  }
  .userState {
      text-align: center;
  }
  .online {
      color: #20a8d8;
  }
  .call-a {
      text-decoration: none;
  }
  .call-a:hover {
      text-decoration: none;
  }
  .isactive {
      color: #263238;
  }
</style>

