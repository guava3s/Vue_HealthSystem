import {Message} from "element-ui";

const prompts = {
    methods: {
        successPrompt(data) {
            Message({
                message: data,
                type: 'success',
                center: true,
                duration: 1500
            });
        },
        errorPrompt(data){
            Message({
                message: data,
                type: 'error',
                center: true,
                duration: 1500
            });
        }
    }
}

export {prompts}