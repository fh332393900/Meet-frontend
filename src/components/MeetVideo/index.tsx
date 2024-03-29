import { Button } from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import styles from './index.module.css';
import CanvasVideo from './CanvasVideo';

interface PropsType {
  stream: MediaStream | null;
  userInfo: any;
}

export default function MeetVideo(props: PropsType) {
  const { stream, userInfo } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    const [track] = stream?.getVideoTracks() || [];
    track.enabled = !track.enabled;
  }

  useEffect(() => {
    setTimeout(() => {
      if (stream && videoRef.current) {
        videoRef.current.srcObject = stream;
      } 
    });
  });

  return (
    <>
      {
        stream ? (
          <>
            <video
              ref={videoRef}
              className={styles.video}
              autoPlay
              playsInline
            ></video>
            <CanvasVideo videoRef={videoRef}></CanvasVideo>
            <div style={{color: '#fff'}}>{ userInfo.userName }</div>
            <Button onClick={toggleVideo}>stop/start</Button>
          </>
          
          
        ) : (
          <div className={styles.default}>
            <div>{ userInfo.userName }</div>
          </div>
        )
      }
    </>
  );
}