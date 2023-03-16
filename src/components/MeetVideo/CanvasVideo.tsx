import { MutableRefObject, useState, useEffect, useRef } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';
import * as tf from '@tensorflow/tfjs';
import { model, backgroundBlurAmount, edgeBlurAmount, flipHorizontal } from './config';
import { Button } from '@chakra-ui/react';

interface PropsType {
  videoRef: any;
  options?: any;
}

export default function CanvasVideo(props: PropsType) {
  const { videoRef } = props;
  const [net, setNet] = useState<bodyPix.BodyPix>();
  const videoCanvasRef = useRef<any>();
  
  const init = async () => {
    await loadModel();
    
    console.log(videoRef);
    
  };

  const loadModel = async () => {
    tf.getBackend();
    try {
      const resNet = await bodyPix.load(model);
      setNet(resNet);
    } catch (error) {
      console.log(error);
    }
  };

  const blurBackground = async () => {
    if (!net) return;
    const segmentation = await net.segmentPerson(videoRef.current);
    // video dom需要设置width和height，否则绘制会报错
    bodyPix.drawBokehEffect(
      videoCanvasRef.current, videoRef.current, segmentation, backgroundBlurAmount,
      edgeBlurAmount, flipHorizontal);
    
    requestAnimationFrame(blurBackground);
  };

  const clearCanvas = () => {
    videoCanvasRef.current.getContext("2d").clearRect(0, 0, videoCanvasRef.current.width,videoCanvasRef.current.height)
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
        <Button onClick={clearCanvas}>关闭</Button>
      </div>
    </>
  );
}

CanvasVideo.defaultProps = {
  options: {
    model,
    backgroundBlurAmount,
    edgeBlurAmount,
    flipHorizontal,
  },
}
