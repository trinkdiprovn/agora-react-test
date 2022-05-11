import React, { useEffect, useState } from 'react';
import { IAgoraRTCRemoteUser } from 'agora-rtc-react';

import Controls from './Controls';
import Videos from './Videos';
import { VideoCallProps } from '../types';
import useClient from '../hooks/useClient';
import useMicrophoneAndCameraTracks from '../hooks/useMicrophoneAndCameraTracks';
import { APP_ID, TOKEN } from '../configs/agora';

const VideoCall = (props: VideoCallProps) => {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name: string) => {
      console.log('init', name);
      client.setClientRole("audience", { level: 1 });
      await client.join(APP_ID, name, TOKEN, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log('subcribe success');
        if (mediaType === 'video') {
          setUsers((prev) => [...prev, user]);
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', async (user, type) => {
        console.log("unpublished", user, type);

        if (type === 'audio') {
          user.audioTrack?.stop();
        }

        if (type === 'video') {
          setUsers(prev => prev.filter(prevUser => prevUser.uid !== user.uid));
        }
      });

      client.on('user-left', user => {
        console.log('leaving', user);
        setUsers(prev => prev.filter(prevUser => prevUser.uid !== user.uid));
      });

      setStart(true);
    };

    if (ready && tracks) {
      console.log(' init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);


  return (
    <div className="App">
      {
        ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )
      }
      {
        start && tracks && (
          <Videos users={users} tracks={tracks} />
        )
      }
    </div>
  );
};

export default VideoCall;