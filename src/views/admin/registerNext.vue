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
          <el-form-item prop="workName" label="昵称：">
            <el-input type="text" v-model="account.workName" :autofocus="true" auto-complete="off" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item prop="pwd" label="密码：">
            <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="ensurePwd" label="确认密码：">
            <el-input type="password" v-model="account.ensurePwd" auto-complete="off" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:0; width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister" :loading="loading">注册</el-button>
          </el-form-item>
          <el-form-item class="extra-text">
            <p>点击“注册”即同意并接受<a href="javascript:;" class="service-text" title="服务条款">《服务条款》</a></p>
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
  export default {
    data() {
      var validateWorkName = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        } else {
          if (this.account.workName !== '') {
            this.account.workName = value;
			this.nameCorrect = true;
          }
          callback();
        }
      };
	  var validatePwd = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.account.pwd !== '') {
            this.account.pwd = value;
			this.pwdCorrect = true;
          }
          callback();
        }
      };
      var validateEnsurePwd = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else {
          if (this.account.ensurePwd !== '') {
            this.account.ensurePwd = value;
			this.ensurePwdCorrect = true;
          }
          callback();
        }
      };
      return {
        loading: false,
		nameCorrect: false,
		pwdCorrect: false,
		ensurePwdCorrect: false,
        account: {
          workName: '',
          pwd: '',
		  ensurePwd: ''
        },
        rules: {
          workName: [
            { required: true, validator: validateWorkName, trigger: 'blur' }
          ],
          pwd: [
            { required: true, validator: validatePwd, trigger: 'blur' }
          ],
          ensurePwd: [
            { required: true, validator: validateEnsurePwd, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleRegister(){
        let that = this;
        let result = {
          username: '15812345678'
        };
        if(that.nameCorrect && that.pwdCorrect && that.ensurePwdCorrect){
          that.loading = true;
          localStorage.setItem('register-user', JSON.stringify(result));
          const h = that.$createElement;
          that.$notify({
            title: '标题名称',
            message: h('i', { style: 'color: teal'}, '注册成功'),
            duration: 1000
          });
          setTimeout(function(){that.$router.replace({path: '/login'})},2000);
        } else {
          that.loading = false;
		  this.$message.error("请完善必填信息");
        }
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
