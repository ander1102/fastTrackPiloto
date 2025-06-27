import Grid from "@app/components/Grid";
import { InputText } from "primereact/inputtext";
import { FormItem } from "@app/components/FormManager/FormItem";
import { FormValue } from "@app/types/Form";
import { CatCountries } from "@app/components/Dropdowns";
import { ONLY_LETTERS } from "@app/constants/form";
import {
  Subsidiary,
  SubsidiaryAddress,
  SubsidiaryContact,
} from "@app/types/Subsidiary";
import { ChangeEvent, useCallback } from "react";
import { DropdownChangeEvent } from "primereact/dropdown";
import { DEFAULT_SUBSIDIARY_CONTACTS } from "@app/constants/subsidiary";

export default function SucursalesFields({
  value,
  onChange,
  disabled,
}: FormValue<Subsidiary>) {
  const handleChange =
    (key: keyof Subsidiary) =>
    (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
      onChange((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleChangeAddress =
    (key: keyof SubsidiaryAddress) =>
    (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
      let value = e.target.value;

      if (key === "cp") {
        value = value.replace(/\D/g, "").slice(0, 5);
      } else if (key === "telefono") {
        value = value.replace(/\D/g, "").slice(0, 10);
      }

      onChange((prev) => ({
        ...prev,
        infoDomicilio: {
          ...prev.infoDomicilio,
          [key]: value,
        },
      }));
    };

  const handleContactChange = useCallback(
    (key: keyof SubsidiaryContact, index: number) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (key === "telefono") {
          value = value.replace(/\D/g, "").slice(0, 10);
        }

        onChange((prev) => ({
          ...prev,
          infoContactos: prev.infoContactos[index]
            ? prev.infoContactos.map((x, i) => {
                if (i === index) return { ...x, [key]: value };
                return x;
              })
            : prev.infoContactos.concat([
                { ...DEFAULT_SUBSIDIARY_CONTACTS, [key]: value },
              ]),
        }));
      },
    []
  );

  return (
    <>
      <p className="text-primary-color text-xl mb-5">Detalle de la sucursal</p>
      <Grid sm={1} md={3} lg={3} gap={3} style={{marginBottom: 20}}>
        <FormItem label="Nombre *">
          <InputText
            value={value.nombre}
            onChange={handleChange("nombre")}
            placeholder="Nombre de la sucursal"
            disabled={disabled?.nombre}
          />
        </FormItem>
        <FormItem label="Correo *">
          <InputText
            value={value.email}
            onChange={handleChange("email")}
            placeholder="Correo de la sucursal"
            disabled={disabled?.nombre}
          />
        </FormItem>
      </Grid>
      <Grid sm={1} md={3} lg={3} gap={3}>
        <FormItem label="Teléfono">
          <InputText
            onChange={handleChangeAddress("telefono")}
            value={value.infoDomicilio.telefono}
            keyfilter="int"
            disabled={disabled?.nombre}
            placeholder="Teléfono de la sucursal"
          />
        </FormItem>
      </Grid>
      {value.infoContactos.map((item, index) => {
        return (
          <section key={index} className="mt-[50px]">
            <p className="text-lg mb-5" style={{fontSize: 18, fontWeight: 700, color: '#6A6D74'}}>
              Responsable {!index ? null : index + 1}
            </p>
            <Grid sm={1} md={3} lg={3} gap={5}>
              <FormItem label="Nombre">
                <InputText
                  value={item.nombre}
                  placeholder="Nombre del responsable"
                  disabled={disabled?.nombre}
                  onChange={handleContactChange("nombre", index)}
                />
              </FormItem>
              <FormItem label="Teléfono">
                <InputText
                  value={item.telefono}
                  keyfilter="int"
                  placeholder="Teléfono del responsable"
                  disabled={disabled?.nombre}
                  onChange={handleContactChange("telefono", index)}
                />
              </FormItem>
            </Grid>
          </section>
        );
      })}
      <section className="mt-[50px]">
        <p className="text-lg mb-5" style={{fontSize: 18, fontWeight: 700, color: '#6A6D74'}}>Dirección completa</p>
        <Grid sm={1} md={3} lg={3} gap={5}>
          <FormItem label="Calle" slg={2}>
            <InputText
              onChange={handleChangeAddress("calle")}
              value={value.infoDomicilio.calle}
              placeholder="Calle"
              disabled={disabled?.nombre}
            />
          </FormItem>
        </Grid>
        <Grid sm={1} md={3} lg={3} gap={5} style={{marginTop: 20}}>
          <FormItem label="Colonia">
            <InputText
              onChange={handleChangeAddress("colonia")}
              value={value.infoDomicilio.colonia}
              placeholder="Colonia"
              disabled={disabled?.nombre}
            />
          </FormItem>
          <div className="flex">
            <FormItem label="Número Ext." className="mr-2">
              <InputText
                onChange={handleChangeAddress("NoExt")}
                value={value.infoDomicilio.NoExt}
                placeholder="Número Ext."
                disabled={disabled?.nombre}
              />
            </FormItem>
            <FormItem label="Número Int." className="ml-2">
              <InputText
                onChange={handleChangeAddress("NoInt")}
                value={value.infoDomicilio.NoInt}
                placeholder="Número Int."
                disabled={disabled?.nombre}
              />
            </FormItem>
          </div>
        </Grid>
        <Grid sm={1} md={3} lg={3} gap={5} style={{marginTop: 20}}>
          <FormItem label="Delegación">
            <InputText
              onChange={handleChangeAddress("delegacion")}
              value={value.infoDomicilio.delegacion}
              keyfilter={ONLY_LETTERS}
              placeholder="Delegación"
              disabled={disabled?.nombre}
            />
          </FormItem>
          <FormItem label="Código postal">
            <InputText
              onChange={handleChangeAddress("cp")}
              value={value.infoDomicilio.cp}
              placeholder="Código postal"
              disabled={disabled?.nombre}
            />
          </FormItem>
        </Grid>
        <Grid sm={1} md={3} lg={3} gap={5} style={{marginTop: 20}}>
          <FormItem label="Ciudad">
            <InputText
              onChange={handleChangeAddress("ciudad")}
              value={value.infoDomicilio.ciudad}
              keyfilter={ONLY_LETTERS}
              placeholder="Ciudad"
              disabled={disabled?.nombre}
            />
          </FormItem>
          <FormItem label="Estado">
            <InputText
              onChange={handleChangeAddress("estado")}
              value={value.infoDomicilio.estado}
              keyfilter={ONLY_LETTERS}
              placeholder="Estado"
              disabled={disabled?.nombre}
            />
          </FormItem>
        </Grid>
        <Grid sm={1} md={3} lg={3} gap={5} style={{marginTop: 20}}>
          <FormItem label="País">
            <CatCountries
              onChange={handleChangeAddress("pais")}
              value={value.infoDomicilio.pais}
              placeholder="País"
              disabled={disabled?.nombre}
              filter
            />
          </FormItem>
        </Grid>
      </section>
    </>
  );
}
