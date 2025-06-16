import { separateString } from "@app/common/format";
import { Users } from "@app/types/UsersList";
import { useMemo } from "react";

export default function UserAvatar({ user }: { user: Users }) {
  const display = useMemo(() => {
    const letters = separateString(user.nombre).map((x) =>
      x.charAt(0)?.toUpperCase()
    );
    return letters.slice(0, 2).join("");
  }, [user]);
  return (
    <div className="px-5 pb-5">
      <div className="w-full flex justify-between ">
        <div className="w-6/12 flex items-center">
          <div
            className={
              " rounded-full h-16 w-16 flex justify-center items-center text-white "
            }
            style={{ background: "#2C5FD8" }}
          >
            <p className="flex text-center align-middle text-4xl">{display}</p>
          </div>
          <div className="mx-3">
            <p className={"text-3xl"}>{user?.nombre}</p>
            <p className={"text-md text-gray-400"}>
              ID #{user?.idagep_usuarios}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
