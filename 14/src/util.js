export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            const args = [eventName].concat(params);
            if (parent) {
                parent.$emit.apply(parent, args);
            }
        }
    }
}
