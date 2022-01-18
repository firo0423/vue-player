// ajax => 原始数据(ArrayBuffer) => 解码后数据(AudioBuffer)
// => AudioBufferSourceNode(把解码后的数据挂载到音源上) => 通过audioContext.destination交由硬件播放

class Demo1 {
  constructor() {
    // 1. 创建一个AudioContext实例，这是音频处理程序运行的环境
    this.audioContext = new AudioContext({ latencyHint: "balanced" });
    this.playList = [];
    this.currentIndex = 0;
    this.localIndex = 0;

    // 防报错
    this.emptyNode = {
      name: null,
      index: 0,
      offset: 0,
      start: null,
      source: null,
      buffer: null,
    };
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
      name:mp3.name,
      index: this.localIndex,
      offset: 0,
      start: null,
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
  play() {
    // 多次点击播放重复设立buffer，要规避
    if (!this.playList.length) {
      return;
    }
    // 像竹子一样一个个节点连起来
    // 创建首节点
    const sourceNode = this.audioContext.createBufferSource();
    // 创建后需要往其buffer属性上挂载需要播放的数据
    sourceNode.buffer = this.current.buffer;
    // 转到硬件播放 destination 表示 context 的最终节点，一般是音频渲染设备
    sourceNode.connect(this.audioContext.destination);
    console.log("开始播放");

    // AudioBufferSourceNode.start([when][, offset][, duration]);
    // 后面那个量是偏移量，比如说，我现在播放到10s停了，
    // 再去点播放这个时候偏移量设置为10，就是向后拖10s和，很简单
    console.log(this.current.offset);
    sourceNode.start(0, this.current.offset);
    sourceNode.onended = () => {
      console.log("播放完了");
    };
    // 在播放列表里面存放开始节点方便操作
    this.current.source = sourceNode;
    // 开始的位置
    this.current.start = this.audioContext.currentTime;
  }

  // 暂停 记录现在播放的时间
  pause() {
    if (!this.playList.length || !this.current.source) {
      return;
    }
    this.current.source.stop(0);
    this.current.source.disconnect();
    this.current.source = null;
    this.current.offset = this.position;
    // 记录暂停位置
    console.log("成功暂停");
  }

  //停止
  stop() {
    this.pause();
    this.current.offset = 0;
  }

  // 切换歌曲 上一首
  prev() {
    console.log('上一首');
    this.stop();
    --this.currentIndex;
    if (this.currentIndex < 0) {
      this.currentIndex = this.playList.length - 1;
    }
    this.play();
  }

  next() {
    this.stop();
    console.log('下一首');
    ++this.currentIndex;
    if (this.currentIndex >= this.playList.length) {
      this.currentIndex = 0;
    }
    this.play();
  }

  // 获取当前播放内容
  get current() {
    // 后面显示时间的话还没加音频是拿不到playlist的 所以在这里加一个emptyNode 防报错
    return this.playList[this.currentIndex] || this.emptyNode;
  }

  // 时长
  get duration() {
    return this.current.buffer ? this.current.buffer.duration : 0.001;
  }

  get position() {
    if (!this.playList.length) {
      return 0;
    }
    return (
      this.current.offset +
      (this.current.start != null
        ? // 拿到当前播放时间
          this.audioContext.currentTime - this.current.start
        : 0)
    );
  }
}

export const player = new Demo1();
