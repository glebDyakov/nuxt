<template>
  <el-table
    :data="posts"
    style="width: 100%">
        <el-table-column prop="title" label="Название" />

    <el-table-column
      label="Дата"
      width="180">
      <template slot-scope="{row:{date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ date | date("date")}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="views" label="просмотры" >
              <template slot-scope="{row:{views}}">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="views" label="комментарии" >
              <template slot-scope="{row:{comments}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Действия">

      <template slot-scope="scope">
            <el-tooltip effect="dark" content="открыть пост" placement="top">
              <el-button
              circle
              icon="el-icon-edit"
              type="danger"
              @click="open(row._id)"/>
            </el-tooltip>
            <el-tooltip effect="dark" content="удалить" placement="top">
            <el-button
            circle
            icon="el-icon-delete"
            type="danger"
            @click="remove(row._id)"/>            </el-tooltip>


      </template>
    </el-table-column>
  </el-table>

</template>
<script>
export default {
  layout:'admin',
  middleware:['admin-auth'],
  head(){
    return {
      title:`Пост | ${this.post.title}`
    }
  },
  head:{
    title:`все посты | ${process.env.appName}`
  },
  validate({params}){
    if(!!params.id)
  },
  async asyncData({store}){
    return {
      const posts =await store.dispatch("post/fetchAdminPosts")
      return {
        posts
      }
    }
  },
  methods:{
    open(){
        this.$router.push(`/admin/post/${id}`)
    },
    async remove(){
      try{
          await this.$confirm('Удалить пост?', 'Внимание', {
          confirmButtonText: 'да',
          cancelButtonText: 'отменить',
          type: 'warning'
        })
        await this.$store.dispatch("post/remove",id)
        this.posts=this.posts.filter(p => p._id!== id)
        this.$message.success("Пост удалён")
      }catch(e){

      }

    },
  }
}
</script>
