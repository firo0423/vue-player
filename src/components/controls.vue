<template>
  <div id="controls">
    <template v-if="!onplay">
      <i class="iconfont icon-24gf-play" @click="play"></i>
    </template>
    <template v-if="onplay">
      <i class="iconfont icon-24gf-pause2" @click="pause"></i>
    </template>
    <i class="iconfont icon-24gf-stop" @click="stop"></i>
    <i class="iconfont icon-shangyishou" @click="prev"></i>
    <i class="iconfont icon-xiayishou" @click="next"></i>
    <div class="position">
      {{ totalTime(position) }}/{{ totalTime(duration) }}
    </div>
    <i class="iconfont icon-danlieliebiao" @click="play"></i>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { player } from "../utiles/player";
export default {
  data() {
    return {
      onplay: false,
    };
  },
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
  },
  methods: {
    play() {
      player.play();
      this.onplay = true;
    },
    pause() {
      player.pause();
      this.onplay = false;
    },
    stop() {
      player.stop();
      this.onplay = false;
    },
    prev() {
      player.prev();
    },
    next() {
      player.next();
    },
  },
};
</script>

<style lang="scss">
#controls {
  height: 40px;
  display: flex;
  justify-content: center;
  .position {
    font-size: 18px;
    color: rgba(63, 63, 63, 0.534);
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 0 15px;
    user-select: none;
  }
  i {
    color: rgba(63, 63, 63, 0.534);
    font-size: 24px;
    margin: 0 15px;
    line-height: 40px;
    cursor: pointer;
    float: left;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.2);
      color: #7367f0;
    }
    &:last-child {
      float: right;
    }
  }
}
</style>>
