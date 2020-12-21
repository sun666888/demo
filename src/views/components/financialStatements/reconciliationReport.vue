<template>
  <div class="diaplayinformation">
    <el-card class="box-card">
        <el-form
        class="diaplayinformationcenter"
        ref="form"
        :model="form"
        label-width="120px"
        :inline="true"
        :rules="rules"
        >
        <el-form-item label="项目名称" prop="name">
            <el-select v-model="form.name" placeholder="请选择" @change="getDetail">
            <el-option
                v-for="(item, index) in nameList"
                :key="index"
                :label="item.name"
                :value="item.name"
            ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="地市（项目区）" prop="city">
            <el-select v-model="form.city" placeholder="请选择" @change="getDetail">
            <el-option
                v-for="(item, index) in cityList"
                :key="index"
                :label="item.city"
                :value="item.city"
            ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="受理时间" prop="date">
            <el-date-picker
            v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            ></el-date-picker>
        </el-form-item>
        <el-form-item v-show="detailList.length > 0" v-for="(item, index) in detailList" :label="'T' + (parseInt(index) + 1) + '折算率'" :key="index" >
            <el-input v-model="detailData" :value="item" :placeholder="item" @change="detailChange(index,item,detailData)"></el-input>
        </el-form-item>
        </el-form>
        <el-button type="success" @click="search">查询</el-button>
        <el-button type="danger" @click="resetForm">重置</el-button>
        <el-button @click="dao">导出</el-button>
    </el-card>

    <el-table
      :data="reportData"
      border
      height="500"
      v-loading="isload"
      style="width: 100%; margin:20px auto;"
    >
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="title" label="账务类型" width="150" align="center"></el-table-column>
      <el-table-column prop="city" label="地市" width="150" align="center"></el-table-column>
      <el-table-column prop="name" label="项目名称" width="150" align="center"></el-table-column>
      <el-table-column prop="accepted_at" label="受理时间" width="100" align="center"></el-table-column>
      <el-table-column prop="count" label="用户数" align="center"></el-table-column>
      <el-table-column prop="unit_price" label="结算单价" align="center"></el-table-column>
      <el-table-column prop="account_period" label="账期数" align="center"></el-table-column>
      <el-table-column v-for="(item, index) in detailList" :key="index" :prop="'t'+(index+1)+'_discount'" :label="'T'+(index+1)+'折算率'" width="100" align="center"></el-table-column>
      <el-table-column v-for="(item, index) in detailList" :key="(index+1)*100" :prop="'t'+(index+1)+'_commission'" :label="'T'+(index+1)+'佣金'" width="100" align="center"></el-table-column>
      <el-table-column prop="total_commission" label="总金额" align="center"></el-table-column>
      <el-table-column prop="guidance_price" label="指导单价" align="center"></el-table-column>
      <el-table-column prop="count_rate" label="出账率（量）" width="150" align="center"></el-table-column>
      <el-table-column prop="amount_rate" label="出账率（金额）" width="150" align="center"></el-table-column>
    </el-table>

  </div>
</template>

<script>
import report from "./../../services/report";
export default {
  data() {
    return {
      token: "",
      nameList: [],
      cityList: [],
      detailList: [],
      isload: false,
      form: {
        name: "",
        city: "",
        detail: ''
      },
      detailData: '',
      date: '',
      rules: {
        name: [
            { required: true, message: '请选择项目名称', trigger: 'change' },
        ],
        city: [
            { required: true, message: '请选择地市', trigger: 'change' },
        ],
      },
      reportData: [],
    };
  },
  mounted() {
    this.token = localStorage.getItem('token')
    this.getName();
    this.getCity();
  },
  methods: {
    getName() {
      report.name().then(
        res => {
          if (res.code == 200) {
            this.nameList = res.data;
          }
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    getCity() {
      report.city().then(
        res => {
          if (res.code == 200) {
            this.cityList = res.data;
          }
        },
        err => {
          this.$message.error(err.msg);
        }
      );
    },
    getDetail() {
      let d = {
        name: this.form.name,
        city: this.form.city,
        token: this.token
      }
      if (d.name !== '' && d.city !== '') {
        report.detail(d).then(
          res => {
            if (res.code == 200) {
              this.detailList = res.data.discount.split('|');
              // console.log(this.detailList)
            }
          },
          err => {
            this.$message.error(err.msg);
          }
        );
      } 
      
    },
    // 查询报表
    search() {
      this.isload = true;
      this.form.acceptStartTime = this.date.length > 0 ? this.date[0] : ''
      this.form.acceptEndTime = this.date.length > 0 ? this.date[1] : ''
      this.form.token = this.token
      report.accountList(this.form).then(
          res => {
            if (res.code == 200) {
              this.reportData = res.data;
              this.isload = false;
            } else {
              this.$message.error(res.msg);
              this.isload = false;
            }
          },
          err => {
            this.$message.error(err.msg);
            this.isload = false;
          }
      )
    },
    detailChange(index,item,detailData) {
        this.detailList[index] = detailData
        let d = {
            name: this.form.name,
            city: this.form.city,
            discount: this.detailList.join('|')
        }
        report.discount(d).then(
          res => {
            if (res.code == 200) {
            //   this.detailList = res.data.discount.split('|');
              console.log(this.data)
            }
          },
          err => {
            this.$message.error(err.msg);
          }
        )
    },

    // 重置
    resetForm() {
      this.$refs.form.resetFields();
    },
    // 导出
    dao() {
      let acceptStartTime = this.date.length > 0 ? this.date[0] : '',
      acceptEndTime = this.date.length > 0 ? this.date[1] : '';
      window.location.href =
        "/settlement/public/index.php/api/report/accountExport?name=" +
        this.form.name +
        "&city=" +
        this.form.city +
        "&acceptStartTime=" +
        acceptStartTime +
        "&acceptEndTime=" +
        acceptEndTime +
        "&token=" +
        this.token;
    }
  }
};
</script>

<style lang="scss" scoped>
.diaplayinformation {
//   background-color: #fff;
//   border: 1px solid #cfd8dc;
//   padding: 20px;
  .diaplayinformationcenter {
    width: 100%;
    .el-form-item {
      .el-form-item__content {
        .el-input {
          width: 200px;
        }
        .el-select {
          width: 200px;
        }
      }
    }
  }
  .row {
    margin-top: 30px;
    .col-lg-12 {
      width: 100%;
      .table-bordered {
        width: 100%;
        border: 1px solid #ccc;
        text-align: center;
        thead {
          color: #606266;
        }
      }
    }
  }
}
</style>