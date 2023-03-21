import { useState, useEffect, useRef, MutableRefObject } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';
import * as tf from '@tensorflow/tfjs';
import { model, backgroundBlurAmount, edgeBlurAmount, flipHorizontal } from './config';
import { Button } from '@chakra-ui/react';

interface PropsType {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  options?: any;
  isMask: boolean;
}

export default function CanvasVideo(props: PropsType) {
  const { videoRef, isMask } = props;
  let net: bodyPix.BodyPix | null = null;
  const videoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const init = async () => {
    await loadModel();
  };

  const loadModel = async () => {
    tf.getBackend();
    try {
      net = await bodyPix.load(model);
      blurBackground();
    } catch (error) {
      console.log(error);
    }
  };

  const blurBackground = async () => {
    if (!net) return;
    const segmentation = await net.segmentPerson(videoRef.current as HTMLVideoElement);
    try {
      // video dom需要设置width和height，否则绘制会报错
      bodyPix.drawBokehEffect(
        videoCanvasRef.current as HTMLCanvasElement,
        videoRef.current as HTMLVideoElement,
        segmentation,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal
      );
      requestAnimationFrame(blurBackground);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <canvas
          ref={videoCanvasRef}
          width="200"
          height="150"
        ></canvas>
        <Button onClick={blurBackground}>模糊</Button>
      </div>
    </>
  );
}

CanvasVideo.defaultProps = {
  isMask: false,
  options: {
    model,
    backgroundBlurAmount,
    edgeBlurAmount,
    flipHorizontal,
  },
}
