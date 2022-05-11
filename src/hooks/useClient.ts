import { createClient } from "agora-rtc-react";
import { config } from "../configs/agora";

export const useClient = createClient(config);
export default useClient;
