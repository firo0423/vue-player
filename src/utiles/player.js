// ajax => 原始数据(ArrayBuffer) => 解码后数据(AudioBuffer)
// => AudioBufferSourceNode(把解码后的数据挂载到音源上) => 通过audioContext.destination交由硬件播放

class Demo1 {
  constructor() {
    // 1. 创建一个AudioContext实例，这是音频处理程序运行的环境
    this.audioContext = new AudioContext({ latencyHint: "balanced" });
    this.playList = [];
    this.currentIndex = 0;
    this.localIndex = 0;
  }

  // async start(mp3) {
  //   console.log("开始执行");
  //   console.log(mp3);
  //   this.readAudioBuffer(mp3).then((decodedAudioData) => {
  //     this.play(decodedAudioData);
  //   });
  // }

  // 添加音频列表
  async append(mp3) {
    if (!this.playList.length) {
      this.localIndex = 0;
    }
    ++this.localIndex;
    console.log("添加完成：" + this.localIndex);
    this.playList.push({
      index: this.localIndex,
      offset: 0,
      source: null,
      buffer: await this.readAudioBuffer(mp3),
    });
  }

  // 来读取音频文件 -> 音频文件都是被压缩过的，使用要重新解码
  async readAudioBuffer(mp3) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // 文件读取完后触发promise
      reader.onload = async (e) => {
        console.log("读取完成");
        this.audioContext
          .decodeAudioData(e.target.result)
          .then(resolve, reject);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(mp3);
    });
  }

  // 播放
  async play() {
    if (!this.playList.length) {
      return;
    }
    // 像竹子一样一个个节点连起来
    // 创建首节点
    const sourceNode = this.audioContext.createBufferSource();
    // 创建后需要往其buffer属性上挂载需要播放的数据
    sourceNode.buffer = this.playList[this.currentIndex].buffer;
    // 转到硬件播放 destination 表示 context 的最终节点，一般是音频渲染设备
    sourceNode.connect(this.audioContext.destination);
    console.log("开始播放");
    sourceNode.start(0);
    // 在播放列表里面存放开始节点方便操作
    this.playList[this.currentIndex].source = sourceNode;
  }

  // 暂停 记录现在播放的时间
  async pause() {
    this.playList[this.currentIndex].source.stop(0);
    this.playList[this.currentIndex].source.disconnect();
    this.playList[this.currentIndex].source = null;
    console.log("成功暂停");
  }
}

export const player = new Demo1();
