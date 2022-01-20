<template>
  <div id="home">
    <!-- 栏栅布局 -->
    <el-row class="row-bg" justify="center">
        <el-card class="shell">
          <!-- 三个组件 -->
          <panel />
          <progressBar />
          <controls />
          <!--  -->
        </el-card>
    </el-row>
  </div>
</template>

<script>
// input file上传按钮的美化思路是，先把之前的按钮透明度opacity设置为0,然后，外层用div包裹，就实现了美化功能。
import progressBar from "../components/progressBar.vue";
import controls from "../components/controls.vue";
import panel from "../components/panel.vue";
export default {
  components: {
    controls,
    panel,
    progressBar,
  },
};
</script>

<style lang="scss">
*{
  font-family: Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
body {
  background-color: #eee;
}
.el-row {
  margin-top: 300px;
  
  .el-card {
    border-radius: 10px;
    overflow: visible !important;
  }
}
</style>>

