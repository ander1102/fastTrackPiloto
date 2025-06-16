import Grid from "@app/components/Grid";
import { FormField } from "@app/components/FormManager/FormField";

export default function Content() {
  return (
    <>
      <p className="text-primary text-2xl font-medium mb-5">Dirección</p>

      <Grid sm={1} md={2} lg={2} gap={1} className="bg-[#faf9f7] p-5">
        <FormField field="infoDomicilio.calle" />
        <FormField field="infoDomicilio.colonia" />
        <Grid lg={2} md={2} sm={1}>
          <FormField field="infoDomicilio.numExt" />
          <FormField field="infoDomicilio.numInt" />
        </Grid>
        <FormField field="infoDomicilio.municipio" />
        <FormField field="infoDomicilio.codigoPostal" />
        <FormField field="infoDomicilio.ciudad" />
        <FormField field="infoDomicilio.estado" />
        <FormField field="infoDomicilio.pais" />
      </Grid>
    </>
  );
}
