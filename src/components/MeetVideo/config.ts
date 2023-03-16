import type { ModelConfig } from '@tensorflow-models/body-pix/dist/body_pix_model';
/**body-pix模型 */
export const model: ModelConfig = {
  /**
   * body-pix有两种算法模型架构，MobileNetV1 and ResNet50。尽量用最快的，不然加载要很久
   * ResNet50 启动速度非常慢，加载时间很长，对GPU的要求比较高，不适合一般电脑及移动设备，这里只考虑 MobileNetV1
   */
  architecture: 'MobileNetV1',
  // 8,16  值越小，输出分辨率越大，模型越精确，速度越慢
  outputStride: 16,
  // 0.5,0.75,1  值越大，层越大，模型越精确，速度越慢
  multiplier: 1, 
  /* 1,2,4  此参数控制用于权重量化的字节  
    '4. 每个浮点数 4 个字节（无量化）。最高精度&原始模型尺寸',
    '2. 每个浮点数 2 个字节。精度略低，模型尺寸减小 2 倍',
    '1. 每个浮点数 1 个字节。精度降低, 模型尺寸减少 4 倍' 
  */
  quantBytes: 2,
};

/**背景虚化程度 0~20 */
export const backgroundBlurAmount = 10;

/**边缘模糊度 */
export const edgeBlurAmount = 3;

/**水平翻转 */
export const flipHorizontal = false;
