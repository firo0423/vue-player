<template>
  <div id="home">
    <div class="shell">
      <audio ref="audio" src="../../public/music/周华健 - 有没有一首歌会让你想起我.mp3"></audio>
      <button @click="play">播放</button>
    </div>
  </div>
</template>

<script>
export default {
  name:"Home",
  methods: {
    play(){
      this.$refs.audio.play()
    }
  },
}
</script>

<style lang="scss">
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #efefef;
}
#home{
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