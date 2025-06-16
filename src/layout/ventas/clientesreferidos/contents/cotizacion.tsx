import { useEffect, useContext, useMemo, useState } from "react";
import Cotizador from "@app/components/Cotizador";
import { FormContext } from "@app/components/FormManager/FormContext";
import { INIT_CLIENT } from "@app/components/Cotizador/constants";
import { ProgressSpinner } from "primereact/progressspinner";
export default function Cotizacion() {
  const { formik } = useContext(FormContext);

  const [clientValues, setClientValues] = useState(INIT_CLIENT);

  useEffect(() => {
    setClientValues({
      ...INIT_CLIENT,
      nombre: formik.values.nombre,
      agente: formik.values.agente,
      gerente: formik.values.gerente,
      infoCotizacion: formik.values.infoCotizacion,
    });
  }, [formik.values]);

  const ready = useMemo(
    () =>
      clientValues.nombre || //Muestra que recupera la informacion
      !formik.values.idagep_referido, // Carga cuando es nuevo
    [formik.values]
  );

  return ready ? (
    <Cotizador
      initialValues={clientValues}
      onChange={(value) => {
        formik.setFieldValue("infoCotizacion", value.infoCotizacion);
      }}
    />
  ) : (
    <div className="flex items-center h-70vh w-full"><ProgressSpinner /></div>
  );
}
