import { useState, useEffect } from 'react';

const constraintsDefault: MediaStreamConstraints = {
  video: true,
  audio: {
    channelCount: 1, // 单声道
    noiseSuppression: true, // 降噪
    echoCancellation: true,   // 回音消除
  },
};

export const useMedia = (constraints: MediaStreamConstraints = constraintsDefault) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaError, setMediaError] = useState<any>(null);
  const [microphoneVolume, setMicrophoneVolume] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext>(
    () => new AudioContext()
  );

  const closeStream = async () => {
    if (stream && stream.getTracks()) {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
    }
    setStream(null);
    await audioContext?.close();
  }

  const getMicrophoneVolume = async (mediaStream: MediaStream) => {
    /**
     * In this case the audioWorklet.addModule() method expects the path to point to your public folder. 
     * It can also be an external URL for example a link to Github repository that loads the JS file.
     * https://stackoverflow.com/questions/49972336/audioworklet-error-domexception-the-user-aborted-a-request
     */
    await audioContext?.audioWorklet.addModule('js/vumeterProcessor.js');
    const microphone = audioContext?.createMediaStreamSource(mediaStream);
    const node = new AudioWorkletNode(audioContext, 'vumeter');

    node.port.onmessage = event => {
      let volume = 0;
      if (event.data.volume) volume = Math.round(event.data.volume);
      setMicrophoneVolume(volume);
    }
    microphone?.connect(node).connect(audioContext.destination);
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
      setStream(mediaStream);
      getMicrophoneVolume(mediaStream);
    }).catch(error => {
      setMediaError(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return {
    stream,
    mediaError,
    microphoneVolume,
    closeStream,
  };
}
