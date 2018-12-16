<template>
  <div class="warp-main" style="overflow: hidden; padding: 10px;">
    <p style="margin-bottom: 20px; font-weight: 500;">添加企业</p>
    <el-form ref="form" :model="form" label-width="110px">
      <el-col :span="12">
        <el-form-item label="企业编号：">
          <el-input v-model="form.number" placeholder="请输入企业编号"></el-input>
        </el-form-item>
        <el-form-item label="所属行业：">
          <el-select v-model="form.industry" placeholder="请选择所属行业">
            <el-option label="请选择所属行业" value="-1"></el-option>
            <el-option label="金融业" value="1"></el-option>
            <el-option label="IT业" value="2"></el-option>
            <el-option label="工业" value="3"></el-option>
            <el-option label="农林牧渔业" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经营范围：">
          <el-checkbox-group v-model="form.range">
            <el-checkbox label="娱乐" name="range"></el-checkbox>
            <el-checkbox label="教育" name="range"></el-checkbox>
            <el-checkbox label="商业" name="range"></el-checkbox>
            <el-checkbox label="工业" name="range"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="企业名称：">
          <el-input v-model="form.name" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="经营模式：">
          <el-radio-group v-model="form.model">
            <el-radio label="国有企业"></el-radio>
            <el-radio label="民营企业"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="注册日期：">
          <el-date-picker v-model="form.regDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-edit">保存添加</el-button>
      </el-col>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        msg:'',
        form: {
          number: '',
          name: '',
          industry: '',
          model: '国有企业',
          range: [],
          regDate: ''
        }
      };
    }
  }
</script>
