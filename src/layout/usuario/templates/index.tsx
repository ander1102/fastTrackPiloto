import type { Users } from "@app/types/UsersList";

export const NombreBodyTemplate = (item: Users) => {
  return (
    <div className="w-full font-normal truncate flex items-center">
      {item.nombre}
    </div>
  );
};

export const RolBodyTemplate = (item: Users) => {
  return (
    <div className="w-full font-normal truncate flex items-center">
      {item.rol}
    </div>
  );
};
