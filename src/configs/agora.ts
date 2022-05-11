import { ClientConfig } from "agora-rtc-react";

// define config for rtc engine
export const config: ClientConfig = {
  mode: 'rtc', codec: 'vp8'
};

export const APP_ID: string = '695be3d2abea423abec131d8072db139';
export const TOKEN: string | null = '006695be3d2abea423abec131d8072db139IADEpVv/lO8kbDPuktzUixEcQm9jnDV9sR8Zsb1ik+lPLwq+/AIAAAAAEAD9FOMnOHh7YgEAAQA4eHti';
console.log('APP_ID', process.env)