<template>
<el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
  <h1>создать новый пост</h1>
  <el-form-item label="введите название поста" prop="title">
    <el-input v-model.trim="controls.title"/>
  </el-form-item>
  <el-form-item label="текст в формате .md или .html" prop="text">
    <el-input v-model.trim="controls.text"/>
  </el-form-item>
  <el-button type="success" plain @click="!previewDialog">Предпросмотр</el-button>
  <el-dialog
  title="предпросмотр"
  :visible.sync="previewDialog">
    <div :key="controls.text">
      <vue-markdown>{{controls.text}}</vue-markdown>
    </div>
</el-dialog>
<el-upload
  :auto-upload="false"
  ref="upload"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  on-change="handleImageChange">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">перетащите картинку <em>или нажмите</em></div>
  <div class="el-upload__tip" slot="tip">файлы с расширением jpg/png</div>
</el-upload>


  <div class="mb">

</div>
  <div class="mb">
    <small>
              <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ new Date(post.date).toLocaleString() }}</span>
    </small>
    <small>
              <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ post.views }}</span>
    </small>
  </div>
    <el-button type="primary" round native-type="submit" :loading="loading">создать пост</el-button>


</el-form>
</template>
<script>
export default {
  layout:'admin',
  middleware:['admin-auth'],
  head:{
    title:`новый пост | ${process.env.appName}`
  },
  data(){
    return {
      image:null,
      previewDialog:false,
      loading:false,
      controls:{
        title:'',
        text:''
      },
              rules: {
          text: [
            { required: true, message: 'текст не должен быть пустым', trigger: 'blur' },
            ],
          title: [
            { required: true, message: 'название поста не может быть пустым', trigger: 'blur' },
            ],

        }

    }
  },
  methods:{
    handleImageChange(file,fileList){
      this.image=file.raw
    },
    onSubmit(){
      this.$refs.form.validate(async valid => {
        if(valid && this.image){
          this.loading=true
          const formData={
            title:this.controls.title,
            text:this.controls.text,
            image:this.controls.image,
          }
          try{
            await this.$store.dispatch("post/create",formData)
            this.controls.text=''
            this.controls.title=''
            this.controls.image=null
            this.$refs.upload.clearFiles()
            this.$message.success("Пост был успешно создан")
            this.loading=false
          }catch(e){
            this.loading=false
          }


        }
        else{
            this.$message.warning("форма не валидна")
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
form{
  width: 600px;
}
</style>
