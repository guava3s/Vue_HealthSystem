<template>
  <div>
    <el-form :inline="true" >
      <br>
      <!-- 查询条件 -->
      <el-form-item label="书名">
        <el-input placeholder="请输入书名" v-model="dataForm.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-col :span="11">
          <el-input placeholder="请输入最低价格" v-model="dataForm.minPrice" clearable></el-input>
        </el-col>
        <el-col class="line" :span="2">&nbsp;&nbsp;--</el-col>
        <el-col :span="11">
          <el-input placeholder="请输入最大价格" v-model="dataForm.maxPrice" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-button icon="el-icon-search" type="primary" round @click="search()">查询</el-button>
      <el-button icon="el-icon-refresh" type="primary" round @click="reset()">重置</el-button>
    </el-form>
    <!--分割线-->
    <el-divider><i class="el-icon-d-caret"></i></el-divider>
  </div>
</template>

<script>
export default {
  name: "MyContentHeader",
  data() {
    return {
      dataForm: {
        title: '',
        minPrice: '',
        maxPrice: ''
      }
    }
  },
  methods:{
    // 查询
    search() {

    },
    // 重置
    reset() {

    }
  }
}
</script>

<style scoped>
</style>