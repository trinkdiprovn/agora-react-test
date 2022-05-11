import React, { useState } from 'react';
import useClient from '../hooks/useClient';
import { ControlsMuteType, ControlsProps } from '../types';

const Controls = (props: ControlsProps) => {
  const client = useClient();
  const { tracks, setInCall, setStart } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: ControlsMuteType) => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState(prev => ({ ...prev, audio: !prev.audio }));
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState(prev => ({ ...prev, video: !prev.video }));
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  }

  return (
    <div className="controls">
      <p
        className={trackState.audio ? 'on' : ''}
        onClick={() => mute("audio")}
      >
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p
        className={trackState.video ? 'on' : ''}
        onClick={() => mute("video")}
      >
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {
        <p onClick={() => leaveChannel()}>Leave</p>
      }
    </div>
  );
};

export default Controls;