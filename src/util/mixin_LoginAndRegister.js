// 设置登录与注册相关属性与函数以及背景图片挂载以及销毁
import {anyExcept} from "@/util/StringUtil";

const mixin_LoginAndRegister = {
    data() {
        return {
            BtnState: 'info',
            verifyCode: '',
            ruleForm: {
                phone: '',
            },
            mark: {
                markPhone: false, // 标记phone是否填入
                markOther: false, // 标记密码与短信验证码
                markCheck: false  // 标记协议是否勾选
            }
        }
    },
    methods: {
        // 从MyPhoneInput组件获取用户输入的手机号
        getPhoneNumber(pn) {
            this.ruleForm.phone = pn;
            this.mark.markPhone = pn !== '';
        },
        // 从MyVerify组件获取用户输入的验证码
        getVerifyCode(vc) {
            this.verifyCode = vc;
            this.mark.markOther = vc !== '';
        },
        // 从MyProtocol组件获取协议勾选状态
        getCheckState(cs) {
            this.mark.markCheck = cs;
        }
    },
    watch: {
        mark: {
            deep: true,
            handler() {
                if (anyExcept(this.mark)) {
                    this.BtnState = 'success';
                } else {
                    this.BtnState = 'info';
                }
            }
        },
        'ruleForm.phone': {
            // 更新MyVerify组件的Phone值
            handler(newValue) {
                // 由于存在路由转发，无法具体给到标签设置ref属性，则只能使用全局事件总线通信
                // this.$refs.myVerify.phoneNumber = newValue;
                this.$bus.$emit('updatePhoneNumber', newValue);
            }
        }
    },
    mounted() {
        // 挂载该组件后设置背景图片为background.jpg
        document.querySelector('body').setAttribute('style', "background-image: url(" + require("../../static/background-4.jpg") + "); background-size: cover;" +
            "background-repeat: no-repeat");
        // 绑定返回手机号事件
        this.$bus.$on('returnPhoneNumber', this.getPhoneNumber);
        // 绑定返回验证码事件
        this.$bus.$on('returnVerifyCode', this.getVerifyCode);
        // 绑定返回勾选事件
        this.$bus.$on('returnCheckState', this.getCheckState);
    },
    beforeDestroy() {
        // 在销毁该组件前撤销背景图片
        document.querySelector('body').removeAttribute('style');
        // 解除事件绑定
        this.$bus.$off('returnVerifyCode');
        this.$bus.$off('returnPhoneNumber');
        this.$bus.$off('returnCheckState');
    }
}
export {mixin_LoginAndRegister}