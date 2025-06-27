import Grid from "@app/components/Grid";
import { useContext } from "react";
import { ClientField, ClientFormContext } from "../../context";

export default function Content() {
  const { type } = useContext(ClientFormContext);
  return (
    <>
      <p className="text-primary-color text-xl font-medium mb-5">
        Detalles del comercio
      </p>

      <Grid sm={1} md={2} lg={2} gap={3}>
        <ClientField field="nombre" />
        <ClientField field="infoComercio.razonSocial" />
        <ClientField field="email" />
        <ClientField field="Giro" />
        <ClientField field="infoComercio.rfc" />
        <ClientField field="infoComercio.fechaConst" />
        <ClientField field="infoComercio.telefono" />
      </Grid>
    </>
  );
}
