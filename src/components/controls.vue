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
    <i class="iconfont icon-danlieliebiao" @click="play"></i>
  </div>
</template>

<script>
import { player } from "../utiles/player";
export default {
  data() {
    return {
      onplay: false,
    };
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
  i {
    color: rgba(63, 63, 63, 0.534);
    font-size: 24px;
    margin: 0 15px;
    line-height: 40px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
    transform: scale(1.2);
      color: #7367F0;
    }
  }
}
</style>>
