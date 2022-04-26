<template>
  <div>
<!--    <br>-->
<!--    <br>-->
    <MyContentHeader class="my-content-header"/>
    <MyShowBook class="my-show-book"/>
    <!--分页-->
    <!--    <div class="electricAlarmManagement-pagination">-->
    <!--      <v-pagination @currentChange="pageCurrentChangeHandle" @handleSizeChange="handleSizeChange"-->
    <!--                    :current-page="page"-->
    <!--                    :page-size="limit" :total="total"></v-pagination>-->
    <!--    </div>-->
  </div>
</template>

<script>
import MyContentHeader from "@/components/main/MyContentHeader";
import MyShowBook from "@/components/main/MyShowBook";

export default {
  name: "PageBookRepository",
  components: {MyShowBook, MyContentHeader}
}
</script>

<style scoped>
.my-content-header {
  position: fixed;
  left: 270px;
  right: 50px;
  top: 61px;
  background-color: white;
}
.my-show-book{
  margin-top: 200px;
}

</style>