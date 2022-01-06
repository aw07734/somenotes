<template>
  <input ref="input"
         :type="type"
         :value="currentValue"
         @input="handleInput"
         @blur="handleBlur">
</template>

<script>
import EventEmitter from '../util'

export default {
  name: "Input",
  mixins: [EventEmitter],
  props: ['type', 'value'],
  data() {
    return {
      currentValue: this.value,
      id: this.label
    };
  },
  watch: {
    value(value) {
      this.currentValue = value;
    }
  },
  mounted() {
    if (this.$parent.labelFor) {
      this.$refs.input.id = this.$parent.labelFor
    }
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('form-item', 'form-change', value);
    },
    handleBlur() {
      this.dispatch('form-item', 'form-blur', this.currentValue);
    }
  }
}
</script>

<style scoped>

</style>
