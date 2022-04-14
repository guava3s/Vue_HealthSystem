export default {
    namespaced: true,
    actions: {},
    mutations: {
        updatePhone(state, value) {
            state.Phone = value;
        }
    },
    state: {
        Phone: ''
    },
    getters: {}
}