<template>
  <div id="home">
    <div class="shell">
      <input type="file" ref="file" @change="addListen" /> <br />
      <div class="onplayName">{{ nameFormatter }}</div>
      <div class="onplayTime">{{ timeFormatter }}</div>
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
  data() {
    return {
      onplayName: " ",
      duration: 0.001, //时长
    };
  },
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
    stop() {
      player.stop();
    },
    prev() {
      player.prev();
    },
    next() {
      player.next();
    },
    async addListen() {
      await player.append(this.$refs.file.files[0]);
      this.onplayName = player.current.name;
      this.duration = player.duration
      console.log(player.current.name);
      console.log(player.duration);
    },
  },
  computed: {
    // Vue3 把过滤器给删了这里用计算属性来写
    // 注意在计算属性里面不要用this指向
    nameFormatter: (player) => {
      console.log(player);
      return player.onplayName.replace(/\.mp3$/, "") || "";
    },

    timeFormatter: (data) => {
      console.log(data.duration+'for computed');
      if (data.duration == 0.001) return `00:00`;
      let showMin = Math.floor(data.duration / 60);
      let showSec = Math.floor(data.duration % 60);
      return `${showMin< 10 ?"0" : ""}${showMin}:${showSec < 10 ? "0" : ""}${showSec}`;
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