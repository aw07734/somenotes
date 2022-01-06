<template>
  <div id="app">
    <ck-form ref="form" :model="formModel" :rules="formRules">
      <ck-form-item label="名称" prop="name">
        <ck-input v-model.trim="formModel.name"></ck-input>
      </ck-form-item>
      <ck-form-item label="邮箱" prop="email">
        <ck-input v-model.trim="formModel.email"></ck-input>
      </ck-form-item>
    </ck-form>

    <button @click="handleSubmit">提交</button>
  </div>
</template>

<script>
import Form from './components/Form.vue'
import FormItem from './components/FormItem.vue'
import Input from './components/Input.vue'

export default {
  name: 'App',
  components: {
    'ck-form': Form,
    'ck-form-item': FormItem,
    'ck-input': Input
  },
  data() {
    return {
      formModel: {
        name: '',
        email: ''
      },
      formRules: {
        name: [
          {
            required: true,
            message: 'name 不能为空!',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'email 不能为空!',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮件格式错误!',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate()
          .then(() => console.log('valid'))
          .catch(err => console.log('err', err));
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
