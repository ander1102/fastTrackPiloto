import { useState, SetStateAction, useContext, useEffect } from "react";
import {
  PagosRecurrentesSubscribersAllResponseSuscriptores,
  PagosRecurrentesSubscribersAllBody,
  PagosRecurrentesPaymentsReadResponsePagosRecurrentes,
} from "@app/types/PagosRecurrentes";
import { PagosRecurrentesController } from "@app/logic/backend/pagosRecurrentes";
import useCall from "@app/hooks/useCall";
import { User } from "@app/types/User";
import { UserContext } from "@app/context";
import { DataTableQuery } from "@app/types";
import { DATA_TABLE_QUERY } from "@app/constants";
import { useRouter } from "next/router";
import { modalManager } from "@app/components/ModalComponent";
import ModalQuestionRemovePayment from "@app/layout/pagosrecurrentes/subscribers/modalQuestionRemovePayment";
import ModalQuestionRemovePaymentResponse from "@app/layout/pagosrecurrentes/subscribers/modalQuestionRemovePaymentResponse";
import ModalQuestionRemoveSubscription from "@app/layout/pagosrecurrentes/subscribers/modalQuestionRemoveSubscription";
import ModalSubscriptionDetail from "@app/layout/pagosrecurrentes/subscribers/modalSubscriptionDetail";

interface tableSubscribersReturn {
  filters: PagosRecurrentesSubscribersAllBody;
  loader: boolean;
  itemReadPayment: PagosRecurrentesPaymentsReadResponsePagosRecurrentes | null;
  items: Array<PagosRecurrentesSubscribersAllResponseSuscriptores>;
  dataTableQuery: DataTableQuery;
  onPage: (event: any) => void;
  onRefresh: (
    curr: SetStateAction<Partial<PagosRecurrentesSubscribersAllBody>>
  ) => void;
  onShowQuestionRemovePayment: () => void;
  onShowTableSubscriptionDetail: (
    idagep_pagos_suscriptor: number,
    estatus: number
  ) => void;
}

const getInitialParams = (
  user: User,
  id: string
): PagosRecurrentesSubscribersAllBody => ({
  idagep_usuario: user.persona.idagep_usuarios,
  idagep_pago_recurrente: +id,
  filtroTelefono: "",
  filtroSuscriptor: "",
  pagina: 1,
  tamano_pagina: 10,
});

export const useTableSubscribers = (): tableSubscribersReturn => {
  const userCtx = useContext(UserContext);
  const router = useRouter();
  const id = router.query.id as string;
  const [filters, setFilters] = useState(getInitialParams(userCtx.user, id));
  const [dataTableQuery, setDataTableQuery] =
    useState<DataTableQuery>(DATA_TABLE_QUERY);

  const { item, isCalling, refresh } = useCall(
    PagosRecurrentesController,
    "allSubscribers",
    {
      initialParams: [filters],
    }
  );

  const { item: itemReadPayment } = useCall(
    PagosRecurrentesController,
    "readPayments",
    {
      initialParams: [
        {
          idagep_pago_recurrente: +id,
          idagep_usuario: userCtx.user.persona.idagep_usuarios,
        },
      ],
    }
  );

  useEffect(() => {
    refresh([filters]);
  }, [filters]);

  useEffect(() => {
    setDataTableQuery((prevDataTableQuery) => ({
      ...prevDataTableQuery,
      totalRecords: item?.totalRegistros ?? 0,
    }));
  }, [item?.totalRegistros]);

  const handleRemovePayment = async () => {
    const responseDisablePayment =
      await PagosRecurrentesController.disablePayments({
        idagep_pago_recurrente: +id,
        idagep_empresa: userCtx.user.idagep_empresa ?? 0,
        idagep_usuario: userCtx.user.persona.idagep_usuarios ?? 0,
      });

    await modalManager.show(ModalQuestionRemovePaymentResponse, {
      isSuccess:
        responseDisablePayment.response.mensaje == "Se actualizo estatus",
    });
  };

  const onPage = (event: { page: number; first: number; rows: number }) => {
    setDataTableQuery((prevDataTableQuery) => ({
      ...prevDataTableQuery,
      first: event.first,
      rows: event.rows,
      page: event.page,
    }));
    onRefresh({ pagina: event.page + 1 });
  };

  const onRefresh = (
    curr: SetStateAction<Partial<PagosRecurrentesSubscribersAllBody>>
  ) => {
    setFilters((prev) => ({
      ...prev,
      ...(curr instanceof Function ? curr(prev) : curr),
    }));
  };

  const onShowQuestionRemovePayment = async () => {
    await modalManager.show(ModalQuestionRemovePayment, {
      onRemovePayment: handleRemovePayment,
    });
  };

  const handleRemoveSubscription = async (idagep_pagos_suscriptor: number) => {
    const responseDisableSubscription =
      await PagosRecurrentesController.disableSubscribers({
        idagep_pagos_suscriptor: idagep_pagos_suscriptor,
        idagep_empresa: userCtx.user.idagep_empresa ?? 0,
        idagep_usuario: userCtx.user.persona.idagep_usuarios ?? 0,
        estatus: 0,
      });

    await modalManager.show(ModalQuestionRemovePaymentResponse, {
      isSuccess:
        responseDisableSubscription.response.mensaje == "Se deshabilito",
    });
  };

  const handleShowQuestionRemoveSuscriptor = async (
    idagep_pagos_suscriptor: number
  ) => {
    await modalManager.show(ModalQuestionRemoveSubscription, {
      onRemoveSubscription: () =>
        handleRemoveSubscription(idagep_pagos_suscriptor),
    });
  };

  const onShowTableSubscriptionDetail = async (
    idagep_pagos_suscriptor: number,
    estatus: number
  ) => {
    await modalManager.show(ModalSubscriptionDetail, {
      idagep_pagos_suscriptor,
      estatus,
      onShowQuestionRemoveSuscriptor: handleShowQuestionRemoveSuscriptor,
    });
  };

  return {
    filters,
    loader: isCalling,
    items: item?.suscriptores ?? [],
    itemReadPayment,
    dataTableQuery,
    onPage,
    onRefresh,
    onShowQuestionRemovePayment,
    onShowTableSubscriptionDetail,
  };
};
