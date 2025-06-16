import { getStorageHash } from "./login";

export const getTokenBearer = () => {
  const hash = getStorageHash();
  return {
    Authorization: !hash ? "" : `Bearer ${hash}`,
  };
};
