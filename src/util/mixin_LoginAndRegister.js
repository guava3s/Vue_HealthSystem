// 设置登录与注册背景图片挂载以及销毁
import {anyExcept} from "@/util/StringUtil";

const mixin_LoginAndRegister = {
    data() {
        return {
            verifyCode: '',
            ruleForm: {
                phone: '',
                check: ''
            },
            mark: {
                markPhone: false, // 标记phone
                markCheck: false  // 标记是否勾选
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
        }
    },
    watch: {
        mark: {
            deep: true,
            handler() {
                if (anyExcept(this.mark)) {
                    console.log("改变状态");
                    this.loginBtnState = 'success';
                } else {
                    this.loginBtnState = 'info';
                }
            }
        },
        'ruleForm.check': {
            handler() {
                this.mark.markCheck = this.ruleForm.check
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
    },
    beforeDestroy() {
        // 在销毁该组件前撤销背景图片
        document.querySelector('body').removeAttribute('style');
        // 解除事件绑定
        this.$bus.$off('returnVerifyCode');
        this.$bus.$off('returnPhoneNumber');
    }
}
export {mixin_LoginAndRegister}