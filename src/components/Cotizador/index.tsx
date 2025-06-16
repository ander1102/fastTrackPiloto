import Grid from "@app/components/Grid";
import { useEffect, useMemo, useState } from "react";
import { CSSProperties } from "react";
import Image from "next/image";
import React from "react";
import { ButtonDownload } from "@app/components/Buttons";
import { generateStatement } from "@app/utils/pdf/CotizadorPDF ";
import { CheckedState, infoCotizacion } from "./types";
import MessageVOBO from "./MessageVOBO";
import InputAmount from "./InputAmount";
import InputRadioImage from "./InputRadioImage";
import InputRentaSugerencia from "./InputRentaSugerencia";
import InputDropChip from "./InputDropChip";
import { useFormik } from "formik";
import { ClientsReferralsControllers } from "@app/logic/backend/clientsReferrals";
import {
  CatGiroReferrals,
  CatFamiliasReferrals,
  CatAdquirientesReferrals,
} from "@app/components/Dropdowns";
import { Dropdown } from "primereact/dropdown";
import { FormItem } from "@app/components/FormManager/FormItem";
import { INIT_CLIENT } from "./constants";
import { SINO, LIQUIDACION } from "@app/constants/form";
import { InputNumber } from "primereact/inputnumber";
import { Clients } from "./types";

const DEFAULT_STYLES: CSSProperties = {};
const getInputPropsStyles = (message: string): CSSProperties => {
  switch (message) {
    case "TASA PERMITIDA":
      return {
        ...DEFAULT_STYLES,
        backgroundColor: "#ddf7d9",
        borderColor: "green",
      }; //green
    case "RENTA PERMITIDA":
      return {
        ...DEFAULT_STYLES,
        backgroundColor: "#ddf7d9",
        borderColor: "green",
      }; //green
    case "RENTA MENOR A LA PERMITIDA":
      return {
        ...DEFAULT_STYLES,
        backgroundColor: "#ffeeee",
        borderColor: "red",
      }; //red
    case "TASA MENOR A LA PERMITIDA":
      return {
        ...DEFAULT_STYLES,
        backgroundColor: "#ffeeee",
        borderColor: "red",
      }; //red
    default:
      return { ...DEFAULT_STYLES };
  }
};
const getFormItemPropsStyles = (message: string) => {
  switch (message) {
    case "TASA PERMITIDA":
      return "text-[#60b650]"; //green
    case "RENTA PERMITIDA":
      return "text-[#60b650]"; //green
    case "RENTA MENOR A LA PERMITIDA":
      return "text-[#FF5758]";
    case "TASA MENOR A LA PERMITIDA":
      return "text-[#FF5758]";
    default:
      return "text-gray-800";
  }
};
interface CotizacionPros {
  onChange?: (values: Clients) => void;
  initialValues?: Clients;
}

