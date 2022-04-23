const mixin_routerChange = {
    methods: {
        pushPage(name) {
            this.$router.push({
                name: name
            });
        },
        replacePage(name) {
            this.$router.replace({
                name: name
            });
        }
    }
}

export {mixin_routerChange}