import Grid from "@app/components/Grid";
import { TabPanel, TabView } from "primereact/tabview";
import { INIT_INFO_CONTACTS } from "@app/constants/client";
import { useContext, useState } from "react";
import { ClientField, ClientFormContext } from "../../context";

export default function Content() {
  const { clientProps } = useContext(ClientFormContext);
  const [contacts] = useState(() => INIT_INFO_CONTACTS);
  return (
    <TabView id="clientesContactos">
      {contacts.map((_, idx) => {
        const contactNumber = idx + 1;

        const error = Object.assign(
          { telefono: "", nombre: "", email: "" },
          clientProps.errors && clientProps.errors.infoContactos
            ? clientProps.errors.infoContactos[idx]
            : {}
        );

        const hasError = Object.values(error).some((value) => value !== "");

        return (
          <TabPanel
            key={idx}
            header={`Contacto ${contactNumber}`}
            className={`text-blue-400 ${hasError ? "error-tab" : ""}`}
          >
            <Grid sm={1} md={2} lg={2} gap={3}>
              <ClientField field={`infoContactos[${idx}].nombre`} />
              <ClientField field={`infoContactos[${idx}].email`} />
              <ClientField field={`infoContactos[${idx}].telefono`} />
            </Grid>
          </TabPanel>
        );
      })}
    </TabView>
  );
}
