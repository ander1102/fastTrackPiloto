
import { ClientPersona } from "@app/layout/clientes/form/types";
import FormSection from "@app/components/Form/create/section";
import useFormTabs from "@app/layout/ventas/clientesreferidos/hooks/useFormTabs";
import { useContext } from "react";
import { FormContext } from "@app/components/FormManager/FormContext";

interface BodyProps {
  type: ClientPersona;
}
export default function body({ type }: BodyProps) {
  const { formMethods } = useContext(FormContext);
  const formTabs = useFormTabs(type);
  return (
    <div className="pb-0 pt-6 h-[85vh] overflow-hidden">
      <FormSection
        tabs={formTabs.tabs}
        activeTab={formMethods.activeTab}
        setActiveTab={formMethods.setActiveTab}
      />
    </div>
  );
}
