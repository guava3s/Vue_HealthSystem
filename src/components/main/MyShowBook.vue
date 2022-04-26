<template>
  <div class="position">
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
  name: "MyShowBook",
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
        }, {
          "id": 11,
          "name": "panda",
          "src": require("../../../static/book/剑道天穹阁.png"),
        }, {
          "id": 12,
          "name": "panda",
          "src": require("../../../static/book/剑道天穹阁.png"),
        },
      ]
    };
  },
  methods: {}
}
</script>

<style scoped>
/* “Tissue Search”字体样式 */
.position {
  font-size: 15px;
  font-weight: 600;
}

/* 图片总布局，样式 */
.images {
  display: flex;
  /*margin-top: 20px;*/
  margin-left: 50px;
  margin-right: 19px;
  flex-wrap: wrap;
}

/* 图片之间 */
.image-middle {
  margin-right: 25px;
  margin-bottom: 25px;
}

/* 单张图片样式 */
.image {
  width: 176px;
  height: 248px
}
</style>