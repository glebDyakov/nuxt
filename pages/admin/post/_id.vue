<template>
  <div>
    <el-breadcrumb separator="/" class="mb">
  <el-breadcrumb-item to="/admin/list">посты</el-breadcrumb-item>
  <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>

</el-breadcrumb>
 <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
  <h1>войти в панель администратора</h1>
  <el-form-item label="логин" prop="login">
    <el-input v-model.trim="controls.login"/>
  </el-form-item>
  <div class="mb">

</div>
  <div class="mb">
    <small>
              <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ post.date | date }}</span>
    </small>
    <small>
              <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ post.views }}</span>
    </small>
  </div>
    <el-button type="primary" round native-type="submit" :loading="loading">Войти</el-button>


</el-form>
  </div>
</template>
<script>
export default {
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
  methods:{
    onSubmit(){
      this.$$refs.form.validate(async valid => {
        if(valid){
          this.loading=true
          const formData={
            text:this.controls.text,
            id:this.post._id
          }

          try{
            await this.$store.dispatch("post/update",formData)
            this.$message.success("Пост обновлён")
            this.loading=false
          }catch(e){
            this.loading=false
          }

        }
      })
    }
  }
  layout:'main',
  middleware:['admin-auth'],
  async asyncData({store,params},){
    const post=await store.dispatch("post/fetchAdminById",params.id)
    return {post}
  }
},
mounted(){
  this.controls.text=this.post.text
}
</script>
<style lang="scss" scoped>
  .mr{
    margin-right: 2rem;
  }
  .page-wrap{
    width:600px
  }
</style>
