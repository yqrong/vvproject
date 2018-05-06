<template>
  <div class="register-main">
    <div class="header-title">
      <span class="left-text">注册账号</span>
      <span class="right-text">优化管理•智慧出行</span>
    </div>
    <el-row :gutter="10" class="register-body">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="el-col-sm-push-12 el-col-md-push-12 el-col-lg-push-12">
        <el-form ref="AccountForm" :model="account" :rules="rules" label-position="top" label-width="80px"
                 class="demo-ruleForm register-container">
          <div class="top-content">
            <a :class="enterpriseReg?'title active': 'title'" href="javascript:;" @click="handleEnterprise">企业注册</a><a :class="personReg?'title active': 'title'" href="javascript:;" @click="handlePerson">个人注册</a>
          </div>
          <el-form-item prop="username" label="手机号：">
            <el-input type="text" v-model="account.username" auto-complete="off" :autofocus="true" placeholder="请输入注册手机号"></el-input>
          </el-form-item>
          <el-form-item class="code-item" prop="code" label="验证码：">
            <el-input class="code-input" type="text" v-model="account.code" auto-complete="off" placeholder="请输入验证码"></el-input>
            <span>{{validCode}}</span>
            <a href="javascript:void(0);" @click="getCode(4)" title="切换验证码">换一张</a>
          </el-form-item>
          <el-form-item style="margin-bottom:0; width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister" :loading="loading">下一步</el-button>
          </el-form-item>
          <el-form-item class="extra-text">
            <a href="javascript:;" class="know-more" title="了解VV租行">了解VV租行管理</a>
            <router-link :to="{path: 'login'}" class="login-text" title="立即登录">已经拥有账户？登录</router-link>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="el-col-sm-pull-12 el-col-md-pull-12 el-col-lg-pull-12">
        <div class="qr-codes">
          <a class="mgr" href="javascript:;"><img src="../../assets/images/totalnumber.jpg"><p>扫码关注公众号</p></a>
          <a href="javascript:;"><img src="../../assets/images/downloadcode.png"><p>扫码下载APP</p></a>
        </div>
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
      var validateAccount = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (this.account.username !== '') {
            this.account.username = value;
          }
          if(!util.checkTel.validateTel(this.account.username)) {
            callback(new Error('手机号格式不正确'));
          } else {
            this.telCorrect = true;
          }
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
          if(this.account.code.toUpperCase() !== this.validCode) {
            callback(new Error('验证码不正确'));
          } else {
            this.codeCorrect = true;
          }
          callback();
        }
      };
      return {
        enterpriseReg: true,
        personReg: false,
        loading: false,
        telCorrect: false,
        codeCorrect: false,
        validCode: '',
        account: {
          username: '',
          code: ''
        },
        rules: {
          username: [
            //{required: true, message: '请输入手机号', trigger: 'blur'},
            { required: true, validator: validateAccount, trigger: 'blur' }
          ],
          code: [
            //{required: true, message: '请输入验证码', trigger: 'blur'},
            { required: true, validator: validateCode, trigger: 'blur' }
          ]
        }
      };
    },
    created(){
      this.getCode(4);
    },
    methods: {
      handleRegister(){
        let that = this;
        let result = {
          id: '1',
          username: 'admin',
          nickname: that.account.username,
          name: 'administrator',
          email: '888888@163.com'
        };
        if(that.telCorrect && that.codeCorrect){
          that.loading = true;
          //localStorage.setItem('access-user', JSON.stringify(result));
          that.$router.push({path: '/registerNext'});
        } else {
          that.loading = false;
        }
      },
      getCode(n) {
        let all = "AZXCVBNMSDFGHJKLQWERTYUIOPZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
        let b = "";
        for (var i = 0; i < n; i++) {
          let index = Math.floor(Math.random() * 62);
          b += all.charAt(index);

        }
        this.validCode = b;
      },
      handleEnterprise() {
        this.enterpriseReg = true;
        this.personReg = false;
      },
      handlePerson() {
        this.enterpriseReg = false;
        this.personReg = true;
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
    max-width: 836px;
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
  }

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

  .register-body {
    padding: 40px 3%;

    .qr-codes {
      margin-top: 100px;
      text-align: center;
      font-size: 0;

      a {
        display: inline-block;
        width: 40%;
        font-size: 1rem;
        color: #333;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        border: 0;
      }

      .mgr {
        margin-right: 10%;
      }

    }
  }

  .register-container {
    .top-content {
      font-size: 0;
    }
    .title {
       display: inline-block;
       width: 50%;
       line-height: 44px;
       font-size: 22px;
       text-align: center;
       color: #505458;

        &.active {
          color: #4e69f4;
        }
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }

    .code-item {
      font-size: 0;

      .code-input {
        display: inline-block;
        width: 57%;
        font-size: 14px;
      }
      span {
        display: inline-block;
        width: 20%;
        font-size: 16px;
        text-align: center;
        color: #2522d6;
        font-weight: bold;
        font-style: italic;
        background-color: #fddd65;
      }

      a {
        display: inline-block;
        width: 20%;
        font-size: 14px;
        color: #4e69f4;
        text-align: center;
      }

      }
      .extra-text {
        position: relative;
        margin-bottom: 0;
        padding-left: 2px;

      a {
        font-size: 12px;
        color: #aaa;

      &:hover {
         color: #29e;
       }
      }

      .login-text {
        position: absolute;
        top: 4px;
        right: 2px;
      }
    }
  }

  @media all and (max-width: 768px) {
    .register-main {
      margin: 0 auto 24px;
    }
    .qr-codes {
      margin-top: 10px;
    }
  }
</style>
