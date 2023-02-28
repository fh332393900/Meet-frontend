// processor.js
const SMOOTHING_FACTOR = 0.8;

class VolumeMeter extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [];
  }

  constructor() {
    super();
    this.volume = 0;
    this.lastUpdate = currentTime;
  }

  calculateVolume(inputs) {
    const inputChannelData = inputs[0][0];
    let sum = 0;

    // Calculate the squared-sum.
    for (let i = 0; i < inputChannelData.length; ++i) {
      sum += inputChannelData[i] * inputChannelData[i];
    }

    // Calculate the RMS level and update the volume.
    const rms = Math.sqrt(sum / inputChannelData.length);

    this.volume = Math.max(rms, this.volume * SMOOTHING_FACTOR);

    // Post a message to the node every 200ms.
    if (currentTime - this.lastUpdate > 0.2) {
      this.port.postMessage({ eventType: "volume", volume: this.volume * 100 });
      // Store previous time
      this.lastUpdate = currentTime;
    }
  }

  process(inputs, outputs, parameters) {
    this.calculateVolume(inputs);

    return true;
  }
}

registerProcessor('vumeter', VolumeMeter); // 注册一个名为 vumeter 的处理函数 注意：与主线程中的名字对应。