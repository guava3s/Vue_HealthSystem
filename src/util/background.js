// 设置背景图片挂载以及销毁
const background = {
    mounted() {
        // 挂载该组件后设置背景图片为background.jpg
        document.querySelector('body').setAttribute('style', "background-image: url(" + require("../../static/background-1.jpg") + ");background-size: cover;" +
            "background-repeat: no-repeat");
    },
    beforeDestroy() {
        // 在销毁该组件前撤销背景图片
        document.querySelector('body').removeAttribute('style');
    }
}
export {background}