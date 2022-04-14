// 设置登录与注册相关属性与函数以及背景图片挂载以及销毁
import {anyExcept} from "@/util/StringUtil";

const mixin_LoginAndRegister = {
    data() {
        return {
            BtnState: 'info',
            verifyCode: '', // 验证码/密码
            mark: {
                markPhone: false, // 标记phone是否填入
                markOther: false, // 标记密码与短信验证码
                markCheck: false  // 标记协议是否勾选
            }
        }
    },
    methods: {
        // 从MyPhoneInput组件获取用户输入的手机号
        setMarkPhone(pn) {
            this.mark.markPhone = pn !== '';
        },
        // 从MyVerify组件/MyPassword组件获取用户输入的验证码/密码
        setVerifyCode(vc) {
            this.verifyCode = vc;
            this.mark.markOther = vc !== '';
        },
        // 从MyProtocol组件获取协议勾选状态
        setCheckState(cs) {
            this.mark.markCheck = cs;
        },
        resetAll() {
            this.verifyCode = '';
            this.mark.markOther = false;
            this.mark.markOther = false;
            this.$bus.$emit('setPhoneNumber', '');
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
        }
    },
    mounted() {
        // 挂载该组件后设置背景图片为background.jpg
        document.querySelector('body').setAttribute('style', "background-image: url(" + require("../../static/background-1.jpg") + "); background-size: cover;" +
            "background-repeat: no-repeat");
        // 绑定返回验证码事件
        this.$bus.$on('setVerifyCode', this.setVerifyCode);
        // 绑定返回勾选事件
        this.$bus.$on('setCheckState', this.setCheckState);
        this.$bus.$on('setMarkPhone', this.setMarkPhone);

    },
    beforeDestroy() {
        // 在销毁该组件前撤销背景图片
        document.querySelector('body').removeAttribute('style');
        // 解除事件绑定
        this.$bus.$off('setVerifyCode');
        this.$bus.$off('setCheckState');
        this.$bus.$off('setMarkPhone');
    }
}
export {mixin_LoginAndRegister}