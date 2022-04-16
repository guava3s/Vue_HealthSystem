import {prompts} from "@/util/mixin_prompt";
import axios from "axios"
import {elevenNumber} from "@/util/StringUtil"; // 引入axios

export default {
    namespaced: true,
    actions: {
        // 更新验证码并发送至后端校验
        updateVerifyCodeAndSend(context, value) {
            axios({
                url: 'http://localhost:8000/user/verify/code',
                params: {
                    phoneNumber: context.state.Phone
                }
            }).then(function (data) {
                console.log(data);
                if (data.data.state) {
                    prompts.methods.successPrompt('发送成功');
                    context.commit('setVerifyCode', value);
                } else {
                    prompts.methods.warningPrompt(data.data.message);
                }
            });
        },
        // 检查是否符合格式
        updatePhoneByFormatCheck(context, value) {
            if (elevenNumber(value)) {
                context.commit('setPhone', value);
            } else {
                prompts.methods.errorPrompt("请输入正确账号");
            }
        },
        // 检查账号是否有效，并更新仓库中的Phone值
        updatePhoneByAxios(context, value) {
            axios({
                method: 'post',
                url: 'http://localhost:8000/user/verify/check',
                params: {
                    phoneNumber: value
                }
            }).then(function (data) {
                console.log("返回的数据为:", data);
                if (data.data.state) {
                    prompts.methods.successPrompt("该账号可以使用");
                    context.commit('setPhone', value);
                } else {
                    prompts.methods.warningPrompt("该账号已存在");
                }
            });
        }
    },
    mutations: {
        flushAllProperty(state, value) {
            state.Phone = value;
            state.CacheVerifyCode = value;
        },
        setPhone(state, value) {
            state.Phone = value;
        },
        setVerifyCode(state, value) {
            state.VerifyCode = value;
        }
    },
    state: {
        Phone: '',
        VerifyCode: '',// 密码/验证码
    }
}