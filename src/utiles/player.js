// ajax => 原始数据(ArrayBuffer) => 解码后数据(AudioBuffer)
// => AudioBufferSourceNode(把解码后的数据挂载到音源上) => 通过audioContext.destination交由硬件播放

class Demo1 {
  constructor() {
    // 1. 创建一个AudioContext实例，这是音频处理程序运行的环境
    this.audio = new Audio();
    this.audioContext = new AudioContext({ latencyHint: "balanced" });
  }

  async start(mp3) {
    console.log(mp3);
    const musicArrayBuffer = this.getMp3ArrayBuffer(mp3);
    const decodedAudioData = this.decode(musicArrayBuffer);
    this.play(decodedAudioData);
  }
  // 仅解释作用 大型项目用
  /**
   * @param {AudioBuffer} decodedAudioData
   * @returns
   */
  async play(decodedAudioData) {
    // 像竹子一样一个个节点连起来
    // 创建首节点
    const sourceNode = this.audioContext.createBufferSource();
    // 创建后需要往其buffer属性上挂载需要播放的数据
    sourceNode.buffer = decodedAudioData;
    // 转到硬件播放 destination 表示 context 的最终节点，一般是音频渲染设备
    sourceNode.connect(this.audioContext.destination);
    console.log("开始播放");
    sourceNode.start(0);
  }

  /**
   * @param {string} url
   * @returns {ArrayBuffer}
   */
  // 来读取音频文件 -> 音频文件都是被压缩过的，使用要重新解码
  async getMp3ArrayBuffer(mp3) {
    let reader = new FileReader();
    let arrayBuffer = reader.readAsArrayBuffer(mp3);
    console.log("读取完成");
    reader.onload((e) => {
      console.log(e.target.result);
      console.log(arrayBuffer);
    });

    return arrayBuffer;
  }

  /**
   * @param {ArrayBuffer} arrayBuffer
   * @returns {AudioBuffer}
   */
  // 解码
  async decode(arrayBuffer) {
    return this.audioContext.decodeAudioData(arrayBuffer);
  }
}

export const player = new Demo1();

// 问题一
