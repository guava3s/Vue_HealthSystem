export default {
    namespaced: true,
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