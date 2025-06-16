import Grid from "@app/components/Grid";
import withAppContext from "@app/components/HOC/withAppContext";
import { modalManager } from "@app/components/ModalComponent";
import PageLayout from "@app/layout/app/layout";
import CardSectionOne from "@app/layout/tarjeta/sections/one";
import CardSectionTwo from "@app/layout/tarjeta/sections/two";
import RequestCardModal from "@app/components/ModalComponent/modals/card/Request";
import RequestSuccessfulCardModal from "@app/components/ModalComponent/modals/card/RequestSuccessful";
import SuccessfulCardModal from "@app/components/ModalComponent/modals/card/SuccessfulCard";
import RejectedCardModal from "@app/components/ModalComponent/modals/card/RejectedCard";
import CountdownModal from "@app/components/ModalComponent/modals/card/Countdown";
import RequestBusinessCardModal from "@app/components/ModalComponent/modals/card/RequestBusinessCard";
import useEffectAsync from "@app/hooks/useEffectAsync";
import { CardsController } from "@app/logic/backend/cards";
import { useContext, useMemo, useState } from "react";
import { execWithLoader } from "@app/utils/DOM";
import { UserContext } from "@app/context";
import { KpiContainer } from "@app/components/ViewKpis";
import {
  CardInfoCardRequestResponseCard,
  CardInfoRequestResponseCard,
  CardCVVRequestResponse,
  CardNIPRequestResponse,
} from "@app/types/Card";
import DetailsCardModal from "@app/components/ModalComponent/modals/card/DetailsCard";
import PayCardSPEIModal from "@app/components/ModalComponent/modals/card/PayCardSPEI";
import PayCardEfevooPayBalanceModal from "@app/components/ModalComponent/modals/card/PayCardEfevooBalance";
import SuccessfulCardPaymentModal from "@app/components/ModalComponent/modals/card/SuccessfulCardPayment";
import BlockCardModal from "@app/components/ModalComponent/modals/card/BlockCard";
import {
  CardTransactionsContextProvider,
  ICardTransactionsContext,
} from "@app/layout/tarjeta/sections/two/context";
import moment from "moment";
export const CONTEXT = "dashboard/tarjeta";

