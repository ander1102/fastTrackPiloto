import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import type { User } from "@app/types/User";
import { NextRouter, useRouter } from "next/router";
import { Client } from "@app/types/Clients";

export interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  client: Client;
  setClient: Dispatch<SetStateAction<Client>>;
}

export type UserProps = { user: User };
export type ClientProps = { client: Client };

const DEFAULT_CONTEXT: UserContextProps = {
  user: undefined as unknown as User,
  setUser: () => {},
  client: undefined as unknown as Client,
  setClient: () => {},
};

export const UserContext = createContext(DEFAULT_CONTEXT);

let _userContext: UserContextProps & { router: NextRouter };

export const getUserContext = () => _userContext;

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({} as User);
  const [client, setClient] = useState({} as Client);
  const router = useRouter();
  _userContext = { user, client, setClient, setUser, router };

  return (
    <UserContext.Provider value={{ user, setUser, client, setClient }}>
      {children}
    </UserContext.Provider>
  );
};
