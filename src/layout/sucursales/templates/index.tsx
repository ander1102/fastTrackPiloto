import { Subsidiary } from "@app/types/Subsidiary";

export const SubsidiaryRepresentativeTemplate = (item: Subsidiary) =>
  item.infoContactos && item.infoContactos[0]?.nombre;
