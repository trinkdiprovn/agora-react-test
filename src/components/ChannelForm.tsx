import React from 'react';
import styled from 'styled-components';
import { APP_ID } from '../configs/agora';
import { ChannelFormProps } from '../types';

const CustomP = styled.p<{ color?: string; }>`
  color: ${({ color }) => color || 'initial'};
`;

const ChannelForm = (props: ChannelFormProps) => {
  const { setInCall, setChannelName } = props;
  return (
    <form className="join">
      {
        APP_ID === '' && <CustomP color="red">Please enter your Agora App ID and refresh the page.</CustomP>
      }
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={e => setChannelName(e.target.value)}
      />
      <button
        onClick={e => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};

export default ChannelForm;