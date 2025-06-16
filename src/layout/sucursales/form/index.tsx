import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ButtonAction } from "@app/components/Buttons";
import { User, UserPermissions } from "@app/types/User";
import { useRouter } from "next/router";
import SucursalesFields from "./fields";
import {
  Subsidiary,
  SubsidiaryDisabled,
  SubsidiaryPost,
} from "@app/types/Subsidiary";
import {
  DEFAULT_SUBSIDIARY_INFO,
  REQUIRE_SUBSIDIARY_FIELDS,
} from "@app/constants/subsidiary";
import { FormTitle } from "@app/layout/app/layout";
import { ReplaceObjectValue } from "@app/common/format";
import { omit } from "@app/common";
import { SubsidiaryControllers } from "@app/logic/backend/subsidiary";
import { checkEmptyFields, ShowFetchResponseToast } from "@app/utils/DOM";

interface SucursalFormProps {
  title: string;
  user: User;
  permission: UserPermissions;
  sucursal?: Subsidiary;
}

export default function SucursalesForm({
  user,
  permission,
  sucursal,
  title,
}: SucursalFormProps) {
  const [info, setInfo] = useState(
    () => sucursal ?? DEFAULT_SUBSIDIARY_INFO(user)
  );
  const [infoDisabled, setInfoDisabled] = useState<SubsidiaryDisabled>(
    {} as SubsidiaryDisabled
  );
  const router = useRouter();

  useEffect(() => {
    if (!isNew)
      setInfoDisabled(ReplaceObjectValue(DEFAULT_SUBSIDIARY_INFO(user), true));
  }, []);

  const isNew = useMemo(() => !sucursal, []);

  const disableButton = useMemo(
    () => (isNew ? false : Object.values(infoDisabled).every((x) => x)),
    [infoDisabled, isNew]
  );

  const onChange = (newValue: SetStateAction<Subsidiary>) => {
    setInfo(newValue);
  };

  const onSubmit = async () => {
    if (checkEmptyFields(REQUIRE_SUBSIDIARY_FIELDS, info)) return;
    const body: SubsidiaryPost = {
      ...omit(info, "nombre"),
      nomSucursal: info.nombre,
      idagep_empresa: user.idagep_empresa ?? 0,
    };

    const res = isNew
      ? await SubsidiaryControllers.add(body)
      : await SubsidiaryControllers.update(body);

    if (
      ShowFetchResponseToast(res, {
        setFailureTitle: () => "Ha ocurrido un error al guardar la información",
        setSuccessTitle: () =>
          isNew
            ? "Sucursal agregada correctamente"
            : `Sucursal ${info.nombre} modificada correctamente`,
      })
    )
      router.back();
  };

  const onToogleDisable = useCallback(() => {
    setInfoDisabled((prev) =>
      ReplaceObjectValue(DEFAULT_SUBSIDIARY_INFO(user), !prev.email)
    );
  }, [user]);

  return (
    <>
      <section className="container-header-view">
        <FormTitle
          title={title}
          showEditIcon={!isNew}
          onEditIconClick={onToogleDisable}
        />
      </section>
      <section className="container-body-view">
        <div className="container-form-view">
          <SucursalesFields
            disabled={infoDisabled}
            value={info}
            onChange={onChange}
          />
          <div className="mt-[40px]">
            {((isNew && permission.create) || permission.update) &&(
                <ButtonAction
                  className="!bg-[#6B3374]"
                  onClick={onSubmit}
                  disabled={disableButton}
                  label="Guardar cambios"
                />
              )}
          </div>
        </div>
      </section>
    </>
  );
}
