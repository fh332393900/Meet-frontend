import { useState, useEffect } from 'react';

export const useMediaDevices = (mediaDeviceType?: MediaDeviceType) => {
  const [medias, setMedias] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    async function getEnumerateDevices() {
      const enumerateDevices = await navigator.mediaDevices.enumerateDevices();
      if (mediaDeviceType) {
        const filterDevices = enumerateDevices.filter(device => {
          return device.kind === mediaDeviceType && device.deviceId !== 'communications';
        });
        setMedias(filterDevices);
      } else {
        setMedias(enumerateDevices);
      }
    }
    getEnumerateDevices();
  }, [mediaDeviceType]);

  return { medias };
}