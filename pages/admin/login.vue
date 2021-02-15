<template>
  <el-card :class="{width:'500px'}" shadow="always">
    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
  <h1>войти в панель администратора</h1>
  <el-form-item label="текст в формате .md или .html" prop="text">
    <el-input v-model.trim="controls.text" type="textarea" :rows="10" resize="none"/>
  </el-form-item>
  <div class="mb">
</div>
  <div class="mb"></div>
    <el-button type="primary" round native-type="submit" :loading="loading">обновить</el-button>


</el-form>
  </el-card>
</template>
<script>
export default {
  layout:'empty',
  data(){
    return {
      loading:false,
      controls:{
        text:''
      },
              rules: {
          text: [
            { required: true, message: 'Текст не должен быть пустым', trigger: 'blur' },
            ],


        }

    }
  },
  mounted(){
    const {message}=this.$route.query
    switch(message){
      case "login":
        this.$message.info("для начала войдите в систему")
        break
      case "logout":
        this.$message.info("вы успешно вышли из системы")
        break
      case "session":
        this.$message.warning("время сессии истекло")
        break
    }

  },
  head:{
    title:`вход в панель администратора | ${process.env.appName}`
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
            await this.$store.dispatch('auth/login',formData)
            this.$router.push('/admin')
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

</style>