function Tarjeta() {
  const { user, setUser } = useContext(UserContext);
  const [loadingRequestBussines, setLoadingRequestBussines] = useState(false);
  const idagep_empresa = useMemo(() => user.idagep_empresa ?? 0, [user]);
  const [currentCard, setCurrentCard] = useState<CardInfoRequestResponseCard>();
  const [isCardDigital, setIsCardDigital] = useState<boolean>(false);
  const [cardDigital, setCardDigital] = useState<CardInfoRequestResponseCard>();
  const [cardFisica, setCardFisica] = useState<CardInfoRequestResponseCard>();
  const [tipoPago, setTipoPago] = useState<String>("");

  const [currentTrasaction, setCurrentTrasaction] = useState<any>();
  const [currentCredit, setCurrentCredit] = useState<any>();
  const [currentBlock, setCurrentBlock] = useState<boolean>(false);
  useState<CardInfoCardRequestResponseCard>();

  const setRequest = async (body: any) => {
    return execWithLoader(
      CardsController.request,
      [{ ...body, idagep_empresa }],
      CONTEXT
    ).then((res: any) => {
      if (!res.isSuccess) return null;
      return res.response;
    });
  };

  //Open modals
  const openRequestBusinessCardModal = async () => {
    await modalManager.show(
      RequestBusinessCardModal,
      {
        openRequestCardModal,
        handleOnRequestBussinessCard,
        loading: loadingRequestBussines,
      },
      CONTEXT
    );
  };

  const openRequestCardModal = async () => {
    await modalManager.show(
      RequestCardModal,
      { openRequestBusinessCardModal },
      CONTEXT
    );
  };

  const openCountdownModal = async (value: string) => {
    await modalManager.show(CountdownModal, { value }, CONTEXT);
  };

  const openRequestSuccessfulCardModal = async () => {
    await modalManager.show(RequestSuccessfulCardModal, {}, CONTEXT);
  };

  const openRejectedCardModal = async () => {
    await modalManager.show(RejectedCardModal, {}, CONTEXT);
  };

  //Effects
  useEffectAsync(async () => {
    const status = await getStatus();
    if (status) {
      switch (status) {
        case "pendiente":
          const value = await getCountdown();
          if (value) {
            if (value == "Solicitar tarjeta") {
              openRequestCardModal();
            } else {
              openCountdownModal(value);
            }
          }
          break;
        case "solicitada":
          openRequestSuccessfulCardModal();
          break;
        case "aprobada":
          await getCard();
          break;
        case "ligada":
          setUser((prev) => ({
            ...prev,
            card: {
              ...prev.card,
              linked: true,
            },
          }));
          break;
        case "rechazada":
          openRejectedCardModal();
          break;
      }
    }
  }, []);
  useEffectAsync(async () => {
    if (currentCard) {
      setCurrentBlock(currentCard.status == "active");
      await getTrasaction(currentCard.id);
      await getCredit(currentCard.id);
    }
  }, [currentCard]);

  //Setters
  const setBlock = async (card: number, status: string) => {
    return execWithLoader(
      CardsController.block,
      [
        {
          idagep_empresa,
          card,
          action: status,
        },
      ],
      CONTEXT
    ).then((res: any) => {
      if (!res.isSuccess) return null;
      return res.response;
    });
  };

  //getters
  const getInfo = async () => {
    return execWithLoader(CardsController.info, [{ idagep_empresa }], CONTEXT)
      .then((res: any) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then((res: any) => {
        return res;
      });
  };
  const getCountdown = async () => {
    return execWithLoader(
      CardsController.countdown,
      [
        {
          idagep_empresa,
        },
      ],
      CONTEXT
    )
      .then((res: any) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then((res: any) => {
        return res.mensaje as string;
      });
  };
  const getStatus = async () => {
    return execWithLoader(
      CardsController.status,
      [
        {
          idagep_empresa,
        },
      ],
      CONTEXT
    )
      .then((res: any) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then((res: any) => {
        return res.estatus?.toLowerCase();
      });
  };
  const getCard = async () => {
    return execWithLoader(CardsController.info, [{ idagep_empresa }], CONTEXT)
      .then((res: any) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then(async (res) => {
        const cardDigital = res.cards.filter(
          (card: any) => card.type == "V"
        )[0];

        const cardFisica = res.cards.filter((card: any) => card.type == "F")[0];

        await setCardDigital(cardDigital);
        await setCardFisica(cardFisica);
        setTipoPago(res.tipoPago)

        if (
          cardDigital.physical_card_status == "active" ||
          cardDigital.physical_card_status == "blocked" ||
          cardDigital.physical_card_status == "approved"
        ) {
          setIsCardDigital(false);
          await setCurrentCard(cardFisica);
          return cardFisica;
        } else {
          setIsCardDigital(true);
          await setCurrentCard(cardDigital);
          return cardDigital;
        }
      });
  };
  const getTrasaction = async (
    card: number,
    fechaEnt?: string,
    fechaFin?: string
  ) => {
    return CardsController.transactions({
      idagep_empresa,
      card,
      fechaEnt: fechaEnt ?? "",
      fechaFin: fechaFin ?? "",
    })
      .then((res: any) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then(async (res: any) => {
        await setCurrentTrasaction(res);
        return res;
      });
  };
  const getCvv = async (card: number): Promise<CardCVVRequestResponse> => {
    return CardsController.cvv({
      idagep_empresa,
      card,
    })
      .then((res: any) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then(async (res: any) => {
        return res;
      });
  };
  const getNip = async (card: number): Promise<CardNIPRequestResponse> => {
    return CardsController.nip({
      idagep_empresa,
      card,
    })
      .then((res: any) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then(async (res: any) => {
        return res;
      });
  };
  const getCredit = async (card: number) => {
    return CardsController.credit({
      idagep_empresa,
      card,
    })
      .then((res) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then(async (res: any) => {
        await setCurrentCredit(res);
        return res;
      });
  };
  const getInfoCard = async (card: number) => {
    return execWithLoader(
      CardsController.infocard,
      [{ idagep_empresa, card }],
      CONTEXT
    )
      .then((res: any) => {
        if (!res.isSuccess) return null;
        return res.response;
      })
      .then(async (res: any) => {
        return res;
      });
  };

  const openSPEIPay = async (infocard: any,credit: any) => {
    await modalManager.show(
      PayCardSPEIModal,
      {
        infocard,
        credit,
      },
      CONTEXT
    );
  }
  const openEfevooBalancePay = async (infocard:any,credit:any) => {
    await modalManager.show(
      PayCardEfevooPayBalanceModal,
      {
        user,
        infocard,
        credit,
        handleSuccessPay:handleOnPaySuccess
      },
      CONTEXT
    );
  }
  const handleOnPaySuccess = async () =>{
    await modalManager.show(
      SuccessfulCardPaymentModal,
      {},
      CONTEXT
    )
    if (!currentCard) return;
    getInfoCard(currentCard.id);
    getCredit(currentCard.id);
  }
  //Handlers
  const handleOnClickPay = async () => {
    if (!currentCard) return;

    try {
      const [infocard, credit] = await Promise.all([
        getInfoCard(currentCard.id),
        getCredit(currentCard.id),
      ]);
      if (infocard && credit) {
        if (!tipoPago) return;
        if (tipoPago == "TARJETA"){
          openEfevooBalancePay(infocard,credit)
          //openSPEIPay(infocard,credit)
        }
        else if (tipoPago == "SPEI") {
          openSPEIPay(infocard,credit)
        }
      }
    } catch (error) {}
  };

  const handleOnClickDetails = async (type: string) => {
    let cardId = 0;
    if (type == "V") cardId = cardDigital?.id as number;
    if (type == "F") cardId = cardFisica?.id as number;

    if (cardId && getCvv) {
      const infoCard = await getInfoCard(cardId);
      await modalManager.show(
        DetailsCardModal,
        {
          getCvv: getCvv,
          getNip: getNip,
          infoCard: infoCard,
        },
        CONTEXT
      );
    }
  };

  const handleOnClickBlock = async () => {
    const handleBlock = async () => {
      if (currentCard) {
        const newBlock = !currentBlock ? "unblock" : "block";
        await setBlock(currentCard.id, newBlock);
        await getCard();
      }
    };

    await modalManager.show(
      BlockCardModal,
      {
        handleBlock,
        status: !currentBlock,
        isCardDigital,
      },
      CONTEXT
    );
  };
  const handleOnRequestBussinessCard = async (body: any) => {
    await setRequest(body).then(async (res) => {
      await modalManager.show(SuccessfulCardModal, {}, CONTEXT);
    });
  };

  const handleOnFilter = async (filter: ICardTransactionsContext) => {
    const id = currentCard?.id as number;
    const fechaEnt = moment(filter.fechaEnt).format("YYYY-MM-DD");
    const fechaFin = moment(filter.fechaFin).format("YYYY-MM-DD");
    if (filter.fechaEnt && filter.fechaFin) {
      await getTrasaction(id, fechaEnt, fechaFin);
    }
  };

  return (
    <PageLayout>
      <section className="container-header-tab">
        <KpiContainer title="Tarjeta"></KpiContainer>
      </section>
      <section className="container-body-tab">
        <CardTransactionsContextProvider>
          <Grid sm={1} md={12} lg={12} xl={12} gap={3} className="grow">
            <CardSectionOne
              card={currentCard}
              block={currentBlock}
              credit={currentCredit}
              isCardDigital={isCardDigital}
              onClickBlock={handleOnClickBlock}
              onClickDetail={handleOnClickDetails}
              onClickPay={handleOnClickPay}
            />
            <CardSectionTwo
              card={currentCard}
              trasaction={currentTrasaction}
              credit={currentCredit}
              onFilter={handleOnFilter}
            />
          </Grid>
        </CardTransactionsContextProvider>
      </section>
    </PageLayout>
  );
}

export default withAppContext(Tarjeta, CONTEXT, {
  title: "Tarjeta",
  mergeContainerStyles: {
    padding: "20px 0 0 0",
  },
});
