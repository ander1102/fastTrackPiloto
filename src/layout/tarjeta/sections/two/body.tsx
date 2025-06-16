import CardTransaction from "./transaction";
import { ScrollPanel } from "primereact/scrollpanel";
import SectionList from "@app/components/Scroll/Section";
import { forwardRef, useEffect, useMemo, useRef, useContext } from "react";
import { CardTransactionType } from "@app/types/Card";
import { CardTransactionsRequestResponseTransaction } from "@app/types/Card";
import { shuffleArray } from "@app/common/format";
import { SectionItem } from "@app/components/Scroll/Section";
import moment from "moment";
import "moment/locale/es";
import { CardTransactionsContext } from "./context";
moment.locale("es");

interface CardSectionTwoHeaderProps {
  trasaction?: CardTransactionsRequestResponseTransaction[];
}
import { CardTransactionProps } from "@app/layout/tarjeta/sections/two/transaction";
import { isEmpty } from "@app/common";
const CardSectionTwoBody = forwardRef<
  (HTMLDivElement | null)[],
  CardSectionTwoHeaderProps
>(({ trasaction }, ref) => {
  const { filter } = useContext(CardTransactionsContext);

  const CARD_ITEMS: SectionItem<CardTransactionProps>[] = useMemo(() => {
    if (!trasaction || isEmpty(trasaction)) return [];

    const groupedDataMap = new Map();
    trasaction = trasaction.filter((item) => {
      switch (filter.operation) {
        case 0: //deposito
          return item.TipoMovimientoCargoAbono === "Abono";
        case 1: //retiro
          return item.TipoMovimientoCargoAbono === "Cargo";
        default:
          return trasaction;
      }
    });

    trasaction.forEach((item) => {
      const fecha = moment(item.FechaMovimiento).format("DD MMMM YYYY");
      let type = CardTransactionType.CANCELATION;
      if (!groupedDataMap.has(fecha)) {
        groupedDataMap.set(fecha, []);
      }
      switch (item.TipoMovimientoCargoAbono) {
        case "Abono":
          type = CardTransactionType.DEPOSIT;
          break;
        case "Cargo":
          type = CardTransactionType.WITHDRAWAL;
          break;
      }

      const tpm: CardTransactionProps = {
        type: type,
        transaction: item.ConceptoMovimiento ? item.ConceptoMovimiento : "",
        description: item.DescripcionComercio ? item.DescripcionComercio : "",
        amount: +item.ImporteMovimiento,
      };
      groupedDataMap.get(fecha).push(tpm);
    });

    const resultado: SectionItem<CardTransactionProps>[] = Array.from(
      groupedDataMap.entries()
    ).map(([fecha, items]) => ({
      title: fecha,
      items: shuffleArray(items),
    }));

    return resultado;
  }, [trasaction, filter]);

  const ScrollRef = useRef<ScrollPanel | null>(null);

  useEffect(() => {
    const setScrollSize = () => {
      const refs = ref as any;
      const scrollEl = ScrollRef.current?.getElement();

      const ParentHeight = refs.current[0]?.clientHeight;
      const HeaderHeight = refs.current[1]?.clientHeight;

      if (scrollEl && ParentHeight && HeaderHeight)
        scrollEl.style.height =
          window.innerWidth <= 768
            ? ""
            : `${ParentHeight - HeaderHeight - 125}px`;
    };

    const onResize = () => {
      setScrollSize();
    };

    setScrollSize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="grow flex flex-col gap-3">
      <h1>Movimientos</h1>
      <SectionList
        ref={ScrollRef}
        items={CARD_ITEMS}
        RenderItem={(props) => <CardTransaction {...props.item} />}
        RenderHeader={({ title }) => (
          <div className="text-sm text-grey-1 bg-white pl-3 my-5">{title}</div>
        )}
        headerSticky
        Separator={() => <hr className="border" />}
        className="h-[390px]"
      />
    </section>
  );
});

export default CardSectionTwoBody;
