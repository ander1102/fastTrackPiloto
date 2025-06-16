import { CategoriesControllers } from "@app/logic/backend/categories";
import { ClientsReferralsControllers } from "@app/logic/backend//clientsReferrals";
import { CatControllers } from "@app/logic/backend/cat";
import { OperationsControllers } from "@app/logic/backend/operations";
import { SubsidiaryControllers } from "@app/logic/backend/subsidiary";
import { SubsidiaryQuery } from "@app/types/Subsidiary";
import {
  ClientsReferralsAgenteBody,
  ClientsReferralsSellerBody,
} from "@app/types/ClientsReferrals";
import {
  OperationsCatAlertas,
  OperationsCatAlertasBody,
  OperationsCatRiesgos,
} from "@app/types/Operations";

import createDropdownData from "../HOC/createDropdownData";
import { createMultiSelectData } from "../HOC/createMultiSelectData";

export const CatGiro = createDropdownData(
  CategoriesControllers,
  "getGiro",
  (x) => ({ label: x.nombre, value: x.nombre })
);
export const CatGiroById = createDropdownData(
  CategoriesControllers,
  "getGiro",
  (x) => ({ label: x.nombre, value: x.idagep_catgiro })
);

export const CatGiroReferrals = createDropdownData(
  ClientsReferralsControllers,
  "giro",
  (x: any) => ({ label: x?.nombre, value: x?.nombre })
);
export const CatFamiliasReferrals = createDropdownData(
  ClientsReferralsControllers,
  "familias",
  (x: any) => ({ label: x?.nombre, value: x?.nombre })
);
export const CatAdquirientesReferrals = createDropdownData(
  ClientsReferralsControllers,
  "adquirientes",
  (x: any) => ({ label: x?.nombre, value: x?.nombre })
);

export const CatCountries = createDropdownData(
  CategoriesControllers,
  "getCountries",
  (x) => ({
    label: x.name?.common,
    value: x.cca2,
    image: {
      url: x.flags?.png,
      alt: x.flags?.alt,
    },
  })
);

export const CatTerminalTypes = createDropdownData(
  CategoriesControllers,
  "getTerminalType",
  (x) => ({
    label: x?.nombre,
    value: x?.idagep_terminal_tipo,
  })
);

export const CatClientes = createDropdownData(
  CatControllers,
  "clientes",
  (x: { nombre: string; idagep_empresa: number }) => ({
    label: x?.nombre,
    value: x?.idagep_empresa,
  })
);

// List of clients that do not have black card payment active
export const CatClientesDeposits = createDropdownData(
  CatControllers,
  "clientesDeposits",
  (x: { nombre: string; idagep_empresa: string }) => ({
    label: x?.nombre,
    value: x?.idagep_empresa,
  })
);

export const CatClientesMultiSelect = createMultiSelectData(
  CatControllers,
  "clientes",
  (x: { nombre: string; idagep_empresa: string }) => ({
    label: x?.nombre,
    value: x?.idagep_empresa,
  })
);

export const CatSucursalesMultiSelect = createMultiSelectData(
  SubsidiaryControllers,
  "get",
  (x) => ({
    label: x.nombre,
    value: `${x.idagep_sucursal}`,
  }),
  (user) =>
    [
      {
        idagep_usuarios: user.persona.idagep_usuarios ?? 0,
        idagep_empresa: user.idagep_empresa ?? 0,
        idagep_sucursal: 0,
        nomSucursal: "",
        pagina: 1,
        tamano_pagina: 1000,
      },
    ] as [body: SubsidiaryQuery]
);

export const CatSucursal = createDropdownData(
  SubsidiaryControllers,
  "get",
  (x) => ({
    label: x.nombre,
    value: x.idagep_sucursal,
  }),
  (user) =>
    [
      {
        idagep_usuarios: user.persona.idagep_usuarios ?? 0,
        idagep_empresa: user.idagep_empresa ?? 0,
        idagep_sucursal: 0,
        nomSucursal: "",
        pagina: 1,
        tamano_pagina: 1000,
      },
    ] as [body: SubsidiaryQuery]
);

export const CatSeller = createDropdownData(
  ClientsReferralsControllers,
  "seller",
  (x) => ({
    label: x.nombre,
    value: x.referencia,
  }),
  (user) =>
    [
      {
        idagep_usuarios: user.persona.idagep_usuarios ?? 0,
      },
    ] as [body: ClientsReferralsSellerBody]
);

export const CatAgente = createDropdownData(
  ClientsReferralsControllers,
  "agente",
  (x) => ({
    label: x.nombre,
    value: x.referencia,
  }),
  (user, args) =>
    [
      {
        referencia: args.referencia,
      },
    ] as [body: ClientsReferralsAgenteBody]
);

export const CatMetPago = createDropdownData(
  CatControllers,
  "pagos",
  (x: { tipo: string; idagep_catpago: number }) => ({
    label: x.tipo,
    value: x.idagep_catpago,
  }),
  (_, args): [body: { idagep_empresa: number }] => {
    return [{ idagep_empresa: args.idagep_empresa ?? 0 }] as [
      body: { idagep_empresa: number }
    ];
  }
);

export const CatTasas = createDropdownData(CatControllers, "tasa", (x) => ({
  label: x.nombre,
  value: x.idagep_tipo_tasa,
}));

export const CatAdquiriente = createDropdownData(
  CatControllers,
  "adquiriente",
  (x) => ({
    label: x.banco,
    value: x.idagep_adquiriente,
  })
);

export const CatAlertasMultiSelect = createMultiSelectData(
  OperationsControllers,
  "alertas",
  (x: OperationsCatAlertas) => ({
    label: `${x.descripcion}`,
    value: x.idagep_catalerta,
  }),
  (_, args) => [args] as [body: OperationsCatAlertasBody]
);

export const CatRiesgos = createDropdownData(
  OperationsControllers,
  "riesgos",
  (x: OperationsCatRiesgos) => ({
    label: `${x.descripcion}`,
    value: x.idagep_catriesgo,
  })
);
