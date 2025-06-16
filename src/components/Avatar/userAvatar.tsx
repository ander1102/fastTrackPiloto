import { useMemo, useState } from "react";
import { Avatar, AvatarProps } from "primereact/avatar";
import { separateString } from "@app/common/format";
import { User } from "@app/types/User";

interface UserAvatarProps extends AvatarProps {
  user: User;
  upload?: boolean;
  loading?: boolean;
}

const UserAvatarUpload = ({ loading }: Pick<UserAvatarProps, "loading">) => {
  const [showUpload, setShowUpload] = useState(false);
  const onEnter = () => {
    setShowUpload(true);
  };

  const onLeave = () => {
    setShowUpload(false);
  };
  return (
    <section
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="bg-black/50 absolute w-full h-full rounded-full transition-opacity"
      style={{
        opacity: showUpload ? 1 : 0,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        {loading ? (
          <i className="pi pi-spin pi-spinner" />
        ) : (
          <i
            className="pi pi-upload z-10 font-bold border border-dashed p-1"
            style={{ fontSize: 24 }}
          />
        )}
      </div>
    </section>
  );
};

export default function UserAvatarImage({
  user,
  upload,
  loading,
  ...props
}: UserAvatarProps) {
  const display = useMemo(() => {
    const letters = separateString(user.persona?.nombre).map((x) =>
      x.charAt(0)?.toUpperCase()
    );
    return (
      letters.length === 1 ? letters : [letters[0], letters[letters.length - 1]]
    ).join("");
  }, [user]);

  return (
    <Avatar
      {...props}
      onClick={loading ? undefined : props.onClick}
      label={display}
      size={props.size ?? "large"}
      onImageError={() => {}}
      className={`${props.className} relative`}
      pt={{
        image: {
          className: "rounded-full",
        },
      }}
      style={{
        backgroundColor: "#6B3374",
        borderRadius: "50%",
        color: "#FFF",
      }}
    >
      {upload && <UserAvatarUpload loading={loading} />}
    </Avatar>
  );
}
