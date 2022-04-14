import {Message} from "element-ui";

function baseMassage(data,type){
    Message({
        message: data,
        type: type,
        center: true,
        duration: 1435
    });
}

const prompts = {
    methods: {
        successPrompt(data) {
            baseMassage(data,'success');
        },
        errorPrompt(data) {
           baseMassage(data,'error');
        },
        warningPrompt(data) {
            baseMassage(data,'warning');
        }
    }
}

export {prompts}