import react, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FormItem } from "@app/layout/clientes/templates";
import InputFile from "@app/components/InputFile";
import Grid from "@app/components/Grid";
import styles from "@app/styles/AgenteComercial.module.css";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { SellersController } from "@app/logic/backend/sellers";
import useEffectAsync from "@app/hooks/useEffectAsync";

export const GeneralForm = ({
  user,
  typeUser,
  setGeneral,
  general,
  validationErrors,
  clearValidationError,
}: any) => {
  let isAdmin =
    typeUser === "Administrador" || typeUser === "Gerente_Comercial";
  const [optionsSellers, setOptionsSellers] = useState([]);

  useEffect(() => {
    getSellersCatalog();
  }, []);

  const getSellersCatalog = async () => {
    const {
      persona: { idagep_usuarios },
    } = user;
    let res = await SellersController.catalogSeller(idagep_usuarios);
    if (res.isSuccess) {
      const {
        response: { data },
      }: any = res;
      setOptionsSellers(data);
    } else {
      setOptionsSellers([]);
    }
  };

  return (
    <>
      <div>
        <Grid xl={isAdmin ? 3 : 2} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"Nombre *"}
            labelError={validationErrors.name}
          >
            <InputText
              name="nombre"
              placeholder={"Nombre"}
              value={general.name}
              onChange={(e) => {
                setGeneral({ ...general, name: e.target.value });
                clearValidationError("name");
              }}
              style={
                validationErrors.name
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "70%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "70%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
          <FormItem
            maxWidth="max-w-full"
            title={"Correo *"}
            labelError={validationErrors.email}
          >
            <InputText
              name="email"
              placeholder={"Correo"}
              value={general?.email}
              onChange={(e) => {
                setGeneral({ ...general, email: e.target.value });
                clearValidationError("email");
              }}
              style={
                validationErrors.email
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "70%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "70%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
          {isAdmin && (
            <FormItem
              maxWidth="max-w-full"
              title={"Asignar Gerente Comercial al Agente *"}
              labelError={validationErrors.manager}
            >
              <Dropdown
                value={general.manager}
                onChange={(e) => {
                  setGeneral({ ...general, manager: e.value });
                  clearValidationError("manager");
                }}
                options={optionsSellers}
                optionLabel="nombre"
                placeholder="Seleccionar Gerente Comercial"
                filter
                style={
                  validationErrors.manager
                    ? {
                        borderColor: "#FF5758",
                        backgroundColor: "#FEE",
                        width: "70%",
                        height: 42,
                        borderRadius: 6,
                      }
                    : { width: "70%", height: 42, borderRadius: 6 }
                }
              />
            </FormItem>
          )}
        </Grid>
        <Grid xl={isAdmin ? 3 : 2} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"Teléfono *"}
            labelError={validationErrors.cellphone}
          >
            <InputText
              name="cellphone"
              placeholder={"Teléfono"}
              value={general.cellphone}
              onChange={(e) => {
                setGeneral({ ...general, cellphone: e.target.value });
                clearValidationError("cellphone");
              }}
              style={
                validationErrors.cellphone
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "70%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "70%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
          <FormItem
            maxWidth="max-w-full"
            title={"Comprobante de domicilio *"}
            labelError={validationErrors.billingProof}
          >
            <InputFile
              name={general.billingProof?.filename}
              id="billingProof"
              value={general.billingProof.value}
              valueType={"file"}
              onChange={(e) => {
                setGeneral({ ...general, billingProof: e });
                clearValidationError("billingProof");
              }}
              className={
                validationErrors.billingProof
                  ? styles.inputFileError
                  : styles.inputFile
              }
              disabled={false}
              errorIconColor={validationErrors.billingProof}
              extension={general.billingProof.extension}
            />
          </FormItem>
          {isAdmin && (
            <FormItem
              title={"Comisión del Agente Comercial"}
              labelError={
                validationErrors.sellerCommission ? "text-[#FF5758]" : ""
              }
            >
              <InputNumber
                min={0.0}
                placeholder="0.00%"
                suffix="%"
                value={general.sellerCommission}
                onChange={(e) => {
                  setGeneral({ ...general, sellerCommission: e.value });
                  clearValidationError("sellerCommission");
                }}
                mode="decimal"
                minFractionDigits={2}
                maxFractionDigits={2}
                inputStyle={
                  validationErrors.sellerCommission
                    ? { borderColor: "#FF5758", backgroundColor: "#FEE" }
                    : { borderRadius: 6 }
                }
                style={
                  validationErrors.sellerCommission
                    ? {
                        borderColor: "#FF5758",
                        backgroundColor: "#FEE",
                        width: "70%",
                        height: 42,
                        borderRadius: 6,
                      }
                    : { width: "70%", height: 42, borderRadius: 6 }
                }
              />
            </FormItem>
          )}
        </Grid>
        <Grid xl={isAdmin ? 3 : 2} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"Estado de cuenta *"}
            labelError={validationErrors.bankStatement}
          >
            <InputFile
              name={general.bankStatement.filename}
              id="bankStatement"
              value={general.bankStatement.value}
              valueType={"file"}
              onChange={(e) => {
                setGeneral({ ...general, bankStatement: e });
                clearValidationError("bankStatement");
              }}
              className={
                validationErrors.bankStatement
                  ? styles.inputFileError
                  : styles.inputFile
              }
              disabled={false}
              errorIconColor={validationErrors.bankStatement}
              extension={general.bankStatement.extension}
            />
          </FormItem>
          <FormItem
            maxWidth="max-w-full"
            title={"Cédula Identificación Fiscal *"}
            labelError={validationErrors.taxId}
          >
            <InputFile
              name={general.taxId?.filename}
              id="taxId"
              value={general.taxId}
              valueType={"file"}
              onChange={(e) => {
                setGeneral({ ...general, taxId: e });
                clearValidationError("taxId");
              }}
              className={
                validationErrors.taxId
                  ? styles.inputFileError
                  : styles.inputFile
              }
              disabled={false}
              errorIconColor={validationErrors.taxId}
              extension={general.taxId.extension}
            />
          </FormItem>
        </Grid>
        <Grid xl={isAdmin ? 3 : 2} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"Identificación Oficial *"}
            labelError={validationErrors.IdOf}
          >
            <InputFile
              name={general.IdOf?.filename}
              id="IdOf"
              value={general.IdOf}
              valueType={"file"}
              onChange={(e) => {
                setGeneral({ ...general, IdOf: e });
                clearValidationError("IdOf");
              }}
              className={
                validationErrors.IdOf ? styles.inputFileError : styles.inputFile
              }
              disabled={false}
              errorIconColor={validationErrors.IdOf}
              extension={general.IdOf.extension}
            />
          </FormItem>
          <FormItem
            maxWidth="max-w-full"
            title={"CV *"}
            labelError={validationErrors.cv}
          >
            <InputFile
              name={general.cv.filename}
              id="cv"
              value={general.cv}
              valueType={"file"}
              onChange={(e) => {
                setGeneral({ ...general, cv: e });
                clearValidationError("cv");
              }}
              className={
                validationErrors.cv ? styles.inputFileError : styles.inputFile
              }
              errorIconColor={validationErrors.cv}
              disabled={false}
              extension={general.cv.extension}
            />
          </FormItem>
        </Grid>
      </div>
    </>
  );
};
