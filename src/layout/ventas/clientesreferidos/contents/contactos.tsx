import Grid from "@app/components/Grid";
import { TabPanel, TabView } from "primereact/tabview";
import { INIT_INFO_CONTACTS } from "@app/constants/client";
import { useContext, useState } from "react";
import { FormField } from "@app/components/FormManager/FormField";
import { FormContext } from "@app/components/FormManager/FormContext";

export default function Content() {
  const { formMethods } = useContext(FormContext);
  const [contacts] = useState(() => INIT_INFO_CONTACTS);
  return (
    <div>
      <p className="text-primary font-medium text-2xl mb-5">Contactos</p>
      <TabView className="bg-[#faf9f7] p-5" id="tabViewClienteReferido">
        {contacts.map((_, idx) => {
          const contactNumber = idx + 1;

          const error = Object.assign(
            { telefono: "", nombre: "", email: "" },
            formMethods.errors && formMethods.errors.infoContactos
              ? formMethods.errors.infoContactos[idx]
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
                <FormField field={`infoContactos[${idx}].nombre`} />
                <FormField field={`infoContactos[${idx}].email`} />
                <FormField field={`infoContactos[${idx}].telefono`} />
              </Grid>
            </TabPanel>
          );
        })}
      </TabView>
    </div>
  );
}
