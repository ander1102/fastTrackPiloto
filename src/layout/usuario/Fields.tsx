import {
  ChangeEvent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ButtonProps } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "@app/components/Buttons";
import { CatSucursalesMultiSelect } from "@app/components/Dropdowns";
import { FormItem } from "@app/components/FormManager/FormItem";
import Grid from "@app/components/Grid";
import { SVG } from "@app/components/svg";

import { CustomMultiSelectChangeEvent } from "@app/components/HOC/createMultiSelectData";
import { PermissionProps } from "@app/types/User";
import {
  Users,
  OnlyUserFields,
  UserInfoDisabled,
  UserFields,
} from "@app/types/UsersList";
import { UserContext } from "@app/context";
import { beginUppercase } from "@app/common/format";
import { hasPhoneNumberCharacters } from "@app/common";
import { getDisplayError } from "@app/utils/DOM";
import { userFields, USER_VALIDATION } from "@app/constants/usuarios";
import styles from "@app/styles/NewUser.module.css";

interface UserFieldsProps extends PermissionProps {
  info: Users;
  infoDisabled: UserInfoDisabled;
  isNew: boolean;
  submitted: boolean;
  onChange: (value: SetStateAction<Users>) => void;
  onDisabledChange: (key: OnlyUserFields, disabled: boolean) => void;
}

export default function UsersFields(props: UserFieldsProps) {
  const { user } = useContext(UserContext);
  const { userType } = user;
  const [sucursales, setSucursales] = useState(
    typeof props.info.idagep_sucursal === "string" &&
      !["", "0"].includes(props.info.idagep_sucursal)
      ? props.info.idagep_sucursal.split(",")
      : []
  );

  const onToggleDisable = (field: OnlyUserFields) => {
    props.onDisabledChange(field, !props.infoDisabled[field]);
  };

  const handleChange =
    (key: OnlyUserFields) =>
    (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
      if (key === "telefono" && !hasPhoneNumberCharacters(e.target.value))
        return;

      props.onChange((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const onChangeSucursal = (e: CustomMultiSelectChangeEvent) => {
    setSucursales(e.value);
    props.onChange((prev) => ({
      ...prev,
      idagep_sucursal: e.value.join(","),
    }));
  };

  return (
    <Grid className="mb-16" md={2} lg={3} gap={10}>
      {userFields
        .filter((field) => !field.options)
        .map((field) => {
          return (
            <UserField field={field} userFieldsProps={props}>
              <InputText
                className="flex-1"
                disabled={props.infoDisabled[field.key]}
                id={field.key.toLocaleLowerCase()}
                placeholder={beginUppercase(field.label)}
                type={field.key === "telefono" ? "tel" : "text"}
                value={`${props.info[field.key]}` ?? ""}
                onChange={handleChange(field.key)}
              />

              {!props.isNew && props.permission.update && (
                <EditButton onClick={() => onToggleDisable(field.key)} />
              )}
            </UserField>
          );
        })}

      {userType === "admin" ? (
        <UserField
          field={{ label: "Teléfono", key: "telefono", required: true }}
          userFieldsProps={props}
        >
          <InputText
            className="flex-1"
            disabled={props.infoDisabled["telefono"]}
            id="telefono"
            placeholder={beginUppercase("Teléfono")}
            type="tel"
            value={props.info["telefono"] ?? ""}
            onChange={handleChange("telefono")}
          />
          {!props.isNew && props.permission.update && (
            <EditButton onClick={() => onToggleDisable("telefono")} />
          )}
        </UserField>
      ) : (
        <FormItem></FormItem>
      )}

      {userFields
        .filter((field) => field.options)
        .map((field) => {
          return (
            <UserField field={field} userFieldsProps={props}>
              <Dropdown
                className="flex-1"
                disabled={props.infoDisabled[field.key]}
                id={field.key.toLocaleLowerCase()}
                placeholder="Seleccionar"
                options={field.options}
                value={props.info[field.key]}
                onChange={handleChange(field.key)}
                style={{borderRadius: 7}}
              />

              {!props.isNew && props.permission.update && (
                <EditButton onClick={() => onToggleDisable(field.key)} />
              )}
            </UserField>
          );
        })}

      {userType === "admin" ? (
        <UserField
          field={{ key: "idagep_sucursal", label: "Sucursales" }}
          userFieldsProps={props}
        >
          <CatSucursalesMultiSelect
            className="h-[46px] items-center flex-1 w-4/5 xl:w-full rounded-[7px]"
            disabled={props.infoDisabled["idagep_sucursal"]}
            display="comma"
            filter
            id="sucursales"
            maxSelectedLabels={1}
            selectedItemsLabel={`${sucursales.length} sucursales seleccionadas`}
            value={sucursales}
            onChange={onChangeSucursal}
          />

          {!props.isNew && props.permission.update && (
            <EditButton
              className="!block"
              onClick={() => onToggleDisable("idagep_sucursal")}
            />
          )}
        </UserField>
      ) : (
        <FormItem></FormItem>
      )}
    </Grid>
  );
}

interface UserFieldProps extends PropsWithChildren {
  field: UserFields;
  userFieldsProps: UserFieldsProps;
}

function UserField({ children, field, userFieldsProps }: UserFieldProps) {
  return (
    <FormItem
      error={
        userFieldsProps.submitted
          ? getDisplayError(
              USER_VALIDATION,
              field.key,
              userFieldsProps.info[field.key]
            )
          : undefined
      }
      label={`${beginUppercase(field.label)}${field.required ? "*" : ""}`}
      key={field.key}
    >
      <div className="flex items-center w-full mr-5">{children}</div>
    </FormItem>
  );
}

function EditButton({ onClick, className }: ButtonProps) {
  return (
    <Button className={`${styles.userButton} ${className}`} onClick={onClick}>
      <SVG.Edit className={`${styles.icon} ${styles.editIcon}`} />
    </Button>
  );
}
