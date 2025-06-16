import Grid from "@app/components/Grid";
import { FormikCustomerType } from "@app/types/Clients";
import { FormItemFulfillment as FormItem  } from "../templates";
import { InputText } from "primereact/inputtext";
import FormItemInputFile from "./FormItemInputFile";

export default function CuentaBancariaForm({
  values,
  handleChange,
  disabled,
  onDocumentChange,
  errors,
  fulfillment,
  setFulfillment,
  activeTab
}: FormikCustomerType) {
  const { infoOperaciones } = values;
  const { banco, cuenta, clabe, titular } = infoOperaciones;
  const errorOperaciones = Object.assign(
    { banco: "", cuenta: "", clabe: "", titular: "" },
    errors.infoOperaciones
  );

  return (
    <>
      <p className="text-[#6366F1] text-xl my-5">Datos de cuenta bancaria</p>
      <Grid sm={2} md={2} lg={2} gap={2}>
        <FormItem
          name="infoOperaciones.banco"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          maxWidth="max-w-full"
          title="Banco"
          required
          error={errorOperaciones.banco}
          canFulfillment={false}
        >
          <InputText
            name="infoOperaciones.banco"
            value={banco}
            onChange={handleChange}
            placeholder="Banco"
            disabled={disabled}
            className={errorOperaciones.banco && "p-invalid"}
            style={{width:'75%', height:42, borderRadius: 6}}
          />
        </FormItem>
        <FormItem
          name="infoOperaciones.cuenta"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          maxWidth="max-w-full"
          title="Cuenta"
          required
          error={errorOperaciones.cuenta}
          canFulfillment={false}
        >
          <InputText
            name="infoOperaciones.cuenta"
            value={cuenta}
            placeholder="Cuenta"
            onChange={handleChange}
            keyfilter="int"
            disabled={disabled}
            className={errorOperaciones.cuenta && "p-invalid"}
            style={{width:'75%', height:42, borderRadius: 6}}
          />
        </FormItem>
        <FormItem
         name="infoOperaciones.clabe"
         fulfillment={fulfillment}
         setFulfillment={setFulfillment}
          maxWidth="max-w-full"
          title="Clabe interbancaria"
          required
          error={errorOperaciones.clabe}
          canFulfillment={false}
        >
          <InputText
            name="infoOperaciones.clabe"
            value={clabe}
            placeholder="Clabe interbancaria"
            onChange={handleChange}
            keyfilter="int"
            disabled={disabled}
            className={errorOperaciones.clabe && "p-invalid"}
            style={{width:'75%', height:42, borderRadius: 6}}
          />
        </FormItem>
        <FormItem
          name="infoOperaciones.titular"
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          maxWidth="max-w-full"
          title="Titular"
          required
          error={errorOperaciones.titular}
          canFulfillment={false}
        >
          <InputText
            name="infoOperaciones.titular"
            placeholder="Titular"
            value={titular}
            onChange={handleChange}
            disabled={disabled}
            className={errorOperaciones.titular && "p-invalid"}
            style={{width:'75%', height:42, borderRadius: 6}}
          />
        </FormItem>
      </Grid>
      <Grid sm={2} md={2} lg={2} gap={2}>
        <FormItemInputFile
          errors={errors}
          values={values}
          fileNames={["estadoDeCuenta"]}
          disabled={disabled}
          onDocumentChange={onDocumentChange}
          fulfillment={fulfillment}
          setFulfillment={setFulfillment}
          canFulfillment={false}
          activeTab={activeTab}
        />
      </Grid>
    </>
  );
}
