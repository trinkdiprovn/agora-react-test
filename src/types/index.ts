import React from "react";
import { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";

export interface VideoCallProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string;
}

export interface VideosProps {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

/* Controls */
export interface ControlsProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ControlsMuteType = "audio" | "video";

/* ChanelForm */
export interface ChannelFormProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}
