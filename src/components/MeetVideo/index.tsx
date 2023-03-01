import { useEffect, useRef } from 'react';
import styles from './index.module.css';

interface PropsType {
  stream: MediaStream | null;
  userInfo: any;
}

export default function MeetVideo(props: PropsType) {
  const { stream, userInfo } = props;
  const videoRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (stream) {
        videoRef.current.srcObject = stream;
      }
    });
  });

  return (
    <>
      {
        stream ? (
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            playsInline
          ></video>
        ) : (
          <div className={styles.default}>
            <div>{ userInfo.userName }</div>
          </div>
        )
      }
    </>
  );
}