import Grid from "@app/components/Grid";
import { FormField } from "@app/components/FormManager/FormField";
import { ButtonDeny } from "@app/components/Buttons";
import { useContext } from "react";
import { FormContext } from "@app/components/FormManager/FormContext";
export default function Content() {
  const { formMethods } = useContext(FormContext);
  const { isNew } = formMethods;
  return (
    <>
      <div className="flex justify-between mb-5">
        <p className="text-primary  font-medium text-2xl ">General</p>
        {!isNew && (
          <ButtonDeny label="Eliminar" onClick={formMethods.handleDelete} />
        )}
      </div>

      <Grid sm={1} md={2} lg={2} gap={3} className="bg-[#faf9f7] p-5">
        <FormField field="nombre" />
        <FormField field="infoComercio.razonSocial" />
        <FormField field="email" />
        <FormField field="idagep_catgiro" />
        <FormField field="infoComercio.rfc" />
        <FormField field="infoComercio.fechaConst" />
        <FormField field="infoComercio.paisConst" />
        <FormField field="infoComercio.telefono" />
      </Grid>
    </>
  );
}