export default function Cotizacion({
  onChange,
  initialValues,
}: CotizacionPros) {
  const formik = useFormik({
    initialValues: INIT_CLIENT,
    onSubmit: () => {},
  });

  const [statement, setStatement] = useState<String>();
  const [checked,setChecked] = useState<CheckedState>({
    cantMini: false,
    cantD20: false,
    cantD30: false,
    ecommerce: false,
    tarjeta: false,
  });

  const arrendamiento = useMemo(
    () =>
      formik.values.infoCotizacion.chipMini &&
      formik.values.infoCotizacion.chipD20 &&
      formik.values.infoCotizacion.chipD30
        ? "Si"
        : "No",
    [formik.values]
  );

  const colorProduct = useMemo(() => {
    const SELECTED = "bg-tertiary";
    const NOT_SELECTED = "bg-white";
    const { cantMini, cantD20, cantD30, tarjeta, ecommerce } =
      formik.values.infoCotizacion || {};
    const propertyMap = {
      cantMini: cantMini > 0,
      cantD20: cantD20 > 0,
      cantD30: cantD30 > 0,
      tarjeta: tarjeta === "Si",
      ecommerce: ecommerce === "Si",
    };
    setChecked(propertyMap);
    return Object.fromEntries(
      Object.entries(propertyMap).map(([key, value]) => [
        key,
        value ? SELECTED : NOT_SELECTED,
      ])
    );
  }, [formik.values?.infoCotizacion]);

  useEffect(() => {
    if (formik) {
      for (const key in checked) {
        const field = "infoCotizacion." + key;
        const isCheked = checked[key as keyof CheckedState];
        const value = formik.values.infoCotizacion[key as keyof CheckedState];
        const amount = typeof value == "number" && value > 0 ? value : 1;

        if (Object.hasOwnProperty.call(checked, key)) {
          if (["tarjeta", "ecommerce"].includes(key)) {
            formik.setFieldValue(field, isCheked ? "Si" : "No");
          } else {
            formik.setFieldValue(field, isCheked ? amount : 0);
          }
        }
      }
    }
  }, [checked]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await generateStatement(formik.values);
      setStatement(data);
    };
    fetchData();
    onChange && onChange(formik.values);
  }, [formik.values]);

  useEffect(() => {
    handleQuotes(formik.values.infoCotizacion);
  }, [formik.values.infoCotizacion]);

  useEffect(() => {
    if (initialValues) {
      formik.setValues(initialValues);
    }
  }, []);

  const handleQuotes = async (infoCotizacion: infoCotizacion) => {
    if (
      infoCotizacion.giro != "" &&
      infoCotizacion.familia != "" &&
      infoCotizacion.adquiriente != "" &&
      infoCotizacion.rollos != ""
    ) {
      const res = await ClientsReferralsControllers.cotizador(
        formik.values.infoCotizacion
      );
      if (res.response) {
        formik.setFieldValue("resCotizacion", res.response);
      }
    }
  };

  function downloadPDF() {
    const linkSource = `${statement}`;
    const downloadLink = document.createElement("a");
    const fileName = "Cotización.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <>
      <div className="flex justify-between mb-3">
        <p className="text-primary text-2xl font-medium mb-3">Cotización</p>
        <ButtonDownload
          onClick={downloadPDF}
          disabled={
            !(
              formik.values.infoCotizacion.giro &&
              formik.values.infoCotizacion.familia &&
              formik.values.infoCotizacion.adquiriente &&
              formik.values.infoCotizacion.rollos
            )
          }
        />
      </div>

      <div className="bg-[#faf9f7] p-5 mb-5">
        <div className="flex flex-wrap w-full justify-between">
          <div className="min-w-[400px] lg:mr-1 flex-1 p-1">
            <Grid lg={2} gap={5} className="lg:w-[90%]">
              <FormItem label="Giro">
                <CatGiroReferrals
                  className="w-full"
                  value={formik.values.infoCotizacion.giro}
                  onChange={({ value }: any) => {
                    formik.setFieldValue("infoCotizacion.giro", value);
                  }}
                  placeholder="Giro"
                />
              </FormItem>

              <FormItem label="Familia">
                <CatFamiliasReferrals
                  className="w-full"
                  value={formik.values.infoCotizacion.familia}
                  onChange={({ value }: any) => {
                    formik.setFieldValue("infoCotizacion.familia", value);
                  }}
                  placeholder="Familia"
                />
              </FormItem>

              <FormItem label="Adquiriente">
                <CatAdquirientesReferrals
                  className="w-full"
                  value={formik.values.infoCotizacion.adquiriente}
                  onChange={({ value }: any) => {
                    formik.setFieldValue("infoCotizacion.adquiriente", value);
                  }}
                  placeholder="Adquiriente"
                />
              </FormItem>

              <FormItem label="Rollos regalados">
                <Dropdown
                  className="w-full"
                  options={SINO}
                  value={formik.values.infoCotizacion.rollos}
                  onChange={({ value }: any) => {
                    formik.setFieldValue("infoCotizacion.rollos", value);
                  }}
                  placeholder="Rollos regalados"
                />
              </FormItem>

              <FormItem label="Venta estimada mensual">
                <InputNumber
                  className="w-full"
                  value={formik.values.infoCotizacion.ventaMensual}
                  onChange={({ value }: any) =>
                    formik.setFieldValue("infoCotizacion.ventaMensual", value)
                  }
                  placeholder="Venta estimada mensual"
                />
              </FormItem>

              <FormItem label="Ticket promedio">
                <InputNumber
                  className="w-full"
                  value={formik.values.infoCotizacion.ticketProm}
                  onChange={({ value }: any) =>
                    formik.setFieldValue("infoCotizacion.ticketProm", value)
                  }
                  placeholder="Ticket promedio"
                />
              </FormItem>

              <FormItem label="Liquidación">
                <Dropdown
                  className="w-full"
                  options={LIQUIDACION}
                  value={formik.values.infoCotizacion.liquidacion}
                  onChange={({ value }: any) =>
                    formik.setFieldValue("infoCotizacion.liquidacion", value)
                  }
                  placeholder="Liquidación"
                />
              </FormItem>

              <FormItem label="Corte día natural">
                <Dropdown
                  className="w-full"
                  options={SINO}
                  value={formik.values.infoCotizacion.corteDia}
                  onChange={({ value }: any) =>
                    formik.setFieldValue("infoCotizacion.corteDia", value)
                  }
                  placeholder="Corte día natural"
                />
              </FormItem>
            </Grid>
          </div>
          <div className="min-w-[500px] lg:ml-1 flex-1 p-1">
            <p className="mb-2">Productos</p>
            {/* MINI*/}
            <div
              className={`flex w-full mb-3 p-3 lg:justify-between items-center  ${colorProduct.cantMini}`}
            >
              <InputRadioImage
                formik={formik}
                checked={checked}
                setChecked={setChecked}
                name="cantMini"
                image="/Images/terminales/terminal-MINI.png"
                title="Efevoo Pay MINI"
                description="Modelo Terminal"
              />

              <InputAmount formik={formik} name="cantMini" />
              <InputDropChip
                formik={formik}
                name="chipMini"
                arrendamiento={arrendamiento}
              />
              <InputRentaSugerencia formik={formik} name="rentaMini" />
            </div>
            {/* D20*/}
            <div
              className={`flex w-full mb-3 p-3  lg:justify-between items-center ${colorProduct.cantD20}`}
            >
              <InputRadioImage
                formik={formik}
                checked={checked}
                setChecked={setChecked}
                name="cantD20"
                image="/Images/terminales/terminal-Pro.png"
                title="Efevoo Pay Smart"
                description="Modelo Terminal"
              />

              <InputAmount formik={formik} name="cantD20" />
              <InputDropChip
                formik={formik}
                name="chipD20"
                arrendamiento={arrendamiento}
              />
              <InputRentaSugerencia formik={formik} name="rentaD20" />
            </div>

            {/* D30*/}
            <div
              className={`flex  w-full mb-3 p-3 lg:justify-between items-center ${colorProduct.cantD30}`}
            >
              <InputRadioImage
                formik={formik}
                checked={checked}
                setChecked={setChecked}
                name="cantD30"
                image="/Images/terminales/terminal-Smart.png"
                title="Efevoo Pay Pro"
                description="Modelo Terminal"
              />

              <InputAmount formik={formik} name="cantD30" />
              <InputDropChip
                formik={formik}
                name="chipD30"
                arrendamiento={arrendamiento}
              />
              <InputRentaSugerencia formik={formik} name="rentaD30" />
            </div>

            {/* Tarjeta  Crédito*/}
            <div
              className={`flex  w-full mb-3 p-3  items-center ${colorProduct.tarjeta}`}
            >
              <InputRadioImage
                formik={formik}
                checked={checked}
                setChecked={setChecked}
                name="tarjeta"
                image="/Images/terminales/tarjeta-de-credito.svg"
                title="Tarjeta de crédito"
                description="Servicio"
                />
            </div>

            <div
              className={`flex  w-full mb-3 p-3  items-center ${colorProduct.ecommerce}`}
              >
              <InputRadioImage
                formik={formik}
                checked={checked}
                setChecked={setChecked}
                name="ecommerce"
                image="/Images/terminales/comercio-electronico.svg"
                title="Ligas de pago"
                description="Servicio"
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-primary text-3xl my-5 ">Calculador de Tasas</p>

      {MessageVOBO(formik.values.resCotizacion.vobo)}

      <div className="bg-[#faf9f7] p-5">
        <p className="text-primary text-xl mb-3">Distribuidor de Volumen</p>

        <Grid sm={1} md={1} lg={3} gap={3} className="mb-5">
          <Grid sm={1} md={1} lg={2} gap={3} className="lg:w-[80%]">
            {/* Debito*/}

            <FormItem label="Sugerencia">
              <p className="text-primary p-2">
                {formik.values.resCotizacion.debito}%
              </p>
            </FormItem>

            <FormItem
              label="% Débito"
              labelClassName={getFormItemPropsStyles(
                formik.values.resCotizacion.msgDebito
              )}
            >
              <InputNumber
                className="w-full"
                value={formik.values.infoCotizacion.debito}
                onChange={({ value }: any) =>
                  formik.setFieldValue("infoCotizacion.debito", value)
                }
                mode="decimal"
                minFractionDigits={1}
                maxFractionDigits={2}
                placeholder="% Débito"
                suffix="%"
                inputStyle={getInputPropsStyles(
                  formik.values.resCotizacion.msgDebito
                )}
              />
            </FormItem>
            {/* PROSA*/}
            <FormItem label="Sugerencia">
              <p className="text-primary p-2">
                {formik.values.resCotizacion.prosa}%
              </p>
            </FormItem>

            <FormItem
              label="% MSI PROSA"
              labelClassName={getFormItemPropsStyles(
                formik.values.resCotizacion.msgProsa
              )}
            >
              <InputNumber
                className="w-full"
                value={formik.values.infoCotizacion.prosa}
                onChange={({ value }: any) =>
                  formik.setFieldValue("infoCotizacion.prosa", value)
                }
                mode="decimal"
                minFractionDigits={1}
                maxFractionDigits={2}
                placeholder="% MSI PROSA"
                suffix="%"
                inputStyle={getInputPropsStyles(
                  formik.values.resCotizacion.msgProsa
                )}
              />
            </FormItem>
          </Grid>
          {/* Crédito*/}

          <Grid sm={1} md={1} lg={2} gap={3} className="lg:w-[80%]">
            <FormItem label="Sugerencia">
              <p className="text-primary p-2">
                {formik.values.resCotizacion.credito}%
              </p>
            </FormItem>

            <FormItem
              label="% Crédito"
              labelClassName={getFormItemPropsStyles(
                formik.values.resCotizacion.msgCredito
              )}
            >
              <InputNumber
                className="w-full"
                value={formik.values.infoCotizacion.credito}
                onChange={({ value }: any) =>
                  formik.setFieldValue("infoCotizacion.credito", value)
                }
                mode="decimal"
                minFractionDigits={1}
                maxFractionDigits={2}
                placeholder="% Crédito"
                suffix="%"
                inputStyle={getInputPropsStyles(
                  formik.values.resCotizacion.msgCredito
                )}
              />
            </FormItem>
            {/* Internacional*/}
            <FormItem label="Sugerencia">
              <p className="text-primary p-2">
                {formik.values.resCotizacion.internacional}%
              </p>
            </FormItem>

            <FormItem
              label="% Internacional"
              labelClassName={getFormItemPropsStyles(
                formik.values.resCotizacion.msgInternacional
              )}
            >
              <InputNumber
                className="w-full"
                value={formik.values.infoCotizacion.internacional}
                onChange={({ value }: any) =>
                  formik.setFieldValue("infoCotizacion.internacional", value)
                }
                mode="decimal"
                minFractionDigits={1}
                maxFractionDigits={2}
                placeholder="% Internacional"
                suffix="%"
                inputStyle={getInputPropsStyles(
                  formik.values.resCotizacion.msgInternacional
                )}
              />
            </FormItem>
          </Grid>

          <Grid sm={1} md={1} lg={1} gap={3}>
            <div className="bg-white flex items-center flex-col justify-center w-2/3 mx-auto ">
              <div className="flex mb-3 ">
                <Image
                  src={"/Images/transactions/arrow2.svg"}
                  width={20}
                  height={20} // Ajusta la altura según tus necesidades
                  alt=""
                  className="mr-3"
                />
                <p className="text-4xl">
                  $ {formik.values.resCotizacion?.redComercial ?? 0}
                </p>
              </div>
              <p className="text-lg">Proyección de Comisiones</p>
            </div>
          </Grid>
        </Grid>

        <p className="text-primary text-xl mb-3">
          Tasas de Ventas y Cuotas Adicionales
        </p>

        <Grid sm={1} md={1} lg={3} gap={3}>
          <Grid sm={1} md={1} lg={2} gap={3} className="lg:max-w-[80%]">
            {/* Debito*/}

            <FormItem label="Sugerencia">
              <p className="text-primary p-2">
                {formik.values.resCotizacion.tasaDebito}%
              </p>
            </FormItem>

            <FormItem
              label="Tasa Débito"
              labelClassName={getFormItemPropsStyles(
                formik.values.resCotizacion.msgTasaDebito
              )}
            >
              <InputNumber
                className="w-full"
                value={formik.values.infoCotizacion.tasaDebito}
                onChange={({ value }: any) =>
                  formik.setFieldValue("infoCotizacion.tasaDebito", value)
                }
                mode="decimal"
                minFractionDigits={1}
                maxFractionDigits={2}
                placeholder="Tasa Débito"
                suffix="%"
                inputStyle={getInputPropsStyles(
                  formik.values.resCotizacion.msgTasaDebito
                )}
              />
            </FormItem>
            {/* PROSA*/}
            <FormItem label="Sugerencia">
              <p className="text-primary p-2">
                {formik.values.resCotizacion.tasaProsa}%
              </p>
            </FormItem>

            <FormItem
              label="Tasa Promedio Ventas MSI"
              labelClassName={getFormItemPropsStyles(
                formik.values.resCotizacion.msgTasaProsa
              )}
            >
              <InputNumber
                className="w-full"
                value={formik.values.infoCotizacion.tasaProsa}
                onChange={({ value }: any) =>
                  formik.setFieldValue("infoCotizacion.tasaProsa", value)
                }
                mode="decimal"
                minFractionDigits={1}
                maxFractionDigits={2}
                placeholder="Tasa Promedio Ventas MSI"
                suffix="%"
                inputStyle={getInputPropsStyles(
                  formik.values.resCotizacion.msgTasaProsa
                )}
              />
            </FormItem>
          </Grid>

          <Grid sm={1} md={1} lg={2} gap={3} className="lg:max-w-[80%]">
            <FormItem label="Sugerencia">
              <p className="text-primary p-2">
                {formik.values.resCotizacion.tasaCredito}%
              </p>
            </FormItem>

            <FormItem
              label="Tasa Crédito"
              labelClassName={getFormItemPropsStyles(
                formik.values.resCotizacion.msgTasaCredito
              )}
            >
              <InputNumber
                className="w-full"
                value={formik.values.infoCotizacion.tasaCredito}
                placeholder="% Tasa Crédito"
                onChange={({ value }: any) =>
                  formik.setFieldValue("infoCotizacion.tasaCredito", value)
                }
                mode="decimal"
                minFractionDigits={1}
                maxFractionDigits={2}
                suffix="%"
                inputStyle={getInputPropsStyles(
                  formik.values.resCotizacion.msgTasaCredito
                )}
              />
            </FormItem>
            {/* Internacional*/}
            <FormItem label="Sugerencia">
              <p className="text-primary p-2">
                {formik.values.resCotizacion.tasaInternacional}%
              </p>
            </FormItem>

            <FormItem
              label="Tasa Internacional"
              labelClassName={getFormItemPropsStyles(
                formik.values.resCotizacion.msgTasaInternacional
              )}
            >
              <InputNumber
                className="w-full"
                mode="decimal"
                placeholder="% Tasa internacional"
                minFractionDigits={1}
                maxFractionDigits={2}
                value={formik.values.infoCotizacion.tasaInternacional}
                onChange={({ value }: any) =>
                  formik.setFieldValue(
                    "infoCotizacion.tasaInternacional",
                    value
                  )
                }
                suffix="%"
                inputStyle={getInputPropsStyles(
                  formik.values.resCotizacion.msgTasaInternacional
                )}
              />
            </FormItem>
          </Grid>

          <Grid sm={1} md={1} lg={2} gap={3} className="lg:max-w-[80%]"></Grid>
        </Grid>
      </div>
    </>
  );
}
