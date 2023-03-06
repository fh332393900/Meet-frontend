import { useState, useEffect } from 'react';
import { useMedia } from '@/hooks/useMedia';
import MeetVideo from '@/components/MeetVideo';
import { Socket } from 'socket.io-client';
import { Button } from '@chakra-ui/react';
const { io } = require('socket.io-client');

export default function Meet() {
  const [remoteStream, setRemoteStream] = useState<any>();
  const { stream } = useMedia();
  // const stream = null;

  let socket: Socket;
  let peerConnection: RTCPeerConnection;

  const init = () => {
    const url = `http://localhost:3000?roomId=1`;
      //和服务器建立长连接
      socket = io.connect(url, {
        withCredentials: true,
      });

    // 新用户加入
    socket.on("joined", () => {
      console.log(1111111111);
      createPeerConnecion();
    });
    // 其他加入
    socket.on("otherjoin", (roomid, id) => {
      console.log('otherjoin')
      // 开始媒体协商
      // createPeerConnecion(); // 创建链接并绑定
      call();
    });
    //接收服务器返回的信息
    socket.on('message', async function(data){
      console.log(data,'=========data==========')
      if(data) {
        if(data.type ==='offer') {
          console.log(peerConnection, 'peerConnection')
          // 如果收到是offer 对端已经创建好了
          peerConnection.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await peerConnection.createAnswer();
          peerConnection.setLocalDescription(answer);
          sendMessage(answer);
        } else if(data.type ==='answer') {
          peerConnection.setRemoteDescription(new RTCSessionDescription(data));
        } else if(data.type ==='candidate') {
          var candidate = new RTCIceCandidate({
            sdpMLineIndex: data.label,
            candidate: data.candidate
          });
          // 加入到本端 peercollect
          peerConnection.addIceCandidate(candidate)
          .then(()=>{
            console.log('Successed to add ice candidate');	
          })
          .catch(err=>{
            console.error(err);	
          });
        }
      }
    });
  };
  function sendMessage(data: any) {
    if (socket) {
      socket.emit("message", data);
    }
  }
  // 异步操作 成功调用
  function getOffer(desc: any) {
    peerConnection.setLocalDescription(desc);
    sendMessage(desc);
  }
  // 创建媒体协商
  function call() {
    if (peerConnection) {
      const options: RTCOfferOptions = {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      }
      peerConnection.createOffer(options)
        .then(getOffer)
        .catch(err => {})
    }
  }
  // 创建一个连接
  function createPeerConnecion() {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'turn:124.70.0.135:3478?transport=udp',
            username: "zhizhong",
            credential: "123456"
          },
        ],
      });
      console.log(22222222);
      // 协商的时候监听到 这里做端对端的消息日志
      peerConnection.onicecandidate = (e) => {
        console.log(e, '----------e----------')
        if (e.candidate) {
          // 发送出去
          sendMessage({
            type: 'candidate',
            label: e.candidate.sdpMLineIndex,
            id: e.candidate.sdpMid,
            candidate: e.candidate.candidate
          })
        }
      }
      let remoteStreamTemp = new MediaStream();
      // remoteVideo.srcObject = remoteStream
      // 远端走ontrack
      peerConnection.ontrack = (e) => {
        // 设置给远端 显示远端流
        e.streams[0].getTracks().forEach((track) => {
          remoteStreamTemp.addTrack(track);
        })
        setRemoteStream(remoteStreamTemp);
        console.log('远端流',e.streams[0], 'localStream', stream);
      }
    }
    // 当连接在了，给本地设置 加到pc中音频和视频的媒体流
    if (stream) {
      stream.getTracks().forEach((track) => {
        // 
        console.log('加到pc中音频和视频的媒体流',track);
        peerConnection.addTrack(track, stream);
      })
    }
  }

  // useEffect(() => {
  //   // init();
  // }, [])

  return (
    <>
      <div>
        远程：
        <MeetVideo stream={remoteStream} userInfo={{userName: 'fh'}}></MeetVideo>
        <Button onClick={init}>Connect</Button>
      </div>
    </>
  )
}