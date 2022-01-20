<template>
  <div id="progressBar">
    <!-- 进度条 -->
    <input
      class="progress"
      ref="progress"
      type="range"
      v-model="getProgressBar"
      @mousedown="change = true"
      @mouseup="saveChange"
      :style="{
        '--progressBar_length': active_progressBar_length,
      }"
    />
    <input
      ref="voice"
      class="voice"
      type="range"
      v-model="getVoiceBar"
      :style="{
        '--voiceBar_length': active_voiceBar_length,
      }"
    />
  </div>
</template>

<script>
import { player } from "../utiles/player";
export default {
  data() {
    return {
      progressBar_length: "",
      voiceBar_length: "",
      screenWidth: document.body.clientWidth,
    };
  },
  mounted() {
    this.$store.commit("INIT_STATE");
    this.progressBar_length = this.$refs.progress.clientWidth;
    this.voiceBar_length = this.$refs.voice.clientWidth;
    // 用来检测页面尺寸变化
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {},
  watch: {
    screenWidth: {
      deep: true,
      handler() {
        this.progressBar_length = this.$refs.progress.clientWidth;
        this.voiceBar_length = this.$refs.voice.clientWidth;
      },
    },
  },
  computed: {
    active_progressBar_length: function (data) {
      return `${data.progressBar_length * (this.getProgressBar / 100)}px`;
    },
    active_voiceBar_length: function (data) {
      return `${data.voiceBar_length * (this.getVoiceBar / 100)}px`;
    },

    // 开始整活
    getVoiceBar: {
      get() {
        // 这里也是用了Vuex里的 modules 大家可以当成普通的变量来看
        return this.$store.state.voiceBar;
      },
      set(newVal) {
        this.$store.commit("changeVoiceBar", newVal);
      },
    },
    getProgressBar: {
      get() {
        // 这里也是用了Vuex里的 modules 大家可以当成普通的变量来看
        return this.$store.state.progressBar;
      },
      set(newVal) {
        this.$store.commit("changeProgressBar", newVal);
      },
    },
  },
  methods: {

    // 松开鼠标通过进度条的值改变player中position的值
    saveChange() {
      this.$store.commit("saveProgress");
    },
  },
};
</script>

<style lang="scss">
#progressBar {
  position: relative;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  // 滑块样式
  .progress {
    width: 170px;
    // 给轨道添加样式
    -webkit-appearance: none;
    background-color: transparent;
    border: 1.5px solid rgb(212, 212, 212);
    height: 5px;
    width: 80%;
    outline: none;
    border-radius: 10px;
    z-index: 999;
    transition: all 0.15s;
    &:hover {
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
      transition: all 0.15s;

      &:hover {
        transform: scale(1.2);
        background-color: #7367f0;
      }
    }
    &::after {
      position: absolute;
      content: "";
      height: 5px;
      width: var(--progressBar_length);
      border-radius: 10px;
      background-color: #7267f0ca;
      z-index: -1;
      transition: background 0.15s;
    }
    &:hover::after {
      background-color: #7367f0;
    }
  }

  .voice {
    position: relative;
    width: 20%;
    // 给轨道添加样式
    -webkit-appearance: none;
    background-color: transparent;
    border: 1.5px solid rgb(212, 212, 212);
    height: 5px;
    outline: none;
    border-radius: 10px;
    z-index: 999;
    transition: all 0.15s;
    &:hover {
      box-shadow: 0 0 1px 1px #7267f044;
    }
    &::after {
      position: absolute;
      content: "";
      height: 5px;
      width: var(--voiceBar_length);
      border-radius: 10px;
      background-color: #7267f0ca;
      transition: background 0.15s;
      z-index: -1;
    }
    &:hover::after {
      background-color: #7367f0;
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
      transition: all 0.15s;

      &:hover {
        transform: scale(1.2);
        background-color: #7367f0;
      }
    }
  }
}
</style>>

