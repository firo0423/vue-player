// ajax => 原始数据(ArrayBuffer) => 解码后数据(AudioBuffer) 
// => AudioBufferSourceNode(把解码后的数据挂载到音源上) => 通过audioContext.destination交由硬件播放

const mp3 = "http://127.0.0.1:5500/public/tornado.mp3";
const button = document.querySelector("button");

class Demo1 {
  constructor() {
    // 创建一个AudioContext实例，这是音频处理程序运行的环境
    this.audioContext = new AudioContext({ latencyHint: "balanced" });
  }

  async start() {
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
    const sourceNode = this.audioContext.createBufferSource();
    // 创建后需要往其buffer属性上挂载需要播放的数据
    sourceNode.buffer = decodedAudioData;
    // 转到硬件播放 destination 表示 context 的最终节点，一般是音频渲染设备
    sourceNode.connect(this.audioContext.destination);
    // 
    sourceNode.start(0);
  }

  /**
   * @param {string} url
   * @returns {ArrayBuffer}
   */
  async getMp3ArrayBuffer(url) {
    return fetch(url).then((r) => r.arrayBuffer());
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

button.onclick = () => new Demo1().start();
