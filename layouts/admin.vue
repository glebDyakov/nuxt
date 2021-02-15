<template>
<div class="admin-layout-wrap">
  <el-container :style="{height:'100%'}">
  <el-aside width="250px">
    aside
  </el-aside>
  <el-main>
    <nuxt/>
  </el-main>
</el-container>
</div>

</template>
<script>
import AppAside from '@/components/admin/Aside'
export default {
components:{
  AppAside
}
}
</script>
<style lang="scss">
  .admin-layout-wrap{
    width: 100%;
    height:100vh;
  }
</style>
