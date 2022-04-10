import {Message} from "element-ui";

const success = {
    methods: {
        successPrompt(data) {
            Message({
                message: data,
                type: 'success',
                center: true,
                duration: 1500
            });
        }
    }
}

export {success}