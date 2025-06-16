import { Button } from "@app/components/Buttons";
import { KpiContainer } from "@app/components/ViewKpis";
import { ParametersState } from "./useParameters";

interface ParametersHeaderProps
  extends Pick<ParametersState, "loading" | "onSave"> {}

export const ParametersHeader = ({
  loading,
  onSave,
}: ParametersHeaderProps) => {
  return (
    <>
      <KpiContainer title="Parámetros" />
      <Button
        className="button-save !ml-auto"
        label="Guardar"
        loading={loading}
        onClick={onSave}
      />
    </>
  );
};
