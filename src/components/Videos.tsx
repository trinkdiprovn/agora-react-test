import React from 'react';
import { AgoraVideoPlayer } from 'agora-rtc-react';
import styled from 'styled-components';
import { VideosProps } from '../types';

const VideoPlayer = styled(AgoraVideoPlayer)`
  height: 95%;
  width: 95%;
`;

const Videos = (props: VideosProps) => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
        <VideoPlayer className="vid" videoTrack={tracks[1]} />
        {
          users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <VideoPlayer className="vid" videoTrack={user.videoTrack} key={user.uid} />
              );
            }

            return null;
          })
        }
      </div>
    </div>
  );
};

export default Videos;