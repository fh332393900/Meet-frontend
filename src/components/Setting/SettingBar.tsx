import { Button, Select } from '@chakra-ui/react';
import { useEffect, useState, useRef, useImperativeHandle } from 'react';
import styles from './setting.module.css';

import { useMediaDevices } from '@/hooks/useMediaDevices';
import { useMedia } from '@/hooks/useMedia';

export default function SettingBar(props: any) {
  const [active, setActive] = useState(0);
  const settings = ['Radio', 'Video', 'Common'];
  const videoRef = useRef<any>();
  const { medias } = useMediaDevices('audioinput');
  const { stream, microphoneVolume, closeStream } = useMedia();

  useImperativeHandle(props.onRef, () => {
    return {
      closeStream,
    };
  });

  const selectBar = (index: number) => {
    setActive(index);
    setTimeout(() => {
      if (stream && index === 1) {
        videoRef.current.srcObject = stream;
      }
    });
  };

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.left}>
          {
            settings.map((item, index) => {
              return (
                <div 
                  key={index}
                  className={`${styles.item} ${
                    active === index ? styles.active : ''
                  }`}
                  onClick={() => selectBar(index)}
                >
                  {item}
                </div>
              )
            })
          }
        </div>
        <div className={styles.right}>
          { active === 0 ? (
            <>
              <Select placeholder='Select option'>
                {
                  medias.map((item, index) => {
                    return (
                      <option
                        value={item.deviceId}
                        key={index}
                      >
                        { item.label }
                      </option>
                    )
                  })
                }
              </Select>
              <div className={styles.volume}>
                {
                  [1, 2, 3, 4, 5].map(item => {
                    return (
                      <>
                        <div className={styles.volumeItem} 
                          style={{ backgroundColor: microphoneVolume > item ? '#1967d2' : '#fff'}}></div>
                      </>
                    )
                  })
                }
              </div>
            </>
            ) : (
              <>
                <video
                  ref={videoRef}
                  style={{width: '50px', height: '50px'}}
                  autoPlay
                  playsInline
                ></video>
              </>
            ) 
          }
        </div>
      </div>
    </>
  )
}