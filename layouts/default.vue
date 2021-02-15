<template>
 <el-container>
  <el-header>
    <app-navigation/>
  </el-header>
  <el-main>
    <nuxt/>
  </el-main>
  <el-footer/>
</el-container>

</template>

<style>

</style>
<script>
import AppNavigation from '@/components/main/Navigation'
export default {
  computed:{
    error(){
      return this.$store.getters.error
    }
  },
  components:{
    AppNavigation
  }
}
</script>
