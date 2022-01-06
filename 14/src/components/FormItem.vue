<template>
  <div>
    <label>{{label}}</label>
    <slot/>
<!--    <div v-if="showMessage"></div>-->
  </div>
</template>

<script>
import EventEmitter from '../util'
import AsyncValidator from 'async-validator'

export default {
  name: "form-item",
  mixins: [EventEmitter],
  props: ['label', 'prop'],
  inject: ['form'],
  data() {
    return {

    };
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('Form', 'form-add', this);
    }
    this.$on('form-change', this.onFormChange);
    this.$on('form-blur', this.onFormBlur);
  },
  methods: {
    validate(trigger) {
      const rules = this.form.rules;
      const currentRules = rules[this.prop];
      const validRules = currentRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
      // 调用 async validator 进行校验
      const model = {[this.prop]: this.fieldValue};
      return new Promise(resolve => {
        return new AsyncValidator({[this.prop]: validRules})
            .validate(model, (errors, fields) => {
              if (errors) {
                throw errors;
              }
              return resolve(fields);
            });
      })
    },
    onFormChange() {
      this.validate('change');
    },
    onFormBlur() {
      this.validate('blur');
    }
  }
}
</script>

<style scoped>

</style>
