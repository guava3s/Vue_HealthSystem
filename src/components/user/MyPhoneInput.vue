<template>
  <el-input type="text" placeholder="请输入11位手机号" v-model="phoneNumber" autocomplete="off" @change="checkNumber">
    <template slot="prepend">+86</template>
  </el-input>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {elevenNumber} from "@/util/StringUtil";
import {prompts} from "@/mixin/mixin_prompt";

export default {
  name: "MyPhoneInput",
  // requiredCheck :表示是否需要检查是否存在于数据库
  props: ['requiredCheck', 'phoneNum', 'auth'],
  data() {
    return {
      phoneNumber: this.phoneNum
    }
  },
  computed: {
    ...mapState('user', ['Phone']),
  },
  methods: {
    ...mapActions('user', ['updatePhoneByAxios']),
    ...mapMutations('user', ['setPhone', 'setUrl']),
    // 检查手机号是否可用以及存在
    checkNumber() {
      // 检查是否符合账号规则
      if (elevenNumber(this.phoneNumber)) {
        this.setPhone(this.phoneNumber);
      } else {
        this.phoneNumber = '';
        return prompts.methods.errorPrompt("请输入正确账号");
      }
      let _this = this;
      if (this.requiredCheck) {
        // 检查是被谁调用
        this.$http({
          method: 'post',
          url: '/user/verify/check',
          params: {
            phoneNumber: this.Phone
          }
        }).then(function (data) {
          console.log("返回的数据为:", data);
          if (data.data.state) {
            _this.setPhone(_this.phoneNumber);
          } else {
            prompts.methods.warningPrompt("该账号不可使用");
            _this.setPhone('');
            _this.phoneNumber = '';
          }
        });
      }
      if (this.auth) {
        this.setUrl('http://localhost:8000/user/verify/codeAuth');
      } else {
        this.setUrl('http://localhost:8000/user/verify/code');
      }
    }
  },
  watch: {
    // 监听phoneNumber属性变化
    phoneNumber(newValue) {
      this.$bus.$emit('setMarkPhone', newValue);
      this.setPhone('');
    }
  }
}
</script>

<style scoped>
</style>