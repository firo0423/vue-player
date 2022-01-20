<template>
  <div id="panel">
    <div class="time">
      <div class="position">{{ totalTime(position) }}</div>
      <div class="duration">{{ totalTime(duration) }}</div>
    </div>
    <div class="songName">{{ songName }}</div>
  </div>
</template>

<script>
import { player } from "../utiles/player";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["onplayName", "duration", "position"]),
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
    songName: function (data) {
      if (this.onplayName) return this.onplayName.replace(/\.mp3$/, "") || "";
      else return "未选择文件";
    },
  },
  methods: {
    async addListen() {
      // 用户传了又不穿会把this.$refs.file.files里面的东西顶掉
      if (this.$refs.file.files.length === 0) return;
      player.stop();
      await player.append(this.$refs.file.files[0]);
    },
  },
};
</script>

<style lang="scss">
#panel {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  .time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .position{
    color: #7367f0;
    font-size: 26px;
  }
  .duration{
    font-size: 14px;
  }
}
</style>>
