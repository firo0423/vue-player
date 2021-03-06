import { createStore } from "vuex";
import { player } from "../utiles/player";
export default createStore({
  state: {
    voiceBar: 80,
    progressBar: 0, // 控制进度条
    onplayName: "",
    duration: 0, //时长
    position: 0, //当前所处位置
    playList: [],
    currentIndex:0,
    autoPlay: player.autoPlay, // 自动播放
    change: false,
  },
  mutations: {
    INIT_STATE(state) {
      const draw = () => {
        // requestAnimationFrame 类似 setInterval，用来做循环正合适，因为此方法会跟随屏幕刷新率执行
        window.requestAnimationFrame(draw);
        // const progress = player.position / player.duration;
        // state.progress = `${(progress * 100).toFixed(2)}%`;
        state.onplayName = player.current.name; // 歌曲名字
        state.duration = player.duration; // 歌曲时长
        state.currentIndex = player.currentIndex // 播放歌曲序号
        if (state.change) {
          state.position = (state.duration * state.progressBar) / 100; // 歌曲播放位置
        } else {
          state.position = player.position; // 歌曲播放位置
          state.progressBar = (
            (player.position / player.duration) *
            100
          ).toFixed(2); // 设置进度条
        }
      };
      draw();
    },
    async addPlaylist(state, target) {
      await player.append(target);
      state.playList.push({
        name: player.current.name,
        index: player.current.index,
      });
      console.log(state.playList);
    },
    changeVoiceBar(state, val) {
      player.voiceControl(val / 100);
      state.voiceBar = val;
    },
    changeProgressBar(state, val) {
      state.change = true;
      state.progressBar = val;
    },
    saveProgress(state) {
      player.position = state.position;
      if (state.progressBar == 100) player.stop();
      state.change = false;
    },
    changeSong(state,index){
      player.currentIndex = index
    }
  },
  actions: {},
  modules: {},
});
