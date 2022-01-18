<template>
  <div id="home">
    <div class="shell">
      <input type="file" ref="file" @change="addListen" />
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="stop">结束</button>
      <button @click="prev">上一首</button>
      <button @click="next">下一首</button>
    </div>
  </div>
</template>

<script>
// 暴露方法 分别暴露
import { player } from "../utiles/player";

export default {
  name: "Home",
  methods: {
    play() {
      // var reader0 = new FileReader();
      // console.log(this.$refs.file.files[0]);
      // reader0.readAsArrayBuffer(this.$refs.file.files[0]);
      // reader0.onload = function () {
      //   console.log("onload拿到的数据为" + this.result);
      //   console.log("状态" + this.readyState);
      // };
      player.play();
    },
    pause() {
      player.pause();
    },
    stop(){
      player.stop();
    },
    prev(){
      player.prev();
    },
    next(){
      player.next();
    },
    
    addListen() {
      player.append(this.$refs.file.files[0]);
    },
  },
};
</script>

<style lang="scss">
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #efefef;
}
#home {
  background-color: #eee;
  width: 400px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  .shell {
    background-color: #fff;
    width: 80%;
    height: 80%;
    border-radius: 40px;
  }
}
</style>