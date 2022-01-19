<template>
  <div id="home">
    <div class="shell">
      <input type="file" ref="file" @change="addListen" /> <br />
      <div class="onplayName">{{ songName }}</div>
      <div class="onplayTime">
        {{ totalTime(position) }}/{{ totalTime(duration) }}
      </div>
      <!-- 进度条 -->
      <input
        type="range"
        v-model="progressBar"
        @mousedown="change = true"
        @mouseup="saveChange"
      /><br />
      <input
        type="range"
        v-model="voiceBar"
        @change="setVoice(voiceBar)"
      /><br />

      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="stop">结束</button>
      <button @click="prev">上一首</button>
      <button @click="next">下一首</button>
      <button @click="changeMode">自动播放:{{ autoPlay }}</button>
    </div>
    <div class="list">
      <ul>
        <li v-for="(song, index) in playList" :key="index">{{ song.name }}</li>
      </ul>
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
      voiceBar:80,
      progressBar: 0, // 控制进度条
      onplayName: "",
      duration: 0, //时长
      position: 0, //当前所处位置
      playList: [],
      autoPlay: player.autoPlay, // 自动播放
      change: false,
    };
  },
  mounted() {
    const draw = () => {
      // requestAnimationFrame 类似 setInterval，用来做循环正合适，因为此方法会跟随屏幕刷新率执行
      window.requestAnimationFrame(draw);
      const progress = player.position / player.duration;
      this.progress = `${(progress * 100).toFixed(2)}%`;
      this.onplayName = player.current.name; // 歌曲名字
      
      this.duration = player.duration; // 歌曲时长

      if (this.change) {
        this.position = this.duration*this.progressBar/100; // 歌曲播放位置
      } else {
        this.position = player.position; // 歌曲播放位置
        this.progressBar = ((player.position / player.duration) * 100).toFixed(2); // 设置进度条
      }
      
    };
    draw();
  },
  methods: {
    setVoice(val){
      player.voiceControl(val/100)
    },

    // 松开鼠标通过进度条的值改变player中position的值
    saveChange(){
      player.position = this.position 
      if(this.progressBar == 100) this.stop()
      this.change = false
    },
    changeMode() {
      player.autoPlay = !player.autoPlay;
      this.autoPlay = player.autoPlay;
    },
    play() {
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
      this.onplayName = player.current.name;
      this.duration = player.duration;
    },
    next() {
      player.next();
      this.onplayName = player.current.name;
      this.duration = player.duration;
    },
    async addListen() {
      // 用户传了又不穿会把this.$refs.file.files里面的东西顶掉
      if (this.$refs.file.files.length === 0) return;
      player.stop();
      await player.append(this.$refs.file.files[0]);
      this.onplayName = player.current.name;
      this.duration = player.duration;
      this.playList = player.playList;
      this.position = player.position;
    },
  },
  computed: {
    // Vue3 把过滤器给删了这里用计算属性来写
    // 注意在计算属性里面不要用this指向
    songName: (data) => {
      if (data.onplayName) return data.onplayName.replace(/\.mp3$/, "") || "";
      else return "未选择文件";
    },

    totalTime: () => {
      return (time) => {
        if (time == 0) return `00:00`;
        let showMin = Math.floor(time / 60);
        let showSec = Math.floor(time % 60);
        return `${showMin < 10 ? "0" : ""}${showMin}:${
          showSec < 10 ? "0" : ""
        }${showSec}`;
      };
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