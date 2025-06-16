import { memo, useContext, useEffect, useMemo } from "react";
import {
  MultiSelect,
  MultiSelectProps,
  MultiSelectChangeEvent,
} from "primereact/multiselect";
import { Log } from "@app/common/log";
import { UserContext } from "@app/context";
import useCall from "@app/hooks/useCall";
import { Controller, GetElementType } from "@app/types";
import { MultiSelectOptions } from "@app/types/Form";
import { User } from "@app/types/User";

interface DropDownImage {
  url: string;
  alt?: string;
}

export interface DropdownCatOptions extends MultiSelectOptions<any> {
  image?: DropDownImage;
}

type DropdownSelector<IResult> = (result: IResult) => DropdownCatOptions;
type Result<
  IController extends Controller,
  IKey extends keyof IController
> = GetElementType<Awaited<ReturnType<IController[IKey]>>["response"]>;

export type CustomMultiSelectChangeEvent = MultiSelectChangeEvent & {
  label?: string;
};

export type CustomDropdownProps = Omit<MultiSelectProps, "onChange"> & {
  onChange: (e: CustomMultiSelectChangeEvent) => void;
  mergeOptions?: MultiSelectOptions<any>[];
  args?: any;
};

interface OptionTemplateProps {
  option: DropdownCatOptions;
  dropdownProps?: CustomDropdownProps;
}

export const OptionTemplate = memo(
  ({ option, dropdownProps }: OptionTemplateProps) => {
    if (option) {
      if (option.image && option.image.url) {
        return (
          <div className="flex items-center gap-2">
            <img
              alt={option.image.alt ?? ""}
              src={option.image.url}
              width={24}
              height={24}
            />
            <div>{option.label}</div>
          </div>
        );
      }
      return <span className="w-full">{option.label}</span>;
    }
    if (dropdownProps)
      return <span className="w-full">{dropdownProps.placeholder}</span>;
    return null;
  }
);

/** HOC que devuelve un Dropdown con una lista que devuelve un controlador seleccionado. Nótese que el controlador estrictamente debe devolver una colección de datos en `response` */
export function createMultiSelectData<
  IController extends Controller,
  IKey extends keyof IController,
  IResult extends Result<IController, IKey>,
  IParameters extends Parameters<IController[IKey]>
>(
  controller: IController,
  key: IKey,
  selector: DropdownSelector<IResult>,
  params?: (user: User, args: any) => IParameters
) {
  if (!selector) throw new Error("Debes asignar un selector para el dropdown");
  return ({ mergeOptions, args, ...props }: CustomDropdownProps) => {
    const { user } = useContext(UserContext);
    const { item, isCalling, itemManager, refresh } = useCall(controller, key, {
      initialParams: params && params(user, args),
    });

    const options: MultiSelectOptions<any>[] = useMemo(() => {
      let it: any[] = Array.isArray(item) ? item : [];
      return (Array.isArray(mergeOptions) ? mergeOptions : []).concat(
        it.map(selector)
      );
    }, [item]);

    useEffect(() => {
      params && refresh(params(user, args)[0]);
    }, [args]);

    useEffect(() => {
      itemManager.addEventListenner("change", (item) => {
        if (!Array.isArray(item))
          Log.debug.warn(
            "La data del controlador seleccionado no devuelve un array"
          );
      });

      return () => {
        itemManager.removeEventListenner("change");
      };
    }, []);

    const handleChange = (e: MultiSelectChangeEvent) => {
      const label = options.find((x) => x.value === e.value)?.label;
      if (props.onChange) props.onChange({ ...e });
    };

    return (
      <MultiSelect
        {...props}
        onChange={handleChange}
        options={options}
        itemID="label"
        placeholder={isCalling ? "Cargando opciones..." : "Seleccionar"}
        disabled={isCalling || props.disabled}
        itemTemplate={(option) => <OptionTemplate option={option} />}
      />
    );
  };
}
