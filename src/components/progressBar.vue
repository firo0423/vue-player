<template>
  <div id="progressBar">
    <!-- 进度条 -->
    <input
      class="progress"
      ref="progress"
      type="range"
      v-model="progressBar"
      @mousedown="change = true"
      @mouseup="saveChange"
    />

    <div
      class="progressSlide"
      ref="progressSlide"
      :style="{
        '--progressBar_length': active_progressBar_length,
      }"
    ></div>
    <input
      ref="voice"
      class="voice"
      type="range"
      v-model="voiceBar"
      @change="setVoice(voiceBar)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      voiceBar: 80,
      progressBar: 0, // 控制进度条
      progressBar_length: "",
      voiceBar_length: "",
    };
  },
  mounted() {
    this.progressBar_length = this.$refs.progress.clientWidth;
    this.voiceBar_length = this.$refs.voice.clientWidth;
  },
  methods: {},
  computed: {
    active_progressBar_length: function (data) {
      return `${data.progressBar_length * (this.progressBar / 100)}px`;
    },
  },
};
</script>

<style lang="scss">
#progressBar {
  position: relative;
  height: 30px;
  background-color: #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;

  // 滑块样式
  .progress {
    width: 170px;
    // 给轨道添加样式
    -webkit-appearance: none;
    background-color: transparent;
    border: 1px solid rgb(212, 212, 212);
    height: 5px;
    width: 80%;
    outline: none;
    border-radius: 10px;
    z-index: 999;
    transition: all .1s;
    &:hover{
      box-shadow: 0 0 1px 1px #7267f044;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      cursor: pointer;
      background-color: #fff;
      border: 1.2px solid #7367f0;
      box-shadow: 0 0 3px 1px #7267f081;
      border-radius: 50%;
      transition: all 0.1s;

      &:hover {
        transform: scale(1.2);
        background-color: #7367f0;
      }
    }
  }
  .progress:hover ~ .progressSlide {
    background-color: #7367f0;
  }

  // 导轨样式
  .progressSlide {
    transition: background 0.1s;
    position: absolute;
    background-color: #7267f081;
    width: var(--progressBar_length);
    height: 5px;
    left: 2px;
    z-index: 1;
    border-right: 10px;
  }

  .voice {
    width: 80px;
  }
}
</style>>

