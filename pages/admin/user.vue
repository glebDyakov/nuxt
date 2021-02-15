<template>
  <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
  <h1>создать пользователя</h1>
  <el-form-item label="логин" prop="login">
    <el-input v-model.trim="controls.login"/>
  </el-form-item>
  <div class="mb">
  <el-form-item label="пароль" prop="password">
    <el-input type="password" v-model.trim="controls.password"/>
  </el-form-item>
</div>
    <el-button type="primary" round native-type="submit" :loading="loading">создать</el-button>


</el-form>
</template>
<script>
export default {
  layout:'admin',
  data(){
    return {
      loading:false,
      controls:{
        login:'',
        password:''
      },
              rules: {
          login: [
            { required: true, message: 'Введите логин', trigger: 'blur' },
            ],
          password: [
            { required: true, message: 'Введите пароль', trigger: 'blur' }
            { min:6, message: 'пароль должен быть не менее 6 символов', trigger: 'blur' }
          ],

        }

    }
  },
  head:{
    title:`создать пользователя | ${process.env.appName}`
  },
  methods:{
    onSubmit(){
      this.$refs.form.validate(async valid => {
        if(valid){
          this.loading=true
          try{
            const formData={
              login:this.controls.login,
              password:this.controls.password
            }
            await this.$store.dispatch('auth/createUser',formData)
            this.$message.success("")
            this.controls.login=''
            this.controls.password=''
            this.loading=false
          }catch(e){
            console.log(e)
            this.loading=false
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  form{
    width:600px;
  }
</style>
