<template>
  <div id="controls">
    <!-- 下方工具栏 -->
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
    <i class="iconfont icon-danlieliebiao" @click="showList"></i>

    <!-- 播放列表 -->
    <div class="playlist" v-show="showlist">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <input type="file" ref="file" @change="addListen" />
        <i class="iconfont icon-jiahao"></i>
        <template v-if="playList.length == 0">
          <span class="tip">还没有添加歌曲呢</span>
        </template>
        <template v-if="!playList.length == 0">
          <ul>
            <li
              v-for="song in playList"
              :key="song.index"
              :class="{ active: song.index == currentIndex }"
              @click="changeSong(song.index)"
            >
              {{ song.name }}
            </li>
          </ul>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { player } from "../utiles/player";
export default {
  data() {
    return {
      showlist: true,
      onplay: false,
    };
  },
  computed: {
    ...mapState([
      "onplayName",
      "duration",
      "position",
      "playList",
      "currentIndex",
    ]),
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
    addListen() {
      // 用户传了又不穿会把this.$refs.file.files里面的东西顶掉
      if (this.$refs.file.files.length === 0) return;
      this.$store.commit("addPlaylist", this.$refs.file.files[0]);
      player.stop();
    },
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
    changeSong(index) {
      this.stop();
      this.$store.commit("changeSong", index);
    },
    showList() {
      this.showlist = !this.showlist
    },
  },
};
</script>

<style lang="scss">
#controls {
  position: relative;
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
  .playlist {
    position: absolute;
    right: -330px;
    top: -132px;
    .el-card__body {
      min-width: 250px;
      min-height: 150px;

      // icon加号在底层显示 作为样式
      i {
        margin: 0;
        height: 30px;
        line-height: 30px;
        position: absolute;
        right: 20px;
        top: 20px;
      }
      .tip {
        margin-top: 20px;
        display: block;
        text-align: center;
      }

      // input框在表层作为应用
      input {
        opacity: 0;
        position: absolute;
        right: 20px;
        top: 20px;
        height: 32px;
        width: 30px;
        z-index: 999;
        font-size: 0;
        border: 0px;
        cursor: pointer;
        &:hover ~ i {
          transform: scale(1.2);
          color: #7367f0;
        }
      }

      // 写列表样式
      ul {
        margin-top: 20px;
        padding-left: 20px;
        li {
          list-style: none;
          display: block;
          cursor: pointer;
          margin-top: 10px;
        }
        .active {
          color: #7367f0;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>>
