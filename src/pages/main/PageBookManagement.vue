<template>
  <div>
    <div>
      <!--查询条件-->
    </div>
    <div class="position"></div>
    <div class="images">
      <div v-for="(item, index) in info" :key="index" class="image-middle">
        <el-card shadow="hover" :body-style="{ padding: '10px' }">
          <img :src="info[index].src" class="image"/>
          <div style="text-align:left;padding-top:12px">
            <span>书名: {{ info[index].name }}</span><br>
            <span>售价: {{ info[index].name }}</span><br>
            <span>作者: {{ info[index].name }}</span><br>
            <span>销量: {{ info[index].name }}</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageBookManagement",
  data() {
    return {
      info: [
        {
          "id": 1,
          "name": "userHead",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 2,
          "name": "user",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 3,
          "name": "haha",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 4,
          "name": "astronaut",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 5,
          "name": "build",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 6,
          "name": "custom",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 7,
          "name": "sea",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 8,
          "name": "tree",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 9,
          "name": "Curry",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
        {
          "id": 10,
          "name": "panda",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
      ]
    };
  },
};
</script>

<style scoped>
/*
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  height: 422px;
  width: 300px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
 */
/* “Tissue Search”字体样式 */
.position {
  margin-left: 15px;
  font-size: 30px;
  font-weight: 600;
}

/* 图片总布局，样式 */
.images {
  display: flex;
  margin-top: 20px;
  margin-left: 21px;
  margin-right: 20px;
  flex-wrap: wrap;
}

/* 图片之间 */
.image-middle {
  margin-right: 15px;
  margin-bottom: 15px;
}

/* 单张图片样式 */
.image {
  width: 176px;
  height: 248px
}
</style>