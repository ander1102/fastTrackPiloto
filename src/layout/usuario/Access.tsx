import { SetStateAction, useMemo } from "react";
import {
  DEFAULT_ACCESS,
  getAccessByData,
  isAccessNone,
  PermissionOptions,
  setAccessByAccessType,
} from "@app/constants/usuarios";
import { AccessPermissions, Users } from "@app/types/UsersList";
import userStyles from "./UserForm.module.css";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { PermissionProps } from "@app/types/User";
import { InputText } from "primereact/inputtext";
import { MenuItems } from "@app/components/Nav/MenuItems";
import Grid from "@app/components/Grid";
import { FormItem } from "@app/components/FormManager/FormItem";
import { Button } from "@app/components/Buttons";
interface UsersAccessProps extends PermissionProps {
  user: Users;
  onChange: (value: SetStateAction<Users>) => void;
}



export default function UsersAccess(props: UsersAccessProps) {
  const canModify = props.permission.create || props.permission.update;
  const DropdownOnChange =
    (departamento: string) => (e: DropdownChangeEvent) => {
      const permission: AccessPermissions = e.value;
      togglePermisison(departamento, permission);
    };

  const togglePermisison = (
    departamento: string,
    permission: AccessPermissions
  ) => {
    props.onChange((prev) => ({
      ...prev,
      accesos: prev.accesos.some((x) => x.departamento === departamento)
        ? prev.accesos.map((x) => {
            if (x.departamento === departamento)
              return setAccessByAccessType(departamento, permission);
            return x;
          })
        : prev.accesos.concat(setAccessByAccessType(departamento, permission)),
    }));
  };

  const access = useMemo(() => DEFAULT_ACCESS(props.user), []);

  return (
    <>
      <Grid sm={1} md={3} lg={3} gap={10}>
        <FormItem label="" style={{ margin: "0px" }}>
          Selecciones
        </FormItem>
        <FormItem label=""  style={{ margin: "0px" }}>
          Permisos
        </FormItem>
        <FormItem></FormItem>
        {access.map((permission) => {
          const getperm = props.user.accesos.find(
            (x) => permission.departamento === x.departamento
          );
          const accessPerm = getAccessByData(getperm ?? permission);
          const isNone = isAccessNone(getperm);
          const display = useMemo(
            () =>
              MenuItems.find((x) => x.keyname === permission.departamento)
                ?.nombre ?? permission.departamento,
            []
          );
          return (
            <>
              <FormItem label="" className="p-form-item">
                <div className={userStyles.section_1_children}>
                  <InputText
                    value={display}
                    id={permission.departamento}
                    disabled
                    className="flex-1"
                  />
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <div className="buttons-check">
                      <Button
                        type="button"
                        icon={`pi pi-times ${isNone ? "text-[#D82B2C]" : "text-[#6A6D74]"}`}
                        text
                        raised
                        className={`button ${isNone ? "active" : ""} `}
                        severity="danger"
                        onClick={() =>
                          togglePermisison(permission.departamento, "none")
                        }
                      />
                      {canModify && (  <Button
                        type="button"
                        className={`button ${!isNone ? "active" : ""} `}
                        icon={`pi pi-check ${!isNone ? "text-[#BA81C4]" : "text-[#6A6D74]"}`}
                        text
                        raised
                        severity="info"
                        onClick={() =>
                          togglePermisison(
                            permission.departamento,
                            "readandwrite"
                          )
                        }
                      /> )}
                    </div>
                  </div>
                </div>
              </FormItem>
              <FormItem label=""  >
                {canModify && (
                  <Dropdown
                    options={PermissionOptions}
                    value={accessPerm}
                    style={{borderRadius: 7}}
                    placeholder="Seleccionar"
                    onChange={DropdownOnChange(permission.departamento)}
                  />
                )}
              </FormItem>
              <FormItem></FormItem>
            </>
          );
        })}
      </Grid>
    </>
  );
}