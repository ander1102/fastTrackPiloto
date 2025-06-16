import Grid from "@app/components/Grid";
import { ClientField } from "../../context";

export default function Content() {
  return (
    <Grid sm={1} md={2} lg={2} gap={1}>
      <ClientField field="infoDomicilio.calle" />
      <ClientField field="infoDomicilio.colonia" />
      <Grid lg={2} md={2} sm={1}>
        <ClientField field="infoDomicilio.numExt" />
        <ClientField field="infoDomicilio.numInt" />
      </Grid>
      <ClientField field="infoDomicilio.municipio" />
      <ClientField field="infoDomicilio.codigoPostal" />
      <ClientField field="infoDomicilio.ciudad" />
      <ClientField field="infoDomicilio.estado" />
      <ClientField field="infoDomicilio.pais" />
    </Grid>
  );
}
