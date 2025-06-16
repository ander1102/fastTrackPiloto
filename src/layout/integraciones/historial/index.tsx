import { Dispatch, SetStateAction } from "react";
import { IntegracionesHistorialBody } from "./body";
import { IntegracionesHistorialHeader } from "./header";
import PageLayout from "@app/layout/app/layout";
import {
  IntegrationHistoryFilters,
  IntegrationHistoryRecord,
} from "@app/types/Integrations";

interface IntegracionesHistorialProps {
  filters: IntegrationHistoryFilters;
  loading: boolean;
  records: IntegrationHistoryRecord[];
  totalRecords: number;
  onRefreshDefault: () => void;
  setFilters: Dispatch<SetStateAction<IntegrationHistoryFilters>>;
}
export function IntegracionesHistorial({
  filters,
  loading,
  records,
  totalRecords,
  onRefreshDefault,
  setFilters,
}: IntegracionesHistorialProps) {
  const onRefresh = (
    curr: SetStateAction<Partial<IntegrationHistoryFilters>>
  ) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  return (
    <article>
      <IntegracionesHistorialHeader
        filters={filters}
        loader={loading}
        onRefresh={onRefresh}
      />
      <IntegracionesHistorialBody
        loader={loading}
        records={records}
        totalRecords={totalRecords}
        onRefresh={onRefresh}
        onRefreshDefault={onRefreshDefault}
      />
    </article>
  );
}
