<template>
  <div class="register-main">
    <div class="header-title">
      <span class="left-text">注册账号</span>
      <span class="right-text">优化管理•智慧出行</span>
    </div>
    <el-row class="register-body">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" class="el-col-sm-push-4 el-col-md-push-4 el-col-lg-push-4">
        <el-form ref="AccountForm" :model="account" :rules="rules" label-position="right" label-width="100px"
                 class="demo-ruleForm register-container">
          <div class="top-content">
            <el-checkbox v-model="enterpriseReg" disabled>企业注册</el-checkbox>
            <el-checkbox v-model="personReg" disabled>个人注册</el-checkbox>
          </div>
          <el-form-item prop="telephone" label="注册手机：">
            <el-input type="text" v-model="account.telephone" auto-complete="off" placeholder="注册手机号" disabled></el-input>
          </el-form-item>
          <el-form-item prop="enterpriseCode" label="企业码：">
            <el-input type="text" v-model="account.enterpriseCode" auto-complete="off" :autofocus="true" placeholder="请输入您加入的目标企业码"></el-input>
          </el-form-item>
          <el-form-item prop="enterpriseName" label="企业简称：">
            <el-input type="text" v-model="account.enterpriseName" auto-complete="off" placeholder="目标企业简称" disabled></el-input>
          </el-form-item>
          <el-form-item prop="workName" label="名称：">
            <el-input type="text" v-model="account.workName" auto-complete="off" placeholder="请输入您在企业中名称"></el-input>
          </el-form-item>
          <el-form-item class="code-part" prop="code" label="验证码：">
            <el-input :class="getCodeDisabled?'disable-active':''" type="text" v-model="account.code" auto-complete="off" placeholder="请输入短信验证码">
              <el-button class="right-btn" slot="append" type="primary" @click="handleGetCode" :disabled="getCodeDisabled">{{getCode}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:0; width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister" :loading="loading">注册</el-button>
          </el-form-item>
          <el-form-item class="extra-text">
            <p>点击“注册”即同意并接受<a href="javascript:;" class="service-text" title="VV服务条款">《VV服务条款》</a></p>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="footer">
		<footer-copyright></footer-copyright>
	</div>
  </div>
</template>
<script>
  import util from '../../common/util'
  export default {
    data() {
      var validateEpriseCode = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入企业码'));
        } else {
          if (this.account.enterpriseCode !== '') {
            this.account.enterpriseCode = value;
          }
          this.epriseCodeCorrect = true;
          callback();
        }
      };
      var validateName = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'));
        } else {
          if (this.account.workName !== '') {
            this.account.workName = value;
          }
          this.nameCorrect = true;
          callback();
        }
      };
      var validateCode = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          if (this.account.code !== '') {
            this.account.code = value;
          }
          this.codeCorrect = true;
          callback();
        }
      };
      return {
        enterpriseReg: true,
        personReg: false,
        loading: false,
        epriseCodeCorrect: false,
        nameCorrect: false,
        codeCorrect: false,
        getCode: '获取验证码',
        getCodeDisabled: false,
        account: {
          telephone: '15812358888',
          enterpriseCode: '',
          enterpriseName: '',
          workName: '',
          code: ''
        },
        rules: {
          enterpriseCode: [
            { required: true, validator: validateEpriseCode, trigger: 'blur' }
          ],
          workName: [
            { required: true, validator: validateName, trigger: 'blur' }
          ],
          code: [
            { required: true, validator: validateCode, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleRegister(){
        let that = this;
        let result = {
          username: '15812358888'
        };
        if(that.epriseCodeCorrect && that.nameCorrect && that.codeCorrect){
          that.loading = true;
          localStorage.setItem('register-user', JSON.stringify(result));
          const h = that.$createElement;
          that.$notify({
            title: '标题名称',
            message: h('i', { style: 'color: teal'}, '注册成功'),
            duration: 1000
          });
          that.$router.push({path: '/login'});
        } else {
          that.loading = false;
        }
      },
      handleGetCode() {
        if(!util.checkTel.validateTel(this.account.telephone)){
          this.$message.error("注册手机号错误");
        } else {
          this.countdown();
        }
      },
      countdown() {
        let time = 120;
        let timer;
        let that = this;
        that.getCode = time + 's后重新获取';
        that.getCodeDisabled = true;
        timer = setInterval(function () {
          time--;
          that.getCode = time + 's后重新获取';
          if (time == 0) {
            clearInterval(timer);
            that.getCode = '获取验证码';
            that.getCodeDisabled = false;
          }
        }, 1000);
      }
    }
  }
</script>
<style lang="scss" scoped>
  #app {
    margin-top: 0 !important;
  }
  .register-main {
    margin: 90px auto;
    padding: 18px;
    max-width: 700px;
    min-width: 280px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    /* -webkit-border-radius: 5px;
     border-radius: 5px;
     -moz-border-radius: 5px;*/
    background-clip: padding-box;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/

    .header-title {
      position: relative;
      padding: 15px 10px 15px;
      border-bottom: 5px solid #ccc;

      .left-text {
        font-size: 1.7rem;
        color: #444;
      }
      .right-text {
        position: absolute;
        top: 18px;
        right: 10px;
        font-size: 1.28rem;
      }
    }
  }

  .register-body {
    padding: 40px 3%;

    .top-content {
      margin-bottom: 20px;
      text-align: center;
    }
    .code-part{
      .right-btn {
        color: #fff;
        border-radius: 0;
        border-color: #3a8ee6;
        background-color: #3a8ee6;
      }
      .right-btn[disabled] {
        padding-left: 6px;
        padding-right: 6px;
        color: #bbb;
        border-radius: 0;
        border-color: #eee;
        background-color: #eee;
      }
      .el-input-group__append {
        border-color: #3a8ee6;
      }
      .disable-active .el-input-group__append {
        border-color: #dcdfe6;
      }
    }
  }

  .extra-text {
    margin-bottom: 0;

    .service-text {
      font-size: 1rem;
      color: #4e69f4;

        &:hover {
           color: #4e69f4;
        }
    }

    p {
      text-align: right;
    }
  }

  @media all and (max-width: 768px) {
    .register-main {
      margin: 0 auto 24px;
    }
  }
</style>
