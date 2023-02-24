import { useState, useEffect } from 'react';

const constraints: MediaStreamConstraints = {
  video: true,
  audio: {
    channelCount: 1, //单声道
    noiseSuppression: true, //降噪
    echoCancellation: true   // 回音消除
  }
};

export const useMedia = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaError, setMediaError] = useState<any>(null);

  const closeStream = () => {
    if (stream && stream.getTracks()) {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
    }
    setStream(null);
  }

  useEffect(() => {
    async function getMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);
      } catch (error) {
        setMediaError(error);
      }
    }
    getMediaStream();
  }, []);
  
  return { stream, mediaError, closeStream };
}