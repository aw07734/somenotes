<template>
  <div>
    form
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      fields: []
    }
  },
  props: ['model', 'rules'],
  provide() {
    return {form: this}
  },
  methods: {
    validate() {
      return Promise.all(this.fields.map(field => field.validate('')));
    }
  },
  created() {
    this.$on('form-add', field => {
      if (field) {
        this.fields.push(field);
      }
    })
  }
}
</script>

<style>

</style>
