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
  methods: {},
};
</script>

<style lang="scss">
#panel {
  position: relative;
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
  .songName {
    font-size: 20px;
  }
  .position {
    color: #7367f0;
    font-size: 26px;
  }
  .duration {
    font-size: 14px;
  }
}
</style>>
