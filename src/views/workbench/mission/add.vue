<template>
  <el-dialog title="任务添加"
             :visible.sync="visible"
             :close-on-press-escape="false"
             :close-on-click-modal="false"
             :before-close="handleClose">
    <el-form :model="form">
      <el-form-item label="任务编号：" :label-width="formLabelWidth">
        <el-input v-model="form.number" placeholder="请输入任务编号" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="任务类型：" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择任务类型">
          <el-option label="接收任务" value="接收任务"></el-option>
          <el-option label="转发任务" value="转发任务"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务内容：" :label-width="formLabelWidth">
        <el-radio-group v-model="form.content">
          <el-radio label="1">接乘客</el-radio>
          <el-radio label="2">派车辆</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务备注：" :label-width="formLabelWidth">
        <el-input v-model="form.remark" type="textarea" placeholder="请填写任务备注"></el-input>
      </el-form-item>
      <el-form-item label="创建日期：" :label-width="formLabelWidth">
        <el-date-picker v-model="form.createTime" type="date" placeholder="请选择日期" disabled></el-date-picker>
      </el-form-item>
      <el-form-item label="执行日期：" :label-width="formLabelWidth">
        <el-date-picker v-model="form.activeTime" type="date" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取消</el-button>
      <el-button type="primary" @click.native="editFormSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {
          number: '',
          type: '',
          content: '1',
          remark: '',
          createTime: new Date(),
          activeTime: ''
        },
        formLabelWidth: '120px',
      }
    },
    methods: {
      editFormSubmit() {
        this.$message.success("保存提示");
      },
      // 关闭
      handleClose() {
        this.$emit('update:visible', false);
      }
    }
  }
</script>
